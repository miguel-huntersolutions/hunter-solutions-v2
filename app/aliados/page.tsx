import type { Metadata } from "next"
import { partners } from "@/content"
import { PartnerForm } from "@/components/forms/partner-form"

const description =
  "Refiera oportunidades de IA en empresas medianas, Hunter Solutions Tech las ejecuta y usted participa del resultado."

export const metadata: Metadata = {
  title: "Programa de Aliados",
  description,
  alternates: { canonical: "/aliados" },
  openGraph: { url: "/aliados", title: "Programa de Aliados", description },
}

export default function AliadosPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-2 py-8 md:px-3 md:py-10">
        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Programa de Aliados
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Usted abre la puerta, nosotros ejecutamos, ambos ganamos
          </h1>
          <p className="text-body-lg leading-relaxed text-slate">{partners.queEs}</p>
        </header>

        <section className="flex max-w-[70ch] flex-col gap-2 border-l-4 border-teal bg-white p-3">
          <h2 className="text-h3 font-bold text-navy">Para quién es</h2>
          <p className="text-body leading-relaxed text-ink">{partners.paraQuien}</p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h3 font-bold text-navy">El proceso, paso a paso</h2>
          <ol className="grid gap-2 md:grid-cols-4">
            {partners.pasos.map((p) => (
              <li key={p.n} className="flex flex-col gap-1 border border-line bg-white p-2">
                <span className="text-caption font-semibold uppercase tracking-wide text-teal">
                  Paso {p.n}: {p.titulo}
                </span>
                <span className="text-body leading-relaxed text-ink">{p.descripcion}</span>
              </li>
            ))}
          </ol>
          <p className="max-w-[70ch] text-caption leading-relaxed text-slate">
            Las condiciones de participación se acuerdan por escrito con cada aliado antes de la
            primera oportunidad referida.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h3 font-bold text-navy">Postúlese</h2>
          <PartnerForm />
        </section>
      </div>
    </div>
  )
}
