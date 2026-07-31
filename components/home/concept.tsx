import { Users, Bot, Handshake } from "lucide-react"
import { Section } from "@/components/ui/section"

const columns = [
  {
    icon: Users,
    titulo: "Su gente",
    texto: "Criterio, relaciones, creatividad y decisiones que importan.",
  },
  {
    icon: Bot,
    titulo: "Sus agentes",
    texto: "Volumen, velocidad, consistencia y disponibilidad continua.",
  },
  {
    icon: Handshake,
    titulo: "Juntos",
    texto: "Más capacidad y menos carga operativa, sin crecer la nómina de personas.",
    destacado: true,
  },
]

export function Concept() {
  return (
    <Section
      id="fuerza-laboral"
      eyebrow="Fuerza Laboral Digital"
      title="Su nómina de personas ya existe. Le construimos la digital."
      intro="Así como su empresa tiene una nómina de personas, desarrollamos su nómina digital: colaboradores de IA que, como cualquier miembro del equipo, tienen un rol, se integran a sus sistemas y operan sus procesos con supervisión humana. No reemplazamos a su equipo, lo potenciamos."
      tone="white"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {columns.map((c) => {
          const Icon = c.icon
          return (
            <article
              key={c.titulo}
              className={`hst-card flex flex-col items-center gap-3 p-5 text-center ${
                c.destacado ? "border-teal bg-teal-soft" : ""
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  c.destacado ? "bg-teal text-white" : "bg-navy text-white"
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="text-h3 font-bold text-navy">{c.titulo}</h3>
              <p className="text-caption leading-relaxed text-slate">{c.texto}</p>
            </article>
          )
        })}
      </div>

      <div className="mx-auto mt-8 max-w-[64ch] border-l-4 border-teal bg-bg p-5">
        <p className="text-lead font-semibold leading-relaxed text-navy text-pretty">
          La IA no viene a quitar trabajo. Viene a devolverle a su equipo el tiempo para el trabajo
          que vale la pena.
        </p>
      </div>
    </Section>
  )
}
