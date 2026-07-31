import type { Metadata } from "next"
import Link from "next/link"
import { governance, stages } from "@/content"
import { absoluteUrl } from "@/lib/seo"
import { Logo } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "Gobernanza e ingeniería",
  description:
    "Cómo Hunter Solutions Tech construye IA gobernada: arquitectura, observabilidad, guardrails, trazabilidad, supervisión humana y propiedad del activo. Documento completo, imprimible y sin formularios.",
  alternates: { canonical: absoluteUrl("/gobernanza") },
}

export default function GobernanzaPage() {
  const fecha = new Date().toISOString().slice(0, 10)

  return (
    <main className="bg-bg print:bg-white">
      <div className="mx-auto flex max-w-[820px] flex-col gap-6 px-2 py-8 md:py-10">
        {/* Encabezado de impresión (E10-S4) */}
        <div className="hidden items-center justify-between border-b border-line pb-2 print:flex">
          <Logo variant="claro" height={40} />
          <p className="text-caption text-slate">
            {absoluteUrl("/gobernanza")} · {fecha}
          </p>
        </div>

        <header className="flex flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Documento para el comprador técnico
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Gobernanza e ingeniería: cómo se construye y se controla lo que entregamos
          </h1>
          <p className="text-body-lg leading-relaxed text-slate">
            Este documento está pensado para reenviarse tal cual a un CIO o a un líder técnico. No
            hay formulario ni captura de correo: imprima o comparta la URL.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Arquitectura</h2>
          <dl className="flex flex-col gap-2">
            {governance.arquitectura.map((item) => (
              <div key={item.termino} className="border border-line bg-white p-3 print:border-line">
                <dt className="text-body font-semibold text-navy">{item.termino}</dt>
                <dd className="mt-1 text-body leading-relaxed text-ink">{item.beneficio}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Observabilidad y control</h2>
          <dl className="flex flex-col gap-2">
            {governance.observabilidad.map((item) => (
              <div key={item.termino} className="border border-line bg-white p-3">
                <dt className="text-body font-semibold text-navy">{item.termino}</dt>
                <dd className="mt-1 text-body leading-relaxed text-ink">{item.beneficio}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Metodología en cuatro etapas</h2>
          <p className="text-body leading-relaxed text-ink">{governance.metodologia}</p>
          <ol className="grid gap-2 md:grid-cols-2">
            {stages.map((s) => (
              <li key={s.n} className="flex flex-col gap-1 border border-line bg-white p-2">
                <span className="text-caption font-semibold uppercase tracking-wide text-teal">
                  Etapa {s.n}: {s.nombre}
                </span>
                <span className="text-body leading-relaxed text-ink">{s.descripcion}</span>
                <span className="text-caption text-slate">Entregable: {s.entregable}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-2 border-l-4 border-teal bg-white p-3">
          <h2 className="text-h2 font-bold text-navy">Propiedad del activo</h2>
          <p className="text-body leading-relaxed text-ink">{governance.propiedadDelActivo}</p>
        </section>

        <footer className="flex flex-wrap items-center gap-3 border-t border-line pt-3 print:hidden">
          <Link
            href="/#contacto"
            className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
          >
            Agendar sesión técnica
          </Link>
          <Link href="/" className="text-caption text-slate underline">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </main>
  )
}
