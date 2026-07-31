import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { resources, readingMinutes, formatResourceDate } from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

const description =
  "Guías prácticas sobre IA aplicada para empresas en Colombia: qué es un agente de IA, cómo empezar, cuánto cuesta y cómo se supervisan los agentes con criterio de negocio."

export const metadata: Metadata = {
  title: "Recursos: guías de IA aplicada para empresas",
  description,
  alternates: { canonical: "/recursos" },
  openGraph: { url: "/recursos", title: "Recursos: guías de IA aplicada para empresas", description },
}

export default function RecursosPage() {
  // Ordenamos del más reciente al más antiguo por fecha de publicación.
  const ordered = [...resources].sort(
    (a, b) => new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime(),
  )

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Recursos", item: absoluteUrl("/recursos") },
    ],
  }

  return (
    <main className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="mx-auto flex max-w-[820px] flex-col gap-8 px-2 py-8 md:py-12">
        <nav aria-label="Ruta de navegación" className="text-caption text-slate">
          <Link href="/" className="underline hover:text-teal">
            Inicio
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <span className="text-navy">Recursos</span>
        </nav>

        <header className="flex flex-col gap-3">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">Recursos</p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Guías de IA aplicada, en lenguaje de negocio
          </h1>
          <p className="text-body-lg leading-relaxed text-ink">
            Explicamos la IA aplicada como lo que es para su empresa: una decisión de operación y de
            inversión, no un tema técnico. Sin promesas vacías y sin tecnicismos sin traducir a valor.
          </p>
        </header>

        <ul className="flex flex-col gap-4">
          {ordered.map((r) => {
            const esBorrador = r.estado === "borrador"
            return (
              <li key={r.slug}>
                <Link
                  href={`/recursos/${r.slug}`}
                  className="group flex flex-col gap-2 border border-line bg-white p-4 transition-colors hover:border-teal"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-slate">
                    <time dateTime={r.datePublished}>{formatResourceDate(r.datePublished)}</time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} aria-hidden />
                      {readingMinutes(r)} min de lectura
                    </span>
                    {esBorrador && (
                      <span className="rounded-sm bg-bg px-1.5 py-0.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                        Borrador
                      </span>
                    )}
                  </div>
                  <h2 className="text-h3 font-bold text-navy text-balance group-hover:text-teal-dark">
                    {r.titulo}
                  </h2>
                  <p className="text-body leading-relaxed text-slate">{r.extracto}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Leer el artículo
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
