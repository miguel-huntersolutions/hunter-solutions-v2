// content/sectores.ts — Páginas de sector de Hunter Solutions Tech.
// Estructura de datos fácil de editar. Los servicios se referencian por slug
// (fuente única en commercial.ts) y los casos por slug (fuente única en trust.ts).
// Donde no hay caso real todavía, se deja `caso: null` para mostrar un [COMPLETAR].

export type SectorFaq = { pregunta: string; respuesta: string }

export type SectorPage = {
  /** slug de URL: /sectores/[slug] */
  slug: string
  /** nombre del sector, coincide con content/narrative.ts */
  sector: string
  /** keyword comercial para title/description */
  keyword: string
  /** meta description */
  description: string
  /** titular H1 orientado a valor */
  h1: string
  /** BLUF: dolor operativo + respuesta directa en el primer párrafo */
  bluf: string
  /** cómo lo resuelven los agentes de HST */
  solucion: string[]
  /** slugs de 3-4 servicios aplicables (referencia a commercial.ts) */
  servicios: string[]
  /** caso existente (slug + título) o null si aún no hay */
  caso: { slug: string; titulo: string; resumen: string } | null
  faq: SectorFaq[]
}

export const sectorPages: SectorPage[] = [
  {
    slug: "legal",
    sector: "Legal",
    keyword: "IA para el sector legal en Colombia",
    description:
      "IA para el sector legal en Colombia: agentes que operan la revisión de contratos, la búsqueda de precedentes y la generación de borradores, con validación de un abogado.",
    h1: "IA para firmas y áreas legales: menos horas mecánicas, más criterio jurídico",
    bluf: "En el sector legal, los abogados senior pierden horas facturables en trabajo mecánico: buscar precedentes en un corpus enorme, comparar cláusulas y preparar borradores desde cero. Los agentes de Hunter Solutions Tech operan ese trabajo de base sobre sus propios documentos y plantillas, con cita a la fuente y validación humana obligatoria, para que su equipo dedique el tiempo a lo que de verdad requiere criterio jurídico.",
    solucion: [
      "Búsqueda semántica sobre su corpus de contratos y precedentes, en lenguaje natural y con cita al documento de origen.",
      "Comparación de cláusulas y detección de desviaciones frente a sus estándares, para revisar más rápido y con menos riesgo.",
      "Generación de primeros borradores desde sus propias plantillas, que el abogado responsable revisa y ajusta antes de que salga nada.",
    ],
    servicios: [
      "agente-de-revision-legal",
      "piloto-de-asistente-de-conocimiento",
      "procesamiento-inteligente-de-documentos",
      "cerebro-corporativo-productivo",
    ],
    caso: {
      slug: "gestion-inteligente-de-contratos-legales",
      titulo: "Gestión inteligente de contratos para una firma legal",
      resumen:
        "Una firma con miles de contratos pasó de dedicar horas de abogados senior a buscar precedentes y preparar borradores, a resolver esa base en minutos con validación humana.",
    },
    faq: [
      {
        pregunta: "¿La IA reemplaza el criterio del abogado?",
        respuesta:
          "No. El agente hace el trabajo de base —buscar, comparar y redactar un primer borrador— y el abogado responsable valida y decide. Ninguna pieza sale sin revisión humana.",
      },
      {
        pregunta: "¿Qué pasa con la confidencialidad de los documentos?",
        respuesta:
          "Los agentes operan sobre su corpus con los permisos que usted define y dejan trazabilidad de cada consulta. La gobernanza de acceso y auditoría es parte del diseño, no un añadido.",
      },
      {
        pregunta: "¿Puedo empezar con un solo tipo de contrato?",
        respuesta:
          "Sí, es lo recomendable. Se valida sobre un tipo de documento acotado y, con la evidencia de valor, se amplía al resto del corpus.",
      },
    ],
  },
  {
    slug: "manufactura",
    sector: "Manufactura",
    keyword: "IA para el sector de manufactura en Colombia",
    description:
      "IA para manufactura en Colombia: agentes que operan compras, aduanas, inventarios y facturación conectados a su ERP, con supervisión humana en lo sensible.",
    h1: "IA para manufactura: procesos de compras, inventario y facturación que se operan solos",
    bluf: "En manufactura, el back office administrativo —órdenes de compra, trámites de aduana, conciliación de inventario y facturación— consume equipos enteros en tareas repetitivas y propensas a error. Los agentes de Hunter Solutions Tech se conectan a su ERP y operan esos procesos de principio a fin, escalando a una persona solo las excepciones, para que su operación gane velocidad sin sumar carga administrativa.",
    solucion: [
      "Órdenes de compra y conciliación de inventario operadas sobre su ERP, con las reglas de su negocio.",
      "Procesamiento automático de documentos de aduana, remisiones y facturas, con extracción y validación de datos.",
      "Excepciones y decisiones sensibles escaladas a una persona antes de ejecutarse, con registro de cada acción.",
    ],
    servicios: [
      "integracion-de-ia-con-el-erp",
      "procesamiento-inteligente-de-documentos",
      "automatizacion-de-proceso-documental",
      "orquestacion-de-procesos-end-to-end",
    ],
    caso: null,
    faq: [
      {
        pregunta: "¿Necesito cambiar mi ERP para usar los agentes?",
        respuesta:
          "No. Los agentes se integran al ERP que ya usa y actúan sobre sus datos reales, sin migraciones forzadas.",
      },
      {
        pregunta: "¿Cómo se controla el error en procesos críticos como facturación?",
        respuesta:
          "Se definen umbrales: lo rutinario se ejecuta de forma autónoma y las decisiones sensibles pasan por aprobación humana. Todo queda registrado para auditar.",
      },
      {
        pregunta: "¿Por dónde conviene empezar en una planta?",
        respuesta:
          "Por un proceso repetitivo, de alto volumen y medible, como el procesamiento de facturas o remisiones. Con esa evidencia se escala al resto de la operación.",
      },
    ],
  },
  {
    slug: "salud",
    sector: "Salud",
    keyword: "IA para el sector salud en Colombia",
    description:
      "IA para el sector salud en Colombia: agentes que resuelven agendamiento y trámites administrativos sin fricción para el paciente, con supervisión humana.",
    h1: "IA para salud: agendamiento y trámites administrativos sin fricción para el paciente",
    bluf: "En salud, el personal administrativo se satura con agendamiento, autorizaciones y trámites repetitivos, mientras el paciente espera. Los agentes de Hunter Solutions Tech operan esas tareas administrativas conectados a sus sistemas, con supervisión humana en lo clínico y lo sensible, para liberar a su equipo y mejorar la experiencia del paciente sin comprometer el control.",
    solucion: [
      "Agendamiento y reprogramación de citas operados de punta a punta, integrados a sus sistemas.",
      "Gestión de trámites y autorizaciones administrativas, con extracción y validación de la documentación requerida.",
      "Supervisión humana obligatoria en toda decisión clínica o sensible, con trazabilidad completa de cada acción.",
    ],
    servicios: [
      "automatizacion-de-proceso-documental",
      "piloto-de-asistente-de-conocimiento",
      "integracion-de-ia-con-el-erp",
      "tablero-de-supervision-humana",
    ],
    caso: null,
    faq: [
      {
        pregunta: "¿Los agentes toman decisiones clínicas?",
        respuesta:
          "No. Los agentes operan tareas administrativas —agendar, tramitar, organizar información—. Cualquier decisión clínica queda siempre en manos del personal de salud.",
      },
      {
        pregunta: "¿Cómo se protegen los datos sensibles del paciente?",
        respuesta:
          "Los agentes trabajan con los permisos que usted define y dejan registro auditable de cada acción. El manejo de datos sensibles se gobierna desde el diseño de la solución.",
      },
      {
        pregunta: "¿Se integra con el sistema de información que ya uso?",
        respuesta:
          "Sí. La integración a sus sistemas actuales es parte del trabajo; no exigimos reemplazar su software para empezar.",
      },
    ],
  },
  {
    slug: "alimentos",
    sector: "Alimentos",
    keyword: "IA para el sector de alimentos en Colombia",
    description:
      "IA para el sector de alimentos en Colombia: agentes que apoyan trazabilidad, control de calidad y conciliación en la línea de producción, conectados a su ERP.",
    h1: "IA para alimentos: trazabilidad, calidad y conciliación operadas con agentes",
    bluf: "En la industria de alimentos, la trazabilidad, el control de calidad y la conciliación entre producción, inventario y facturación generan un volumen enorme de registros y documentos que hoy se manejan a mano. Los agentes de Hunter Solutions Tech operan esa carga documental y de conciliación conectados a su ERP, con supervisión humana en los puntos críticos, para darle control sin frenar la línea.",
    solucion: [
      "Captura y validación de registros de trazabilidad y calidad, con extracción automática desde sus formatos.",
      "Conciliación entre producción, inventario y facturación operada sobre su ERP, con alertas ante desviaciones.",
      "Excepciones y hallazgos de calidad escalados a una persona, con registro auditable de cada decisión.",
    ],
    servicios: [
      "integracion-de-ia-con-el-erp",
      "procesamiento-inteligente-de-documentos",
      "orquestacion-de-procesos-end-to-end",
      "tablero-de-supervision-humana",
    ],
    caso: null,
    faq: [
      {
        pregunta: "¿Los agentes ayudan con requisitos de trazabilidad y auditoría?",
        respuesta:
          "Sí. Al capturar y organizar registros de forma consistente y dejar trazabilidad de cada acción, facilitan tener la documentación lista para auditorías y controles.",
      },
      {
        pregunta: "¿Funciona con el volumen de una línea de producción?",
        respuesta:
          "Sí. Los agentes están pensados para operaciones de alto volumen; la supervisión humana se concentra en excepciones, no en revisar todo a mano.",
      },
      {
        pregunta: "¿Qué se necesita para empezar?",
        respuesta:
          "Un proceso concreto y medible, como la conciliación de un tipo de documento. Se valida el valor y desde ahí se amplía a más procesos.",
      },
    ],
  },
  {
    slug: "consumo",
    sector: "Consumo",
    keyword: "IA para el sector de consumo masivo en Colombia",
    description:
      "IA para consumo masivo y retail en Colombia: agentes que operan atención, cartera y datos de venta, y automatizan procesos de alto volumen como el reclutamiento.",
    h1: "IA para consumo y retail: atención, cartera y datos de venta que se convierten en decisiones",
    bluf: "En consumo masivo y retail, el alto volumen de atención, gestión de cartera, procesamiento de documentos y contratación satura a los equipos y ralentiza las decisiones. Los agentes de Hunter Solutions Tech operan esos procesos de alto volumen conectados a sus sistemas y convierten los datos de venta en información accionable, para que su equipo decida con evidencia y dedique el tiempo a lo estratégico.",
    solucion: [
      "Procesos de alto volumen —como la preselección de hojas de vida— operados con criterios trazables y auditables.",
      "Atención y gestión de cartera apoyadas por agentes conectados a sus sistemas, con escalamiento a una persona cuando aplica.",
      "Datos de venta consolidados y consultables en lenguaje natural, para convertir información dispersa en decisiones.",
    ],
    servicios: [
      "automatizacion-de-reclutamiento",
      "cerebro-corporativo-productivo",
      "procesamiento-inteligente-de-documentos",
      "diagnostico-de-oportunidades-con-ia",
    ],
    caso: {
      slug: "procesamiento-automatico-de-hojas-de-vida",
      titulo: "Procesamiento automático de hojas de vida a escala",
      resumen:
        "Un equipo que dedicaba la mayor parte del proceso a leer hojas de vida pasó a concentrarse en entrevistar candidatos filtrados con criterios trazables.",
    },
    faq: [
      {
        pregunta: "¿Sirve para operaciones con mucho volumen y estacionalidad?",
        respuesta:
          "Sí. Los agentes absorben los picos de volumen sin sumar personal temporal, manteniendo criterios consistentes y trazables.",
      },
      {
        pregunta: "¿Puedo usar los datos de venta que ya tengo dispersos?",
        respuesta:
          "Sí. Parte del trabajo es consolidar esa información para que se pueda consultar en lenguaje natural y sirva para decidir, no solo para reportar.",
      },
      {
        pregunta: "¿Cómo se mantiene la calidad en procesos como la contratación?",
        respuesta:
          "Con criterios explícitos y trazables y con supervisión humana en la decisión final. El agente filtra y ordena; la persona decide.",
      },
    ],
  },
]

export function getSectorPageBySlug(slug: string) {
  return sectorPages.find((s) => s.slug === slug)
}
