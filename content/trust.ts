import type {
  CaseStudy,
  Governance,
  LineaConfianza,
  Partners,
  PruebaPropia,
  TeamExperience,
  Training,
} from "./types"

export const governance: Governance = {
  arquitectura: [
    {
      termino: "Entorno OpenClaw con principios BOAT",
      beneficio:
        "Las soluciones se estructuran sobre un marco de arquitectura probado, no sobre experimentos: cada pieza tiene un lugar y una razón.",
    },
    {
      termino: "Patrón de responsabilidad única",
      beneficio:
        "Cada agente hace una sola cosa y vive en un contenedor aislado: si uno falla, el resto de la operación sigue funcionando.",
    },
    {
      termino: "Integración con su ERP existente",
      beneficio:
        "No hay que reemplazar sus sistemas para adoptar IA: los agentes trabajan sobre lo que su empresa ya usa.",
    },
    {
      termino: "Despliegue en nube o en su perímetro",
      beneficio:
        "Usted decide dónde viven sus datos según sus políticas de seguridad y cumplimiento, no según la conveniencia del proveedor.",
    },
    {
      termino: "Independencia de proveedor de modelo",
      beneficio:
        "Si un proveedor de IA cambia de precio o de política, su solución se ajusta sin rehacerse: la arquitectura no está casada con nadie.",
    },
  ],
  observabilidad: [
    {
      termino: "Guardrails",
      beneficio:
        "Límites explícitos sobre lo que la IA puede y no puede hacer, para reducir el riesgo de comportamientos no deseados.",
    },
    {
      termino: "Trazabilidad de decisiones",
      beneficio:
        "Cada acción de un agente queda registrada con los datos que la motivaron: se puede auditar quién decidió qué y por qué.",
    },
    {
      termino: "Supervisión humana",
      beneficio:
        "Las decisiones sensibles pasan por aprobación de una persona; los agentes proponen, la organización dispone.",
    },
    {
      termino: "Estabilización y auditorías",
      beneficio:
        "Los sistemas se revisan periódicamente contra sus métricas para detectar desviaciones antes de que afecten la operación.",
    },
  ],
  metodologia:
    "Trabajamos en cuatro etapas: Entendemos, Definimos, Implementamos y Acompañamos, con entregables verificables en cada una y métricas acordadas antes de construir.",
  propiedadDelActivo:
    "El código, la configuración y los datos son del cliente. Su información no se usa para entrenar modelos de terceros. Sin plataformas cerradas ni mensualidades obligatorias.",
}

// TODO negocio: autorizaciones pendientes de ratificación formal por los socios.
export const cases: CaseStudy[] = [
  {
    id: "contratos-firma-legal",
    slug: "gestion-inteligente-de-contratos-legales",
    titulo: "Gestión inteligente de contratos para una firma legal",
    sector: "Legal",
    reto: "Una firma legal acumulaba miles de contratos en su corpus documental. Buscar precedentes, comparar cláusulas y preparar borradores consumía horas facturables de abogados senior en trabajo mecánico.",
    queConstruimos:
      "Un sistema de recuperación y generación sobre el corpus documental completo de la firma: búsqueda semántica de cláusulas, comparación entre contratos y generación de borradores desde sus propias plantillas.",
    comoFunciona:
      "El abogado pregunta en lenguaje natural, el sistema recupera los pasajes relevantes del corpus con cita al documento de origen y genera borradores que el abogado responsable revisa y ajusta. Ninguna pieza sale sin validación humana.",
    resultado: {
      texto:
        "La búsqueda de precedentes y la preparación de primeros borradores pasó de horas a minutos.",
      encuadre:
        "Medición interna del equipo sobre los flujos de trabajo intervenidos; los tiempos exactos varían según el tipo de contrato.",
      fuente: "HST_Oferta_Cliente_Definitiva.docx — ejemplos de IA nativa",
      metricas: [
        { etiqueta: "Tiempo de preparación de un borrador (antes y después)", valor: "[COMPLETAR con dato real del cliente]" },
        { etiqueta: "Reducción del tiempo de búsqueda de precedentes", valor: "[COMPLETAR con dato real del cliente]" },
        { etiqueta: "Contratos indexados en el corpus", valor: "[COMPLETAR con dato real del cliente]" },
      ],
    },
    servicioId: "agente-revision-legal",
    etapas: [
      { etapa: 1, queOcurrio: "Se mapeó el corpus documental y los flujos de búsqueda y redacción de la firma, identificando los tipos de contrato de mayor volumen." },
      { etapa: 2, queOcurrio: "Se definió el alcance: búsqueda semántica con citas, comparación de cláusulas y generación de borradores desde plantillas propias, con validación obligatoria del abogado." },
      { etapa: 3, queOcurrio: "Se indexó el corpus con control de acceso, se construyó el asistente y se integró al flujo de trabajo existente de la firma." },
      { etapa: 4, queOcurrio: "Se midió la adopción y la calidad de las respuestas con los abogados, ajustando la recuperación hasta estabilizar el sistema en la operación diaria." },
    ],
    anonimizado: true,
    autorizacion: { fecha: "2026-07-20", responsable: "Socios HST" },
  },
  {
    id: "hojas-de-vida-rrhh",
    slug: "procesamiento-automatico-de-hojas-de-vida",
    titulo: "Procesamiento automático de hojas de vida a escala",
    sector: "Consumo",
    reto: "Un área de talento recibía cientos de hojas de vida al mes en formatos distintos. El filtrado manual demoraba semanas y los buenos candidatos se perdían por tiempos de respuesta.",
    queConstruimos:
      "Un sistema que procesa automáticamente las hojas de vida recibidas: extrae la información relevante, la estructura contra los criterios del perfil y la entrega integrada a los sistemas de recursos humanos.",
    comoFunciona:
      "Cada hoja de vida se lee sin importar el formato, se extraen datos y experiencia contra criterios objetivos definidos con el equipo de talento, y el resultado queda estructurado en la plataforma de RR. HH. La decisión de entrevistar es siempre de una persona.",
    resultado: {
      texto:
        "El equipo pasó de dedicar la mayor parte del proceso a leer documentos, a dedicarlo a entrevistar candidatos filtrados con criterios trazables.",
      encuadre:
        "Descripción cualitativa del cambio operativo; las cifras de tiempo específicas dependen del volumen de cada vacante.",
      fuente: "HST_Oferta_Cliente_Definitiva.docx — ejemplos de IA nativa",
      metricas: [
        { etiqueta: "Tiempo de filtrado de una vacante (antes y después)", valor: "[COMPLETAR con dato real del cliente]" },
        { etiqueta: "Reducción del tiempo de preselección", valor: "[COMPLETAR con dato real del cliente]" },
        { etiqueta: "Hojas de vida procesadas por mes", valor: "[COMPLETAR con dato real del cliente]" },
      ],
    },
    servicioId: "automatizacion-reclutamiento",
    etapas: [
      { etapa: 1, queOcurrio: "Se estudió el flujo de selección: canales de recepción, formatos recibidos y criterios reales con los que el equipo filtraba." },
      { etapa: 2, queOcurrio: "Se definieron criterios objetivos y trazables por perfil, y el punto exacto donde la decisión pasa a manos humanas." },
      { etapa: 3, queOcurrio: "Se construyó el pipeline de extracción y filtrado y se integró a los sistemas de recursos humanos existentes." },
      { etapa: 4, queOcurrio: "Se calibraron los criterios con vacantes reales y se transfirió al equipo la operación y el ajuste de los perfiles." },
    ],
    anonimizado: true,
    autorizacion: { fecha: "2026-07-20", responsable: "Socios HST" },
  },
]

