import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { brand, getServiceById, publishedCases, stages } from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

export function generateStaticParams() {
  return publishedCases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cs = publishedCases.find((c) => c.slug === slug)
  if (!cs) return {}
  const path = `/casos/${cs.slug}`
  return {
    title: cs.titulo,
    description: cs.reto,
    alternates: { canonical: path },
    openGraph: { url: path, title: cs.titulo, description: cs.reto },
  }
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const cs = publishedCases.find((c) => c.slug === slug)
  if (!cs) notFound()

  const service = getServiceById(cs.servicioId)

  // Las métricas sin dato medido llevan un marcador de relleno en content/trust.ts.
  // Sirven de recordatorio interno, pero no pueden salir a producción: se filtran
  // aquí y, si no queda ninguna, la rejilla entera no se pinta.
  const metricasPublicables = (cs.resultado?.metricas ?? []).filter(
    (m) => !m.valor.trim().startsWith("["),
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.titulo,
    description: cs.reto,
    url: absoluteUrl(`/casos/${cs.slug}`),
    author: { "@type": "Organization", name: brand.legalName },
    publisher: { "@type": "Organization", name: brand.legalName, url: absoluteUrl("/") },
    datePublished: cs.autorizacion?.fecha,
  }

  return (
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-2 py-8 md:px-3 md:py-10">
        <nav aria-label="Miga de pan" className="text-caption text-slate">
          <Link href="/" className="underline">
            Inicio
          </Link>{" "}
          / <Link href="/casos" className="underline">
            Casos
          </Link>{" "}
          / <span className="text-navy">{cs.titulo}</span>
        </nav>

        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Sector {cs.sector}
            {cs.anonimizado && " · Caso anonimizado por confidencialidad"}
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">{cs.titulo}</h1>
          <p className="text-lead leading-relaxed text-slate">{cs.reto}</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <section className="flex flex-col gap-2 border border-line bg-white p-3">
            <h2 className="text-h3 font-bold text-navy">Qué construimos</h2>
            <p className="text-body leading-relaxed text-ink">{cs.queConstruimos}</p>
          </section>
          <section className="flex flex-col gap-2 border border-line bg-white p-3">
            <h2 className="text-h3 font-bold text-navy">Cómo funciona</h2>
            <p className="text-body leading-relaxed text-ink">{cs.comoFunciona}</p>
          </section>
        </div>

        {cs.resultado && (
          <section className="flex max-w-[70ch] flex-col gap-3 border-l-4 border-teal bg-white p-3">
            <div className="flex flex-col gap-1">
              <h2 className="text-h3 font-bold text-navy">Resultado</h2>
              <p className="text-lead leading-relaxed text-ink">{cs.resultado.texto}</p>
              <p className="text-caption leading-relaxed text-slate">{cs.resultado.encuadre}</p>
            </div>

            {metricasPublicables.length > 0 && (
              <div className="flex flex-col gap-2">
                <ul className="grid gap-2 sm:grid-cols-3">
                  {metricasPublicables.map((m) => (
                    <li key={m.etiqueta} className="flex flex-col gap-1 border border-line bg-bg p-2">
                      <span className="text-body font-bold text-navy text-balance">{m.valor}</span>
                      <span className="text-caption leading-relaxed text-slate">{m.etiqueta}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-caption leading-relaxed text-slate">
                  Datos de medición interna del equipo sobre los flujos intervenidos; varían según el
                  caso y el volumen de cada cliente.
                </p>
              </div>
            )}
          </section>
        )}

        <section className="flex flex-col gap-3">
          <h2 className="text-h3 font-bold text-navy">Así se recorrieron las cuatro etapas</h2>
          <ol className="grid gap-2 md:grid-cols-2">
            {cs.etapas.map((e) => {
              const stage = stages.find((s) => s.n === e.etapa)
              return (
                <li key={e.etapa} className="flex flex-col gap-1 border border-line bg-white p-2">
                  <span className="text-caption font-semibold uppercase tracking-wide text-teal">
                    Etapa {e.etapa}: {stage?.nombre}
                  </span>
                  <span className="text-body leading-relaxed text-ink">{e.queOcurrio}</span>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="flex flex-col gap-3 border border-line bg-navy p-3 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[60ch] flex-col gap-1">
            <h2 className="text-h3 font-bold text-white">¿Un reto parecido en su operación?</h2>
            <p className="text-body leading-relaxed text-line">
              {service
                ? `Este caso se resolvió con el servicio «${service.nombre}». Vea la ficha o agende la sesión de diagnóstico.`
                : "Agende la sesión de diagnóstico de 30 minutos sin costo."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {service && (
              <Link
                href={`/servicios/${service.slug}`}
                className="bg-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
              >
                Ver el servicio
              </Link>
            )}
            <Link
              href="/#contacto"
              className="border border-white px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
            >
              Agendar sesión
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
