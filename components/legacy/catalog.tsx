import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatLevelRange, levels } from "@/content"
import { Section } from "@/components/ui/section"
import { InvestmentChart } from "@/components/legacy/investment-chart"

const LEVEL_BLURB: Record<number, string> = {
  1: "Primeros pasos con IA aplicada: una capacidad puntual y acotada para validar valor rápido.",
  2: "El nivel más elegido: un agente operando un proceso real, integrado a sus sistemas.",
  3: "Orquestación de procesos completos y capacidad digital que escala con su operación.",
}

export function Catalog() {
  return (
    <Section
      id="servicios"
      eyebrow="Catálogo por niveles"
      title="Tres niveles de inversión, rangos a la vista"
      intro="Rangos de referencia en COP, sin IVA. Cada proyecto se cotiza según su alcance; los rangos existen para que conozca el orden de magnitud antes de conversar."
      tone="white"
    >
      <div className="mb-8">
        <InvestmentChart />
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-3">
        {levels.map((level) => {
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
                  <span className="absolute right-4 top-4 -mt-[26px] rounded-full bg-teal px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                    Más elegido
                  </span>
                )}
                <h3 className="text-h3 font-bold">{level.nombre}</h3>
                <p className="mt-2 text-h2 font-bold text-teal">{formatLevelRange(level.id)}</p>
                <p className="mt-1 text-caption text-line">Sin IVA · {level.nota}</p>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-caption leading-relaxed text-slate">{LEVEL_BLURB[level.id]}</p>
                <Link
                  href="/servicios"
                  className="mt-auto inline-flex items-center gap-1.5 pt-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:text-teal"
                >
                  Ver servicios de este nivel
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </div>
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
          href="/#diagnostico"
          className="rounded-lg border border-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
        >
          ¿No sabe qué nivel necesita? Use el recomendador
        </Link>
      </div>
    </Section>
  )
}
