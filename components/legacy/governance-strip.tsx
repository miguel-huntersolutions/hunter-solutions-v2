import Link from "next/link"
import { ShieldCheck, Eye, Boxes, ArrowRight } from "lucide-react"
import { governance } from "@/content"
import { Section } from "@/components/ui/section"

const icons = [ShieldCheck, Eye, Boxes, ShieldCheck, Eye]

export function GovernanceStrip() {
  const highlights = [...governance.observabilidad.slice(0, 3), ...governance.arquitectura.slice(3, 5)]
  return (
    <Section
      id="gobernanza"
      eyebrow="Gobernanza de IA"
      title="El riesgo se gobierna, no se promete que no existe"
      intro={governance.propiedadDelActivo}
      tone="navy"
    >
      <dl className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div
              key={h.termino}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-teal/50"
            >
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/15 text-teal">
                <Icon size={20} aria-hidden />
              </span>
              <dt className="text-body font-semibold text-white">{h.termino}</dt>
              <dd className="mt-1 text-caption leading-relaxed text-line">{h.beneficio}</dd>
            </div>
          )
        })}
        <Link
          href="/gobernanza"
          className="group flex flex-col justify-between rounded-xl border border-teal/40 bg-teal/10 p-5 transition-colors hover:bg-teal/20"
        >
          <span className="text-body font-semibold text-white">
            Arquitectura, guardrails y metodología
          </span>
          <span className="mt-3 flex items-center gap-1.5 text-caption font-semibold uppercase tracking-wide text-teal">
            Ver gobernanza completa
            <ArrowRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </dl>
    </Section>
  )
}
