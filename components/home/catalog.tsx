import Link from "next/link"
import { formatLevelRange, levels, services } from "@/content"
import { Section } from "@/components/ui/section"

export function Catalog() {
  return (
    <Section
      id="servicios"
      eyebrow="Catálogo por niveles"
      title="Veinte servicios, tres niveles de inversión, rangos a la vista"
      intro="Rangos de referencia en COP, sin IVA. Cada proyecto se cotiza según su alcance; los rangos existen para que usted conozca el orden de magnitud antes de conversar."
      tone="white"
    >
      <div className="grid gap-3 lg:grid-cols-3">
        {levels.map((level) => {
          const levelServices = services.filter((s) => s.nivel === level.id)
          return (
            <div key={level.id} className="flex flex-col border border-line bg-bg">
              <div className="border-b border-line bg-navy p-3 text-white">
                <h3 className="text-h3 font-bold">{level.nombre}</h3>
                <p className="mt-1 text-h3 font-bold text-teal">{formatLevelRange(level.id)}</p>
                <p className="mt-1 text-caption text-line">Sin IVA · {level.nota}</p>
              </div>
              <ul className="flex flex-1 flex-col">
                {levelServices.map((s) => (
                  <li key={s.id} className="border-b border-line last:border-b-0">
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="flex flex-col gap-0.5 p-2 transition-colors hover:bg-white"
                    >
                      <span className="text-caption font-semibold text-navy">
                        {s.nombre}
                        {s.esPuertaDeEntrada && (
                          <span className="ml-1 bg-teal px-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                            Puerta de entrada
                          </span>
                        )}
                      </span>
                      <span className="text-caption leading-snug text-slate">{s.descripcion}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href="/servicios"
          className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
        >
          Ver el catálogo completo
        </Link>
        <Link
          href="/#recomendador"
          className="border border-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
        >
          ¿No sabe qué nivel necesita? Use el recomendador
        </Link>
      </div>
    </Section>
  )
}
