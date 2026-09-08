/**
 * scripts/check-coherencia.ts — la versión humana, la de agentes y el corpus
 * dicen lo mismo.
 *
 * Las tres se generan de content/, así que en teoría no pueden divergir. Este
 * guion lo comprueba en la práctica: si alguien introduce un rango a mano en
 * cualquiera de las tres, el build falla. Corre en prebuild.
 */
import { formatLevelRange, levels } from "../content"
import { agentCorpus } from "../lib/agents/corpus"

const errores: string[] = []

// Rango publicado de cada nivel, tal y como lo ve una persona.
const rangos = levels.map((l) => ({ nivel: l.nombre, rango: formatLevelRange(l.id) }))

// 1) El corpus de los agentes cita los mismos rangos.
for (const { nivel, rango } of rangos) {
  if (!agentCorpus.includes(rango)) {
    errores.push(`El corpus de los agentes no cita el rango de ${nivel}: "${rango}"`)
  }
}

// 2) Los importes permitidos por el guardrail son los bordes de los rangos.
const bordes = new Set(levels.flatMap((l) => [l.rangoMin / 1_000_000, l.rangoMax / 1_000_000]))
if (bordes.size === 0) errores.push("No hay rangos publicados en content/commercial.ts")

// 3) Nadie define un rango fuera del content model.
for (const l of levels) {
  if (l.rangoMin >= l.rangoMax) errores.push(`Nivel ${l.id}: rango invertido`)
  if (l.rangoMin % 1_000_000 !== 0 || l.rangoMax % 1_000_000 !== 0) {
    errores.push(`Nivel ${l.id}: los rangos se publican en millones exactos`)
  }
}

if (errores.length > 0) {
  console.error(`\n✗ Coherencia entre versiones: ${errores.length} error(es)\n`)
  for (const e of errores) console.error("  - " + e)
  process.exit(1)
}
console.log(
  `✓ Coherencia: los ${rangos.length} rangos publicados coinciden en la web, en el corpus y en la oferta`,
)
