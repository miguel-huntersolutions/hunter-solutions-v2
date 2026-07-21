import {
  brand,
  positioning,
  levels,
  services,
  publishedCases,
  principles,
  formatLevelRange,
} from "@/content"

export const dynamic = "force-static"

export function GET() {
  const lines: string[] = [
    `# ${brand.shortName}`,
    "",
    `> ${positioning.h1} ${positioning.apoyo}`,
    "",
    `${brand.shortName} es una consultora AI-native con sede en Colombia. Ofrece automatización de procesos, agentes de IA y desarrollo de software a la medida, organizados en tres niveles de inversión (COP, sin IVA). La web permite probar agentes de IA reales antes de agendar una llamada.`,
    "",
    "## Niveles de inversión",
    "",
    ...levels.map((l) => `- ${l.nombre} (${formatLevelRange(l.id)}): ${l.nota}`),
    "",
    "## Servicios",
    "",
    ...services.map((s) => `- [${s.nombre}](${brand.domain}/servicios/${s.slug}): ${s.descripcion}`),
    "",
    "## Casos",
    "",
    ...publishedCases.map((c) => `- [${c.titulo}](${brand.domain}/casos/${c.slug}): ${c.reto}`),
    "",
    "## Principios de gobernanza de IA",
    "",
    ...principles.map((p) => `- ${p.titulo}: ${p.descripcion}`),
    "",
    "## Páginas clave",
    "",
    `- [Servicios](${brand.domain}/servicios)`,
    `- [Casos](${brand.domain}/casos)`,
    `- [Gobernanza de IA](${brand.domain}/gobernanza)`,
    `- [Formación](${brand.domain}/formacion)`,
    `- [Aliados](${brand.domain}/aliados)`,
    `- [Política de privacidad](${brand.domain}/privacidad)`,
    "",
    `Contacto: ${brand.email}`,
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
