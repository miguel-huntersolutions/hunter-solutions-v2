import Link from "next/link"
import { lineaConfianza, pruebaPropia, publishedCases } from "@/content"
import { Section } from "@/components/ui/section"

/**
 * Tercer bloque de la home: tres pruebas cortas en lugar de las secciones de
 * casos, gobernanza y diferenciadores que salieron en el Prompt 1.
 *
 * Las dos primeras tarjetas se generan desde publishedCases: el texto no se
 * duplica aquí, sale del content model, y las métricas no se pintan (varias
 * siguen sin dato medido). La tercera y la línea de confianza también viven en
 * content/trust.ts para que el contrato de contenido pueda escanearlas.
 */
export function Prueba() {
  const casos = publishedCases.filter(
    (c): c is typeof c & { resultado: NonNullable<typeof c.resultado> } => c.resultado !== null,
  )

  return (
    <Section id="prueba" eyebrow="Ya está funcionando" title="Tres pruebas, sin cifras infladas." tone="bg">
      <div className="grid gap-3 md:grid-cols-3">
        {casos.map((c) => (
          <article key={c.slug} className="flex flex-col gap-2 border border-line bg-white p-4">
            <p className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
              {c.sector}
            </p>
            <h3 className="text-h3 font-bold text-navy text-balance">{c.titulo}</h3>
            <p className="text-body leading-relaxed text-ink">{c.resultado.texto}</p>
            <p className="text-caption leading-relaxed text-slate">{c.resultado.encuadre}</p>
            <Link
              href={`/casos/${c.slug}`}
              className="mt-auto pt-2 text-caption font-semibold uppercase tracking-wide text-teal-dark hover:text-navy"
            >
              Ver caso
            </Link>
          </article>
        ))}

        <article className="flex flex-col gap-2 border border-line bg-white p-4">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
            {pruebaPropia.sector}
          </p>
          <h3 className="text-h3 font-bold text-navy text-balance">{pruebaPropia.titulo}</h3>
          <p className="text-body leading-relaxed text-ink">{pruebaPropia.texto}</p>
          <p className="text-caption leading-relaxed text-slate">{pruebaPropia.nota}</p>
        </article>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <p className="max-w-[64ch] text-body leading-relaxed text-ink">
          {lineaConfianza.texto}{" "}
          <Link
            href={lineaConfianza.enlaceHref}
            className="font-semibold text-teal-dark underline decoration-line underline-offset-2 hover:text-navy"
          >
            {lineaConfianza.enlaceTexto}
          </Link>
        </p>

        <p className="text-caption text-slate">
          <Link
            href="/servicios#niveles"
            className="underline decoration-line underline-offset-2 hover:text-teal"
          >
            Precios publicados por nivel.
          </Link>
        </p>

        <Link
          href="#contacto"
          className="mt-2 inline-flex min-h-[48px] w-fit items-center bg-navy px-5 py-3 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
        >
          Agendar diagnóstico de 30 minutos, sin costo
        </Link>
      </div>
    </Section>
  )
}
