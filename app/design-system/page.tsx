import type { Metadata } from "next"
import { Logo } from "@/components/brand/logo"

export const metadata: Metadata = {
  title: "Design system (interno)",
  robots: { index: false, follow: false },
}

const COLORS = [
  { token: "navy", clase: "bg-navy", uso: "Color primario: fondos de peso, CTAs" },
  { token: "teal", clase: "bg-teal", uso: "Acento: acciones, focos, eyebrows" },
  { token: "ink", clase: "bg-ink", uso: "Texto principal y superficies oscuras" },
  { token: "slate", clase: "bg-slate", uso: "Texto secundario" },
  { token: "line", clase: "bg-line", uso: "Bordes y divisores" },
  { token: "bg", clase: "bg-bg", uso: "Fondo general" },
]

export default function DesignSystemPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-2 py-8 md:px-3 md:py-10">
        <header className="flex flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Referencia interna: noindex
          </p>
          <h1 className="text-h1 font-bold text-navy">Design system Hunter Solutions Tech</h1>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Paleta</h2>
          <div className="grid gap-2 md:grid-cols-3">
            {COLORS.map((c) => (
              <div key={c.token} className="border border-line bg-white">
                <div className={`h-10 ${c.clase}`} />
                <div className="p-2">
                  <p className="text-body font-semibold text-navy">--color-{c.token}</p>
                  <p className="text-caption text-slate">{c.uso}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Tipografía: Open Sans</h2>
          <div className="flex flex-col gap-2 border border-line bg-white p-3">
            <p className="text-h1 font-bold text-navy">H1: Titular de página</p>
            <p className="text-h2 font-bold text-navy">H2: Titular de sección</p>
            <p className="text-h3 font-bold text-navy">H3: Titular de tarjeta</p>
            <p className="text-body-lg leading-relaxed text-ink">Body large: párrafos de apoyo del hero.</p>
            <p className="text-body leading-relaxed text-ink">Body: texto corriente del sitio.</p>
            <p className="text-caption text-slate">Caption: metadatos, etiquetas y notas.</p>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Logo</h2>
          <div className="grid gap-2 md:grid-cols-3">
            <div className="flex items-center justify-center border border-line bg-white p-4">
              <Logo variant="claro" height={48} />
            </div>
            <div className="flex items-center justify-center border border-line bg-navy p-4">
              <Logo variant="negativo" height={48} />
            </div>
            <div className="flex items-center justify-center border border-line bg-bg p-4">
              <Logo variant="icono" height={48} />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Componentes base</h2>
          <div className="flex flex-wrap items-center gap-3 border border-line bg-white p-3">
            <button className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white hover:bg-teal">
              Botón primario
            </button>
            <button className="bg-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white">
              Botón acento
            </button>
            <button className="border border-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy">
              Botón secundario
            </button>
            <span className="border border-line bg-white px-2 py-1 text-caption text-slate">
              Etiqueta
            </span>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy">Imagen: do / don&apos;t</h2>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="border border-line bg-white p-3">
              <p className="text-body font-semibold text-navy">Sí</p>
              <ul className="mt-1 flex list-disc flex-col gap-1 pl-3 text-caption leading-relaxed text-ink">
                <li>Capturas reales de las herramientas y agentes del sitio</li>
                <li>Diagramas planos con la paleta corporativa</li>
                <li>Fotografía de contextos de trabajo reales, sin stock genérico</li>
              </ul>
            </div>
            <div className="border border-line bg-white p-3">
              <p className="text-body font-semibold text-navy">No</p>
              <ul className="mt-1 flex list-disc flex-col gap-1 pl-3 text-caption leading-relaxed text-ink">
                <li>Robots humanoides, cerebros brillantes o circuitos azules</li>
                <li>Degradados decorativos y blobs abstractos</li>
                <li>Emojis como iconografía</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
