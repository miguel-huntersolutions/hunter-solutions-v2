import { faqs } from "@/content"
import { Section } from "@/components/ui/section"

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="Preguntas frecuentes"
      title="Las preguntas que nos hacen antes de empezar"
    >
      <div className="flex max-w-[80ch] flex-col">
        {faqs.map((f) => (
          <details key={f.pregunta} className="group border-b border-line bg-white">
            <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
              {f.pregunta}
            </summary>
            <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
