import Link from "next/link"
import { governance } from "@/content"
import { Section } from "@/components/ui/section"

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
      <dl className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.termino} className="border border-slate p-3">
            <dt className="text-caption font-semibold uppercase tracking-wide text-teal">
              {h.termino}
            </dt>
            <dd className="mt-1 text-caption leading-relaxed text-line">{h.beneficio}</dd>
          </div>
        ))}
        <div className="flex items-center border border-teal p-3">
          <Link
            href="/gobernanza"
            className="text-caption font-semibold uppercase tracking-wide text-white underline decoration-teal underline-offset-4 hover:text-teal"
          >
            Ver la gobernanza completa: arquitectura, guardrails y metodología
          </Link>
        </div>
      </dl>
    </Section>
  )
}
