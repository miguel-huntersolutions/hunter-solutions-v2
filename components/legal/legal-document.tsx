import { brand } from "@/content/brand"
import type { LegalDoc } from "@/content/legal"

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article className="mx-auto flex max-w-[70ch] flex-col gap-5 px-2 py-8 md:py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-h1 font-bold text-navy text-balance">{doc.titulo}</h1>
        <p className="text-caption text-slate">Última actualización: {doc.actualizado}</p>
        {doc.borrador && (
          <p className="border border-line bg-white px-2 py-1 text-caption text-slate">
            Documento en revisión: este texto es un borrador operativo y está pendiente de
            ratificación por el equipo legal. Para cualquier consulta escriba a{" "}
            <a href={`mailto:${brand.email}`} className="underline">
              {brand.email}
            </a>
            .
          </p>
        )}
      </header>
      {doc.secciones.map((s) => (
        <section key={s.titulo} className="flex flex-col gap-2">
          <h2 className="text-h3 font-bold text-navy">{s.titulo}</h2>
          {s.parrafos.map((p, i) => (
            <p key={i} className="text-body leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  )
}
