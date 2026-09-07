import { z } from "zod"
import { Resend } from "resend"
import { getClientIp, rateLimit } from "@/lib/agents/runtime"

/**
 * API de leads (E12). Valida, exige consentimiento explícito (Ley 1581 de 2012)
 * y registra consentGrantedAt + consentVersion. El destino CRM se conecta vía
 * variable de entorno; mientras no exista, el lead queda en el log del servidor
 * para no perderlo silenciosamente.
 */

const CONSENT_VERSION = "2026-07-20-v1"

const leadSchema = z.object({
  nombre: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  sector: z.string().trim().max(60).optional(),
  reto: z.string().trim().max(1000).optional(),
  mensaje: z.string().trim().max(1000).optional(),
  origen: z.string().trim().max(40).default("home"),
  consentimiento: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  // Honeypot: debe llegar vacío o ausente
  empresa_web: z.string().max(0).optional().or(z.literal("")),
})

export async function POST(req: Request) {
  if (!(await rateLimit(`leads:${getClientIp(req)}`))) {
    return Response.json({ error: "Demasiadas solicitudes" }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json(
      { error: "Datos incompletos: revise nombre, correo y la casilla de consentimiento." },
      { status: 400 },
    )
  }

  const lead = {
    ...parsed.data,
    empresa_web: undefined,
    consentimiento: undefined,
    consentGrantedAt: new Date().toISOString(),
    consentVersion: CONSENT_VERSION,
  }

  const webhook = process.env.LEADS_WEBHOOK_URL
  let webhookOk = false
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8_000),
      })
      if (!res.ok) throw new Error(`webhook status ${res.status}`)
      webhookOk = true
    } catch (error) {
      console.error("[leads] fallo al enviar al CRM:", traceable(lead), error)
    }
  }

  // Notificación por correo con Resend. Los remitentes/destinatarios y la API key
  // viven en variables de entorno, nunca en el código.
  const emailSent = await sendLeadEmail(lead)

  // Si ningún canal aceptó el lead, no lo registramos en el log (contendría datos
  // personales con retención indefinida, justo lo contrario de lo que promete la
  // política de privacidad) y tampoco fingimos éxito: el formulario muestra su
  // estado de error, que ya ofrece el correo y el WhatsApp como alternativa.
  if (!webhookOk && !emailSent) {
    console.error("[leads] lead sin canal de entrega disponible:", traceable(lead))
    return Response.json(
      { error: "No pudimos registrar la solicitud en este momento." },
      { status: 502 },
    )
  }

  return Response.json({ ok: true, emailSent })
}

/**
 * Traza mínima para diagnosticar entregas fallidas sin dejar datos personales en
 * los logs: el correo va enmascarado y el texto libre del visitante no se registra.
 */
function traceable(lead: LeadPayload) {
  return {
    email: maskEmail(lead.email),
    sector: lead.sector,
    origen: lead.origen,
    consentGrantedAt: lead.consentGrantedAt,
  }
}

function maskEmail(email: string): string {
  const [local, domain] = email.split("@")
  if (!domain) return "***"
  return `${local.slice(0, 1)}***@${domain}`
}

type LeadPayload = {
  nombre: string
  email: string
  sector?: string
  reto?: string
  mensaje?: string
  origen: string
  consentGrantedAt: string
  consentVersion: string
}

async function sendLeadEmail(lead: LeadPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL

  // Remitente en el dominio verificado en Resend: contacto.huntersolutions.tech.
  // Solo respetamos LEADS_FROM_EMAIL si apunta a ese subdominio verificado; de lo
  // contrario usamos el remitente por defecto para evitar el 403 de dominio no verificado.
  const DEFAULT_FROM = "HST Diagnóstico <diagnostico@contacto.huntersolutions.tech>"
  // endsWith y no includes: "algo@contacto.huntersolutions.tech.otrodominio.com"
  // contiene el subdominio verificado pero no pertenece a él. Se compara sobre la
  // dirección sola, porque el valor puede venir como "Nombre <correo@dominio>".
  const VERIFIED_DOMAIN = "@contacto.huntersolutions.tech"
  const envFrom = process.env.LEADS_FROM_EMAIL?.trim()
  const address = envFrom?.replace(/^.*<|>$/g, "")
  const from = envFrom && address?.endsWith(VERIFIED_DOMAIN) ? envFrom : DEFAULT_FROM

  if (!apiKey || !to) {
    console.warn("[leads] RESEND_API_KEY o LEADS_TO_EMAIL sin configurar; no se envía correo.")
    return false
  }

  const rows: [string, string][] = [
    ["Nombre", lead.nombre],
    ["Correo", lead.email],
    ["Sector", lead.sector ?? "—"],
    ["Reto", lead.reto ?? lead.mensaje ?? "—"],
    ["Origen", lead.origen],
    ["Consentimiento", `${lead.consentGrantedAt} (${lead.consentVersion})`],
  ]

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#1a2332;line-height:1.5">
      <h2 style="margin:0 0 16px">Nueva solicitud de diagnóstico</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                <td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:bold;background:#f8fafc;white-space:nowrap;vertical-align:top">${escapeHtml(
                  k,
                )}</td>
                <td style="padding:8px 12px;border:1px solid #e2e8f0">${escapeHtml(v)}</td>
              </tr>`,
          )
          .join("")}
      </table>
    </div>`

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n")

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: lead.email,
      subject: `Nueva solicitud de diagnóstico — ${lead.nombre}`,
      html,
      text,
    })
    if (error) throw error
    return true
  } catch (error) {
    console.error("[leads] fallo al enviar correo con Resend:", error)
    return false
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
