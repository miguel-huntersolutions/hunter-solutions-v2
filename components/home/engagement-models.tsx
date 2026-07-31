import Link from "next/link"
import { Wrench, TrendingUp, Target } from "lucide-react"
import { Section } from "@/components/ui/section"

const MODELS = [
  {
    icon: Wrench,
    nombre: "Desarrollo de capacidades",
    que: "Le construimos y ponemos a operar un agente para un proceso concreto.",
    pago: "Por proyecto, costo fijo.",
    cuando: "Necesita una capacidad puntual y acotada.",
  },
  {
    icon: TrendingUp,
    nombre: "Augmentation",
    que: "Capacidad digital operando y creciendo mes a mes, como sumar equipo.",
    pago: "Cuota mensual.",
    cuando: "Quiere capacidad continua que evoluciona con su negocio.",
  },
  {
    icon: Target,
    nombre: "Pago por eficiencia",
    que: "Parte de nuestro pago se ata a lo que ahorramos o generamos.",
    pago: "Contra resultados medidos.",
    cuando: "El proceso es medible y hay confianza mutua.",
  },
] as const

export function EngagementModels() {
  return (
    <Section
      id="como-se-contrata"
      eyebrow="Modelos comerciales"
      title="Cómo se contrata"
      intro="Tres formas de trabajar con nosotros, según su necesidad y su apetito de riesgo. Se pueden combinar con el tiempo."
      align="center"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {MODELS.map((m) => {
          const Icon = m.icon
          return (
            <article key={m.nombre} className="hst-card hst-card-hover flex flex-col gap-4 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-soft text-teal-dark">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-h3 font-bold text-navy">{m.nombre}</h3>
              </div>

              <dl className="flex flex-col gap-3">
                <div>
                  <dt className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Qué es
                  </dt>
                  <dd className="mt-1 text-caption leading-relaxed text-slate">{m.que}</dd>
                </div>
                <div>
                  <dt className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Cómo se paga
                  </dt>
                  <dd className="mt-1 text-caption leading-relaxed text-slate">{m.pago}</dd>
                </div>
                <div>
                  <dt className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Cuándo conviene
                  </dt>
                  <dd className="mt-1 text-caption leading-relaxed text-slate">{m.cuando}</dd>
                </div>
              </dl>
            </article>
          )
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/#contacto"
          className="bg-navy px-4 py-2 text-body font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
        >
          Agendar diagnóstico
        </Link>
      </div>
    </Section>
  )
}
