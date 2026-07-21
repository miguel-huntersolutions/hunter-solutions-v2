import { positioning, sectors } from "@/content"
import { AgentPanel } from "@/components/agents/agent-panel"
import { SurfaceProvider } from "@/components/brand/surface"

export function Hero() {
  return (
    <SurfaceProvider tone="dark">
      <section className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1200px] items-stretch gap-6 px-2 py-10 md:px-3 lg:grid-cols-2 lg:py-12">
          <div className="flex flex-col justify-center gap-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-teal">
              Consultora AI-native · Colombia
            </p>
            <h1 className="text-h1 font-bold text-balance md:text-display">{positioning.h1}</h1>
            <p className="max-w-[60ch] text-body leading-relaxed text-line">{positioning.apoyo}</p>
            <p className="text-body font-semibold text-teal">{positioning.invitacion}</p>
            <ul className="mt-1 flex flex-wrap gap-1" aria-label="Sectores atendidos">
              {sectors.map((s) => (
                <li
                  key={s}
                  className="border border-slate px-2 py-0.5 text-caption uppercase tracking-wide text-line"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-h-[380px]">
            <AgentPanel
              endpoint="/api/agents/diagnostico"
              title="Agente de Diagnóstico"
              placeholder="Describa su reto operativo…"
              suggestions={[
                "Recibimos cientos de facturas en PDF y las digitamos a mano en el ERP",
                "Quiero saber por dónde empezar con IA en una empresa de alimentos",
                "Nuestro equipo legal pierde horas buscando cláusulas en contratos viejos",
              ]}
              tone="dark"
            />
          </div>
        </div>
      </section>
    </SurfaceProvider>
  )
}
