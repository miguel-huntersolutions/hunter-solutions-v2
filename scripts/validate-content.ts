/**
 * scripts/validate-content.ts — contrato de contenido (capa L1).
 * Corre en `prebuild`: un contenido inválido no puede desplegarse.
 */
import { z } from "zod"
import { brand, claims } from "../content/brand"
import {
  differentiators,
  faqs,
  principles,
  positioning,
  problems,
  promise,
  sectors,
  stages,
} from "../content/narrative"
import { levels, services } from "../content/commercial"
import { cases, governance, partners, teamExperience, training } from "../content/trust"
import { sectorPages } from "../content/sectores"
import { resources } from "../content/resources"

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)

// Vocabulario prohibido (T-CON-06). Excepción documentada: promise.capacidad
// puede usar "se garantiza" porque la Oferta manda garantizar la capacidad.
const PROHIBIDAS = [
  "garantizado",
  "garantizamos",
  "garantía de resultado",
  "solución integral a medida",
  "llave en mano",
  "líder del mercado",
  "ia native",
]

function scanProhibited(value: unknown, path: string) {
  if (typeof value === "string") {
    const lower = value.toLowerCase()
    for (const p of PROHIBIDAS) {
      // "no como cifra garantizada" es el encuadre literal obligatorio de la promesa
      if (p === "garantizado" && lower.includes("cifra garantizada")) continue
      if (lower.includes(p)) fail(`Vocabulario prohibido "${p}" en ${path}`)
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scanProhibited(v, `${path}[${i}]`))
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) scanProhibited(v, `${path}.${k}`)
  }
}

// ── Esquemas Zod ──
const serviceSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  nivel: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  nombre: z.string().min(1),
  descripcion: z.string().min(10),
  queSolucionamos: z.string().min(10),
  comoLoHacemos: z.string().min(10),
  ejemplo: z.string().min(10), // el ejemplo impide el lenguaje genérico
  sectoresRelevantes: z.array(z.string()).min(1),
  esPuertaDeEntrada: z.boolean().optional(),
})

const claimSchema = z.object({
  valor: z.union([z.number(), z.string()]),
  encuadre: z.string().min(10),
  fuente: z.string().min(3),
  vigencia: z.string().min(2),
})

const levelSchema = z.object({
  id: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  nombre: z.string().min(1),
  rangoMin: z.number().positive(),
  rangoMax: z.number().positive(),
  moneda: z.literal("COP"),
  incluyeIVA: z.literal(false),
  nota: z.string().min(3),
})

// ── T-CON-01 · servicios completos ──
if (services.length !== 18) fail(`Debe haber 18 servicios; hay ${services.length}`)
for (const s of services) {
  const r = serviceSchema.safeParse(s)
  if (!r.success) fail(`Servicio "${s.id}": ${r.error.issues.map((i) => i.path.join(".") + " " + i.message).join("; ")}`)
}
const slugs = new Set(services.map((s) => s.slug))
if (slugs.size !== services.length) fail("Slugs de servicio duplicados")

// ── T-CON-02 · claims con encuadre y fuente ──
for (const [k, c] of Object.entries(claims)) {
  const r = claimSchema.safeParse(c)
  if (!r.success) fail(`Claim "${k}" sin encuadre o sin fuente`)
}

// ── T-CON-03 · rangos únicos, ordenados y sin solape ──
const ord = [...levels].sort((a, b) => a.id - b.id)
for (const l of ord) {
  const r = levelSchema.safeParse(l)
  if (!r.success) fail(`Nivel ${l.id} inválido`)
  if (l.rangoMin >= l.rangoMax) fail(`Nivel ${l.id}: rango invertido`)
}
for (let i = 1; i < ord.length; i++) {
  if (ord[i].rangoMin < ord[i - 1].rangoMax) fail(`Rangos solapados entre nivel ${ord[i - 1].id} y ${ord[i].id}`)
}

// ── T-CON-04 · referencias cruzadas ──
const serviceIds = new Set(services.map((s) => s.id))
for (const p of problems) {
  if (!serviceIds.has(p.servicioRecomendadoId))
    fail(`problems.${p.id}: servicioRecomendadoId huérfano "${p.servicioRecomendadoId}"`)
}
for (const c of cases) {
  if (!serviceIds.has(c.servicioId)) fail(`cases.${c.id}: servicioId huérfano "${c.servicioId}"`)
}

