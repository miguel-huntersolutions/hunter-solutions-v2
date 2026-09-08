import { z } from "zod"

/**
 * Esquema JSON de /oferta.json, generado con zod (z.toJSONSchema, zod 4). Sirve
 * para que un consumidor valide la respuesta en vez de confiar en su forma.
 */
export const dynamic = "force-static"

const nivel = z.object({
  id: z.number(),
  nombre: z.string(),
  rangoMin: z.number(),
  rangoMax: z.number(),
  moneda: z.literal("COP"),
  incluyeIVA: z.literal(false),
  nota: z.string(),
})

const servicio = z.object({
  id: z.string(),
  slug: z.string(),
  nivel: z.number(),
  nombre: z.string(),
  descripcion: z.string(),
  queSolucionamos: z.string(),
  sectoresRelevantes: z.array(z.string()),
  esPuertaDeEntrada: z.boolean(),
  url: z.string(),
})

const caso = z.object({
  slug: z.string(),
  titulo: z.string(),
  sector: z.string(),
  reto: z.string(),
  queConstruimos: z.string(),
  resultado: z.object({ texto: z.string(), encuadre: z.string() }).nullable(),
  url: z.string(),
})

const ofertaSchema = z.object({
  version: z.string(),
  aviso: z.string(),
  marca: z.object({
    nombre: z.string(),
    url: z.string(),
    correo: z.string(),
    whatsapp: z.string(),
    redes: z.array(z.object({ red: z.string(), url: z.string() })),
  }),
  sectoresFoco: z.array(z.string()),
  niveles: z.array(nivel),
  servicios: z.array(servicio),
  roles: z.array(z.object({ id: z.string(), nombre: z.string(), descripcion: z.string() })),
  casos: z.array(caso),
  pruebaPropia: z.object({
    sector: z.string(),
    titulo: z.string(),
    texto: z.string(),
    nota: z.string(),
  }),
  gobernanza: z.object({
    arquitectura: z.array(z.object({ termino: z.string(), beneficio: z.string() })),
    observabilidad: z.array(z.object({ termino: z.string(), beneficio: z.string() })),
    metodologia: z.string(),
    propiedadDelActivo: z.string(),
  }),
  promesa: z.object({ capacidad: z.string(), retorno: z.string(), riesgo: z.string() }),
  etapas: z.array(
    z.object({ n: z.number(), nombre: z.string(), descripcion: z.string(), entregable: z.string() }),
  ),
  faqs: z.array(z.object({ pregunta: z.string(), respuesta: z.string() })),
  contacto: z.object({
    correo: z.string(),
    whatsapp: z.string(),
    agendar: z.string(),
    sesion: z.string(),
  }),
})

export function GET() {
  return Response.json(z.toJSONSchema(ofertaSchema), {
    headers: { "Cache-Control": "public, max-age=3600" },
  })
}
