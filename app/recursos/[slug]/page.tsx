import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, ChevronRight, Clock } from "lucide-react"
import {
  brand,
  publishedResources,
  getResourceBySlug,
  readingMinutes,
  formatResourceDate,
} from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

export function generateStaticParams() {
  return publishedResources.map((r) => ({ slug: r.slug }))
}

/** Un slug que no corresponde a un artículo publicado es 404, no una página vacía. */
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const r = getResourceBySlug(slug)
  if (!r) return {}
  const path = `/recursos/${r.slug}`
  return {
    title: r.titulo,
    description: r.extracto,
    alternates: { canonical: path },
    openGraph: { url: path, title: r.titulo, description: r.extracto, type: "article" },
    // Los borradores no se indexan hasta que el equipo cambie el estado a "publicado".
    robots: r.estado === "borrador" ? { index: false, follow: true } : undefined,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const r = getResourceBySlug(slug)
  if (!r) notFound()

  const url = absoluteUrl(`/recursos/${r.slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.titulo,
    description: r.extracto,
    url,
    mainEntityOfPage: url,
    datePublished: r.datePublished,
    dateModified: r.dateModified,
    author: { "@type": "Organization", name: brand.legalName, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: brand.legalName, url: absoluteUrl("/") },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Recursos", item: absoluteUrl("/recursos") },
      { "@type": "ListItem", position: 3, name: r.titulo, item: url },
    ],
  }

  const faqJsonLd = r.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: r.faq.map((f) => ({
          "@type": "Question",
          name: f.pregunta,
          acceptedAnswer: { "@type": "Answer", text: f.respuesta },
        })),
      }
    : null

  return (
    <div className="bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }} />
      )}

      {/* Cabecera navy a sangre: da entrada al artículo en vez de arrancar con
          texto sobre el gris de fondo. Misma textura que el hero de la portada. */}
      <header className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="hst-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex max-w-[820px] flex-col gap-3 px-2 py-8 md:py-10">
          <nav aria-label="Ruta de navegación" className="text-caption text-line">
            <Link href="/" className="underline decoration-white/30 underline-offset-2 hover:text-white">
              Inicio
            </Link>
            <span aria-hidden className="mx-1.5 text-white/40">
              /
            </span>
            <Link href="/recursos" className="underline decoration-white/30 underline-offset-2 hover:text-white">
              Recursos
            </Link>
          </nav>

          <span className="text-caption font-semibold uppercase tracking-[0.2em] text-teal">Recurso</span>
          <h1 className="text-h1 font-extrabold leading-[1.1] text-white text-balance">{r.titulo}</h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-line">
            <time dateTime={r.datePublished}>{formatResourceDate(r.datePublished)}</time>
            <span aria-hidden className="text-white/40">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} aria-hidden />
              {readingMinutes(r)} min de lectura
            </span>
          </div>
        </div>
      </header>

      <article className="mx-auto flex max-w-[820px] flex-col gap-10 px-2 py-8 md:py-12">
        {/* BLUF: la respuesta directa, marcada como tal. Usa text-lead, que sí
            existe en la escala; antes pedía una clase inexistente y salía
            al mismo tamaño que el cuerpo. */}
        <p className="max-w-[62ch] border-l-4 border-teal bg-white p-4 text-lead leading-relaxed text-ink">
          {r.bluf}
        </p>

        {/* Tabla de contenidos, numerada igual que los encabezados del cuerpo */}
        <nav aria-label="Tabla de contenidos" className="hst-card max-w-[62ch] p-4">
          <h2 className="mb-2 text-caption font-semibold uppercase tracking-wide text-slate">
            En este artículo
          </h2>
          <ol className="flex flex-col gap-1.5">
            {r.secciones.map((s, i) => (
              <li key={s.id} className="flex gap-2.5">
                <span aria-hidden className="text-caption font-bold tabular-nums text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${s.id}`}
                  className="text-body leading-snug text-navy underline decoration-line underline-offset-2 hover:text-teal"
                >
                  {s.h2}
                </a>
              </li>
            ))}
            {r.faq && (
              <li className="flex gap-2.5">
                <span aria-hidden className="text-caption font-bold tabular-nums text-teal">
                  {String(r.secciones.length + 1).padStart(2, "0")}
                </span>
                <a
                  href="#preguntas-frecuentes"
                  className="text-body leading-snug text-navy underline decoration-line underline-offset-2 hover:text-teal"
                >
                  Preguntas frecuentes
                </a>
              </li>
            )}
          </ol>
        </nav>

        {/* Cuerpo. El encabezado de sección lleva número y filete, para que el
            artículo tenga ritmo visible; la prosa se limita a ~62ch, una medida
            de lectura cómoda (antes ocupaba los 820px, cerca de 100 caracteres). */}
        <div className="flex flex-col gap-10">
          {r.secciones.map((s, i) => (
            <section key={s.id} id={s.id} className="flex scroll-mt-24 flex-col gap-4">
              <div className="border-b-2 border-navy pb-2">
                <span className="text-caption font-bold uppercase tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h2 font-bold text-navy text-balance">{s.h2}</h2>
              </div>
              {s.parrafos.map((p, j) => (
                <p key={j} className="max-w-[62ch] text-body leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              {s.lista && (
                <ul className="flex max-w-[62ch] flex-col gap-2.5 border-l-2 border-line pl-4">
                  {s.lista.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-body leading-relaxed text-ink">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-teal" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ opcional */}
        {r.faq && (
          <section id="preguntas-frecuentes" className="flex scroll-mt-24 flex-col gap-4">
            <div className="border-b-2 border-navy pb-2">
              <span className="text-caption font-bold uppercase tracking-[0.2em] text-teal">
                {String(r.secciones.length + 1).padStart(2, "0")}
              </span>
              <h2 className="text-h2 font-bold text-navy text-balance">Preguntas frecuentes</h2>
            </div>
            <div className="flex max-w-[62ch] flex-col gap-2">
              {r.faq.map((f) => (
                <details key={f.pregunta} className="hst-card group overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-start gap-2 p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
                    <ChevronRight
                      size={18}
                      aria-hidden
                      className="mt-0.5 shrink-0 text-teal transition-transform group-open:rotate-90"
                    />
                    {f.pregunta}
                  </summary>
                  <p className="px-3 pb-3 pl-[2.4rem] text-body leading-relaxed text-slate">
                    {f.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Enlaces relacionados */}
        {r.relacionados.length > 0 && (
          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-bold text-navy">Siga explorando</h2>
            <ul className="grid gap-2 md:grid-cols-2">
              {r.relacionados.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hst-card hst-card-hover group flex items-center gap-2 p-3 text-body text-navy transition-colors hover:text-teal-dark"
                  >
                    <ArrowRight size={16} aria-hidden className="shrink-0 text-teal" />
                    <span className="leading-snug">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA al diagnóstico */}
        <footer className="border-l-4 border-teal bg-navy p-5 text-white">
          <h2 className="text-h3 font-bold text-white">¿Quiere verlo en su operación?</h2>
          <p className="mt-2 max-w-[58ch] text-body leading-relaxed text-line">
            La mejor forma de decidir es ver la IA operar sobre un proceso suyo. Agende una sesión de
            diagnóstico de 30 minutos, sin costo, y le mostramos cómo se vería en su empresa.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/#contacto"
              className="bg-teal px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal-dark"
            >
              Agendar diagnóstico
            </Link>
            <Link href="/recursos" className="text-caption text-line underline hover:text-white">
              Ver todos los recursos
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
