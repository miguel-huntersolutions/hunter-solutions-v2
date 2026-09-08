import {
  brand,
  differentiators,
  faqs,
  formatLevelRange,
  getServiceBySlug,
  governance,
  levels,
  lineaConfianza,
  positioning,
  problems,
  promise,
  pruebaPropia,
  publishedCases,
  sectors,
  sectorPages,
  services,
  stages,
  whatsappUrl,
} from "@/content"
import { absoluteUrl } from "@/lib/seo"

/**
 * Versión Markdown de cada página, generada desde content/.
 *
 * La versión humana y esta salen del mismo sitio: si cambia un rango en
 * content/commercial.ts, cambia en las dos. Nada se escribe dos veces.
 */

const CONTACTO = "Sesión de diagnóstico de 30 minutos, sin costo."

type Doc = { title: string; description: string; path: string; body: string[] }

function frontmatter(d: Doc, updated: string): string {
  return [
    "---",
    `title: ${JSON.stringify(d.title)}`,
    `description: ${JSON.stringify(d.description)}`,
    `url: ${absoluteUrl(d.path)}`,
    `updated: ${updated}`,
    "language: es-CO",
    "---",
    "",
  ].join("\n")
}

function bloqueContacto(): string[] {
  return [
    "## Cómo contactar",
    "",
    `- Correo: ${brand.email}`,
    `- WhatsApp: ${whatsappUrl("Hola, quiero agendar un diagnóstico de 30 minutos")}`,
    `- ${CONTACTO} Agende en ${absoluteUrl("/#contacto")}`,
  ]
}

// ── Un generador por tipo de página ──

function home(): Doc {
  return {
    title: positioning.h1,
    description: positioning.apoyo,
    path: "/",
    body: [
      `# ${positioning.h1}`,
      "",
      positioning.apoyo,
      "",
      `Sectores foco: ${sectors.join(", ")}. Ámbito: Colombia, empresas medianas.`,
      "",
      "## Niveles de inversión (COP, sin IVA)",
      "",
      ...levels.map((l) => `- ${l.nombre}: ${formatLevelRange(l.id)}. ${l.nota}`),
      "",
      "## Prueba",
      "",
      ...publishedCases
        .filter((c) => c.resultado)
        .map((c) => `- ${c.titulo} (${c.sector}): ${c.resultado!.texto} ${c.resultado!.encuadre}`),
      `- ${pruebaPropia.titulo}: ${pruebaPropia.texto}`,
      "",
      `${lineaConfianza.texto} ${lineaConfianza.enlaceTexto} ${absoluteUrl(lineaConfianza.enlaceHref)}`,
      "",
      ...bloqueContacto(),
    ],
  }
}

function serviciosIndex(): Doc {
  const body: string[] = [
    "# Servicios por niveles, con rangos publicados",
    "",
    "Cada servicio pertenece a un nivel de inversión con rango publicado en pesos colombianos, sin IVA. La cifra exacta se define en la propuesta según el alcance.",
    "",
    "## Por dónde se atasca",
    "",
    ...problems.map((p) => `- ${p.titulo}: ${p.descripcion} Respuesta: ${p.respuestaHst}`),
    "",
  ]
  for (const l of levels) {
    body.push(`## ${l.nombre}: ${formatLevelRange(l.id)} (sin IVA)`, "", l.nota, "")
    for (const s of services.filter((x) => x.nivel === l.id)) {
      body.push(`- [${s.nombre}](${absoluteUrl(`/servicios/${s.slug}`)}): ${s.descripcion}`)
    }
    body.push("")
  }
  body.push(...bloqueContacto())
  return {
    title: "Servicios por niveles, con rangos publicados",
    description:
      "Catálogo de servicios de Hunter Solutions Tech organizado en tres niveles de inversión con rangos publicados en COP, sin IVA.",
    path: "/servicios",
    body,
  }
}

function servicio(slug: string): Doc | null {
  const s = getServiceBySlug(slug)
  if (!s) return null
  const nivel = levels.find((l) => l.id === s.nivel)!
  return {
    title: s.nombre,
    description: s.descripcion,
    path: `/servicios/${s.slug}`,
    body: [
      `# ${s.nombre}`,
      "",
      s.descripcion,
      "",
      `- Nivel: ${nivel.nombre} (${formatLevelRange(nivel.id)}, sin IVA)`,
      `- Sectores: ${s.sectoresRelevantes.join(", ")}`,
      "",
      "## Qué soluciona",
      "",
      s.queSolucionamos,
      "",
      "## Cómo lo hacemos",
      "",
      s.comoLoHacemos,
      "",
      "## Ejemplo",
      "",
      s.ejemplo,
      "",
      ...bloqueContacto(),
    ],
  }
}

function casosIndex(): Doc {
  return {
    title: "Casos con resultados encuadrados",
    description: "Casos autorizados de Hunter Solutions Tech, con el encuadre de cada resultado.",
    path: "/casos",
    body: [
      "# Casos con resultados encuadrados",
      "",
      ...publishedCases.map(
        (c) => `- [${c.titulo}](${absoluteUrl(`/casos/${c.slug}`)}) (${c.sector}): ${c.reto}`,
      ),
      "",
      `## ${pruebaPropia.titulo}`,
      "",
      `${pruebaPropia.texto} ${pruebaPropia.nota}`,
      "",
      ...bloqueContacto(),
    ],
  }
}

