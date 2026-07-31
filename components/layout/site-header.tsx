"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { SurfaceProvider } from "@/components/brand/surface"

const NAV = [
  { href: "/fuerza-laboral-digital", label: "Fuerza Laboral Digital" },
  { href: "/servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/gobernanza", label: "Gobernanza" },
  { href: "/formacion", label: "Formación" },
  { href: "/aliados", label: "Aliados" },
  { href: "/preguntas", label: "Preguntas" },
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <SurfaceProvider tone="light">
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-8 max-w-[1200px] items-center justify-between px-2 md:h-9 md:px-3">
          <Link href="/" aria-label="Hunter Solutions Tech: inicio" onClick={() => setOpen(false)}>
            <Logo variant="claro" height={32} />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-4 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-caption font-semibold uppercase tracking-wide transition-colors ${
                    active ? "text-teal" : "text-slate hover:text-navy"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link
              href="/#contacto"
              className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
            >
              Agendar diagnóstico
            </Link>
          </nav>

          <button
            type="button"
            className="flex h-5 w-5 items-center justify-center text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>

        {open && (
          <nav id="menu-movil" aria-label="Principal móvil" className="border-t border-line bg-white lg:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-line px-2 py-2 text-body font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contacto"
                  onClick={() => setOpen(false)}
                  className="block bg-navy px-2 py-2 text-body font-semibold text-white"
                >
                  Agendar diagnóstico
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </SurfaceProvider>
  )
}
