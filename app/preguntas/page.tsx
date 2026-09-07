import type { Metadata } from "next"
import Link from "next/link"
import { faqs } from "@/content"

const description =
  "Las preguntas que nos hacen antes de empezar: cómo trabajamos, qué se necesita, cómo se mide el retorno y cómo se gobierna el riesgo en Hunter Solutions Tech."

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description,
  alternates: { canonical: "/preguntas" },
  openGraph: { url: "/preguntas", title: "Preguntas frecuentes", description },
}

export default function PreguntasPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto flex max-w-[820px] flex-col gap-6 px-2 py-8 md:py-10">
        <header className="flex flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            Preguntas frecuentes
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Las preguntas que nos hacen antes de empezar
          </h1>
          <p className="text-lead leading-relaxed text-slate">
            Respuestas directas a lo que más nos consultan sobre cómo trabajamos, qué se necesita y
            cómo medimos el valor.
          </p>
        </header>

        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.pregunta} className="group border-b border-line bg-white">
              <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
                {f.pregunta}
              </summary>
              <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
            </details>
          ))}
        </div>

        <footer className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <Link
            href="/#contacto"
            className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
          >
            Agendar diagnóstico
          </Link>
          <Link href="/" className="text-caption text-slate underline">
            Volver al inicio
          </Link>
        </footer>
      </div>
    </div>
  )
}
