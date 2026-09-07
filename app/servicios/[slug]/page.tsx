import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  formatLevelRange,
  getLevel,
  getServiceBySlug,
  services,
} from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return {}
  const path = `/servicios/${service.slug}`
  return {
    title: service.nombre,
    description: service.descripcion,
    alternates: { canonical: path },
    openGraph: { url: path, title: service.nombre, description: service.descripcion },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  const level = getLevel(service.nivel)
  const related = services
    .filter((s) => s.nivel === service.nivel && s.id !== service.id)
    .slice(0, 3)

  // Solo emitimos precio cuando el nivel tiene un rango numérico definido.
  const hasPriceRange = Number.isFinite(level.rangoMin) && Number.isFinite(level.rangoMax)

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.nombre,
    description: service.descripcion,
    url: absoluteUrl(`/servicios/${service.slug}`),
    // Referencia a la Organization global por @id (definida en OrgJsonLd), sin duplicar sus datos.
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "CO",
    serviceType: level.nombre,
    ...(hasPriceRange
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "COP",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "COP",
              minPrice: level.rangoMin,
              // El Nivel 3 se comunica como "desde", así que no publicamos techo de precio.
              ...(level.id !== 3 ? { maxPrice: level.rangoMax } : {}),
            },
          },
        }
      : {}),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Servicios", item: absoluteUrl("/servicios") },
      {
        "@type": "ListItem",
        position: 3,
        name: service.nombre,
        item: absoluteUrl(`/servicios/${service.slug}`),
      },
    ],
  }

  return (
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-2 py-8 md:px-3 md:py-10">
        <nav aria-label="Miga de pan" className="text-caption text-slate">
          <Link href="/" className="underline">
            Inicio
          </Link>{" "}
          / <Link href="/servicios" className="underline">
            Servicios
          </Link>{" "}
          / <span className="text-navy">{service.nombre}</span>
        </nav>

        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            {level.nombre} · {formatLevelRange(level.id)}
            {" "}(sin IVA)
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">{service.nombre}</h1>
          <p className="text-lead leading-relaxed text-slate">{service.descripcion}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <section className="flex flex-col gap-2 border border-line bg-white p-3">
            <h2 className="text-h3 font-bold text-navy">Qué solucionamos</h2>
            <p className="text-body leading-relaxed text-ink">{service.queSolucionamos}</p>
          </section>
          <section className="flex flex-col gap-2 border border-line bg-white p-3">
            <h2 className="text-h3 font-bold text-navy">Cómo lo hacemos</h2>
            <p className="text-body leading-relaxed text-ink">{service.comoLoHacemos}</p>
          </section>
          <section className="flex flex-col gap-2 border border-line bg-white p-3">
            <h2 className="text-h3 font-bold text-navy">Un ejemplo concreto</h2>
            <p className="text-body leading-relaxed text-ink">{service.ejemplo}</p>
          </section>
        </div>

        <section className="flex flex-col gap-2">
          <h2 className="text-h3 font-bold text-navy">Sectores donde más aplica</h2>
          <ul className="flex flex-wrap gap-1">
            {service.sectoresRelevantes.map((s) => (
              <li key={s} className="border border-line bg-white px-2 py-1 text-caption text-slate">
                {s}
              </li>
            ))}
          </ul>
          <p className="max-w-[70ch] text-caption leading-relaxed text-slate">
            {level.nota}
          </p>
        </section>

        <section className="flex flex-col gap-3 border border-line bg-navy p-3 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[60ch] flex-col gap-1">
            <h2 className="text-h3 font-bold text-white">¿Es este su reto?</h2>
            <p className="text-body leading-relaxed text-line">
              Descríbalo en el Agente de Diagnóstico y reciba una recomendación al instante, o
              agende directamente la sesión de 30 minutos sin costo.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <Link
              href="/#diagnostico"
              className="bg-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
            >
              Probar el diagnóstico
            </Link>
            <Link
              href="/#contacto"
              className="border border-white px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
            >
              Agendar sesión
            </Link>
          </div>
        </section>

        {related.length > 0 && (
          <section className="flex flex-col gap-2">
            <h2 className="text-h3 font-bold text-navy">Servicios relacionados del mismo nivel</h2>
            <div className="grid gap-2 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/servicios/${r.slug}`}
                  className="flex flex-col gap-1 border border-line bg-white p-2 transition-colors hover:border-teal"
                >
                  <span className="text-body font-semibold text-navy">{r.nombre}</span>
                  <span className="text-caption leading-relaxed text-slate">{r.descripcion}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