// ── T-CON-05 · casos: resultado sin fuente falla ──
for (const c of cases) {
  if (c.resultado && (!c.resultado.fuente || !c.resultado.encuadre))
    fail(`cases.${c.id}: resultado sin fuente o sin encuadre`)
  if (c.anonimizado) {
    // lista configurable de nombres propios prohibidos en casos anonimizados
    const forbidden: string[] = []
    const texto = JSON.stringify(c).toLowerCase()
    for (const n of forbidden) if (texto.includes(n.toLowerCase())) fail(`cases.${c.id}: nombre propio "${n}" en caso anonimizado`)
  }
}

// ── T-CON-07 · exactamente un servicio puerta de entrada ──
const puertas = services.filter((s) => s.esPuertaDeEntrada)
if (puertas.length !== 1) fail(`Debe haber exactamente 1 servicio puerta de entrada; hay ${puertas.length}`)

// ── T-CON-08 · los 5 sectores del ICP ──
if (sectors.length !== 5) fail(`Deben ser 5 sectores; hay ${sectors.length}`)

// ── T-CON-09 · conteos ──
if (problems.length !== 3) fail(`Deben ser 3 problemas; hay ${problems.length}`)
if (stages.length !== 4) fail(`Deben ser 4 etapas; hay ${stages.length}`)
if (principles.length !== 6) fail(`Deben ser 6 principios; hay ${principles.length}`)
if (differentiators.length !== 8) fail(`Deben ser 8 diferenciadores; hay ${differentiators.length}`)
if (faqs.length !== 6) fail(`Deben ser 6 FAQ; hay ${faqs.length}`)

// ── T-CON-10 · promesa responsable literal ──
if (!promise.retorno.includes("no como cifra garantizada"))
  fail('promise.retorno debe conservar el encuadre literal "no como cifra garantizada"')

// ── T-CON-06 · vocabulario prohibido (excepción: promise.capacidad) ──
scanProhibited({ brand, claims, sectors, problems, principles, stages, levels, services, differentiators, faqs, cases }, "content")
scanProhibited({ retorno: promise.retorno, riesgo: promise.riesgo }, "content.promise")

// ── T-CON-11 · marcadores de relleno fuera de producción ──
// Un "[COMPLETAR ...]" o "[PENDIENTE ...]" en contenido visible es un texto que
// el cliente termina leyendo. Se permite solo en resultado.metricas[].valor de
// los casos: ahí es un recordatorio interno y la ficha ya no lo pinta.
const MARCADORES = ["[completar", "[pendiente"]

function scanPlaceholders(value: unknown, path: string) {
  if (typeof value === "string") {
    const lower = value.toLowerCase()
    for (const m of MARCADORES) {
      if (lower.includes(m)) fail(`Marcador de relleno "${m}...]" en ${path}`)
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scanPlaceholders(v, `${path}[${i}]`))
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) scanPlaceholders(v, `${path}.${k}`)
  }
}

scanPlaceholders(
  { brand, claims, sectors, positioning, problems, principles, stages, levels, services,
    differentiators, faqs, promise, governance, partners, teamExperience, training, sectorPages,
    resources },
  "content",
)
// Los casos se escanean sin resultado.metricas, que es la excepción documentada.
for (const c of cases) {
  const { resultado, ...resto } = c
  scanPlaceholders(resto, `cases.${c.id}`)
  if (resultado) {
    // metricas es la excepción documentada: se descarta a propósito.
    const { metricas: _metricas, ...restoResultado } = resultado
    void _metricas
    scanPlaceholders(restoResultado, `cases.${c.id}.resultado`)
  }
}

// ── Resultado ──
if (errors.length > 0) {
  console.error(`\n✗ Contrato de contenido: ${errors.length} error(es)\n`)
  for (const e of errors) console.error("  - " + e)
  process.exit(1)
}
console.log("✓ Contrato de contenido válido: 18 servicios, 3 niveles, 3 problemas, 4 etapas, 6 principios, 8 diferenciadores, 6 FAQ, casos autorizados:", cases.filter((c) => c.autorizacion).length)
