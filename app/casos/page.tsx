import type { Metadata } from "next"
import Link from "next/link"
import { getServiceById, publishedCases, teamExperience } from "@/content"

const description =
  "Casos autorizados de IA aplicada: qué reto había, qué se construyó y qué cambió en la operación."

export const metadata: Metadata = {
  title: "Casos",
  description,
  alternates: { canonical: "/casos" },
  openGraph: { url: "/casos", title: "Casos", description },
}

export default function CasosPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-2 py-8 md:px-3 md:py-10">
        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Prueba de trabajo real
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Casos: qué construimos y qué cambió
          </h1>
          <p className="text-body-lg leading-relaxed text-slate">
            Publicamos solo casos con autorización registrada. Los casos anonimizados protegen la
            identidad del cliente; los resultados se presentan con su encuadre y fuente.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {publishedCases.map((c) => {
            const service = getServiceById(c.servicioId)
            return (
              <Link
                key={c.id}
                href={`/casos/${c.slug}`}
                className="flex flex-col gap-2 border border-line bg-white p-3 transition-colors hover:border-teal"
              >
                <p className="text-caption font-semibold uppercase tracking-wide text-teal">
                  {c.sector}
                  {c.anonimizado && " · Anonimizado"}
                </p>
                <h2 className="text-h3 font-bold text-navy text-balance">{c.titulo}</h2>
                <p className="text-body leading-relaxed text-slate">{c.reto}</p>
                {c.resultado && (
                  <p className="border-l-4 border-teal pl-2 text-body leading-relaxed text-ink">
                    {c.resultado.texto}
                  </p>
                )}
                {service && (
                  <p className="text-caption text-slate">Servicio: {service.nombre}</p>
                )}
              </Link>
            )
          })}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h3 font-bold text-navy">
            Experiencia del equipo por dominio de operación
          </h2>
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
            {teamExperience.map((t) => (
              <div key={t.dominio} className="flex flex-col gap-1 border border-line bg-white p-2">
                <p className="text-body font-semibold text-navy">{t.dominio}</p>
                <p className="text-caption leading-relaxed text-slate">{t.descripcion}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
