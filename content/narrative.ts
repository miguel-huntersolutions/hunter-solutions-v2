import type {
  Cnt,
  Differentiator,
  Faq,
  Positioning,
  Principle,
  Problem,
  Promise3,
  Stage,
} from "./types"

export const sectors: string[] = ["Legal", "Manufactura", "Salud", "Alimentos", "Consumo"]

export const positioning: Positioning = {
  h1: "No leas sobre nuestra IA. Habla con ella.",
  apoyo:
    "Construimos Fuerza Laboral Digital: agentes autónomos que se conectan a sus sistemas, incluido su ERP, deciden con las reglas de su negocio y ejecutan procesos completos de principio a fin. Trabajamos con empresas medianas de los sectores Legal, Manufactura, Salud, Alimentos y Consumo en Colombia.",
  invitacion: "Pruébelo ahora mismo: cuéntele su reto al Agente de Diagnóstico.",
  nuevosTitulo: "Nuevos como marca, no en oficio",
  nuevosArgumento:
    "Ser una marca joven nos permite construir AI-Native desde el primer día, sin sistemas heredados que defender. Lo que nos respalda no es una cifra de años corporativos: es la experiencia real del equipo operando procesos en manufactura e importación, administración y finanzas, atención y agendamiento, y el sector legal.",
}

// Los tres frenos a la adopción de IA (Oferta Definitiva)
export const problems: Problem[] = [
  {
    id: "no-se-por-donde-empezar",
    titulo: "No sabe por dónde empezar",
    descripcion:
      "Hay presión por adoptar IA, propuestas por todas partes y ningún mapa claro de qué proceso conviene automatizar primero ni cuánto valor hay en juego.",
    respuestaHst:
      "Empezamos por un diagnóstico con la lente CNT: evaluamos cultura, negocio y tecnología, priorizamos las oportunidades por valor y viabilidad, y entregamos una hoja de ruta concreta antes de escribir una línea de código.",
    servicioRecomendadoId: "diagnostico-oportunidades",
  },
  {
    id: "piloto-que-no-escala",
    titulo: "Probó IA y no pasó del piloto",
    descripcion:
      "El chatbot o el piloto de IA funcionó en la demo, pero nunca se integró a la operación real: no toca el ERP, nadie lo supervisa y el negocio sigue igual.",
    respuestaHst:
      "Diseñamos agentes con patrón de responsabilidad única que se integran a sus sistemas de registro y ejecutan el proceso completo, con supervisión humana y métricas de operación desde el primer día.",
    servicioRecomendadoId: "orquestacion-end-to-end",
  },
  {
    id: "riesgo-y-control",
    titulo: "Le preocupa el riesgo: datos, seguridad y cumplimiento",
    descripcion:
      "Su equipo de tecnología y su junta preguntan lo mismo: dónde quedan los datos, quién responde si la IA se equivoca y qué pasa si el proveedor desaparece.",
    respuestaHst:
      "Publicamos nuestra gobernanza completa: guardrails explícitos, trazabilidad de decisiones, despliegue en su perímetro si lo prefiere, y propiedad total del código y los datos por parte del cliente.",
    servicioRecomendadoId: "gobernanza-guardrails",
  },
]

export const principles: Principle[] = [
  {
    titulo: "Valor primero, conversación después",
    descripcion:
      "Puede probar nuestra IA y obtener resultados útiles sin registrarse ni dejar su correo. La conversación comercial llega cuando usted la pide.",
  },
  {
    titulo: "Prueba primero, promesa después",
    descripcion:
      "Ninguna capacidad se afirma sin que exista una forma de comprobarla en la página o un caso autorizado que la respalde.",
  },
  {
    titulo: "El activo es suyo",
    descripcion:
      "El código, la configuración y los datos son del cliente. Sin plataformas cerradas ni mensualidades obligatorias.",
  },
  {
    titulo: "Supervisión humana siempre",
    descripcion:
      "Cada agente opera con límites explícitos y una persona responsable puede ver, corregir y detener lo que hace.",
  },
  {
    titulo: "Independencia de proveedor",
    descripcion:
      "La arquitectura no depende de un único proveedor de modelos: si uno cambia de precio o de política, su operación no se detiene.",
  },
  {
    titulo: "Se mide o no existe",
    descripcion:
      "Todo proyecto define sus métricas de operación y de retorno antes de implementarse, y se revisan juntos en cada etapa.",
  },
]

export const stages: Stage[] = [
  {
    n: 1,
    nombre: "Entendemos",
    descripcion:
      "Estudiamos su operación con la lente CNT: cómo trabaja la gente, dónde se genera el valor y qué sistemas lo sostienen.",
    entregable: "Mapa de oportunidades priorizado por valor y viabilidad",
  },
  {
    n: 2,
    nombre: "Definimos",
    descripcion:
      "Diseñamos la solución sobre su realidad: alcance, arquitectura, integraciones, métricas de éxito y supuestos del retorno proyectado.",
    entregable: "Propuesta técnica y económica con supuestos explícitos",
  },
  {
    n: 3,
    nombre: "Implementamos",
    descripcion:
      "Construimos e integramos los agentes a sus sistemas, con guardrails, trazabilidad y supervisión humana desde el primer despliegue.",
    entregable: "Capacidad operando en producción, con documentación y código propio",
  },
  {
    n: 4,
    nombre: "Acompañamos",
    descripcion:
      "Estabilizamos, medimos contra los supuestos definidos y transferimos el conocimiento para que su equipo opere con autonomía.",
    entregable: "Informe de resultados contra supuestos y plan de evolución",
  },
]

