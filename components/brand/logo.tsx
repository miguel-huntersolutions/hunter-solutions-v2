"use client"

import Image from "next/image"
import { useSurfaceTone } from "./surface"

/**
 * Logo oficial Hunter Solutions Tech.
 * Reglas duras del manual: sin props de color, sin rotación, sin escalado
 * no proporcional. `height` solo admite 24 | 32 | 40 | 48 (mínimo del tile: 24px).
 */
type LogoProps = {
  variant?: "auto" | "claro" | "negativo" | "icono"
  height?: 24 | 32 | 40 | 48
  className?: string
}

const SRC: Record<Exclude<LogoProps["variant"], "auto" | undefined>, { src: string; ratio: number }> = {
  claro: { src: "/brand/lockup_horizontal.svg", ratio: 556.9 / 112 },
  negativo: { src: "/brand/lockup_negativo.svg", ratio: 556.9 / 112 },
  icono: { src: "/brand/icono.svg", ratio: 1 },
}

export function Logo({ variant = "auto", height = 32, className }: LogoProps) {
  const tone = useSurfaceTone()
  const resolved: "claro" | "negativo" | "icono" =
    variant === "auto" ? (tone === "dark" ? "negativo" : "claro") : variant
  const { src, ratio } = SRC[resolved]

  return (
    <span data-brand-logo className={className} style={{ display: "inline-flex" }}>
      <Image
        src={src || "/placeholder.svg"}
        alt="Hunter Solutions Tech"
        height={height}
        width={Math.round(height * ratio)}
        priority
      />
    </span>
  )
}
