import { Users } from "lucide-react"

export function DigitalWorkforce() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-[1200px] px-2 py-10 md:px-3">
        <div className="flex items-start gap-4 border border-line border-l-4 border-l-teal bg-bg p-5 md:p-6">
          <span
            aria-hidden
            className="hidden h-11 w-11 shrink-0 items-center justify-center bg-teal-soft text-teal-dark sm:flex"
          >
            <Users className="h-6 w-6" />
          </span>
          <div className="flex flex-col gap-2">
            <h2 className="text-h2 font-bold text-balance text-navy">
              Su nómina de personas ya existe. Le construimos la digital.
            </h2>
            <p className="max-w-[70ch] text-lead leading-relaxed text-slate">
              Así como su empresa tiene una nómina de personas, nosotros desarrollamos su nómina
              digital: colaboradores de IA que, como cualquier miembro del equipo, tienen un rol, se
              integran a sus sistemas y operan sus procesos con supervisión humana.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
