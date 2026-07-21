import type { Metadata } from "next"
import Link from "next/link"
import { training } from "@/content"
import { absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Formación en IA para equipos",
  description:
    "Charlas ejecutivas y talleres prácticos de IA para comités directivos y equipos operativos. El material queda en su organización.",
  alternates: { canonical: absoluteUrl("/formacion") },
}

export default function FormacionPage() {
  return (
    <main className="bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-2 py-8 md:px-3 md:py-10">
        <header className="flex max-w-[70ch] flex-col gap-2">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">Formación</p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Formación en IA para equipos que van a convivir con agentes
          </h1>
          <p className="text-body-lg leading-relaxed text-slate">{training.paraQuien}</p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          {training.formatos.map((f) => (
            <div key={f.nombre} className="flex flex-col gap-2 border border-line bg-white p-3">
              <h2 className="text-h3 font-bold text-navy">{f.nombre}</h2>
              <p className="text-body leading-relaxed text-ink">{f.descripcion}</p>
            </div>
          ))}
        </section>

        <section className="flex max-w-[70ch] flex-col gap-2 border-l-4 border-teal bg-white p-3">
          <h2 className="text-h3 font-bold text-navy">Qué queda en su organización</h2>
          <p className="text-body leading-relaxed text-ink">{training.queQueda}</p>
        </section>

        <section className="flex flex-col gap-3 border border-line bg-navy p-3 text-white md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-[60ch] flex-col gap-1">
            <h2 className="text-h3 font-bold text-white">Cómo se agenda</h2>
            <p className="text-body leading-relaxed text-line">{training.comoSeAgenda}</p>
          </div>
          <Link
            href="/#contacto"
            className="shrink-0 bg-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white"
          >
            Agendar los 30 minutos
          </Link>
        </section>
      </div>
    </main>
  )
}
