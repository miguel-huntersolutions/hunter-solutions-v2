import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { getSectorPageBySlug, getServiceBySlug, sectorPages } from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

export function generateStaticParams() {
  return sectorPages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sector = getSectorPageBySlug(slug)
  if (!sector) return {}
  const path = `/sectores/${sector.slug}`
  const title = `${sector.keyword}`
  return {
    title,
    description: sector.description,
    alternates: { canonical: path },
    openGraph: { url: path, title, description: sector.description },
  }
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sector = getSectorPageBySlug(slug)
  if (!sector) notFound()

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sectores", item: absoluteUrl("/#sectores") },
      {
        "@type": "ListItem",
        position: 3,
        name: sector.sector,
        item: absoluteUrl(`/sectores/${sector.slug}`),
      },
    ],
  }

  return (
    <main className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="mx-auto flex max-w-[820px] flex-col gap-8 px-2 py-8 md:py-12">
        {/* Breadcrumb visible */}
        <nav aria-label="Ruta de navegación" className="text-caption text-slate">
          <Link href="/" className="underline hover:text-teal">
            Inicio
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <Link href="/#sectores" className="underline hover:text-teal">
            Sectores
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <span className="text-navy">{sector.sector}</span>
        </nav>

        <header className="flex flex-col gap-3">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Sector {sector.sector}
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">{sector.h1}</h1>
          {/* BLUF: dolor operativo + respuesta directa en el primer párrafo */}
          <p className="text-body-lg leading-relaxed text-ink">{sector.bluf}</p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Cómo lo resuelven los agentes de Hunter Solutions Tech
          </h2>
          <ul className="flex flex-col gap-2">
            {sector.solucion.map((punto) => (
              <li key={punto} className="flex gap-3 border border-line bg-white p-3">
                <ArrowRight size={18} className="mt-0.5 shrink-0 text-teal" aria-hidden />
                <span className="text-body leading-relaxed text-ink">{punto}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Servicios aplicables al sector {sector.sector}
          </h2>
          <div className="grid gap-2 md:grid-cols-2">
            {sector.servicios.map((serviceSlug) => {
              const svc = getServiceBySlug(serviceSlug)
              if (!svc) return null
              return (
                <Link
                  key={serviceSlug}
                  href={`/servicios/${svc.slug}`}
                  className="group flex flex-col gap-1 border border-line bg-white p-3 transition-colors hover:border-teal"
                >
                  <span className="text-body font-semibold text-navy group-hover:text-teal-dark">
                    {svc.nombre}
                  </span>
                  <span className="text-caption leading-relaxed text-slate">
                    {svc.descripcion}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Un caso del sector {sector.sector}
          </h2>
          {sector.caso ? (
            <Link
              href={`/casos/${sector.caso.slug}`}
              className="group flex flex-col gap-2 border-l-4 border-teal bg-white p-4 transition-colors hover:bg-teal-soft"
            >
              <span className="text-body-lg font-semibold text-navy group-hover:text-teal-dark">
                {sector.caso.titulo}
              </span>
              <span className="text-body leading-relaxed text-ink">{sector.caso.resumen}</span>
              <span className="inline-flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark">
                Ver el caso
                <ArrowRight size={16} aria-hidden />
              </span>
            </Link>
          ) : (
            <div className="flex flex-col gap-2 border-l-4 border-line bg-white p-4">
              <span className="text-body-lg font-semibold text-slate">
                [COMPLETAR con un caso autorizado del sector {sector.sector}]
              </span>
              <span className="text-body leading-relaxed text-slate">
                Aún no publicamos un caso autorizado de este sector. Mientras tanto, con gusto le
                compartimos ejemplos aplicables en una conversación.
              </span>
              <Link
                href="/#contacto"
                className="inline-flex w-fit items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal-dark underline"
              >
                Hablemos de su caso
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Preguntas frecuentes sobre IA en el sector {sector.sector}
          </h2>
          <div className="flex flex-col">
            {sector.faq.map((f) => (
              <details key={f.pregunta} className="group border-b border-line bg-white">
                <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
                  {f.pregunta}
                </summary>
                <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-l-4 border-teal bg-white p-4">
          <h2 className="text-h3 font-bold text-navy">Veámoslo sobre un proceso suyo</h2>
          <p className="text-body leading-relaxed text-ink">
            La mejor forma de evaluar el encaje es partir de un proceso real de su operación en{" "}
            {sector.sector.toLowerCase()}. Agende una conversación y le mostramos cómo se vería.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="bg-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
            >
              Agendar diagnóstico
            </Link>
            <Link
              href="/fuerza-laboral-digital"
              className="text-caption text-slate underline hover:text-teal"
            >
              Conocer la Fuerza Laboral Digital
            </Link>
          </div>
        </footer>
      </div>
    </main>
  )
}
