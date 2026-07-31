// content/resources.ts — Recursos editoriales de Hunter Solutions Tech.
// Estructura de datos fácil de editar: cada artículo es un objeto con su cuerpo
// en secciones (H2 autoconclusivos), FAQ opcional y enlaces relacionados.
// Para publicar un borrador, cambie `estado` a "publicado".

export type ResourceSection = {
  /** id para anclas y tabla de contenidos (kebab-case, sin tildes) */
  id: string
  /** H2 autoconclusivo: se entiende el mensaje con solo leer el título */
  h2: string
  parrafos: string[]
  /** lista de puntos opcional al final de la sección */
  lista?: string[]
}

export type ResourceFaq = { pregunta: string; respuesta: string }

export type ResourceLink = { href: string; label: string }

export type Resource = {
  slug: string
  titulo: string
  /** extracto para el índice y la meta description */
  extracto: string
  /** fecha ISO de publicación (YYYY-MM-DD) */
  datePublished: string
  /** fecha ISO de última modificación (YYYY-MM-DD) */
  dateModified: string
  estado: "borrador" | "publicado"
  /** BLUF: respuesta directa en el primer párrafo */
  bluf: string
  secciones: ResourceSection[]
  faq?: ResourceFaq[]
  /** enlaces a la página pilar y a los servicios relacionados */
  relacionados: ResourceLink[]
}

