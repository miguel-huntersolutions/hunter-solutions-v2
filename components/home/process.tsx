import { cnt, promise, stages } from "@/content"
import { Section } from "@/components/ui/section"

export function Process() {
  return (
    <Section
      id="proceso"
      eyebrow="Cómo trabajamos"
      title="Cuatro etapas con entregables verificables"
      intro="Cada etapa termina en algo que usted puede revisar y objetar. La lente CNT — cultura, negocio, tecnología — atraviesa todo el proceso."
    >
      <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <li key={s.n} className="flex flex-col gap-2 border border-line bg-white p-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-teal">
              Etapa {s.n}
            </p>
            <h3 className="text-h3 font-bold text-navy">{s.nombre}</h3>
            <p className="text-caption leading-relaxed text-slate">{s.descripcion}</p>
            <p className="mt-auto border-t border-line pt-2 text-caption text-ink">
              <span className="font-semibold">Entregable: </span>
              {s.entregable}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="border border-line bg-white p-3">
          <h3 className="mb-2 text-h3 font-bold text-navy">La lente CNT</h3>
          <ul className="flex flex-col gap-2">
            {[cnt.cultura, cnt.negocio, cnt.tecnologia].map((line) => (
              <li key={line} className="text-caption leading-relaxed text-slate">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-line bg-navy p-3 text-white">
          <h3 className="mb-2 text-h3 font-bold">Promesa responsable</h3>
          <ul className="flex flex-col gap-2">
            <li className="text-caption leading-relaxed text-line">
              <span className="font-semibold text-teal">Capacidad. </span>
              {promise.capacidad}
            </li>
            <li className="text-caption leading-relaxed text-line">
              <span className="font-semibold text-teal">Retorno. </span>
              {promise.retorno}
            </li>
            <li className="text-caption leading-relaxed text-line">
              <span className="font-semibold text-teal">Riesgo. </span>
              {promise.riesgo}
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