// Promesa responsable — encuadre literal, no se reescribe.
export const promise: Promise3 = {
  capacidad:
    "La capacidad entregada y funcionando se garantiza: lo que se define en el alcance se construye, se integra y opera.",
  retorno:
    "El retorno se proyecta y se mide con supuestos claros, y se presenta como proyección seria, no como cifra garantizada.",
  riesgo:
    "El riesgo se comparte cuando el cliente lo prefiere: existen esquemas donde parte de la compensación se ata a los resultados medidos.",
}

export const cnt: Cnt = {
  cultura:
    "Cultura: evaluamos si su gente está lista para trabajar con agentes y qué necesita para adoptarlos sin fricción.",
  negocio:
    "Negocio: identificamos dónde la IA genera valor medible en su operación, no dónde queda bien en una presentación.",
  tecnologia:
    "Tecnología: revisamos sus sistemas y sus datos para saber qué se puede integrar hoy y qué hay que preparar primero.",
}

export const differentiators: Differentiator[] = [
  {
    titulo: "AI-Native de origen",
    descripcion:
      "No adaptamos consultoría tradicional a la IA: la empresa nació para construir agentes que operan procesos completos.",
  },
  {
    titulo: "Experiencia real del equipo",
    descripcion:
      "El equipo ha operado procesos en manufactura e importación, administración y finanzas, atención y agendamiento, y el sector legal.",
  },
  {
    titulo: "El activo es del cliente",
    descripcion:
      "Código, configuración y datos quedan en manos del cliente. Su información no se usa para entrenar modelos de terceros.",
  },
  {
    titulo: "Independencia de modelo",
    descripcion:
      "La arquitectura funciona con distintos proveedores de IA; cambiar de modelo no implica rehacer la solución.",
  },
  {
    titulo: "Despliegue donde usted decida",
    descripcion:
      "En la nube o dentro del perímetro de su empresa, según sus políticas de seguridad y cumplimiento.",
  },
  {
    titulo: "Lente CNT",
    descripcion:
      "Cada diagnóstico evalúa cultura, negocio y tecnología a la vez, porque un proyecto de IA falla cuando una de las tres se ignora.",
  },
  {
    titulo: "Promesa responsable",
    descripcion:
      "La capacidad entregada se asegura; el retorno se proyecta con supuestos explícitos y el riesgo puede compartirse.",
  },
  {
    titulo: "Precios de referencia publicados",
    descripcion:
      "Los rangos de inversión por nivel están a la vista, sin reuniones previas para conocer el orden de magnitud.",
  },
]

export const faqs: Faq[] = [
  {
    pregunta: "¿Cuánto cuesta un proyecto con Hunter Solutions Tech?",
    respuesta:
      "Publicamos rangos de referencia por nivel: Nivel 1 entre $1 y $10 millones COP, Nivel 2 entre $10 y $50 millones COP y Nivel 3 desde $50 millones COP, todos sin IVA. Cada proyecto se cotiza según su alcance; los rangos existen para que usted sepa el orden de magnitud antes de conversar.",
  },
  {
    pregunta: "¿Garantizan el retorno de la inversión?",
    respuesta:
      "Nuestra promesa tiene tres capas: la capacidad entregada y funcionando sí se asegura; el retorno se proyecta y se mide con supuestos claros, y se presenta como proyección seria, no como cifra garantizada; y el riesgo se comparte cuando el cliente lo prefiere.",
  },
  {
    pregunta: "¿Qué pasa con nuestros datos y nuestra información?",
    respuesta:
      "El código, la configuración y los datos son suyos. Las conversaciones con nuestros agentes se procesan mediante proveedores de IA bajo acuerdos que impiden usarlas para entrenar modelos públicos, y podemos desplegar dentro de su perímetro si sus políticas lo exigen.",
  },
  {
    pregunta: "¿Necesitamos un equipo técnico interno para trabajar con ustedes?",
    respuesta:
      "No para empezar. El diagnóstico y los primeros proyectos los operamos nosotros con sus responsables de proceso. En la etapa de acompañamiento transferimos el conocimiento para que su equipo, técnico o no, opere la solución con autonomía.",
  },
  {
    pregunta: "¿Cuánto tarda un proyecto típico?",
    respuesta:
      "Depende del nivel: un diagnóstico o una formación del Nivel 1 se resuelve en semanas; un agente productivo del Nivel 2 suele tomar de uno a tres meses; una fuerza laboral digital del Nivel 3 se implementa por fases. El plazo concreto se define en la etapa Definimos, con el alcance a la vista.",
  },
  {
    pregunta: "¿Cómo empezamos?",
    respuesta:
      "De dos formas, y las dos son gratis: hable con el Agente de Diagnóstico en esta página y reciba una primera lectura de su reto en minutos, o agende una sesión de 30 minutos con el equipo. Le recomendamos empezar por el Diagnóstico de Oportunidades con IA, el punto de entrada de menor riesgo del catálogo.",
  },
]
