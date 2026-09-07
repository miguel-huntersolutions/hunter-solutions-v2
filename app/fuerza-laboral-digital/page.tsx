import type { Metadata } from "next"
import Link from "next/link"
import { Check, X } from "lucide-react"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"

const description =
  "Qué es una Fuerza Laboral Digital: agentes de IA que se conectan a su ERP y operan procesos completos con supervisión humana. En qué se diferencia de las automatizaciones aisladas y de los chatbots."

export const metadata: Metadata = {
  title: "Fuerza Laboral Digital: agentes de IA que operan sus procesos",
  description,
  alternates: { canonical: "/fuerza-laboral-digital" },
  openGraph: {
    url: "/fuerza-laboral-digital",
    title: "Fuerza Laboral Digital: agentes de IA que operan sus procesos",
    description,
  },
}

// FAQ propia de esta página pilar (distinta de las 6 preguntas comerciales de la home).
const pillarFaqs = [
  {
    pregunta: "¿Qué es exactamente una Fuerza Laboral Digital?",
    respuesta:
      "Es un conjunto de agentes de IA que operan procesos completos de su empresa, conectados a sus sistemas y con supervisión humana. Se gobierna como una nómina de personas: cada agente tiene un rol definido, una responsabilidad y trazabilidad de lo que hace.",
  },
  {
    pregunta: "¿En qué se diferencia de una automatización tradicional?",
    respuesta:
      "Una automatización sigue reglas fijas y se rompe cuando aparece una excepción. Un agente interpreta el contexto, decide con las reglas de su negocio y escala a una persona cuando el caso lo amerita. La automatización ejecuta un paso; el agente opera el proceso de principio a fin.",
  },
  {
    pregunta: "¿No es lo mismo que un chatbot?",
    respuesta:
      "No. Un chatbot conversa y responde preguntas, pero no ejecuta. Un agente de la Fuerza Laboral Digital se conecta a su ERP, actúa sobre sus datos y completa la tarea: genera el documento, concilia la cuenta o agenda la cita, no solo informa cómo hacerlo.",
  },
  {
    pregunta: "¿Cómo se mantiene el control con supervisión humana?",
    respuesta:
      "Las decisiones sensibles pasan por aprobación de una persona antes de ejecutarse. El agente propone y la organización dispone. Además, cada acción queda registrada con su fuente y su razón, de modo que siempre se puede auditar qué hizo el agente y por qué.",
  },
  {
    pregunta: "¿Necesito reemplazar mi ERP o mis sistemas actuales?",
    respuesta:
      "No. Los agentes se integran a los sistemas que ya usa, sin migraciones forzadas. La idea es sumar capacidad sobre su operación actual, no reconstruirla desde cero.",
  },
]

const level3 = [
  {
    slug: "fuerza-laboral-digital",
    nombre: "Fuerza Laboral Digital",
    resumen: "El programa completo: un equipo de agentes operando varios procesos de su empresa.",
  },
  {
    slug: "orquestacion-de-procesos-end-to-end",
    nombre: "Orquestación de procesos end to end",
    resumen: "Varios agentes coordinados para operar un proceso completo de punta a punta.",
  },
  {
    slug: "integracion-de-ia-con-el-erp",
    nombre: "Integración de IA con el ERP",
    resumen: "Conectamos los agentes a su ERP para que actúen sobre sus datos reales.",
  },
]

const comparison = [
  {
    dimension: "Qué hace",
    agente: "Opera un proceso completo y ejecuta acciones",
    automatizacion: "Ejecuta un paso fijo y repetitivo",
    chatbot: "Conversa y responde preguntas",
  },
  {
    dimension: "Ante una excepción",
    agente: "Interpreta el contexto y decide o escala a una persona",
    automatizacion: "Se detiene o falla",
    chatbot: "Deriva a un humano o repite el guion",
  },
  {
    dimension: "Conexión a sus sistemas",
    agente: "Se integra al ERP y actúa sobre sus datos",
    automatizacion: "Conexiones puntuales entre dos sistemas",
    chatbot: "Normalmente aislado del backoffice",
  },
  {
    dimension: "Supervisión y trazabilidad",
    agente: "Supervisión humana y registro de cada decisión",
    automatizacion: "Logs técnicos, sin criterio de negocio",
    chatbot: "Historial de conversación",
  },
  {
    dimension: "Cómo se gestiona",
    agente: "Como un colaborador: rol, responsabilidad y mejora continua",
    automatizacion: "Como un script que hay que mantener",
    chatbot: "Como un canal de atención",
  },
]

export default function FuerzaLaboralDigitalPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pillarFaqs.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      {
        "@type": "ListItem",
        position: 2,
        name: "Fuerza Laboral Digital",
        item: absoluteUrl("/fuerza-laboral-digital"),
      },
    ],
  }

  return (
    <div className="bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
      />

      <div className="mx-auto flex max-w-[820px] flex-col gap-8 px-2 py-8 md:py-12">
        {/* Breadcrumb visible */}
        <nav aria-label="Ruta de navegación" className="text-caption text-slate">
          <Link href="/" className="underline hover:text-teal">
            Inicio
          </Link>
          <span aria-hidden className="mx-1.5">
            /
          </span>
          <span className="text-navy">Fuerza Laboral Digital</span>
        </nav>

        <header className="flex flex-col gap-3">
          <p className="text-caption font-semibold uppercase tracking-wide text-teal">
            El concepto, explicado
          </p>
          <h1 className="text-h1 font-bold text-navy text-balance">
            Fuerza Laboral Digital: agentes de IA que operan sus procesos, no solo los conversan
          </h1>
          {/* BLUF: respuesta directa en el primer párrafo */}
          <p className="text-lead leading-relaxed text-ink">
            Una Fuerza Laboral Digital es un equipo de agentes de IA que se conectan a su ERP y
            operan procesos completos de la empresa con supervisión humana. A diferencia de una
            automatización, que ejecuta un paso fijo, o de un chatbot, que solo responde preguntas,
            estos agentes deciden con las reglas de su negocio y ejecutan la tarea de principio a
            fin. En corto: no le explican cómo hacer el trabajo, lo hacen y le rinden cuentas.
          </p>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Es una nómina de agentes que trabajan, no una herramienta que consultan
          </h2>
          <p className="text-body leading-relaxed text-ink">
            Piense en su nómina de personas: cada quien tiene un rol, una responsabilidad y responde
            por sus resultados. La Fuerza Laboral Digital funciona igual. Cada agente recibe un rol
            claro, opera un proceso concreto y deja registro de lo que hizo. Usted suma capacidad
            operativa sin sumar carga a su equipo, y libera a las personas para el trabajo que
            requiere criterio, relaciones y decisiones.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Se diferencia de una automatización porque decide, no solo repite
          </h2>
          <p className="text-body leading-relaxed text-ink">
            Una automatización tradicional sigue una regla fija: cuando ocurre A, haz B. Es útil,
            pero frágil, porque cualquier excepción la detiene y obliga a que alguien intervenga. Un
            agente interpreta el contexto de cada caso, aplica las reglas de su negocio y, cuando la
            situación lo exige, escala a una persona en lugar de romperse. Por eso opera procesos
            reales, con sus matices, y no solo tareas mecánicas.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Se diferencia de un chatbot porque ejecuta, no solo conversa
          </h2>
          <p className="text-body leading-relaxed text-ink">
            Un chatbot vive en la conversación: responde dudas y orienta, pero deja el trabajo en
            manos de quien pregunta. Un agente de la Fuerza Laboral Digital actúa: genera la
            cotización, concilia la cuenta, prepara el borrador o agenda la cita, y lo hace sobre
            sus sistemas reales. La conversación es apenas la superficie; el valor está en la acción
            completada.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Comparación directa: agente, automatización y chatbot
          </h2>
          <p className="text-body leading-relaxed text-ink">
            La misma tarea puede parecer cubierta por las tres opciones, pero el alcance y el control
            son muy distintos. Esta es la diferencia, dimensión por dimensión.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                Comparación entre un agente de la Fuerza Laboral Digital, una automatización
                tradicional y un chatbot
              </caption>
              <thead>
                <tr className="border-b-2 border-navy">
                  <th scope="col" className="p-3 text-caption font-semibold uppercase tracking-wide text-slate">
                    Dimensión
                  </th>
                  <th scope="col" className="bg-navy p-3 text-body font-bold text-white">
                    Agente (Fuerza Laboral Digital)
                  </th>
                  <th scope="col" className="p-3 text-body font-bold text-navy">
                    Automatización
                  </th>
                  <th scope="col" className="p-3 text-body font-bold text-navy">
                    Chatbot
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.dimension} className="border-b border-line align-top">
                    <th scope="row" className="p-3 text-body font-semibold text-navy">
                      {row.dimension}
                    </th>
                    <td className="bg-teal-soft p-3 text-body leading-relaxed text-ink">
                      <span className="flex items-start gap-2">
                        <Check size={18} className="mt-0.5 shrink-0 text-teal-dark" aria-hidden />
                        {row.agente}
                      </span>
                    </td>
                    <td className="p-3 text-body leading-relaxed text-slate">{row.automatizacion}</td>
                    <td className="p-3 text-body leading-relaxed text-slate">
                      <span className="flex items-start gap-2">
                        <X size={18} className="mt-0.5 shrink-0 text-slate" aria-hidden />
                        {row.chatbot}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Se conecta a su ERP y opera el proceso de principio a fin
          </h2>
          <p className="text-body leading-relaxed text-ink">
            El valor real aparece cuando los agentes actúan sobre sus datos, no sobre una copia
            aislada. Integramos la Fuerza Laboral Digital a su ERP y a sus reglas de negocio, de modo
            que cada agente lee la información correcta, ejecuta la acción y deja constancia. Así se
            ve en la práctica:
          </p>
          <ol className="flex flex-col gap-2">
            {[
              {
                titulo: "Conexión al ERP y a sus fuentes de datos",
                descripcion:
                  "El agente accede a la misma información con la que trabaja su equipo, con los permisos que usted define.",
              },
              {
                titulo: "Decisión con las reglas de su negocio",
                descripcion:
                  "Aplica sus políticas, sus plantillas y sus criterios, no una lógica genérica de fábrica.",
              },
              {
                titulo: "Ejecución de la tarea completa",
                descripcion:
                  "Genera el documento, concilia, actualiza el registro o agenda: cierra el proceso, no solo un paso.",
              },
              {
                titulo: "Supervisión humana en lo sensible",
                descripcion:
                  "Las decisiones de mayor riesgo pasan por aprobación de una persona antes de ejecutarse.",
              },
              {
                titulo: "Trazabilidad de cada acción",
                descripcion:
                  "Queda registro de qué hizo, con qué datos y por qué, para auditar y mejorar con el tiempo.",
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
          <h2 className="text-h2 font-bold text-navy text-balance">
            Cómo se contrata: los servicios de Nivel 3 que la hacen realidad
          </h2>
          <p className="text-body leading-relaxed text-ink">
            La Fuerza Laboral Digital se construye con nuestros servicios de mayor alcance. Cada uno
            resuelve una parte del camino, desde la integración con sus sistemas hasta la
            orquestación de procesos completos.
          </p>
          <div className="grid gap-2 md:grid-cols-3">
            {level3.map((s) => (
              <Link
                key={s.slug}
                href={`/servicios/${s.slug}`}
                className="group flex flex-col gap-1 border border-line bg-white p-3 transition-colors hover:border-teal"
              >
                <span className="text-body font-semibold text-navy group-hover:text-teal-dark">
                  {s.nombre}
                </span>
                <span className="text-caption leading-relaxed text-slate">{s.resumen}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-h2 font-bold text-navy text-balance">
            Preguntas frecuentes sobre la Fuerza Laboral Digital
          </h2>
          <div className="flex flex-col">
            {pillarFaqs.map((f) => (
              <details key={f.pregunta} className="group border-b border-line bg-white">
                <summary className="cursor-pointer list-none p-3 text-body font-semibold text-navy transition-colors hover:text-teal">
                  {f.pregunta}
                </summary>
                <p className="px-3 pb-3 text-body leading-relaxed text-slate">{f.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-l-4 border-teal bg-white p-4">
          <h2 className="text-h3 font-bold text-navy">Pruébela antes de decidir</h2>
          <p className="text-body leading-relaxed text-ink">
            La mejor forma de entender la Fuerza Laboral Digital es verla operar sobre un proceso
            suyo. Agende una conversación y le mostramos cómo se vería en su empresa.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/#contacto"
              className="bg-navy px-4 py-2 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
            >
              Agendar diagnóstico
            </Link>
            <Link href="/servicios" className="text-caption text-slate underline hover:text-teal">
              Ver todos los servicios
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
