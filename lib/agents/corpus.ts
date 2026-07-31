/**
 * Corpus factual de los agentes — se GENERA desde el content model.
 * Es la única fuente factual que consumen los agentes: un agente no puede
 * referirse a un servicio, rango o etapa que no exista publicado.
 */
import {
  brand,
  cnt,
  differentiators,
  faqs,
  formatLevelRange,
  governance,
  levels,
  positioning,
  problems,
  promise,
  publishedCases,
  sectors,
  services,
  stages,
} from "@/content"

export function buildAgentCorpus(): string {
  const lines: string[] = []

  lines.push(`# ${brand.legalName}: corpus factual (generado del content model)`)
  lines.push("")
  lines.push("## Qué es")
  lines.push(positioning.apoyo)
  lines.push(positioning.nuevosArgumento)
  lines.push("")
  lines.push(`Sectores atendidos: ${sectors.join(", ")}. Ámbito: Colombia, empresas medianas.`)
  lines.push("")

  lines.push("## Problemas que resuelve (frenos a la adopción)")
  for (const p of problems) {
    lines.push(`- ${p.titulo}: ${p.descripcion} Respuesta de HST: ${p.respuestaHst} (servicio recomendado: ${p.servicioRecomendadoId})`)
  }
  lines.push("")

  lines.push("## Lente CNT")
  lines.push(`- ${cnt.cultura}`)
  lines.push(`- ${cnt.negocio}`)
  lines.push(`- ${cnt.tecnologia}`)
  lines.push("")

  lines.push("## Cómo trabaja (4 etapas)")
  for (const s of stages) {
    lines.push(`${s.n}. ${s.nombre}: ${s.descripcion} Entregable: ${s.entregable}`)
  }
  lines.push("")

  lines.push("## Promesa responsable (encuadre literal, no reescribir)")
  lines.push(`- Capacidad: ${promise.capacidad}`)
  lines.push(`- Retorno: ${promise.retorno}`)
  lines.push(`- Riesgo: ${promise.riesgo}`)
  lines.push("")

  lines.push("## Niveles y rangos de inversión (COP, sin IVA)")
  for (const l of levels) {
    lines.push(`- ${l.nombre}: ${formatLevelRange(l.id)} (sin IVA). ${l.nota}`)
  }
  lines.push("")

  lines.push("## Catálogo de servicios (20)")
  for (const s of services) {
    lines.push(`### ${s.nombre} (Nivel ${s.nivel}${s.esPuertaDeEntrada ? " · punto de entrada recomendado" : ""})`)
    lines.push(`Descripción: ${s.descripcion}`)
    lines.push(`Qué soluciona: ${s.queSolucionamos}`)
    lines.push(`Cómo lo hace: ${s.comoLoHacemos}`)
    lines.push(`Ejemplo: ${s.ejemplo}`)
    lines.push(`Sectores: ${s.sectoresRelevantes.join(", ")}. Ficha: /servicios/${s.slug}`)
    lines.push("")
  }

  lines.push("## Gobernanza e ingeniería")
  for (const g of [...governance.arquitectura, ...governance.observabilidad]) {
    lines.push(`- ${g.termino}: ${g.beneficio}`)
  }
  lines.push(`- Metodología: ${governance.metodologia}`)
  lines.push(`- Propiedad del activo: ${governance.propiedadDelActivo}`)
  lines.push("")

  lines.push("## Casos autorizados")
  for (const c of publishedCases) {
    lines.push(`- ${c.titulo} (${c.sector}): ${c.reto} Se construyó: ${c.queConstruimos}${c.resultado ? ` Resultado: ${c.resultado.texto} Encuadre: ${c.resultado.encuadre}` : ""}`)
  }
  lines.push("")

  lines.push("## Diferenciadores")
  for (const d of differentiators) lines.push(`- ${d.titulo}: ${d.descripcion}`)
  lines.push("")

  lines.push("## Preguntas frecuentes")
  for (const f of faqs) {
    lines.push(`P: ${f.pregunta}`)
    lines.push(`R: ${f.respuesta}`)
  }
  lines.push("")

  lines.push("## Contacto")
  lines.push(`Correo: ${brand.email}. WhatsApp: ${brand.whatsapp}. Sesión de diagnóstico de 30 minutos sin costo, agendable desde la página.`)

  return lines.join("\n")
}

export const agentCorpus = buildAgentCorpus()
