import { Section } from "@/components/ui/section"

/**
 * Segundo bloque de la home: el Agente de Diagnóstico como experiencia central.
 *
 * Cascarón del Prompt 1. El contenido definitivo (copy, AgentPanel en tono claro,
 * sugerencias y cierre fijo del agente) llega en el Prompt 3, que además ajusta el
 * rol en app/api/agents/[agent]/route.ts y los guardrails.
 */
export function DiagnosticoBlock() {
  return (
    <Section
      id="diagnostico"
      eyebrow="Pruébelo ahora"
      title="No lea sobre nuestra IA. Pruébela."
      intro="Cuéntele su reto operativo. Le dice por dónde empezar, qué capacidad aplica y en qué nivel de inversión queda. Sin registrarse."
      tone="white"
    >
      <div className="border border-line bg-bg p-6 text-body text-slate">
        [PENDIENTE COPY] El panel del Agente de Diagnóstico se monta aquí en el Prompt 3.
      </div>
    </Section>
  )
}
