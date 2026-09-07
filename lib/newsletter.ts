import fs from "node:fs"
import path from "node:path"
import { z } from "zod"

/**
 * Radar IA Semanal — carga de ediciones.
 *
 * Cada edición es UN archivo en content/newsletter/<slug>.json. Publicar es
 * añadir un archivo y abrir un PR: no hay índice que mantener a mano, así que
 * la rutina que lo automatiza no tiene que editar dos sitios ni resolver
 * conflictos en un array compartido.
 *
 * Este módulo lee del disco, así que solo puede importarse desde el servidor.
 * Por eso vive en lib/ y NO se reexporta desde content/index.ts, que sí llega
 * a componentes de cliente.
 */

const DIR = path.join(process.cwd(), "content", "newsletter")

const issueSchema = z.object({
  numero: z.number().int().positive(),
  titulo: z.string().min(5),
  /** entradilla para el índice y la meta description */
  extracto: z.string().min(20).max(300),
  /** fecha ISO de publicación (YYYY-MM-DD) */
  datePublished: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  /** periodo que cubre la edición, en prosa */
  periodo: z.string().min(5),
  estado: z.enum(["borrador", "publicado"]),
  /** cuerpo de la edición, ya normalizado por scripts/import-newsletter.ts */
  html: z.string().min(100),
  /** CSS de la edición, ya acotado al contenedor por el mismo guion */
  css: z.string().default(""),
})

export type NewsletterIssue = z.infer<typeof issueSchema> & { slug: string }

function readDir(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
}

/** Todas las ediciones, de la más reciente a la más antigua. */
export function allIssues(): NewsletterIssue[] {
  const issues = readDir().map((file) => {
    const slug = file.replace(/\.json$/, "")
    const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"))
    const parsed = issueSchema.safeParse(raw)
    if (!parsed.success) {
      const detalle = parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")
      throw new Error(`Edición inválida en content/newsletter/${file}: ${detalle}`)
    }
    return { slug, ...parsed.data }
  })
  return issues.sort((a, b) => b.datePublished.localeCompare(a.datePublished))
}

/** Ediciones visibles al público. Un borrador no se lista ni se sirve. */
export function publishedIssues(): NewsletterIssue[] {
  return allIssues().filter((i) => i.estado === "publicado")
}

export function getIssueBySlug(slug: string): NewsletterIssue | undefined {
  return publishedIssues().find((i) => i.slug === slug)
}

/** Fecha ISO a formato legible en español colombiano: "7 de septiembre de 2026". */
export function formatIssueDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
