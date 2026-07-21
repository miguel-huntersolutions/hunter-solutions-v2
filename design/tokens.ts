// design/tokens.ts — fuente única del sistema de diseño Hunter Solutions Tech
export const tokens = {
  color: {
    teal: "#4C9C87",
    navy: "#182543",
    ink: "#151B28",
    slate: "#5A6472",
    line: "#D5DAE2",
    bg: "#F6F7F9",
    white: "#FFFFFF",
  },
  gradient: {
    // ÚNICO degradado permitido — exclusivo del símbolo del logo
    logo: "linear-gradient(45deg, #4C9C87 0%, #182543 100%)",
  },
  proportion: { neutros: 60, navy: 30, teal: 10 },
  font: {
    family:
      '"Open Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    weight: { title: 800, subtitle: 700, emphasis: 600, body: 400, light: 300 },
    sizePx: { h1: 36, h2: 28, h3: 20, body: 16, caption: 13 },
    lineHeight: { title: 1.2, body: 1.6 },
  },
  radius: 0, // esquinas rectas en toda la UI
  spaceBase: 8, // todo el espaciado es múltiplo de 8
} as const

export type BrandColor = keyof typeof tokens.color
