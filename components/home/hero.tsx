import Link from "next/link"
import { ArrowRight, MessageSquare } from "lucide-react"
import { sectors } from "@/content"
import { AgentPanel } from "@/components/agents/agent-panel"
import { SurfaceProvider } from "@/components/brand/surface"
import { Eyebrow } from "@/components/ui/section"
import { HeroHeadline } from "@/components/home/hero-headline"

export function Hero() {
  return (
    <SurfaceProvider tone="dark">
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Textura de rejilla + resplandor teal */}
        <div aria-hidden className="hst-grid absolute inset-0 opacity-70" />
        <div aria-hidden className="hst-glow absolute inset-0" />

        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-2 py-14 md:px-3 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="flex flex-col items-start gap-5">
            <Eyebrow tone="dark">Consultora AI-native · Colombia</Eyebrow>
            <HeroHeadline />
            <p className="max-w-[54ch] text-lead leading-relaxed text-line">
              Ayudamos a empresas en Colombia a multiplicar la eficiencia de su equipo y a reducir el
              gasto operativo con una Fuerza Laboral Digital: agentes de IA que operan sus procesos de
              principio a fin, con supervisión humana. No solo responden preguntas: se conectan a su
              ERP, deciden con las reglas de su negocio y ejecutan.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal-dark"
              >
                Diagnóstico gratis <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:border-teal hover:text-teal"
              >
                <MessageSquare className="h-4 w-4" /> Ver servicios
              </Link>
            </div>

            <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Sectores atendidos">
              {sectors.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-caption uppercase tracking-wide text-line"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            {/* Imagen abstracta de red de agentes como telón del panel */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-2xl bg-cover bg-center opacity-40 blur-[1px]"
              style={{ backgroundImage: "url('/abstract/digital-workforce.webp')" }}
            />
            <div className="relative min-h-[420px]">
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
        </div>
      </section>
    </SurfaceProvider>
  )
}
