"use client"

import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
import { levels } from "@/content"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
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
    nivel: l.nombre.split(" · ")[1] ?? l.nombre,
    min: l.rangoMin / 1_000_000,
    span: (l.rangoMax - l.rangoMin) / 1_000_000,
    rangoMin: l.rangoMin,
    rangoMax: l.rangoMax,
    esUltimo,
    etiqueta: esUltimo ? `Desde ${fmt(l.rangoMin)}` : `${fmt(l.rangoMin)} – ${fmt(l.rangoMax)}`,
  }
})

const config = {
  span: { label: "Rango de inversión", color: "var(--chart-1)" },
} satisfies ChartConfig

export function InvestmentChart() {
  return (
    <div className="hst-card p-4">
      <p className="text-caption font-semibold uppercase tracking-wide text-teal-dark">
        Rangos de inversión por nivel
      </p>
      <p className="mt-1 mb-4 text-caption leading-relaxed text-slate">
        En millones de pesos colombianos, sin IVA. Cada proyecto se cotiza según su alcance.
      </p>
      <ChartContainer config={config} className="aspect-[16/9] w-full">
        <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 8, right: 48 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="nivel"
            tickLine={false}
            axisLine={false}
            width={92}
            tick={{ fill: "var(--color-navy)", fontSize: 13, fontWeight: 600 }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideIndicator
                formatter={(_v, _n, item) => {
                  const p = item.payload as (typeof data)[number]
                  return p.esUltimo
                    ? `Desde ${fmt(p.rangoMin)}`
                    : `${fmt(p.rangoMin)} – ${fmt(p.rangoMax)}`
                }}
              />
            }
          />
          {/* Barra base invisible que desplaza el inicio del rango */}
          <Bar dataKey="min" stackId="a" fill="transparent" />
          <Bar dataKey="span" stackId="a" fill="var(--color-teal)" radius={[0, 6, 6, 0]} barSize={28}>
            <LabelList
              dataKey="etiqueta"
              position="right"
              offset={10}
              className="fill-navy"
              fontSize={12}
              fontWeight={600}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
