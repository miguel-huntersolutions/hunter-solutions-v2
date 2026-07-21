import Link from "next/link"
import { brand } from "@/content"
import { Logo } from "@/components/brand/logo"
import { SurfaceProvider } from "@/components/brand/surface"

const COLUMNS = [
  {
    title: "Empresa",
    links: [
      { href: "/servicios", label: "Servicios" },
      { href: "/casos", label: "Casos" },
      { href: "/gobernanza", label: "Gobernanza de IA" },
      { href: "/formacion", label: "Formación" },
      { href: "/aliados", label: "Aliados" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacidad", label: "Política de privacidad" },
      { href: "/legal/terminos", label: "Términos de uso" },
      { href: "/legal/uso-de-ia", label: "Uso de IA en este sitio" },
    ],
  },
] as const

export function SiteFooter() {
  return (
    <SurfaceProvider tone="dark">
      <footer className="bg-navy text-white">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-2 py-8 md:grid-cols-3 md:px-3">
          <div className="flex flex-col items-start gap-3">
            <Logo variant="negativo" height={32} />
            <p className="max-w-[36ch] text-caption leading-relaxed text-line">
              Consultora AI-native en Colombia. Automatización, agentes de IA y desarrollo a la
              medida con niveles de inversión claros.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-2 text-caption font-semibold uppercase tracking-wide text-teal">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-caption text-line transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-slate">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-2 py-3 text-caption text-line md:flex-row md:items-center md:justify-between md:px-3">
            <p>
              © {new Date().getFullYear()} {brand.legalName}. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${brand.email}`} className="transition-colors hover:text-white">
                {brand.email}
              </a>
              {brand.socials.map((s) => (
                <a
                  key={s.red}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {s.red}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </SurfaceProvider>
  )
}
