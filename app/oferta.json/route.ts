import {
  brand,
  faqs,
  governance,
  levels,
  promise,
  pruebaPropia,
  publishedCases,
  roles,
  sectors,
  services,
  stages,
  whatsappUrl,
} from "@/content"
import { SITE_URL, absoluteUrl } from "@/lib/seo"

/**
 * La oferta completa en JSON, para que un agente pueda leerla y actuar dentro
 * del catálogo publicado. Vive en la raíz y no bajo /api porque robots.txt
 * deshabilita /api/.
 *
 * Todo sale de content/, igual que la web y que el corpus de los agentes.
 */
export const dynamic = "force-static"

export function GET() {
  const oferta = {
    version: new Date().toISOString().slice(0, 10),
    aviso:
      "Rangos en COP sin IVA; el retorno se proyecta con supuestos, no se garantiza.",
    marca: {
      nombre: brand.legalName,
      url: SITE_URL,
      correo: brand.email,
      whatsapp: whatsappUrl("Hola, quiero agendar un diagnóstico de 30 minutos"),
      redes: brand.socials,
    },
    sectoresFoco: sectors,
    niveles: levels.map((l) => ({
      id: l.id,
      nombre: l.nombre,
      rangoMin: l.rangoMin,
      rangoMax: l.rangoMax,
      moneda: l.moneda,
      incluyeIVA: l.incluyeIVA,
      nota: l.nota,
    })),
    servicios: services.map((s) => ({
      id: s.id,
      slug: s.slug,
      nivel: s.nivel,
      nombre: s.nombre,
      descripcion: s.descripcion,
      queSolucionamos: s.queSolucionamos,
      sectoresRelevantes: s.sectoresRelevantes,
      esPuertaDeEntrada: Boolean(s.esPuertaDeEntrada),
      url: absoluteUrl(`/servicios/${s.slug}`),
    })),
    roles: roles.map((r) => ({ id: r.id, nombre: r.nombre, descripcion: r.descripcion })),
    casos: publishedCases.map((c) => ({
      slug: c.slug,
      titulo: c.titulo,
      sector: c.sector,
      reto: c.reto,
      queConstruimos: c.queConstruimos,
      resultado: c.resultado
        ? { texto: c.resultado.texto, encuadre: c.resultado.encuadre }
        : null,
      url: absoluteUrl(`/casos/${c.slug}`),
    })),
    pruebaPropia,
    gobernanza: {
      arquitectura: governance.arquitectura,
      observabilidad: governance.observabilidad,
      metodologia: governance.metodologia,
      propiedadDelActivo: governance.propiedadDelActivo,
    },
    promesa: promise,
    etapas: stages,
    faqs,
    contacto: {
      correo: brand.email,
      whatsapp: whatsappUrl("Hola, quiero agendar un diagnóstico de 30 minutos"),
      agendar: absoluteUrl("/#contacto"),
      sesion: "Diagnóstico de 30 minutos, sin costo.",
    },
  }

  return Response.json(oferta, {
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
