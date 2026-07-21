"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
import { levels } from "@/content"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"

// Datos reales del catálogo (COP, sin IVA). El Nivel 3 es "desde", por eso
// su tope se muestra como referencia abierta.
function fmt(n: number) {
  return `$${(n / 1_000_000).toLocaleString("es-CO")}M`
}

const data = levels.map((l) => {
  const esUltimo = l.id === levels.length
  return {
    nivel: (l.nombre.split(" · ")[1] ?? l.nombre).toUpperCase(),
    // Tope de cada nivel, en millones, para dimensionar la barra.
    tope: l.rangoMax / 1_000_000,
    etiqueta: esUltimo ? `desde ${fmt(l.rangoMin)}` : `${fmt(l.rangoMin)} – ${fmt(l.rangoMax)}`,
  }
})

const config = {
  tope: { label: "Rango de inversión", color: "var(--chart-1)" },
} satisfies ChartConfig

export function InvestmentChart() {
  return (
    <div className="hst-card p-5">
      <p className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
        Rangos de inversión por nivel
      </p>
      <p className="mt-1 mb-4 text-caption leading-relaxed text-slate">
        En millones de pesos colombianos (COP), sin IVA. Cada proyecto se cotiza según su alcance.
      </p>
      <ChartContainer config={config} className="h-[220px] w-full">
        <BarChart
          accessibilityLayer
          data={data}
          layout="vertical"
          margin={{ top: 4, bottom: 4, left: 4, right: 96 }}
        >
          <XAxis type="number" hide domain={[0, 220]} />
          <YAxis
            type="category"
            dataKey="nivel"
            tickLine={false}
            axisLine={false}
            width={96}
            tick={{ fill: "var(--color-navy)", fontSize: 13, fontWeight: 700 }}
          />
          <Bar dataKey="tope" fill="var(--color-teal)" radius={[6, 6, 6, 6]}>
            <LabelList
              dataKey="etiqueta"
              position="right"
              offset={12}
              className="fill-navy"
              fontSize={13}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
