import {
  brand,
  positioning,
  levels,
  services,
  publishedCases,
  principles,
  formatLevelRange,
  getServiceById,
  getLevel,
} from "@/content"
import { SITE_URL } from "@/lib/seo"

export const dynamic = "force-static"

/** Versión extendida de llms.txt: incluye el texto completo de cada servicio y caso. */
export function GET() {
  const lines: string[] = [
    `# ${brand.shortName}: versión extendida`,
    "",
    `> ${positioning.h1} ${positioning.apoyo}`,
    "",
    `${brand.shortName} es una consultora AI-native con sede en Colombia. Ofrece automatización de procesos, agentes de IA y desarrollo de software a la medida, organizados en tres niveles de inversión (COP, sin IVA). La web permite probar agentes de IA reales antes de agendar una llamada.`,
    "",
    `Este documento contiene el texto completo de cada página de servicio y de caso. Para el índice resumido, ver ${SITE_URL}/llms.txt`,
    "",
    "## Niveles de inversión",
    "",
    ...levels.map((l) => `- ${l.nombre} (${formatLevelRange(l.id)}): ${l.nota}`),
    "",
    "## Servicios (texto completo)",
    "",
  ]

  for (const s of services) {
    const nivel = getLevel(s.nivel)
    lines.push(
      `### ${s.nombre}`,
      "",
      `- URL: ${SITE_URL}/servicios/${s.slug}`,
      `- Nivel: ${nivel.nombre} (${formatLevelRange(s.nivel)})`,
      `- Sectores relevantes: ${s.sectoresRelevantes.join(", ")}`,
      ...(s.esPuertaDeEntrada ? ["- Puerta de entrada recomendada: sí"] : []),
      "",
      s.descripcion,
      "",
      "**Qué solucionamos**",
      "",
      s.queSolucionamos,
      "",
      "**Cómo lo hacemos**",
      "",
      s.comoLoHacemos,
      "",
      "**Ejemplo**",
      "",
      s.ejemplo,
      "",
    )
  }

  lines.push("## Casos (texto completo)", "")

  for (const c of publishedCases) {
    const servicio = getServiceById(c.servicioId)
    lines.push(
      `### ${c.titulo}`,
      "",
      `- URL: ${SITE_URL}/casos/${c.slug}`,
      `- Sector: ${c.sector}`,
      ...(servicio
        ? [`- Servicio relacionado: [${servicio.nombre}](${SITE_URL}/servicios/${servicio.slug})`]
        : []),
      "",
      "**El reto**",
      "",
      c.reto,
      "",
      "**Qué construimos**",
      "",
      c.queConstruimos,
      "",
      "**Cómo funciona**",
      "",
      c.comoFunciona,
      "",
    )

    if (c.etapas.length > 0) {
      lines.push("**Etapas del proceso**", "")
      lines.push(...c.etapas.map((e) => `${e.etapa}. ${e.queOcurrio}`))
      lines.push("")
    }

    if (c.resultado) {
      lines.push("**Resultado**", "", c.resultado.texto, "", `_${c.resultado.encuadre}_`, "")
      if (c.resultado.metricas && c.resultado.metricas.length > 0) {
        lines.push(
          ...c.resultado.metricas.map((m) => `- ${m.etiqueta}: ${m.valor}`),
          "",
        )
      }
    }
  }

  lines.push(
    "## Principios de gobernanza de IA",
    "",
    ...principles.map((p) => `- ${p.titulo}: ${p.descripcion}`),
    "",
    "## Páginas clave",
    "",
    `- [Servicios](${SITE_URL}/servicios)`,
    `- [Casos](${SITE_URL}/casos)`,
    `- [Fuerza Laboral Digital](${SITE_URL}/fuerza-laboral-digital)`,
    `- [Recursos](${SITE_URL}/recursos)`,
    `- [Gobernanza de IA](${SITE_URL}/gobernanza)`,
    `- [Formación](${SITE_URL}/formacion)`,
    `- [Aliados](${SITE_URL}/aliados)`,
    `- [Política de privacidad](${SITE_URL}/privacidad)`,
    "",
    `Contacto: ${brand.email}`,
  )

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
