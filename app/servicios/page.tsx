import type { Metadata } from "next"
import Link from "next/link"
import { formatLevelRange, levels, services } from "@/content"
import { Sectors } from "@/components/home/sectors"
import { EngagementModels } from "@/components/home/engagement-models"
import { Tools } from "@/components/home/tools"

const description =
  "Servicios de IA aplicada organizados en tres niveles de inversión, con rangos publicados en COP."

export const metadata: Metadata = {
  title: "Servicios y niveles de inversión",
  description,
  alternates: { canonical: "/servicios" },
  openGraph: { url: "/servicios", title: "Servicios y niveles de inversión", description },
}

export default function ServiciosPage() {
  return (
    <main className="bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-2 py-8 md:px-3 md:py-10">
        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">Catálogo</p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Servicios por niveles, con rangos publicados
          </h1>
          <p className="text-body-lg leading-relaxed text-slate">
            Cada servicio pertenece a un nivel de inversión con rango publicado en pesos
            colombianos, sin IVA. La cifra exacta se define en la propuesta según el alcance.
          </p>
        </header>

        {levels.map((level) => {
          const items = services.filter((s) => s.nivel === level.id)
          return (
            <section key={level.id} className="flex flex-col gap-3">
              <header className="flex flex-col gap-1">
                <h2 className="text-h2 font-bold text-navy">{level.nombre}</h2>
                <p className="text-body font-semibold text-teal">
                  {formatLevelRange(level.id)} <span className="font-normal text-slate">(sin IVA)</span>
                </p>
                <p className="max-w-[70ch] text-caption leading-relaxed text-slate">{level.nota}</p>
              </header>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link
                    key={s.id}
                    href={`/servicios/${s.slug}`}
                    className="flex flex-col gap-1 border border-line bg-white p-3 transition-colors hover:border-teal"
                  >
                    <span className="text-body font-semibold text-navy">{s.nombre}</span>
                    <span className="text-caption leading-relaxed text-slate">{s.descripcion}</span>
                    {s.esPuertaDeEntrada && (
                      <span className="mt-1 w-fit bg-teal px-1 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                        Puerta de entrada
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <section className="flex flex-col gap-3 border border-line bg-navy p-3 text-white md:flex-row md:items-center md:justify-between">
          <p className="max-w-[60ch] text-body leading-relaxed text-line">
            ¿No sabe por dónde empezar? El Recomendador de Nivel le sugiere el punto de entrada en
            cuatro preguntas, sin pedirle datos.
          </p>
          <Link
            href="/#recomendador"
            className="shrink-0 bg-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
          >
            Usar el Recomendador
          </Link>
        </section>
      </div>

      <Sectors />
      <EngagementModels />
      <Tools />
    </main>
  )
}
