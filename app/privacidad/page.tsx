import type { Metadata } from "next"
import { privacidad } from "@/content/legal"
import { LegalDocument } from "@/components/legal/legal-document"
import { AgentPanel } from "@/components/agents/agent-panel"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de tratamiento de datos personales de Hunter Solutions Tech (Ley 1581 de 2012) y Asistente de Privacidad.",
}

export default function PrivacidadPage() {
  return (
    <main className="bg-bg">
      <LegalDocument doc={privacidad} />
      <div className="mx-auto max-w-[70ch] px-2 pb-10">
        <h2 className="mb-2 text-h3 font-bold text-navy">
          ¿Preguntas sobre sus datos? Pregúntele al Asistente de Privacidad
        </h2>
        <AgentPanel
          endpoint="/api/agents/privacidad"
          title="Asistente de Privacidad"
          placeholder="Pregunte cómo tratamos sus datos…"
          tone="light"
          suggestions={[
            "¿Qué pasa con lo que escribo en los agentes de este sitio?",
            "¿Cómo ejerzo mi derecho de supresión de datos?",
            "¿Dónde viven los datos de un proyecto con ustedes?",
          ]}
        />
      </div>
    </main>
  )
}
