import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { publishedResources, readingMinutes, formatResourceDate } from "@/content"
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
  const ordered = [...publishedResources].sort(
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
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      {/* Misma cabecera navy que la ficha del artículo, para que el índice y el
          detalle se lean como una sola sección editorial. */}
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
            <span className="text-white">Recursos</span>
          </nav>

          <span className="text-caption font-semibold uppercase tracking-[0.2em] text-teal">Recursos</span>
          <h1 className="text-h1 font-extrabold leading-[1.1] text-white text-balance">
            Guías de IA aplicada, en lenguaje de negocio
          </h1>
          {/* text-lead es el token real de la escala del proyecto */}
          <p className="max-w-[62ch] text-lead leading-relaxed text-line">
            Explicamos la IA aplicada como lo que es para su empresa: una decisión de operación y de
            inversión, no un tema técnico. Sin promesas vacías y sin tecnicismos sin traducir a valor.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[820px] px-2 py-8 md:py-12">
        {ordered.length === 0 ? (
          <p className="max-w-[62ch] text-body leading-relaxed text-slate">
            Estamos preparando las primeras guías. Mientras tanto, puede leer el{" "}
            <Link href="/newsletter" className="underline hover:text-teal">
              Radar IA Semanal
            </Link>{" "}
            o{" "}
            <Link href="/#contacto" className="underline hover:text-teal">
              agendar una sesión de diagnóstico
            </Link>
            .
          </p>
        ) : (
        <ul className="flex flex-col gap-4">
          {ordered.map((r, i) => {
            return (
              <li key={r.slug}>
                <Link
                  href={`/recursos/${r.slug}`}
                  className="hst-card hst-card-hover group flex flex-col gap-2 border-l-4 border-l-teal p-4"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-slate">
                    <span aria-hidden className="font-bold tabular-nums text-teal">
                      {String(ordered.length - i).padStart(2, "0")}
                    </span>
                    <time dateTime={r.datePublished}>{formatResourceDate(r.datePublished)}</time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} aria-hidden />
                      {readingMinutes(r)} min de lectura
                    </span>
                  </div>
                  <h2 className="text-h3 font-bold text-navy text-balance group-hover:text-teal-dark">
                    {r.titulo}
                  </h2>
                  <p className="max-w-[68ch] text-body leading-relaxed text-slate">{r.extracto}</p>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                    Leer el artículo
                    <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
        )}
      </div>
    </div>
  )
}
