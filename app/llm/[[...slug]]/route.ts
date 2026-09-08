import { RUTAS_CON_ESPEJO, markdownDoc, renderMarkdown } from "@/lib/markdown"

/**
 * Espejo Markdown de cada página. La versión humana y esta se generan de
 * content/, así que no pueden desalinearse.
 *
 * Se llega aquí de dos formas: por la URL directa (/llm/servicios) o porque
 * proxy.ts reescribió una petición con Accept: text/markdown.
 */
export const dynamic = "force-static"

const UPDATED = new Date().toISOString().slice(0, 10)
const HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
}

export function generateStaticParams() {
  return RUTAS_CON_ESPEJO.map((r) => ({
    slug: r === "/" ? [] : r.slice(1).split("/"),
  }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const doc = markdownDoc(slug ?? [])
  if (!doc) {
    return new Response(`# 404\n\nEsta ruta no tiene versión Markdown.\n`, {
      status: 404,
      headers: HEADERS,
    })
  }
  return new Response(renderMarkdown(doc, UPDATED), { headers: HEADERS })
}
