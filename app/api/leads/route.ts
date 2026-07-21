import { z } from "zod"
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
  if (!rateLimit(`leads:${getClientIp(req)}`)) {
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
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8_000),
      })
      if (!res.ok) throw new Error(`webhook status ${res.status}`)
    } catch (error) {
      console.error("[leads] fallo al enviar al CRM, lead registrado en log:", lead, error)
    }
  } else {
    console.log("[leads] LEADS_WEBHOOK_URL no configurado; lead registrado en log:", lead)
  }

  return Response.json({ ok: true })
}
