import Link from "next/link"
import { getServiceById, problems } from "@/content"
import { Section } from "@/components/ui/section"

export function Problems() {
  return (
    <Section
      id="problemas"
      eyebrow="Los tres frenos"
      title="Lo que detiene a las empresas medianas frente a la IA"
      intro="Tres situaciones se repiten en cada conversación. Para cada una hay una respuesta concreta, no un discurso."
      tone="white"
    >
      <div className="grid gap-3 md:grid-cols-3">
        {problems.map((p) => {
          const service = getServiceById(p.servicioRecomendadoId)
          return (
            <article key={p.id} className="flex flex-col gap-2 border border-line bg-bg p-3">
              <h3 className="text-h3 font-bold text-navy text-balance">{p.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{p.descripcion}</p>
              <p className="text-caption leading-relaxed text-ink">
                <span className="font-semibold text-teal">Nuestra respuesta: </span>
                {p.respuestaHst}
              </p>
              {service && (
                <Link
                  href={`/servicios/${service.slug}`}
                  className="mt-auto text-caption font-semibold uppercase tracking-wide text-navy underline decoration-teal underline-offset-4 hover:text-teal"
                >
                  {service.nombre}
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
