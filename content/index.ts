// content/index.ts — fuente única de verdad de Hunter Solutions Tech.
// Ningún componente contiene una cifra, un precio ni un nombre de servicio literal:
// todo se lee de aquí y se valida en prebuild (scripts/validate-content.ts).

export { brand, claims } from "./brand"
export {
  sectors,
  positioning,
  problems,
  principles,
  stages,
  promise,
  cnt,
  differentiators,
  faqs,
} from "./narrative"
export { levels, services, roles } from "./commercial"
export { governance, cases, teamExperience, partners, training } from "./trust"
export {
  resources,
  publishedResources,
  getResourceBySlug,
  readingMinutes,
  formatResourceDate,
} from "./resources"
export type { Resource, ResourceSection, ResourceFaq, ResourceLink } from "./resources"
export type * from "./types"

import { cases as allCases } from "./trust"
import { levels as allLevels, services as allServices } from "./commercial"

/** Casos publicables: solo los que tienen autorización registrada. */
export const publishedCases = allCases.filter((c) => c.autorizacion !== null)

export function getServiceById(id: string) {
  return allServices.find((s) => s.id === id)
}

export function getServiceBySlug(slug: string) {
  return allServices.find((s) => s.slug === slug)
}

export function getLevel(id: 1 | 2 | 3) {
  return allLevels.find((l) => l.id === id)!
}

/** Formatea un valor COP con separador de miles: $10.000.000 COP */
export function formatCop(value: number): string {
  return `$${value.toLocaleString("es-CO")} COP`
}

/** Rango de un nivel formateado. El nivel 3 se comunica como "desde". */
export function formatLevelRange(levelId: 1 | 2 | 3): string {
  const l = getLevel(levelId)
  if (l.id === 3) return `Desde ${formatCop(l.rangoMin)}`
  return `${formatCop(l.rangoMin)} a ${formatCop(l.rangoMax)}`
}
