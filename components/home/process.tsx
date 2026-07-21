import { cnt, promise, stages } from "@/content"
import { Section } from "@/components/ui/section"

const CNT_ITEMS = [
  { k: "Cultura", v: cnt.cultura },
  { k: "Negocio", v: cnt.negocio },
  { k: "Tecnología", v: cnt.tecnologia },
]

const PROMISE_ITEMS = [
  { k: "Capacidad", v: promise.capacidad },
  { k: "Retorno", v: promise.retorno },
  { k: "Riesgo", v: promise.riesgo },
]

// Resúmenes cortos para la lente CNT (el texto completo vive en el contenido).
const CNT_SHORT: Record<string, string> = {
  Cultura: "¿Su gente está lista para trabajar con agentes?",
  Negocio: "¿Dónde genera valor medible la IA, no solo en la demo?",
  Tecnología: "¿Qué se integra hoy y qué hay que preparar primero?",
}

export function Process() {
  return (
    <Section
      id="proceso"
      eyebrow="Cómo trabajamos"
      title="Cuatro etapas con entregables verificables"
      intro="Cada etapa termina en algo que usted puede revisar y objetar. La lente CNT atraviesa todo el proceso."
      align="center"
    >
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stages.map((s) => (
          <li key={s.n} className="hst-card hst-card-hover relative flex flex-col gap-2 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-body font-bold text-white">
                {s.n}
              </span>
              <h3 className="text-h3 font-bold text-navy">{s.nombre}</h3>
            </div>
            <p className="text-caption leading-relaxed text-slate">{s.descripcion}</p>
            <p className="mt-auto border-t border-line pt-2 text-caption text-ink">
              <span className="font-semibold text-teal-dark">Entregable: </span>
              {s.entregable}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="hst-card p-4">
          <h3 className="mb-3 text-h3 font-bold text-navy">La lente CNT</h3>
          <ul className="flex flex-col gap-2.5">
            {CNT_ITEMS.map((item) => (
              <li key={item.k} className="flex gap-3">
                <span className="mt-0.5 w-24 shrink-0 rounded-md bg-teal-soft px-2 py-0.5 text-center text-caption font-semibold uppercase tracking-wide text-teal-dark">
                  {item.k}
                </span>
                <span className="text-caption leading-relaxed text-slate">{CNT_SHORT[item.k]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-navy p-4 text-white">
          <div aria-hidden className="hst-grid absolute inset-0 opacity-60" />
          <div className="relative">
            <h3 className="mb-3 text-h3 font-bold">Promesa responsable</h3>
            <ul className="flex flex-col gap-2.5">
              {PROMISE_ITEMS.map((item) => (
                <li key={item.k} className="text-caption leading-relaxed text-line">
                  <span className="font-semibold text-teal">{item.k}. </span>
                  {item.v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
