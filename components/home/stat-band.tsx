import { Layers, Compass, ShieldCheck, Building2 } from "lucide-react"
import { levels, sectors, services, stages } from "@/content"

const ICONS = [Compass, Layers, ShieldCheck, Building2]

export function StatBand() {
  const stats = [
    { value: `${services.length}`, label: "Servicios en catálogo, con rangos a la vista" },
    { value: `${stages.length}`, label: "Etapas con entregables que usted puede objetar" },
    { value: `${levels.length}`, label: "Niveles de inversión publicados, sin IVA" },
    { value: `${sectors.length}`, label: "Sectores atendidos en empresas medianas" },
  ]
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px overflow-hidden px-2 py-8 md:px-3 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = ICONS[i]
          return (
            <div key={s.label} className="flex flex-col gap-2 px-2 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-soft text-teal-dark">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-display font-bold leading-none text-navy">{s.value}</span>
              <span className="text-caption leading-relaxed text-slate">{s.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
