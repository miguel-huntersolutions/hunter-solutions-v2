/**
 * scripts/import-newsletter.ts — ingesta de una edición del Radar IA Semanal.
 *
 *   pnpm newsletter:import <archivo.html> [--numero 2] [--slug 2026-09-07] [--publicar]
 *
 * Toma el HTML tal como se produce la edición y escribe content/newsletter/<slug>.json,
 * que es lo único que hay que commitear para publicar. Hace tres cosas que a mano
 * se olvidan siempre:
 *
 *   1. Quita el encabezado y el pie propios de la edición: el sitio ya pone los
 *      suyos. La nota de descargo del pie sí se conserva, porque es contenido.
 *   2. Acota el CSS al contenedor de la edición. Sin esto, reglas como `body{}`,
 *      `section{}` o `p{}` se escaparían y repintarían el sitio entero.
 *   3. Reescribe los enlaces al dominio canónico.
 *
 * La edición queda en "borrador" salvo que se pase --publicar, y un borrador ni
 * se lista ni se sirve.
 */
import fs from "node:fs"
import path from "node:path"

const CONTENEDOR = ".hst-nl"
const DOMINIO_CANONICO = "https://www.huntersolutions.tech"
const DOMINIOS_ANTIGUOS = [/https:\/\/hunter-solutions\.vercel\.app\/?/g]

// ── Argumentos ──
const args = process.argv.slice(2)
const entrada = args.find((a) => !a.startsWith("--"))
if (!entrada) {
  console.error("Uso: pnpm newsletter:import <archivo.html> [--numero N] [--slug S] [--publicar]")
  process.exit(1)
}
const flag = (nombre: string) => {
  const i = args.indexOf(`--${nombre}`)
  return i >= 0 ? args[i + 1] : undefined
}

const html = fs.readFileSync(entrada, "utf8")

// ── Metadatos desde el propio documento ──
const tomar = (re: RegExp) => html.match(re)?.[1]?.trim()

const tituloDoc = tomar(/<title>([\s\S]*?)<\/title>/i) ?? ""
const extracto = tomar(/<meta\s+name="description"\s+content="([^"]*)"/i) ?? ""
// El H1 del hero es el titular real; el <title> lleva además la marca y la edición.
const titulo = tomar(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, "").trim() || tituloDoc
const periodo = tomar(/<div class="date">([\s\S]*?)<\/div>/i) ?? ""
const nota = tomar(/<div class="note">([\s\S]*?)<\/div>/i) ?? ""

const slug = flag("slug") ?? path.basename(entrada, ".html").toLowerCase().replace(/[^a-z0-9-]/g, "-")
const numero = Number(flag("numero") ?? (tituloDoc.match(/Edici[óo]n\s+(\d+)/i)?.[1] ?? 0))
const datePublished =
  flag("fecha") ?? (slug.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? new Date().toISOString().slice(0, 10))

// ── CSS: acotarlo al contenedor ──

/** Parte una hoja de estilos en reglas de primer nivel, respetando anidamiento. */
function reglasDePrimerNivel(css: string): string[] {
  const reglas: string[] = []
  let profundidad = 0
  let inicio = 0
  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (c === "{") profundidad++
    else if (c === "}") {
      profundidad--
      if (profundidad === 0) {
        reglas.push(css.slice(inicio, i + 1).trim())
        inicio = i + 1
      }
    }
  }
  return reglas.filter(Boolean)
}

const SELECTORES_GLOBALES = new Set([":root", "html", "body", "html,body", "*,html,body"])

/**
 * Devuelve el CSS acotado. Las declaraciones de :root / html / body se izan al
 * contenedor —así las variables siguen heredando— y el resto entra en un
 * @scope, que las limita a los descendientes sin tocar un solo selector.
 *
 * En un navegador sin @scope la edición se ve sin maquetar pero legible: el
 * HTML es semántico y el contenedor conserva tipografía, color y fondo.
 */
function acotarCss(css: string): string {
  const izadas: string[] = []
  const acotadas: string[] = []

  for (const regla of reglasDePrimerNivel(css)) {
    const corte = regla.indexOf("{")
    const selector = regla.slice(0, corte).trim()
    const cuerpo = regla.slice(corte + 1, regla.lastIndexOf("}")).trim()

    if (selector.startsWith("@")) {
      // @media y @supports envuelven reglas normales: van dentro del @scope.
      // @keyframes y @font-face son globales por naturaleza y se dejan fuera.
      if (/^@(media|supports)/i.test(selector)) acotadas.push(regla)
      else izadas.push(`/* fuera de @scope: ${selector} */`)
      continue
    }

    const partes = selector.split(",").map((s) => s.trim())
    const globales = partes.filter((s) => SELECTORES_GLOBALES.has(s))
    const resto = partes.filter((s) => !SELECTORES_GLOBALES.has(s))

    if (globales.length > 0) izadas.push(cuerpo.endsWith(";") ? cuerpo : `${cuerpo};`)
    if (resto.length > 0) acotadas.push(`${resto.join(", ")}{${cuerpo}}`)
  }

  return [
    `${CONTENEDOR}{${izadas.join("\n")}}`,
    `@scope (${CONTENEDOR}){`,
    acotadas.join("\n"),
    `}`,
  ].join("\n")
}

const estilos = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n")
const css = acotarCss(estilos)

// ── Cuerpo: quitar el chrome propio de la edición ──
let cuerpo = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html

const quitado: string[] = []
const quitar = (re: RegExp, etiqueta: string) => {
  if (re.test(cuerpo)) {
    cuerpo = cuerpo.replace(re, "")
    quitado.push(etiqueta)
  }
}
quitar(/<header class="top">[\s\S]*?<\/header>/i, "encabezado propio (lo pone SiteHeader)")
quitar(/<footer>[\s\S]*?<\/footer>/i, "pie propio (lo pone SiteFooter)")
quitar(/<!--[\s\S]*?-->/g, "comentarios")

for (const re of DOMINIOS_ANTIGUOS) cuerpo = cuerpo.replace(re, DOMINIO_CANONICO)

// La nota de descargo del pie es contenido: se conserva al final de la edición.
if (nota) {
  cuerpo += `\n<div class="wrap"><p class="nl-nota">${nota}</p></div>\n`
}

cuerpo = cuerpo.trim()

// ── Escribir ──
const destino = path.join(process.cwd(), "content", "newsletter", `${slug}.json`)
fs.mkdirSync(path.dirname(destino), { recursive: true })
fs.writeFileSync(
  destino,
  JSON.stringify(
    {
      numero,
      titulo,
      extracto,
      datePublished,
      periodo,
      estado: args.includes("--publicar") ? "publicado" : "borrador",
      html: cuerpo,
      css,
    },
    null,
    2,
  ) + "\n",
)

console.log(`✓ ${path.relative(process.cwd(), destino)}`)
console.log(`  Edición ${numero} · ${titulo}`)
console.log(`  Estado: ${args.includes("--publicar") ? "publicado" : "borrador"}`)
console.log(`  Quitado: ${quitado.join(", ") || "nada"}`)
console.log(`  Cuerpo: ${(cuerpo.length / 1024).toFixed(1)} KB · CSS acotado: ${(css.length / 1024).toFixed(1)} KB`)
