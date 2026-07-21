import { differentiators, positioning, teamExperience } from "@/content"
import { Section } from "@/components/ui/section"

export function Differentiators() {
  return (
    <Section
      id="diferenciadores"
      eyebrow="Por qué HST"
      title={positioning.nuevosTitulo}
      intro={positioning.nuevosArgumento}
      tone="white"
    >
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((d) => (
          <article key={d.titulo} className="border border-line bg-bg p-3">
            <h3 className="text-caption font-bold uppercase tracking-wide text-navy">{d.titulo}</h3>
            <p className="mt-1 text-caption leading-relaxed text-slate">{d.descripcion}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-6 mb-2 text-h3 font-bold text-navy">Experiencia real del equipo</h3>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {teamExperience.map((t) => (
          <article key={t.dominio} className="border-t-4 border-teal bg-bg p-3">
            <h4 className="text-caption font-bold text-navy">{t.dominio}</h4>
            <p className="mt-1 text-caption leading-relaxed text-slate">{t.descripcion}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
