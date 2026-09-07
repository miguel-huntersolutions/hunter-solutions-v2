import type { Metadata } from "next"
import Link from "next/link"
import { governance, stages, cnt, promise } from "@/content"
import { absoluteUrl } from "@/lib/seo"
import { Logo } from "@/components/brand/logo"

const description =
  "Cómo Hunter Solutions Tech construye IA gobernada: arquitectura, observabilidad, guardrails, trazabilidad, supervisión humana y propiedad del activo. Documento completo, imprimible y sin formularios."

export const metadata: Metadata = {
  title: "Gobernanza e ingeniería",
  description,
  alternates: { canonical: "/gobernanza" },
  openGraph: { url: "/gobernanza", title: "Gobernanza e ingeniería", description },
}

export default function GobernanzaPage() {
  const fecha = new Date().toISOString().slice(0, 10)

  return (
    <div className="bg-bg print:bg-white">
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

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Anatomía de un colaborador digital</h2>
          <p className="text-body leading-relaxed text-ink">
            Un agente se gestiona como un miembro del equipo, desde su rol hasta su crecimiento. Una
            nómina digital se gobierna como una de personas: con roles claros, supervisión y
            crecimiento.
          </p>
          <ol className="flex flex-col gap-2">
            {[
              {
                titulo: "Rol y responsabilidad",
                descripcion:
                  "Cada agente tiene una hoja de vida: un rol definido y una responsabilidad única.",
              },
              {
                titulo: "Onboarding",
                descripcion:
                  "Lo integramos a su ERP y a las reglas de su negocio, como a cualquier colaborador nuevo.",
              },
              {
                titulo: "Seguimiento",
                descripcion: "Observabilidad y trazabilidad: sabemos qué hizo, con qué datos y por qué.",
              },
              {
                titulo: "Acompañamiento",
                descripcion:
                  "Supervisión humana sobre las decisiones sensibles. El agente propone, la organización dispone.",
              },
              {
                titulo: "Crecimiento",
                descripcion: "Mejora continua: el agente evoluciona con su operación.",
              },
            ].map((paso, i) => (
              <li key={paso.titulo} className="flex gap-3 border border-line bg-white p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-caption font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-body font-semibold text-navy">{paso.titulo}</span>
                  <span className="text-body leading-relaxed text-ink">{paso.descripcion}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">La lente CNT</h2>
          <p className="text-body leading-relaxed text-ink">
            Antes de construir, miramos cada iniciativa por tres lentes: Cultura, Negocio y
            Tecnología. Así evitamos automatizar lo que no conviene todavía.
          </p>
          <dl className="flex flex-col gap-2">
            {[
              { k: "Cultura", v: cnt.cultura },
              { k: "Negocio", v: cnt.negocio },
              { k: "Tecnología", v: cnt.tecnologia },
            ].map((item) => (
              <div key={item.k} className="border border-line bg-white p-3">
                <dt className="text-body font-semibold text-navy">{item.k}</dt>
                <dd className="mt-1 text-body leading-relaxed text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Promesa responsable</h2>
          <dl className="flex flex-col gap-2">
            {[
              { k: "Capacidad", v: promise.capacidad },
              { k: "Retorno", v: promise.retorno },
              { k: "Riesgo", v: promise.riesgo },
            ].map((item) => (
              <div key={item.k} className="border border-line bg-white p-3">
                <dt className="text-body font-semibold text-navy">{item.k}</dt>
                <dd className="mt-1 text-body leading-relaxed text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>
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
    </div>
  )
}
