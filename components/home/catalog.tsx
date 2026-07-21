import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { formatLevelRange, levels, services } from "@/content"
import { Section } from "@/components/ui/section"
import { InvestmentChart } from "@/components/home/investment-chart"

export function Catalog() {
  return (
    <Section
      id="servicios"
      eyebrow="Catálogo por niveles"
      title="Veinte servicios, tres niveles de inversión, rangos a la vista"
      intro="Rangos de referencia en COP, sin IVA. Cada proyecto se cotiza según su alcance; los rangos existen para que conozca el orden de magnitud antes de conversar."
      tone="white"
    >
      <div className="mb-8">
        <InvestmentChart />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-3">
        {levels.map((level) => {
          const levelServices = services.filter((s) => s.nivel === level.id)
          const destacado = level.id === 2
          return (
            <div
              key={level.id}
              className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg ${
                destacado ? "border-teal ring-1 ring-teal lg:-mt-3" : "border-line"
              }`}
            >
              <div className="relative bg-navy p-5 text-white">
                {destacado && (
                  <span className="absolute right-4 top-4 rounded-full bg-teal px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Más elegido
                  </span>
                )}
                <h3 className="text-h3 font-bold">{level.nombre}</h3>
                <p className="mt-2 text-h2 font-bold text-teal">{formatLevelRange(level.id)}</p>
                <p className="mt-1 text-caption text-line">Sin IVA · {level.nota}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-1 p-3">
                {levelServices.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="flex gap-2 rounded-lg p-2 transition-colors hover:bg-bg"
                    >
                      <Check size={16} aria-hidden className="mt-0.5 shrink-0 text-teal" />
                      <span className="flex flex-col gap-0.5">
                        <span className="text-caption font-semibold text-navy">
                          {s.nombre}
                          {s.esPuertaDeEntrada && (
                            <span className="ml-1 rounded-full bg-teal/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-teal-dark">
                              Puerta de entrada
                            </span>
                          )}
                        </span>
                        <span className="text-caption leading-snug text-slate">{s.descripcion}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
        >
          Ver el catálogo completo
          <ArrowRight size={16} aria-hidden />
        </Link>
        <Link
          href="/#recomendador"
          className="rounded-lg border border-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
        >
          ¿No sabe qué nivel necesita? Use el recomendador
        </Link>
      </div>
    </Section>
  )
}
