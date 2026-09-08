import type { Metadata } from "next"
import Link from "next/link"
import { differentiators, positioning, teamExperience } from "@/content"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Qué nos diferencia: el activo queda en su empresa, sabemos operarlo y la promesa es responsable, con precios de referencia publicados.",
  alternates: { canonical: "/nosotros" },
}

/**
 * Los ocho diferenciadores salieron de la home en el Prompt 1. Aquí se reagrupan
 * en tres ideas: ocho razones sueltas se leen como ninguna. Los títulos y los
 * textos siguen saliendo del content model; esta página solo decide el orden.
 */
const GRUPOS = [
  {
    titulo: "El activo es suyo",
    intro: "Lo que construimos queda en su empresa, sin ataduras de proveedor ni de modelo.",
    titulos: ["El activo es del cliente", "Independencia de modelo", "Despliegue donde usted decida"],
  },
  {
    titulo: "Sabemos operarlo",
    intro: "No venimos de vender software: venimos de operar los procesos que ahora automatizamos.",
    titulos: ["AI-Native de origen", "Experiencia real del equipo", "Lente CNT"],
  },
  {
    titulo: "Promesa responsable",
    intro: "Lo que se garantiza y lo que se proyecta se dicen por separado, y los rangos están a la vista.",
    titulos: ["Promesa responsable", "Precios de referencia publicados"],
  },
] as const

export default function NosotrosPage() {
  return (
    <div className="bg-bg">
      <header className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden className="hst-grid absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex max-w-[900px] flex-col gap-3 px-2 py-10 md:px-3 md:py-14">
          <span className="text-caption font-semibold uppercase tracking-[0.2em] text-teal">
            Nosotros
          </span>
          <h1 className="text-h1 font-extrabold leading-[1.1] text-white text-balance">
            Por qué Hunter Solutions Tech
          </h1>
          <p className="max-w-[62ch] text-lead leading-relaxed text-line">
            Tres ideas explican cómo trabajamos y qué queda en su empresa cuando terminamos.
          </p>
        </div>
      </header>

      <div className="mx-auto flex max-w-[900px] flex-col gap-10 px-2 py-10 md:px-3 md:py-12">
        {GRUPOS.map((grupo, i) => {
          const items = grupo.titulos
            .map((t) => differentiators.find((d) => d.titulo === t))
            .filter((d): d is NonNullable<typeof d> => Boolean(d))
          return (
            <section key={grupo.titulo} className="flex flex-col gap-4">
              <div className="border-b-2 border-navy pb-2">
                <span className="text-caption font-bold uppercase tracking-[0.2em] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-h2 font-bold text-navy text-balance">{grupo.titulo}</h2>
              </div>
              <p className="max-w-[62ch] text-body leading-relaxed text-ink">{grupo.intro}</p>
              <div className="grid gap-3 md:grid-cols-3">
                {items.map((d) => (
                  <article key={d.titulo} className="flex flex-col gap-2 border border-line bg-white p-4">
                    <h3 className="text-caption font-bold uppercase tracking-wide text-navy">
                      {d.titulo}
                    </h3>
                    <p className="text-caption leading-relaxed text-slate">{d.descripcion}</p>
                  </article>
                ))}
              </div>
            </section>
          )
        })}

        <section className="flex flex-col gap-4">
          <div className="border-b-2 border-navy pb-2">
            <h2 className="text-h2 font-bold text-navy text-balance">{positioning.nuevosTitulo}</h2>
          </div>
          <p className="max-w-[62ch] text-body leading-relaxed text-ink">
            {positioning.nuevosArgumento}
          </p>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {teamExperience.map((t) => (
              <article key={t.dominio} className="border-l-4 border-teal bg-white p-3">
                <h3 className="text-caption font-bold text-navy">{t.dominio}</h3>
                <p className="mt-1 text-caption leading-relaxed text-slate">{t.descripcion}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-l-4 border-teal bg-navy p-5 text-white">
          <h2 className="text-h3 font-bold text-white">¿Lo vemos con su operación?</h2>
          <p className="mt-2 max-w-[58ch] text-body leading-relaxed text-line">
            Salimos de la sesión con dos o tres oportunidades concretas y por dónde empezar.
          </p>
          <Link
            href="/#contacto"
            className="mt-4 inline-flex min-h-[48px] items-center bg-teal px-5 py-3 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal-dark"
          >
            Agendar diagnóstico de 30 minutos, sin costo
          </Link>
        </footer>
      </div>
    </div>
  )
}
