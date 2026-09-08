import { AgentPanel } from "@/components/agents/agent-panel"
import { Section } from "@/components/ui/section"

/**
 * Segundo bloque de la home: el Agente de Diagnóstico como experiencia central.
 *
 * Estuvo dentro del hero, en una columna estrecha y sobre una imagen con blur.
 * Aquí tiene ancho propio y fondo limpio, que es lo que necesita una conversación.
 * También absorbe la función del Recomendador de Nivel: el rol del agente
 * (app/api/agents/[agent]/route.ts) obliga a cerrar cada respuesta con la
 * capacidad, el nivel y su rango publicado.
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
      <div className="mx-auto w-full max-w-[860px]">
        <AgentPanel
          endpoint="/api/agents/diagnostico"
          title="Agente de Diagnóstico"
          placeholder="Ejemplo: cada mes se me quedan facturas sin cobrar y nadie las persigue."
          suggestions={[
            "Se me pierden facturas por cobrar y nadie hace seguimiento.",
            "Recibimos cientos de hojas de vida y no alcanzamos a leerlas.",
            "Buscar una cláusula en nuestros contratos toma horas.",
          ]}
          tone="light"
        />
      </div>
    </Section>
  )
}