export const resources: Resource[] = [
  {
    slug: "que-es-un-agente-de-ia-vs-chatbot",
    titulo: "¿Qué es un agente de IA y en qué se diferencia de un chatbot?",
    extracto:
      "Un chatbot conversa; un agente de IA ejecuta. Le explicamos la diferencia en términos de negocio y por qué importa cuando busca resultados, no respuestas.",
    datePublished: "2026-07-15",
    dateModified: "2026-07-15",
    estado: "borrador",
    bluf: "Un agente de IA es un sistema que ejecuta procesos completos conectándose a sus herramientas, mientras que un chatbot solo sostiene una conversación. La diferencia práctica es simple: el chatbot le dice cómo hacer algo; el agente lo hace por usted, con supervisión humana y trazabilidad. Si su meta es reducir carga operativa y no solo responder preguntas, lo que necesita es un agente.",
    secciones: [
      {
        id: "un-chatbot-conversa-un-agente-ejecuta",
        h2: "Un chatbot conversa, un agente ejecuta",
        parrafos: [
          "La forma más rápida de distinguirlos es mirar qué queda al final de la interacción. Con un chatbot, al terminar la conversación usted tiene una respuesta y todavía le falta hacer el trabajo. Con un agente, al terminar el trabajo está hecho: la cotización quedó generada, la cuenta conciliada, la cita agendada.",
          "Esto no es un detalle técnico, es una diferencia de valor. El chatbot descarga la primera línea de atención; el agente descarga la operación completa. Por eso un chatbot mejora la experiencia de consulta, pero un agente mejora la capacidad productiva de su empresa.",
        ],
      },
      {
        id: "el-agente-se-conecta-a-sus-sistemas",
        h2: "El agente se conecta a sus sistemas y actúa sobre sus datos reales",
        parrafos: [
          "Un chatbot suele vivir aislado del backoffice: sabe conversar, pero no tiene acceso a su ERP ni a sus reglas de negocio. Un agente se integra a los sistemas que ya usa y opera sobre la información real, con los permisos que usted define.",
          "Gracias a esa conexión, el agente no improvisa: aplica sus políticas, sus plantillas y sus criterios, y deja registro de cada acción para que todo sea auditable.",
        ],
      },
      {
        id: "cuando-conviene-cada-uno",
        h2: "Cuándo conviene un chatbot y cuándo conviene un agente",
        parrafos: [
          "No siempre necesita lo más sofisticado. Si su prioridad es resolver dudas frecuentes de clientes o empleados, un chatbot bien hecho es suficiente. Si su prioridad es quitar trabajo repetitivo de alto volumen a su equipo, necesita un agente que ejecute.",
        ],
        lista: [
          "Elija un chatbot si busca orientar, responder y derivar consultas.",
          "Elija un agente si busca ejecutar procesos completos y liberar horas de su equipo.",
          "En muchos casos conviven: el agente hace el trabajo y una capa conversacional recibe la solicitud.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Un agente de IA reemplaza a mi equipo?",
        respuesta:
          "No. El agente asume el trabajo repetitivo y de alto volumen para que su equipo se concentre en criterio, relaciones y decisiones. Suma capacidad, no recorta personas.",
      },
      {
        pregunta: "¿Puedo empezar con un chatbot y evolucionar a un agente?",
        respuesta:
          "Sí, es un camino común. Se empieza validando valor con algo acotado y luego se conecta a sus sistemas para que ejecute procesos completos.",
      },
    ],
    relacionados: [
      { href: "/fuerza-laboral-digital", label: "Fuerza Laboral Digital: el concepto, explicado" },
      { href: "/servicios/prueba-de-concepto-de-agente", label: "Servicio: Prueba de concepto de agente" },
      {
        href: "/servicios/piloto-de-asistente-de-conocimiento",
        label: "Servicio: Piloto de asistente de conocimiento interno",
      },
    ],
  },
  {
    slug: "como-empezar-con-ia-en-su-empresa",
    titulo: "Cómo empezar con IA en su empresa",
    extracto:
      "No empiece por la herramienta, empiece por el proceso. Una ruta pragmática para adoptar IA sin proyectos eternos ni promesas vacías.",
    datePublished: "2026-07-18",
    dateModified: "2026-07-18",
    estado: "borrador",
    bluf: "La mejor forma de empezar con IA en su empresa es elegir un proceso concreto, repetitivo y medible, y probar una solución acotada sobre él antes de escalar. No arranque comprando una plataforma ni lanzando una transformación completa: valide valor en semanas sobre un caso real, mida el resultado y desde ahí decida cómo crecer.",
    secciones: [
      {
        id: "empiece-por-el-proceso-no-por-la-herramienta",
        h2: "Empiece por el proceso, no por la herramienta",
        parrafos: [
          "El error más común es preguntar primero qué herramienta de IA comprar. La pregunta correcta es cuál de sus procesos consume más horas repetitivas de gente calificada. Ahí está el retorno, y ahí debe apuntar el primer proyecto.",
          "Un buen candidato para empezar tiene tres características: es repetitivo, tiene volumen y su resultado se puede medir. Con eso, la conversación deja de ser sobre tecnología y pasa a ser sobre valor.",
        ],
      },
      {
        id: "valide-en-pequeno-antes-de-escalar",
        h2: "Valide en pequeño antes de comprometer un presupuesto grande",
        parrafos: [
          "Adoptar IA no exige un proyecto de un año. Conviene arrancar con un alcance pequeño que demuestre valor rápido y genere aprendizaje real sobre sus datos y su operación.",
          "Ese primer paso reduce el riesgo: si funciona, tiene evidencia para escalar; si no, aprendió barato. En cualquier caso avanza con datos, no con suposiciones.",
        ],
        lista: [
          "Elija un proceso con dueño claro dentro de la empresa.",
          "Defina antes de empezar cómo medirá el resultado.",
          "Ponga una fecha corta para la primera evidencia de valor.",
        ],
      },
      {
        id: "gobierne-desde-el-primer-dia",
        h2: "Gobierne el riesgo desde el primer día, no al final",
        parrafos: [
          "Empezar bien también significa decidir desde el inicio qué decisiones puede tomar la IA sola y cuáles requieren aprobación humana. La supervisión no es un freno, es lo que le permite confiar en el resultado y escalar tranquilo.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Cuánto tiempo toma ver el primer resultado?",
        respuesta:
          "Un alcance acotado busca mostrar evidencia de valor en semanas, no en meses. La idea es aprender rápido sobre un proceso real antes de comprometer una inversión mayor.",
      },
      {
        pregunta: "¿Necesito tener mis datos perfectos para empezar?",
        respuesta:
          "No. Se empieza con lo que hay y, si es necesario, se hace una preparación de datos acotada. Esperar a tener todo perfecto es la mejor forma de no empezar nunca.",
      },
    ],
    relacionados: [
      { href: "/fuerza-laboral-digital", label: "Fuerza Laboral Digital: el concepto, explicado" },
      {
        href: "/servicios/diagnostico-de-oportunidades-con-ia",
        label: "Servicio: Diagnóstico de Oportunidades con IA",
      },
      {
        href: "/servicios/automatizacion-de-proceso-documental",
        label: "Servicio: Automatización de un proceso documental",
      },
    ],
  },
  {
    slug: "cuanto-cuesta-implementar-ia-en-colombia",
    titulo: "Cuánto cuesta implementar IA en una empresa en Colombia",
    extracto:
      "Publicamos rangos de inversión en pesos por nivel para que planee sin sorpresas. Le explicamos qué incluye cada nivel y de qué depende el precio.",
    datePublished: "2026-07-22",
    dateModified: "2026-07-22",
    estado: "borrador",
    bluf: "Implementar IA en una empresa en Colombia puede costar desde alrededor de un millón de pesos para una exploración inicial hasta cientos de millones para un programa que opera procesos completos. En Hunter Solutions Tech trabajamos con tres niveles de inversión y publicamos los rangos en pesos por adelantado, para que usted planee según el alcance que necesita y no según una cotización opaca.",
    secciones: [
      {
        id: "tres-niveles-de-inversion",
        h2: "Trabajamos con tres niveles de inversión, con rangos publicados",
        parrafos: [
          "En lugar de esconder el precio detrás de una reunión de ventas, organizamos el trabajo en tres niveles según el alcance. Cada nivel tiene un rango de referencia en pesos colombianos, y cada proyecto se cotiza según su alcance real dentro de ese rango.",
        ],
        lista: [
          "Nivel 1, Explora: entre un millón y diez millones de pesos. Primeros pasos con IA aplicada, para validar valor rápido.",
          "Nivel 2, Implementa: entre diez y cincuenta millones de pesos. Un agente operando un proceso real, integrado a sus sistemas.",
          "Nivel 3, Escala: desde cincuenta millones de pesos. Orquestación de procesos completos y capacidad digital que crece con su operación.",
        ],
      },
      {
        id: "de-que-depende-el-precio",
        h2: "El precio depende del alcance, no de un tarifario fijo",
        parrafos: [
          "Dos proyectos del mismo nivel pueden costar distinto según qué tan complejo sea el proceso, cuántos sistemas haya que integrar y en qué estado estén sus datos. Por eso los rangos son de referencia: le dan un orden de magnitud para planear, y la cifra exacta se define al acordar el alcance.",
          "Lo que no cambia es la transparencia: usted sabe en qué nivel se ubica antes de comprometerse, y la inversión se comunica sin IVA incluido para que el cálculo sea claro.",
        ],
      },
      {
        id: "como-proteger-el-retorno",
        h2: "Cómo proteger el retorno de su inversión en IA",
        parrafos: [
          "El costo se entiende mejor frente al valor que libera. Un agente que quita horas repetitivas a personal calificado se paga con el tiempo que devuelve. La forma de proteger ese retorno es empezar por un proceso medible y escalar solo cuando la evidencia lo justifica.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Los rangos incluyen IVA?",
        respuesta:
          "No. Los rangos publicados se comunican sin IVA para que el cálculo del alcance sea claro. El impuesto se suma según la normativa vigente.",
      },
      {
        pregunta: "¿Por qué el Nivel 3 se comunica como desde?",
        respuesta:
          "Porque son programas que operan procesos completos y su alcance varía mucho entre empresas. Publicamos un piso claro, desde cincuenta millones de pesos, y cada programa se cotiza según su alcance.",
      },
    ],
    relacionados: [
      { href: "/servicios", label: "Ver los servicios y rangos por nivel" },
      { href: "/fuerza-laboral-digital", label: "Fuerza Laboral Digital: el concepto, explicado" },
      {
        href: "/servicios/diagnostico-de-oportunidades-con-ia",
        label: "Servicio: Diagnóstico de Oportunidades con IA",
      },
    ],
  },
  {
    slug: "human-in-the-loop-supervision-de-agentes-de-ia",
    titulo: "Human-in-the-loop: cómo se supervisan los agentes de IA",
    extracto:
      "Human-in-the-loop significa que una persona aprueba las decisiones sensibles antes de que se ejecuten. Le explicamos cómo se aplica para que confíe en la IA sin perder control.",
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    estado: "borrador",
    bluf: "Human-in-the-loop, o humano en el ciclo, es el principio de que un agente de IA propone y una persona dispone en las decisiones que importan. En la práctica significa que el agente ejecuta lo rutinario de forma autónoma, pero escala a un humano las decisiones sensibles o inciertas antes de actuar. Así usted gana velocidad sin ceder el control ni la responsabilidad sobre lo que ocurre.",
    secciones: [
      {
        id: "el-agente-propone-la-persona-dispone",
        h2: "El agente propone y la persona dispone en lo que importa",
        parrafos: [
          "Autonomía total no es el objetivo; el objetivo es capacidad con control. Por eso definimos, junto con usted, qué decisiones puede tomar el agente por su cuenta y cuáles deben pasar por aprobación humana antes de ejecutarse.",
          "Ese umbral se ajusta a su apetito de riesgo. Un pago por encima de cierto monto, una respuesta legal delicada o una excepción poco común pueden requerir siempre un visto bueno humano, mientras el resto fluye sin fricción.",
        ],
      },
      {
        id: "trazabilidad-de-cada-decision",
        h2: "Cada decisión queda registrada con su fuente y su razón",
        parrafos: [
          "Supervisar no es solo aprobar, es poder revisar después. Cada acción del agente queda con registro de qué hizo, con qué datos y por qué. Esa trazabilidad permite auditar, corregir y mejorar el sistema con el tiempo.",
          "Para el líder, esto convierte a la IA en algo gobernable: no es una caja negra, es un colaborador cuyas decisiones se pueden inspeccionar.",
        ],
      },
      {
        id: "supervision-que-escala",
        h2: "La supervisión escala con observabilidad, no con más gente mirando",
        parrafos: [
          "A medida que crece el volumen, no tiene sentido que una persona revise todo. Por eso la supervisión se apoya en tableros que muestran qué está haciendo la Fuerza Laboral Digital, alertan sobre las excepciones y concentran la atención humana donde de verdad aporta.",
        ],
      },
    ],
    faq: [
      {
        pregunta: "¿Human-in-the-loop hace más lento el proceso?",
        respuesta:
          "No de forma general. Lo rutinario se ejecuta sin intervención; solo las decisiones sensibles o inciertas esperan aprobación. El objetivo es velocidad con control, no revisar todo a mano.",
      },
      {
        pregunta: "¿Quién es responsable de lo que hace el agente?",
        respuesta:
          "La organización mantiene la responsabilidad. Por eso definimos umbrales de aprobación humana y dejamos trazabilidad de cada acción, para que siempre haya un dueño y un registro auditable.",
      },
    ],
    relacionados: [
      { href: "/gobernanza", label: "Gobernanza e ingeniería de IA en HST" },
      { href: "/fuerza-laboral-digital", label: "Fuerza Laboral Digital: el concepto, explicado" },
      {
        href: "/servicios/tablero-de-supervision-humana",
        label: "Servicio: Tablero de supervisión humana y observabilidad",
      },
    ],
  },
]

/** Artículos visibles públicamente: solo los que están publicados. */
export const publishedResources = resources.filter((r) => r.estado === "publicado")

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug)
}

/** Cuenta las palabras del cuerpo de un artículo para estimar el tiempo de lectura. */
function countWords(r: Resource): number {
  const parts: string[] = [r.bluf]
  for (const s of r.secciones) {
    parts.push(s.h2, ...s.parrafos, ...(s.lista ?? []))
  }
  for (const f of r.faq ?? []) {
    parts.push(f.pregunta, f.respuesta)
  }
  return parts.join(" ").trim().split(/\s+/).length
}

/** Tiempo de lectura estimado en minutos (a ~200 palabras por minuto, mínimo 1). */
export function readingMinutes(r: Resource): number {
  return Math.max(1, Math.round(countWords(r) / 200))
}

/** Fecha ISO a formato legible en español colombiano: "15 de julio de 2026". */
export function formatResourceDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
