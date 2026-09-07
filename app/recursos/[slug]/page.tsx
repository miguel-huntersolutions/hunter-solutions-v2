import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, Clock } from "lucide-react"
import {
  brand,
  resources,
  getResourceBySlug,
  readingMinutes,
  formatResourceDate,
} from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

export function generateStaticParams() {
  return resources.map((r) => ({ slug: r.slug }))
}

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

      <article className="mx-auto flex max-w-[820px] flex-col gap-8 px-2 py-8 md:py-12">
        <nav aria-label="Ruta de navegación" className="text-caption text-slate">
          <Link href="/" className="underline hover:text-teal">
            Inicio
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <Link href="/recursos" className="underline hover:text-teal">
            Recursos
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <span className="text-navy">{r.titulo}</span>
        </nav>

        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-slate">
            <time dateTime={r.datePublished}>{formatResourceDate(r.datePublished)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={14} aria-hidden />
              {readingMinutes(r)} min de lectura
            </span>
            {r.estado === "borrador" && (
              <span className="rounded-sm bg-white px-1.5 py-0.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                Borrador
              </span>
            )}
          </div>
          <h1 className="text-h1 font-bold text-navy text-balance">{r.titulo}</h1>
          {/* BLUF: respuesta directa en el primer párrafo */}
          <p className="text-body-lg leading-relaxed text-ink">{r.bluf}</p>
        </header>

        {/* Tabla de contenidos */}
        <nav aria-label="Tabla de contenidos" className="flex flex-col gap-2 border-l-4 border-teal bg-white p-4">
          <h2 className="text-caption font-semibold uppercase tracking-wide text-slate">En este artículo</h2>
          <ol className="flex flex-col gap-1">
            {r.secciones.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-body text-navy underline decoration-line underline-offset-2 hover:text-teal">
                  {i + 1}. {s.h2}
                </a>
              </li>
            ))}
            {r.faq && (
              <li>
                <a href="#preguntas-frecuentes" className="text-body text-navy underline decoration-line underline-offset-2 hover:text-teal">
                  Preguntas frecuentes
                </a>
              </li>
            )}
          </ol>
        </nav>

        {/* Cuerpo en prosa con H2 autoconclusivos */}
        <div className="flex flex-col gap-8">
          {r.secciones.map((s) => (
            <section key={s.id} id={s.id} className="flex scroll-mt-24 flex-col gap-3">
              <h2 className="text-h2 font-bold text-navy text-balance">{s.h2}</h2>
              {s.parrafos.map((p, i) => (
                <p key={i} className="text-body leading-relaxed text-ink">
                  {p}
                </p>
              ))}
              {s.lista && (
                <ul className="flex flex-col gap-2">
                  {s.lista.map((item, i) => (
                    <li key={i} className="flex gap-2 text-body leading-relaxed text-ink">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
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
          <section id="preguntas-frecuentes" className="flex scroll-mt-24 flex-col gap-3">
            <h2 className="text-h2 font-bold text-navy text-balance">Preguntas frecuentes</h2>
            <div className="flex flex-col">
              {r.faq.map((f) => (
                <details key={f.pregunta} className="group border-b border-line bg-white">
                  <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
                    {f.pregunta}
                  </summary>
                  <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
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
                    className="group flex items-center gap-2 border border-line bg-white p-3 text-body text-navy transition-colors hover:border-teal hover:text-teal-dark"
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
        <footer className="flex flex-col gap-3 border-l-4 border-teal bg-white p-4">
          <h2 className="text-h3 font-bold text-navy">¿Quiere verlo en su operación?</h2>
          <p className="text-body leading-relaxed text-ink">
            La mejor forma de decidir es ver la IA operar sobre un proceso suyo. Agende una sesión de
            diagnóstico de 30 minutos, sin costo, y le mostramos cómo se vería en su empresa.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="bg-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
            >
              Agendar diagnóstico
            </Link>
            <Link href="/recursos" className="text-caption text-slate underline hover:text-teal">
              Ver todos los recursos
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
}
