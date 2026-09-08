import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"
import { formatIssueDate, publishedIssues } from "@/lib/newsletter"

export const metadata: Metadata = {
  title: "Radar IA Semanal",
  description:
    "Cada lunes: qué se movió en inteligencia artificial y qué significa para una empresa colombiana. Herramientas, adopción, riesgos y una acción concreta para la semana.",
  alternates: { canonical: "/newsletter" },
}

export default function NewsletterPage() {
  const issues = publishedIssues()
  const [ultima, ...anteriores] = issues

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Radar IA Semanal", item: absoluteUrl("/newsletter") },
    ],
  }

  return (
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <header className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="hst-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex max-w-[820px] flex-col gap-3 px-2 py-8 md:py-12">
          <nav aria-label="Ruta de navegación" className="text-caption text-line">
            <Link href="/" className="underline decoration-white/30 underline-offset-2 hover:text-white">
              Inicio
            </Link>
            <span aria-hidden className="mx-1.5 text-white/40">
              /
            </span>
            <span className="text-white">Radar IA Semanal</span>
          </nav>

          <span className="text-caption font-semibold uppercase tracking-[0.2em] text-teal">
            Publicación semanal
          </span>
          <h1 className="text-h1 font-extrabold leading-[1.1] text-white text-balance">
            Radar IA Semanal
          </h1>
          <p className="max-w-[62ch] text-lead leading-relaxed text-line">
            Cada lunes resumimos qué se movió en inteligencia artificial y, sobre todo, qué significa
            para una empresa colombiana que ya trabaja con IA o quiere empezar. Sin novedades por ser
            novedades: solo lo que cambia una decisión.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[820px] px-2 py-8 md:py-12">
        {issues.length === 0 ? (
          <p className="text-body text-slate">
            La primera edición se publica pronto. Mientras tanto, puede{" "}
            <Link href="/recursos" className="underline hover:text-teal">
              leer las guías de IA aplicada
            </Link>
            .
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Última edición, destacada */}
            <section className="flex flex-col gap-3">
              <h2 className="text-caption font-semibold uppercase tracking-wide text-slate">
                Última edición
              </h2>
              <Link
                href={`/newsletter/${ultima.slug}`}
                className="hst-card hst-card-hover group flex flex-col gap-3 border-l-4 border-l-teal p-5"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-slate">
                  <span className="bg-navy px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
                    Edición {ultima.numero}
                  </span>
                  <time dateTime={ultima.datePublished}>{formatIssueDate(ultima.datePublished)}</time>
                </div>
                <h3 className="text-h2 font-bold text-navy text-balance group-hover:text-teal-dark">
                  {ultima.titulo}
                </h3>
                <p className="max-w-[68ch] text-body leading-relaxed text-slate">{ultima.extracto}</p>
                <span className="inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                  Leer la edición
                  <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </section>

            {anteriores.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-caption font-semibold uppercase tracking-wide text-slate">
                  Ediciones anteriores
                </h2>
                <ul className="flex flex-col gap-3">
                  {anteriores.map((i) => (
                    <li key={i.slug}>
                      <Link
                        href={`/newsletter/${i.slug}`}
                        className="hst-card hst-card-hover group flex flex-col gap-2 p-4"
                      >
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-slate">
                          <span aria-hidden className="font-bold tabular-nums text-teal">
                            {String(i.numero).padStart(2, "0")}
                          </span>
                          <time dateTime={i.datePublished}>{formatIssueDate(i.datePublished)}</time>
                        </div>
                        <h3 className="text-h3 font-bold text-navy text-balance group-hover:text-teal-dark">
                          {i.titulo}
                        </h3>
                        <p className="max-w-[68ch] text-body leading-relaxed text-slate">{i.extracto}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
