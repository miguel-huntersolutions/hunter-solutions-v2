import Link from "next/link"
import { publishedCases } from "@/content"
import { Section } from "@/components/ui/section"

export function Cases() {
  return (
    <Section
      id="casos"
      eyebrow="Prueba primero, promesa después"
      title="Casos con resultados encuadrados, no cifras infladas"
      intro="Casos anonimizados y autorizados. Cada resultado se publica con su encuadre y su fuente: así medimos, así lo contamos."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {publishedCases.map((c) => (
          <article key={c.id} className="flex flex-col gap-2 border border-line bg-white p-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-teal">
              {c.sector} · Caso anonimizado
            </p>
            <h3 className="text-h3 font-bold text-navy text-balance">{c.titulo}</h3>
            <p className="text-caption leading-relaxed text-slate">{c.reto}</p>
            {c.resultado && (
              <blockquote className="border-l-4 border-teal bg-bg p-2">
                <p className="text-caption font-semibold leading-relaxed text-ink">
                  {c.resultado.texto}
                </p>
                <footer className="mt-1 text-[11px] leading-snug text-slate">
                  {c.resultado.encuadre}
                </footer>
              </blockquote>
            )}
            <Link
              href={`/casos/${c.slug}`}
              className="mt-auto text-caption font-semibold uppercase tracking-wide text-navy underline decoration-teal underline-offset-4 hover:text-teal"
            >
              Ver el caso completo
            </Link>
          </article>
        ))}
      </div>
    </Section>
  )
}
