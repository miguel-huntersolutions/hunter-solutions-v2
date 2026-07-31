import { IdCard, Cable, Eye, UserCheck, Sprout } from "lucide-react"
import { Section } from "@/components/ui/section"

const STEPS = [
  {
    icon: IdCard,
    titulo: "Rol y responsabilidad",
    descripcion: "Cada agente tiene una hoja de vida: un rol definido y una responsabilidad única.",
  },
  {
    icon: Cable,
    titulo: "Onboarding",
    descripcion: "Lo integramos a su ERP y a las reglas de su negocio, como a cualquier colaborador nuevo.",
  },
  {
    icon: Eye,
    titulo: "Seguimiento",
    descripcion: "Observabilidad y trazabilidad: sabemos qué hizo, con qué datos y por qué.",
  },
  {
    icon: UserCheck,
    titulo: "Acompañamiento",
    descripcion: "Supervisión humana sobre las decisiones sensibles. El agente propone, la organización dispone.",
  },
  {
    icon: Sprout,
    titulo: "Crecimiento",
    descripcion: "Mejora continua: el agente evoluciona con su operación.",
  },
]

export function DigitalAnatomy() {
  return (
    <Section
      id="anatomia"
      eyebrow="Ciclo de vida"
      title="Anatomía de un colaborador digital"
      intro="Un agente se gestiona como un miembro del equipo, desde su rol hasta su crecimiento."
      align="center"
    >
      <ol className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <li key={step.titulo} className="hst-card hst-card-hover relative flex flex-col gap-3 p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-soft text-teal-dark">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-h3 font-bold text-navy">{step.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{step.descripcion}</p>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 border-l-4 border-teal bg-bg p-4">
        <p className="text-lead font-semibold leading-relaxed text-navy text-balance">
          Una nómina digital se gestiona como una de personas: con roles claros, supervisión y crecimiento.
        </p>
      </div>
    </Section>
  )
}
