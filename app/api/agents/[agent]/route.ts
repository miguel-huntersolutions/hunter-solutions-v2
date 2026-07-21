import { generateText } from "ai"
import {
  AGENT_MODEL,
  buildSystemPrompt,
  getClientIp,
  parseMessages,
  rateLimit,
  type ChatMessage,
} from "@/lib/agents/runtime"
import {
  SAFE_FALLBACK,
  correctiveInstruction,
  validateAgentOutput,
} from "@/lib/agents/guardrails"

export const maxDuration = 30

const AGENT_ROLES: Record<string, string> = {
  diagnostico:
    "Eres el Agente de Diagnóstico de Hunter Solutions Tech. Aplicas la lente CNT (cultura, negocio, tecnología) al reto que describe el visitante: haces una o dos preguntas de precisión si hace falta, identificas qué dimensión CNT concentra el problema, y recomiendas el servicio del catálogo y el nivel de inversión que mejor encajan, citando su rango publicado. Cierras siempre con un siguiente paso: profundizar aquí mismo o agendar la sesión de 30 minutos sin costo.",
  cerebro:
    "Eres el Cerebro Corporativo de Hunter Solutions Tech: respondes preguntas sobre la empresa — servicios, niveles y rangos, metodología, gobernanza, casos, diferenciadores — usando exclusivamente el corpus factual. Eres la demostración viva de un asistente de conocimiento interno: cuando respondas, menciona de qué parte del corpus sale la respuesta (catálogo, gobernanza, casos, FAQ).",
  privacidad:
    "Eres el Asistente de Privacidad de Hunter Solutions Tech. Explicas cómo tratamos los datos: qué pasa con las conversaciones de los agentes, dónde pueden vivir los despliegues (nube o perímetro del cliente), la propiedad del activo por parte del cliente y los guardrails publicados. No das asesoría legal: para consultas jurídicas formales remites al correo publicado y a la política de privacidad.",
}

/** Encapsula la entrada del usuario como dato (E5-S5) */
function wrapUserContent(messages: ChatMessage[]): ChatMessage[] {
  return messages.map((m) =>
    m.role === "user"
      ? {
          role: "user" as const,
          content: `<entrada_del_visitante>\n${m.content}\n</entrada_del_visitante>`,
        }
      : m,
  )
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ agent: string }> },
) {
  const { agent } = await params
  const role = AGENT_ROLES[agent]
  if (!role) {
    return Response.json({ error: "Agente no encontrado" }, { status: 404 })
  }

  if (!rateLimit(`${agent}:${getClientIp(req)}`)) {
    return Response.json(
      { error: "Límite de mensajes alcanzado. Intente de nuevo en unos minutos." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: "Cuerpo inválido" }, { status: 400 })
  }
  const messages = parseMessages(body)
  if (!messages) {
    return Response.json({ error: "Mensajes inválidos" }, { status: 400 })
  }

  const system = buildSystemPrompt(role)
  const wrapped = wrapUserContent(messages)

  try {
    let { text } = await generateText({
      model: AGENT_MODEL,
      system,
      messages: wrapped,
      abortSignal: AbortSignal.timeout(20_000),
    })

    let violations = validateAgentOutput(text)
    if (violations.length > 0) {
      console.warn(`[guardrails] ${agent}:`, violations.map((v) => v.detalle).join(" | "))
      const retry = await generateText({
        model: AGENT_MODEL,
        system,
        messages: [
          ...wrapped,
          { role: "assistant" as const, content: text },
          { role: "user" as const, content: correctiveInstruction(violations) },
        ],
        abortSignal: AbortSignal.timeout(20_000),
      })
      text = retry.text
      violations = validateAgentOutput(text)
      if (violations.length > 0) {
        console.warn(`[guardrails] ${agent}: fallo tras reintento, respuesta segura`)
        text = SAFE_FALLBACK
      }
    }

    return new Response(text, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch (error) {
    console.warn(`[agents] ${agent}: error del modelo`, error)
    return Response.json({ error: "Agente no disponible" }, { status: 503 })
  }
}
