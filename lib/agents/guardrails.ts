import { formatLevelRange, levels, services } from "@/content"

/**
 * Guardrails de salida (E5-S4): la respuesta del modelo se valida ANTES de
 * devolverse al cliente. Si falla, se reintenta una vez con instrucción
 * correctiva; si vuelve a fallar, se devuelve la respuesta segura.
 */

export type GuardrailViolation =
  | { tipo: "importe_no_publicado"; detalle: string }
  | { tipo: "garantia_de_resultado"; detalle: string }
  | { tipo: "solicitud_datos_sensibles"; detalle: string }

/** Importes en millones COP permitidos (bordes de los rangos publicados) */
const ALLOWED_MILLIONS = new Set<number>()
for (const l of levels) {
  ALLOWED_MILLIONS.add(l.rangoMin / 1_000_000)
  ALLOWED_MILLIONS.add(l.rangoMax / 1_000_000)
}

// "$10 millones", "10 millones de pesos", "$50.000.000", "COP 10M"
const AMOUNT_PATTERNS = [
  /\$?\s?(\d{1,3})\s?(?:millones|millón)/gi,
  /\$\s?(\d{1,3})(?:[.,]\d{3}){2,}/g,
]

const GUARANTEE_PATTERN =
  /garantizamos|garantizado|garantía de resultado|retorno garantizado|roi garantizado/i

const SENSITIVE_REQUEST_PATTERN =
  /(?:dame|envíe|envía|comparta|comparte|necesito|indíqueme|escriba)[^.]{0,60}(?:cédula|tarjeta de crédito|número de tarjeta|contraseña|credenciales)/i

/** Limpieza defensiva: el modelo debe responder en texto plano, pero si
 * cuela markdown (negritas, encabezados) lo eliminamos antes de mostrarlo. */
export function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "· ")
}

export function validateAgentOutput(text: string): GuardrailViolation[] {
  const violations: GuardrailViolation[] = []

  for (const pattern of AMOUNT_PATTERNS) {
    pattern.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(text)) !== null) {
      const raw = match[1] ?? match[0]
      const millions = Number.parseInt(String(raw).replace(/\D/g, ""), 10)
      if (Number.isFinite(millions) && millions > 0 && !ALLOWED_MILLIONS.has(millions)) {
        violations.push({
          tipo: "importe_no_publicado",
          detalle: `Importe fuera de los rangos publicados: ${match[0]}`,
        })
      }
    }
  }

  if (GUARANTEE_PATTERN.test(text)) {
    violations.push({
      tipo: "garantia_de_resultado",
      detalle: "La respuesta promete garantía de resultado.",
    })
  }

  if (SENSITIVE_REQUEST_PATTERN.test(text)) {
    violations.push({
      tipo: "solicitud_datos_sensibles",
      detalle: "La respuesta solicita datos sensibles.",
    })
  }

  return violations
}

export function correctiveInstruction(violations: GuardrailViolation[]): string {
  const reasons = violations.map((v) => v.detalle).join(" | ")
  return [
    "Tu respuesta anterior violó las reglas de publicación y fue descartada. Motivos: " + reasons,
    "Reescríbela cumpliendo: usa SOLO los rangos publicados por nivel " +
      levels.map((l) => `${l.nombre}: ${formatLevelRange(l.id)}`).join("; ") +
      " (COP, sin IVA).",
    "No prometas garantías de resultado ni de retorno. No pidas datos sensibles.",
  ].join(" ")
}

export const SAFE_FALLBACK =
  "Prefiero no improvisar una respuesta sobre eso. Lo que sí puedo decirle con certeza está publicado en la página: el catálogo de servicios por niveles con sus rangos de referencia, la metodología de cuatro etapas y la gobernanza completa. Si quiere una lectura seria de su caso, agende la sesión de diagnóstico de 30 minutos sin costo en la sección de contacto."

/** Nombres de servicio publicados, útil para trazas de monitoreo */
export const PUBLISHED_SERVICE_NAMES = services.map((s) => s.nombre)
