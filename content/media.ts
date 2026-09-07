// content/media.ts — mapeo de presentación (imágenes) al contenido.
// Se mantiene aparte del modelo de contenido validado por Zod: aquí solo
// viven rutas a imágenes decorativas/editoriales, no datos de negocio.
// Las fotografías se guardan en WebP: eran PNG sin pérdida de ~1,5 MB cada una.

export const sectorImages: Record<string, string> = {
  Legal: "/sectores/legal.webp",
  Manufactura: "/sectores/manufactura.webp",
  Salud: "/sectores/salud.webp",
  Alimentos: "/sectores/alimentos.webp",
  Consumo: "/sectores/consumo.webp",
}

export const sectorBlurb: Record<string, string> = {
  Legal: "Corpus de contratos y precedentes que se consultan en lenguaje natural.",
  Manufactura: "Compras, aduanas, inventarios y facturación operados por agentes.",
  Salud: "Agendamiento y trámites administrativos sin fricción para el paciente.",
  Alimentos: "Trazabilidad, calidad y conciliación en la línea de producción.",
  Consumo: "Atención, cartera y datos de venta convertidos en decisiones.",
}

// Imagen por slug de caso publicado.
export const caseImages: Record<string, string> = {
  "gestion-inteligente-de-contratos-legales": "/casos/contratos.webp",
  "procesamiento-automatico-de-hojas-de-vida": "/casos/hojas-de-vida.webp",
}

export function caseImage(slug: string): string {
  return caseImages[slug] ?? "/placeholder.svg"
}

export const heroAbstract = "/abstract/digital-workforce.webp"
