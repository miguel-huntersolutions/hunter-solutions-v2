import { ImageResponse } from "next/og"

// Tamaño y tipo estándar para todas las imágenes Open Graph (1200x630).
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

const NAVY = "#182543"
const TEAL = "#4C9C87"
const INK = "#151B28"
const LINE = "#D5DAE2"

/**
 * Renderiza una imagen OG con la identidad de HST: fondo navy de marca, marca verbal,
 * el título de la página y el descriptor. Se usa desde cada archivo opengraph-image.tsx.
 */
export function renderOgImage({ title, kicker }: { title: string; kicker?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: NAVY,
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Barra de acento teal superior */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 12,
            backgroundColor: TEAL,
          }}
        />

        {/* Encabezado: marca */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              backgroundColor: TEAL,
              color: NAVY,
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "white", fontSize: 30, fontWeight: 700, lineHeight: 1.1 }}>
              Hunter Solutions Tech
            </span>
            <span style={{ color: TEAL, fontSize: 18, fontWeight: 600, letterSpacing: 2 }}>
              TECH | AI-NATIVE
            </span>
          </div>
        </div>

        {/* Cuerpo: título de la página */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {kicker ? (
            <span
              style={{
                color: TEAL,
                fontSize: 26,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {kicker}
            </span>
          ) : null}
          <span
            style={{
              color: "white",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
        </div>

        {/* Pie: descriptor con acento teal */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 6, backgroundColor: TEAL, borderRadius: 3 }} />
          <span style={{ color: LINE, fontSize: 26, fontWeight: 500 }}>
            Generadores de Soluciones con Inteligencia Artificial
          </span>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}

// Evita el warning de "INK sin usar" manteniendo la paleta documentada disponible.
export const OG_PALETTE = { NAVY, TEAL, INK, LINE }