function caso(slug: string): Doc | null {
  const c = publishedCases.find((x) => x.slug === slug)
  if (!c) return null
  const body = [
    `# ${c.titulo}`,
    "",
    `Sector: ${c.sector}.`,
    "",
    "## Reto",
    "",
    c.reto,
    "",
    "## Qué construimos",
    "",
    c.queConstruimos,
    "",
    "## Cómo funciona",
    "",
    c.comoFunciona,
    "",
  ]
  if (c.resultado) {
    body.push("## Resultado", "", c.resultado.texto, "", `Encuadre: ${c.resultado.encuadre}`, "")
  }
  body.push(...bloqueContacto())
  return { title: c.titulo, description: c.reto, path: `/casos/${c.slug}`, body }
}

function gobernanza(): Doc {
  return {
    title: "Gobernanza de IA",
    description:
      "Cómo Hunter Solutions Tech gobierna el riesgo de los agentes: arquitectura, observabilidad, metodología y propiedad del activo.",
    path: "/gobernanza",
    body: [
      "# Gobernanza de IA",
      "",
      "## Arquitectura",
      "",
      ...governance.arquitectura.map((g) => `- ${g.termino}: ${g.beneficio}`),
      "",
      "## Observabilidad y control",
      "",
      ...governance.observabilidad.map((g) => `- ${g.termino}: ${g.beneficio}`),
      "",
      "## Metodología",
      "",
      governance.metodologia,
      "",
      ...stages.map((s) => `${s.n}. ${s.nombre}: ${s.descripcion} Entregable: ${s.entregable}`),
      "",
      "## Propiedad del activo",
      "",
      governance.propiedadDelActivo,
      "",
      "## Promesa responsable",
      "",
      `- Capacidad: ${promise.capacidad}`,
      `- Retorno: ${promise.retorno}`,
      `- Riesgo: ${promise.riesgo}`,
      "",
      ...bloqueContacto(),
    ],
  }
}

function nosotros(): Doc {
  return {
    title: "Nosotros",
    description:
      "Qué diferencia a Hunter Solutions Tech: el activo queda en su empresa, sabemos operarlo y la promesa es responsable.",
    path: "/nosotros",
    body: [
      "# Por qué Hunter Solutions Tech",
      "",
      ...differentiators.map((d) => `- ${d.titulo}: ${d.descripcion}`),
      "",
      `## ${positioning.nuevosTitulo}`,
      "",
      positioning.nuevosArgumento,
      "",
      ...bloqueContacto(),
    ],
  }
}

function preguntas(): Doc {
  return {
    title: "Preguntas frecuentes",
    description: "Las preguntas que nos hacen antes de empezar, respondidas.",
    path: "/preguntas",
    body: [
      "# Preguntas frecuentes",
      "",
      ...faqs.flatMap((f) => [`## ${f.pregunta}`, "", f.respuesta, ""]),
      ...bloqueContacto(),
    ],
  }
}

function fuerzaLaboral(): Doc {
  return {
    title: "Fuerza Laboral Digital",
    description: positioning.apoyo,
    path: "/fuerza-laboral-digital",
    body: [
      "# Fuerza Laboral Digital",
      "",
      positioning.apoyo,
      "",
      "## Cómo trabajamos",
      "",
      ...stages.map((s) => `${s.n}. ${s.nombre}: ${s.descripcion} Entregable: ${s.entregable}`),
      "",
      ...bloqueContacto(),
    ],
  }
}

function sector(slug: string): Doc | null {
  const s = sectorPages.find((x) => x.slug === slug)
  if (!s) return null
  return {
    title: `IA para ${s.sector}`,
    description: s.bluf,
    path: `/sectores/${s.slug}`,
    body: [`# IA para ${s.sector}`, "", s.bluf, "", ...bloqueContacto()],
  }
}

/** Rutas con espejo Markdown. Devuelve null si la ruta no lo tiene. */
export function markdownDoc(segments: string[]): Doc | null {
  const [a, b] = segments
  if (segments.length === 0) return home()
  if (a === "servicios") return b ? servicio(b) : serviciosIndex()
  if (a === "casos") return b ? caso(b) : casosIndex()
  if (a === "sectores" && b) return sector(b)
  if (a === "gobernanza" && !b) return gobernanza()
  if (a === "nosotros" && !b) return nosotros()
  if (a === "preguntas" && !b) return preguntas()
  if (a === "fuerza-laboral-digital" && !b) return fuerzaLaboral()
  return null
}

/** Rutas humanas que tienen espejo, para robots, sitemap y negociación. */
export const RUTAS_CON_ESPEJO: string[] = [
  "/",
  "/servicios",
  ...services.map((s) => `/servicios/${s.slug}`),
  "/casos",
  ...publishedCases.map((c) => `/casos/${c.slug}`),
  ...sectorPages.map((s) => `/sectores/${s.slug}`),
  "/gobernanza",
  "/nosotros",
  "/preguntas",
  "/fuerza-laboral-digital",
]

export function renderMarkdown(doc: Doc, updated: string): string {
  return frontmatter(doc, updated) + doc.body.join("\n") + "\n"
}
