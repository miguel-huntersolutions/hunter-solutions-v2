/**
 * scripts/check-copy.ts — vocabulario de marca fuera de content/.
 *
 * El contrato de contenido (validate-content.ts) solo ve content/. Pero hay copy
 * literal en componentes y páginas, y ahí también aplican las reglas de marca.
 * Esto corre en prebuild, después del contrato, y falla el build.
 *
 * Solo mira texto de cara al cliente: se saltan comentarios y los prompts de los
 * agentes, donde "nómina digital" aparece precisamente para prohibirla.
 */
import fs from "node:fs"
import path from "node:path"

const RAICES = ["app", "components", "content"]
const EXTENSIONES = new Set([".ts", ".tsx"])

const PROHIBIDAS: [RegExp, string][] = [
  [/n[oó]mina digital/i, "nómina digital"],
  [/bajo costo/i, "bajo costo"],
  [/compañía joven/i, "compañía joven"],
  [/arquitectos de soluciones/i, "arquitectos de soluciones"],
  [/\bgarantizad[oa]s?\b/i, "garantizado"],
  [/100\s?%/, "100%"],
  [/—/, "guion largo"],
]

/**
 * Fuera de alcance. Esto revisa copy que lee un cliente, no interiores:
 * - app/api/ son rutas de servidor. La plantilla del correo de leads va al equipo
 *   de HST, y su CSS lleva "width:100%", que no es la promesa vetada.
 * - Los prompts de los agentes nombran "nómina digital" justamente para prohibirla.
 */
const EXENTOS = [
  path.join("app", "api") + path.sep,
  path.join("lib", "agents") + path.sep,
  path.join("scripts") + path.sep,
]

/** Los campos `fuente` son referencias internas a documentos y sí llevan guion largo. */
const LINEA_EXENTA = /^\s*fuente:/

/** Quita comentarios de línea y de bloque: no son copy. */
function soloCodigo(fuente: string): string {
  return fuente.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "")
}

function archivos(dir: string): string[] {
  const salida: string[] = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) salida.push(...archivos(p))
    else if (EXTENSIONES.has(path.extname(e.name)) && !e.name.endsWith(".test.ts")) salida.push(p)
  }
  return salida
}

const errores: string[] = []

for (const raiz of RAICES) {
  if (!fs.existsSync(raiz)) continue
  for (const archivo of archivos(raiz)) {
    if (EXENTOS.some((e) => archivo.includes(e))) continue
    const lineas = soloCodigo(fs.readFileSync(archivo, "utf8")).split("\n")
    lineas.forEach((linea, i) => {
      if (LINEA_EXENTA.test(linea)) return
      for (const [re, etiqueta] of PROHIBIDAS) {
        // El encuadre literal de la promesa usa "cifra garantizada" a propósito.
        if (etiqueta === "garantizado" && /cifra garantizada/i.test(linea)) continue
        if (re.test(linea)) {
          errores.push(`${archivo}:${i + 1}  "${etiqueta}"  ${linea.trim().slice(0, 90)}`)
        }
      }
    })
  }
}

if (errores.length > 0) {
  console.error(`\n✗ Vocabulario de marca: ${errores.length} hallazgo(s)\n`)
  for (const e of errores) console.error("  - " + e)
  process.exit(1)
}
console.log("✓ Vocabulario de marca limpio en app/, components/ y content/")
