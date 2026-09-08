// Tipos del content model — fuente única de verdad de Hunter Solutions Tech

export type Brand = {
  legalName: string
  shortName: string
  descriptorCopy: string
  domain: string
  email: string
  whatsapp: string
  socials: { red: string; url: string }[]
}

export type Claim = {
  valor: number | string
  encuadre: string
  fuente: string
  vigencia: string
}

export type Problem = {
  id: string
  titulo: string
  descripcion: string
  respuestaHst: string
  servicioRecomendadoId: string
}

export type Principle = { titulo: string; descripcion: string }

export type Stage = {
  n: 1 | 2 | 3 | 4
  nombre: string
  descripcion: string
  entregable: string
}

export type Promise3 = {
  capacidad: string
  retorno: string
  riesgo: string
}

export type Level = {
  id: 1 | 2 | 3
  nombre: string
  rangoMin: number
  rangoMax: number
  moneda: "COP"
  incluyeIVA: false
  nota: string
}

export type Service = {
  id: string
  slug: string
  nivel: 1 | 2 | 3
  nombre: string
  descripcion: string
  queSolucionamos: string
  comoLoHacemos: string
  ejemplo: string
  sectoresRelevantes: string[]
  esPuertaDeEntrada?: boolean
}

export type Role = {
  id: string
  icono: "cotizaciones" | "agendamiento" | "finanzas"
  nombre: string
  descripcion: string
}

export type Differentiator = { titulo: string; descripcion: string }

export type Faq = { pregunta: string; respuesta: string }

export type Governance = {
  arquitectura: { termino: string; beneficio: string }[]
  observabilidad: { termino: string; beneficio: string }[]
  metodologia: string
  propiedadDelActivo: string
}

export type CaseStudy = {
  id: string
  slug: string
  titulo: string
  sector: string
  reto: string
  queConstruimos: string
  comoFunciona: string
  resultado: {
    texto: string
    encuadre: string
    fuente: string
    // 2 a 3 datos destacados. Los valores se dejan como placeholders para que el
    // equipo los reemplace con la medición real de cada cliente; no se inventan cifras.
    metricas?: { etiqueta: string; valor: string }[]
  } | null
  servicioId: string
  etapas: { etapa: 1 | 2 | 3 | 4; queOcurrio: string }[]
  anonimizado: boolean
  autorizacion: { fecha: string; responsable: string } | null
}

export type TeamExperience = { dominio: string; descripcion: string }

export type Partners = {
  queEs: string
  paraQuien: string
  pasos: { n: number; titulo: string; descripcion: string }[]
  beneficioResumen: string
}

export type Training = {
  paraQuien: string
  formatos: { nombre: string; descripcion: string }[]
  queQueda: string
  comoSeAgenda: string
}

export type Cnt = {
  cultura: string
  negocio: string
  tecnologia: string
}

export type Positioning = {
  h1: string
  /** El H1 partido en líneas, para animarlas por separado sin duplicar el texto */
  h1Lineas: string[]
  apoyo: string
  invitacion: string
  nuevosTitulo: string
  nuevosArgumento: string
}
