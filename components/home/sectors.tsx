import { sectors } from "@/content"
import { sectorBlurb, sectorImages } from "@/content/media"
import { Section } from "@/components/ui/section"

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
        {sectors.map((s) => (
          <article
            key={s}
            className="hst-card hst-card-hover group flex flex-col overflow-hidden"
          >
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
            <p className="px-3 py-3 text-caption leading-relaxed text-slate">{sectorBlurb[s]}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
