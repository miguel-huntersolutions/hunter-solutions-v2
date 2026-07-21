import {
  Bot,
  Building2,
  Compass,
  FileText,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { differentiators, positioning, teamExperience } from "@/content"
import { Section } from "@/components/ui/section"

const DIFF_ICONS = [Sparkles, Building2, ShieldCheck, Layers, Gauge, Compass, FileText, Bot]

export function Differentiators() {
  return (
    <Section
      id="diferenciadores"
      eyebrow="Por qué HST"
      title={positioning.nuevosTitulo}
      intro="Nos respalda la experiencia real del equipo operando procesos, no una cifra de años corporativos."
      align="center"
      tone="white"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((d, i) => {
          const Icon = DIFF_ICONS[i % DIFF_ICONS.length]
          return (
            <article key={d.titulo} className="hst-card hst-card-hover flex flex-col gap-2 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-soft text-teal-dark">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-caption font-bold uppercase tracking-wide text-navy">{d.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{d.descripcion}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-6 rounded-xl border border-line bg-bg p-4">
        <h3 className="mb-3 text-h3 font-bold text-navy">Experiencia real del equipo</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {teamExperience.map((t) => (
            <article key={t.dominio} className="rounded-lg border-l-4 border-teal bg-white p-3 shadow-sm">
              <h4 className="text-caption font-bold text-navy">{t.dominio}</h4>
              <p className="mt-1 text-caption leading-relaxed text-slate">{t.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
