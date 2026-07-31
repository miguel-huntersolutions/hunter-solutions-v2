import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { sectors, sectorPages } from "@/content"
import { sectorBlurb, sectorImages } from "@/content/media"
import { Section } from "@/components/ui/section"

/** Mapa nombre de sector → slug de su página de detalle. */
const sectorSlug: Record<string, string> = Object.fromEntries(
  sectorPages.map((s) => [s.sector, s.slug]),
)

export function Sectors() {
  return (
    <Section
      id="sectores"
      eyebrow="Dónde trabajamos"
      title="Cinco sectores, un mismo método"
      intro="Conocemos la operación de las empresas medianas colombianas por dentro. Estos son los sectores donde nuestros agentes ya generan valor."
      align="center"
      tone="bg"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sectors.map((s) => {
          const slug = sectorSlug[s]
          const card = (
            <>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={sectorImages[s] || "/placeholder.svg"}
                  alt={`Operación del sector ${s} apoyada con agentes de IA`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-2 top-2 rounded-full bg-navy/90 px-2.5 py-1 text-caption font-semibold uppercase tracking-wide text-white">
                  {s}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 px-3 py-3">
                <p className="text-caption leading-relaxed text-slate">{sectorBlurb[s]}</p>
                {slug && (
                  <span className="mt-auto inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Ver IA para {s}
                    <ArrowRight
                      size={14}
                      aria-hidden
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                )}
              </div>
            </>
          )

          return slug ? (
            <Link
              key={s}
              href={`/sectores/${slug}`}
              className="hst-card hst-card-hover group flex flex-col overflow-hidden"
            >
              {card}
            </Link>
          ) : (
            <article key={s} className="hst-card group flex flex-col overflow-hidden">
              {card}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
