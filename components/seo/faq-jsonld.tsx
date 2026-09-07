import { faqs } from "@/content"
import { jsonLdScript } from "@/lib/seo"

// Server Component: renderiza el JSON-LD de FAQPage con las 6 preguntas y respuestas
// exactas de la fuente de contenido (content/narrative.ts). No usa estado ni efectos.
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.respuesta,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  )
}
