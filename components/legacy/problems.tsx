import Link from "next/link"
import { ArrowRight, Compass, ShieldCheck, Workflow } from "lucide-react"
import { getServiceById, problems } from "@/content"
import { Section } from "@/components/ui/section"

const ICONS = [Compass, Workflow, ShieldCheck]

export function Problems() {
  return (
    <Section
      id="problemas"
      eyebrow="Los tres frenos"
      title="Por dónde se atasca"
      intro="Tres situaciones se repiten en cada conversación. Para cada una, una respuesta concreta."
      align="center"
      tone="white"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {problems.map((p, i) => {
          const service = getServiceById(p.servicioRecomendadoId)
          const Icon = ICONS[i]
          return (
            <article key={p.id} className="hst-card hst-card-hover flex flex-col gap-3 p-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-h3 font-bold text-navy text-balance">{p.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{p.descripcion}</p>
              <div className="rounded-lg bg-teal-soft p-2.5">
                <p className="text-caption leading-relaxed text-ink">
                  <span className="font-semibold text-teal-dark">Respuesta HST: </span>
                  {p.respuestaHst}
                </p>
              </div>
              {service && (
                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:text-teal"
                >
                  {service.nombre} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
