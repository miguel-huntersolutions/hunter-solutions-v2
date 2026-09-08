import Link from "next/link"
import { positioning } from "@/content"
import { SurfaceProvider } from "@/components/brand/surface"
import { Eyebrow } from "@/components/ui/section"
import { HeroHeadline } from "@/components/home/hero-headline"

/**
 * Hero de la home: un mensaje y una sola acción.
 *
 * El Agente de Diagnóstico salió de aquí a su propio bloque (DiagnosticoBlock),
 * y con él la imagen de fondo, los chips de sectores y el segundo botón. Todo el
 * texto sale de content/narrative.ts.
 */
export function Hero() {
  return (
    <SurfaceProvider tone="dark">
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Textura de rejilla + resplandor teal */}
        <div aria-hidden className="hst-grid absolute inset-0 opacity-70" />
        <div aria-hidden className="hst-glow absolute inset-0" />

        <div className="relative mx-auto max-w-[1200px] px-2 py-10 md:px-3 md:py-14">
          <div className="flex max-w-[64ch] flex-col items-start gap-5">
            <Eyebrow tone="dark">Hunter Solutions Tech · Consultora AI-native · Colombia</Eyebrow>

            <HeroHeadline />

            <p className="max-w-[58ch] text-lead leading-relaxed text-line">{positioning.apoyo}</p>

            {/* Una sola CTA en toda la home; esquinas rectas, área de toque de 48px */}
            <Link
              href="#contacto"
              className="inline-flex min-h-[48px] items-center bg-teal px-5 py-3 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Agendar diagnóstico de 30 minutos, sin costo
            </Link>

            <p className="flex flex-wrap gap-x-5 gap-y-1 text-caption text-line">
              <span>El activo es suyo.</span>
              <span>Independientes de proveedor.</span>
              <Link
                href="/servicios#niveles"
                className="underline decoration-white/30 underline-offset-2 hover:text-white"
              >
                Precios publicados.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </SurfaceProvider>
  )
}
