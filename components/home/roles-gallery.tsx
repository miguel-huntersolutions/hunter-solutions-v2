import { FileText, CalendarCheck, Calculator } from "lucide-react"
import { roles } from "@/content"
import { Section } from "@/components/ui/section"

const ICONS = {
  cotizaciones: FileText,
  agendamiento: CalendarCheck,
  finanzas: Calculator,
} as const

export function RolesGallery() {
  return (
    <Section
      id="roles"
      eyebrow="Casos de uso"
      title="Qué roles puede cumplir su Fuerza Laboral Digital"
      intro="Estos son ejemplos de roles que la nómina digital cumple dentro de un proyecto, no productos sueltos con precio. Cada rol se implementa según su alcance, dentro de uno de los tres niveles de inversión."
      tone="white"
    >
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = ICONS[role.icono]
          return (
            <article
              key={role.id}
              className="flex flex-col gap-3 rounded-2xl border border-line bg-bg p-5 transition-colors hover:border-teal"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <Icon size={22} aria-hidden />
              </span>
              <h3 className="text-h3 font-bold text-navy text-balance">{role.nombre}</h3>
              <p className="text-body leading-relaxed text-slate">{role.descripcion}</p>
            </article>
          )
        })}
      </div>

      <p className="mt-5 max-w-[70ch] text-caption leading-relaxed text-slate">
        Así como su empresa tiene una nómina de personas, la Fuerza Laboral Digital suma estos roles
        a su operación. No se contratan por separado: se definen dentro del proyecto que mejor se
        ajusta a su necesidad.
      </p>
    </Section>
  )
}
