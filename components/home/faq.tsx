import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
        {faqs.slice(0, 3).map((f) => (
          <details key={f.pregunta} className="group border-b border-line bg-white">
            <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
              {f.pregunta}
            </summary>
            <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
          </details>
        ))}
      </div>

      <div className="mt-5">
        <Link
          href="/preguntas"
          className="inline-flex items-center gap-1.5 rounded-lg border border-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Ver todas las preguntas
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </Section>
  )
}
