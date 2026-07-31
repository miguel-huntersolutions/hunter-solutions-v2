import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { publishedCases } from "@/content"
import { caseImage } from "@/content/media"
import { Section } from "@/components/ui/section"

export function Cases() {
  return (
    <Section
      id="casos"
      eyebrow="Prueba primero, promesa después"
      title="Casos con resultados encuadrados, no cifras infladas"
      intro="Casos anonimizados y autorizados. Cada resultado se publica con su encuadre y su fuente: así medimos, así lo contamos."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {publishedCases.map((c) => (
          <article
            key={c.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={caseImage(c.slug) || "/placeholder.svg"}
                alt={`Ilustración del caso: ${c.titulo}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                {c.sector} · Caso anonimizado
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-h3 font-bold text-navy text-balance">{c.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{c.reto}</p>
              {c.resultado && (
                <blockquote className="rounded-xl border-l-4 border-teal bg-bg p-3">
                  <p className="text-body font-semibold leading-relaxed text-navy">
                    {c.resultado.texto}
                  </p>
                  <footer className="mt-1.5 text-[11px] leading-snug text-slate">
                    {c.resultado.encuadre}
                  </footer>
                </blockquote>
              )}
              <Link
                href={`/casos/${c.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:text-teal"
              >
                Ver el caso completo
                <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-navy p-6 md:flex-row md:items-start md:gap-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/15 text-teal">
          <Sparkles size={22} aria-hidden />
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="text-h3 font-bold text-white text-balance">
            Usamos nuestra propia nómina digital
          </h3>
          <p className="max-w-[60ch] text-body leading-relaxed text-line">
            No solo la construimos para otros: operamos con ella. Un agente apoya nuestra operación
            interna y otro trabaja el posicionamiento de este sitio. Ser AI-native no es un eslogan,
            es cómo trabajamos todos los días.
          </p>
        </div>
      </div>
    </Section>
  )
}