export const teamExperience: TeamExperience[] = [
  {
    dominio: "Manufactura e importación",
    descripcion:
      "Operación de procesos de compras, aduanas, inventarios y facturación en empresas manufactureras e importadoras.",
  },
  {
    dominio: "Administración y finanzas",
    descripcion:
      "Gestión de ciclos contables, conciliaciones, cartera y reportes en operaciones medianas.",
  },
  {
    dominio: "Atención y agendamiento",
    descripcion:
      "Diseño y operación de flujos de atención al cliente y gestión de agendas de alto volumen.",
  },
  {
    dominio: "Sector legal",
    descripcion:
      "Trabajo con corpus documentales jurídicos: contratos, precedentes y flujos de revisión de firmas legales.",
  },
]

export const partners: Partners = {
  queEs:
    "El Programa de Aliados conecta a consultores, integradores y profesionales con red empresarial con los proyectos de Hunter Solutions Tech: usted refiere la oportunidad, nosotros la ejecutamos y usted participa del resultado.",
  paraQuien:
    "Consultores de negocio, firmas de contabilidad y auditoría, integradores de software y profesionales con relaciones de confianza en empresas medianas de nuestros sectores.",
  pasos: [
    { n: 1, titulo: "Postúlese", descripcion: "Cuéntenos quién es y a qué tipo de empresas tiene acceso mediante el formulario de esta página." },
    { n: 2, titulo: "Conversemos", descripcion: "En una sesión corta alineamos expectativas, sectores y el tipo de oportunidades donde tiene sentido colaborar." },
    { n: 3, titulo: "Refiera", descripcion: "Cuando identifique una oportunidad, nos la presenta; nosotros preparamos y ejecutamos la conversación técnica y comercial." },
    { n: 4, titulo: "Participe", descripcion: "Si el proyecto se concreta, usted participa del resultado según el esquema acordado desde el inicio." },
  ],
  // TODO negocio: los socios deben decidir si se publican porcentajes de comisión.
  beneficioResumen: "",
}

export const training: Training = {
  paraQuien:
    "Comités directivos que deben decidir inversiones en IA, y equipos operativos que van a convivir con agentes en su trabajo diario.",
  formatos: [
    {
      nombre: "Charla ejecutiva",
      descripcion:
        "Dos horas para directivos: qué puede y qué no puede hacer la IA en su sector, con demostraciones en vivo sobre casos reales y un marco para evaluar propuestas.",
    },
    {
      nombre: "Taller práctico",
      descripcion:
        "Medio día con su equipo: los participantes construyen y prueban asistentes sobre documentos y datos de ejemplo de su propia operación.",
    },
  ],
  queQueda:
    "El material completo del taller, las guías de uso y los ejemplos construidos quedan en la organización para reutilizarse internamente.",
  comoSeAgenda:
    "Agende una sesión de 30 minutos para definir el formato, el público y los casos de su sector que usaremos como base.",
}

/**
 * Tercera prueba del bloque de la home: no es un caso de cliente, es la
 * operación propia. Va aquí y no en el componente porque el contrato de
 * contenido tiene que poder escanearla.
 */
export const pruebaPropia: PruebaPropia = {
  sector: "Hunter Solutions Tech",
  titulo: "Operamos nuestra propia empresa con esto",
  texto:
    "Nuestros agentes gestionan la operación interna de HST todos los días. Es la demostración que mostramos en la primera reunión.",
  nota: "Se lo mostramos en vivo en el diagnóstico.",
}

/** Línea de confianza que cierra el bloque de prueba y enlaza a gobernanza. */
export const lineaConfianza: LineaConfianza = {
  texto:
    "Su código y sus datos son suyos. Cada decisión del agente queda registrada y las sensibles las aprueba una persona.",
  enlaceTexto: "Así lo gobernamos.",
  enlaceHref: "/gobernanza",
}
