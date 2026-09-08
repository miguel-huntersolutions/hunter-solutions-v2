import type { Level, Role, Service } from "./types"

// Rangos ratificados por los socios (sección 6 de la Oferta Definitiva).
export const levels: Level[] = [
  {
    id: 1,
    nombre: "Nivel 1 · Explora",
    rangoMin: 1_000_000,
    rangoMax: 10_000_000,
    moneda: "COP",
    incluyeIVA: false,
    nota: "Cada proyecto se cotiza según su alcance; los rangos son de referencia.",
  },
  {
    id: 2,
    nombre: "Nivel 2 · Implementa",
    rangoMin: 10_000_000,
    rangoMax: 50_000_000,
    moneda: "COP",
    incluyeIVA: false,
    nota: "Cada proyecto se cotiza según su alcance; los rangos son de referencia.",
  },
  {
    id: 3,
    nombre: "Nivel 3 · Escala",
    rangoMin: 50_000_000,
    rangoMax: 200_000_000,
    moneda: "COP",
    incluyeIVA: false,
    nota: "Desde $50 millones COP; cada programa se cotiza según su alcance.",
  },
]

// TODO negocio: los socios deben revisar y ratificar nombres, descripciones y ejemplos.
export const services: Service[] = [
  // ─── NIVEL 1 · EXPLORA ───
  {
    id: "diagnostico-oportunidades",
    slug: "diagnostico-de-oportunidades-con-ia",
    nivel: 1,
    nombre: "Diagnóstico de Oportunidades con IA",
    descripcion:
      "Evaluación estructurada de su operación con la lente CNT para identificar dónde la IA genera valor medible y en qué orden abordarlo.",
    queSolucionamos:
      "La parálisis inicial: presión por adoptar IA sin un mapa de qué proceso conviene automatizar primero ni cuánto valor hay en juego.",
    comoLoHacemos:
      "Sesiones con sus responsables de proceso, análisis de sistemas y datos disponibles, y priorización de oportunidades por valor y viabilidad con supuestos explícitos.",
    ejemplo:
      "Una empresa de consumo masivo descubre que su mayor oportunidad no está en atención al cliente, como suponía, sino en la conciliación de facturas con proveedores: un proceso que consume 3 personas y es automatizable en el Nivel 2.",
    sectoresRelevantes: ["Legal", "Manufactura", "Salud", "Alimentos", "Consumo"],
    esPuertaDeEntrada: true,
  },
  {
    id: "formacion-equipos",
    slug: "formacion-en-ia-para-equipos",
    nivel: 1,
    nombre: "Formación en IA para equipos",
    descripcion:
      "Charlas ejecutivas y talleres prácticos para que directivos y equipos operativos entiendan qué puede y qué no puede hacer la IA en su negocio.",
    queSolucionamos:
      "La brecha de criterio: decisiones de inversión en IA tomadas sin que quien decide haya usado nunca la tecnología con sus propios datos.",
    comoLoHacemos:
      "Formatos de charla ejecutiva (2 horas) y taller práctico (medio día) sobre casos del propio sector, con material que queda en la organización.",
    ejemplo:
      "El comité directivo de una firma legal sale de un taller de medio día habiendo construido, con sus propios contratos de ejemplo, un asistente que responde preguntas sobre cláusulas.",
    sectoresRelevantes: ["Legal", "Manufactura", "Salud", "Alimentos", "Consumo"],
  },
  {
    id: "automatizacion-documental",
    slug: "automatizacion-de-proceso-documental",
    nivel: 1,
    nombre: "Automatización de un proceso documental",
    descripcion:
      "Automatización acotada de un flujo documental repetitivo: clasificación, extracción de datos y registro en sus sistemas.",
    queSolucionamos:
      "Horas de trabajo calificado consumidas en leer, clasificar y transcribir documentos que siguen patrones predecibles.",
    comoLoHacemos:
      "Seleccionamos un solo flujo de alto volumen, construimos la extracción con validación humana de excepciones y lo conectamos al sistema donde el dato debe quedar.",
    ejemplo:
      "Las órdenes de compra que llegan por correo en PDF a una manufacturera se leen, se validan contra el catálogo y se registran en el ERP; una persona solo revisa las que el sistema marca como dudosas.",
    sectoresRelevantes: ["Manufactura", "Alimentos", "Consumo"],
  },
  {
    id: "piloto-asistente-conocimiento",
    slug: "piloto-de-asistente-de-conocimiento",
    nivel: 1,
    nombre: "Piloto de asistente de conocimiento interno",
    descripcion:
      "Un asistente que responde preguntas del equipo sobre un corpus acotado de documentos internos: manuales, políticas o procedimientos.",
    queSolucionamos:
      "Conocimiento crítico atrapado en carpetas y en la cabeza de pocas personas, que se pierde con cada rotación.",
    comoLoHacemos:
      "Indexamos un conjunto definido de documentos, montamos el asistente con citas a la fuente y medimos qué preguntas responde bien antes de ampliar el corpus.",
    ejemplo:
      "El personal de una clínica consulta protocolos de atención en lenguaje natural y recibe la respuesta con el enlace a la página exacta del protocolo vigente.",
    sectoresRelevantes: ["Salud", "Legal", "Manufactura"],
  },
  {
    id: "prueba-concepto-agente",
    slug: "prueba-de-concepto-de-agente",
    nivel: 1,
    nombre: "Prueba de concepto de agente",
    descripcion:
      "Un agente funcionando sobre un caso real y acotado de su operación, para decidir con evidencia si vale la pena escalarlo.",
    queSolucionamos:
      "La imposibilidad de evaluar una inversión mayor en IA sin haber visto la tecnología operando sobre datos y reglas propios.",
    comoLoHacemos:
      "Definimos un caso de dos a cuatro semanas con criterios de éxito medibles, construimos el agente en un entorno controlado y presentamos resultados contra esos criterios.",
    ejemplo:
      "Un agente que clasifica y responde borradores para el 40% más repetitivo de los correos de servicio al cliente de una empresa de alimentos, evaluado durante tres semanas con métricas acordadas.",
    sectoresRelevantes: ["Consumo", "Alimentos", "Salud"],
  },
  {
    id: "auditoria-datos",
    slug: "auditoria-de-datos-para-ia",
    nivel: 1,
    nombre: "Auditoría de datos y preparación para IA",
    descripcion:
      "Diagnóstico del estado real de sus datos: calidad, acceso y estructura, y un plan concreto para dejarlos listos para proyectos de IA.",
    queSolucionamos:
      "Proyectos de IA que fracasan a mitad de camino porque los datos que los alimentan estaban incompletos, duplicados o inaccesibles.",
    comoLoHacemos:
      "Inventariamos las fuentes relevantes al caso de uso objetivo, evaluamos calidad y accesibilidad, y entregamos un plan de preparación priorizado por esfuerzo e impacto.",
    ejemplo:
      "Antes de automatizar su facturación, una importadora descubre que el 20% de sus registros de proveedores estaba duplicado; la auditoría entrega el plan para corregirlo en cuatro semanas.",
    sectoresRelevantes: ["Manufactura", "Consumo", "Alimentos"],
  },

  // ─── NIVEL 2 · IMPLEMENTA ───
  {
    id: "procesamiento-documentos",
    slug: "procesamiento-inteligente-de-documentos",
    nivel: 2,
    nombre: "Procesamiento inteligente de documentos",
    descripcion:
      "Sistema productivo que lee, clasifica, extrae y registra información de documentos de alto volumen: contratos, facturas, hojas de vida, historias.",
    queSolucionamos:
      "Cuellos de botella operativos donde equipos completos procesan documentos a mano, con errores de transcripción y tiempos de respuesta largos.",
    comoLoHacemos:
      "Construimos el pipeline de extracción con validación contra sus reglas de negocio, cola de excepciones para revisión humana e integración directa con el sistema de destino.",
    ejemplo:
      "El área de talento de una compañía recibe cientos de hojas de vida al mes; el sistema las procesa, extrae la información relevante y la deja estructurada en su plataforma de recursos humanos.",
    sectoresRelevantes: ["Legal", "Manufactura", "Salud", "Consumo"],
  },
  {
    id: "cerebro-corporativo",
    slug: "cerebro-corporativo-productivo",
    nivel: 2,
    nombre: "Cerebro Corporativo productivo",
    descripcion:
      "Un sistema de recuperación y generación (RAG) sobre el corpus documental completo de su organización, con control de acceso y citas a la fuente.",
    queSolucionamos:
      "Decisiones lentas y respuestas inconsistentes porque el conocimiento de la organización está disperso en miles de documentos que nadie puede consultar a la velocidad del negocio.",
    comoLoHacemos:
      "Indexamos su corpus con permisos por rol, montamos el asistente con citas verificables a la fuente y establecemos el proceso de actualización continua del conocimiento.",
    ejemplo:
      "Los abogados de una firma consultan en segundos qué cláusulas de indemnidad han usado en contratos similares de los últimos cinco años, con el enlace a cada contrato de origen.",
    sectoresRelevantes: ["Legal", "Salud", "Manufactura"],
  },
  {
    id: "integracion-erp",
    slug: "integracion-de-ia-con-el-erp",
    nivel: 2,
    nombre: "Integración de IA con el ERP",
    descripcion:
      "Conexión de agentes de IA con su ERP existente para que consulten, registren y ejecuten transacciones bajo las reglas de su negocio.",
    queSolucionamos:
      "Pilotos de IA que viven en una isla: generan textos y análisis, pero nadie los conectó al sistema donde ocurre la operación real.",
    comoLoHacemos:
      "Construimos la capa de integración con permisos acotados por operación, validaciones previas a cada escritura y registro completo de cada transacción ejecutada por un agente.",
    ejemplo:
      "Un agente registra pedidos que llegan por correo directamente en el ERP de una empresa de alimentos, validando inventario y condiciones comerciales antes de confirmar cada uno.",
    sectoresRelevantes: ["Manufactura", "Alimentos", "Consumo"],
  },
  {
    id: "automatizacion-reclutamiento",
    slug: "automatizacion-de-reclutamiento",
    nivel: 2,
    nombre: "Automatización de reclutamiento",
    descripcion:
      "Procesamiento automático de hojas de vida a escala: extracción, filtrado contra el perfil y entrega estructurada a su plataforma de recursos humanos.",
    queSolucionamos:
      "Procesos de selección donde el equipo de talento dedica la mayor parte del tiempo a leer hojas de vida en lugar de entrevistar a los candidatos correctos.",
    comoLoHacemos:
      "Definimos con su equipo los criterios objetivos del perfil, automatizamos la extracción y el filtrado inicial con esos criterios trazables, y dejamos la decisión final en manos humanas.",
    ejemplo:
      "Una operación que recibe cientos de hojas de vida al mes pasa de dos semanas a dos días entre la publicación de la vacante y la lista corta de candidatos entrevistables.",
    sectoresRelevantes: ["Consumo", "Manufactura", "Salud"],
  },
  {
    id: "agente-revision-legal",
    slug: "agente-de-revision-legal",
    nivel: 2,
    nombre: "Agente de gestión y revisión de contratos",
    descripcion:
      "Gestión inteligente de contratos: búsqueda semántica sobre el corpus, revisión asistida de cláusulas y generación de borradores desde sus plantillas.",
    queSolucionamos:
      "Riesgo jurídico y horas facturables perdidas en revisar manualmente contratos que repiten estructuras conocidas.",
    comoLoHacemos:
      "Indexamos su corpus contractual, entrenamos la revisión sobre sus políticas de riesgo y generamos borradores desde sus propias plantillas, con validación del abogado responsable.",
    ejemplo:
      "Una firma legal consulta y compara cláusulas de todo su corpus documental en segundos y genera primeros borradores que sus abogados ajustan, en lugar de partir de cero.",
    sectoresRelevantes: ["Legal"],
  },
  {
    id: "observabilidad-supervision",
    slug: "tablero-de-supervision-humana",
    nivel: 2,
    nombre: "Tablero de supervisión humana y observabilidad",
    descripcion:
      "El puesto de mando de sus agentes: qué hizo cada uno, con qué datos decidió, dónde se equivocó y qué está esperando aprobación humana.",
    queSolucionamos:
      "El miedo legítimo a la caja negra: agentes operando sin que nadie en la organización pueda ver, auditar ni corregir sus decisiones.",
    comoLoHacemos:
      "Instrumentamos cada agente con trazabilidad de decisiones, construimos el tablero de operación con alertas y colas de aprobación, y definimos los límites de actuación autónoma.",
    ejemplo:
      "El gerente de operaciones revisa cada mañana un tablero que muestra cuántas transacciones ejecutaron los agentes, cuáles quedaron en espera de aprobación y por qué.",
    sectoresRelevantes: ["Manufactura", "Salud", "Legal", "Consumo"],
  },

  // ─── NIVEL 3 · ESCALA ───
  {
    id: "fuerza-laboral-digital",
    slug: "fuerza-laboral-digital",
    nivel: 3,
    nombre: "Fuerza Laboral Digital multi-agente",
    descripcion:
      "Un equipo de agentes especializados que opera procesos completos de su negocio de forma coordinada, con un orquestador y supervisión humana central.",
    queSolucionamos:
      "Operaciones que ya no escalan contratando más personas para procesos repetitivos, y automatizaciones aisladas que no se hablan entre sí.",
    comoLoHacemos:
      "Diseñamos la arquitectura multi-agente con responsabilidad única por agente, orquestación central, integración con sus sistemas de registro y un modelo de gobierno operado por su equipo.",
    ejemplo:
      "En una importadora, un orquestador coordina agentes de compras, aduanas, inventario y facturación: una orden de importación fluye de principio a fin con intervención humana solo en las aprobaciones definidas.",
    sectoresRelevantes: ["Manufactura", "Consumo", "Alimentos"],
  },
  {
    id: "orquestacion-end-to-end",
    slug: "orquestacion-de-procesos-end-to-end",
    nivel: 3,
    nombre: "Orquestación de procesos end-to-end",
    descripcion:
      "Rediseño y automatización de un proceso de negocio completo, no tareas sueltas, con agentes que lo ejecutan de la entrada a la salida.",
    queSolucionamos:
      "Procesos críticos fragmentados entre áreas, sistemas y correos, donde nadie ve el estado completo y los pilotos de IA nunca tocaron la operación real.",
    comoLoHacemos:
      "Modelamos el proceso de punta a punta, definimos qué ejecutan los agentes y qué aprueban las personas, e implementamos por fases con métricas de operación desde la primera.",
    ejemplo:
      "El ciclo pedido-facturación-cobro de una empresa de consumo se orquesta completo: el estado de cada pedido es visible en tiempo real y las excepciones llegan a la persona correcta con el contexto ya preparado.",
    sectoresRelevantes: ["Consumo", "Alimentos", "Manufactura"],
  },
  {
    id: "plataforma-perimetro",
    slug: "plataforma-de-agentes-en-su-perimetro",
    nivel: 3,
    nombre: "Plataforma de agentes dentro de su perímetro",
    descripcion:
      "Toda la capacidad de agentes desplegada dentro de la infraestructura del cliente, para organizaciones cuyos datos no pueden salir de su control.",
    queSolucionamos:
      "El bloqueo regulatorio o de política interna: la IA aporta valor, pero los datos no pueden procesarse fuera del perímetro de la organización.",
    comoLoHacemos:
      "Desplegamos la arquitectura en su nube privada o sus servidores, con modelos que corren dentro del perímetro cuando se requiere, y su equipo de TI con control del entorno.",
    ejemplo:
      "Una organización de salud opera su Cerebro Corporativo y sus agentes de atención dentro de su propia infraestructura: ninguna historia clínica sale de su perímetro.",
    sectoresRelevantes: ["Salud", "Legal", "Manufactura"],
  },
  {
    id: "gobernanza-guardrails",
    slug: "gobernanza-y-guardrails-enterprise",
    nivel: 3,
    nombre: "Gobernanza y guardrails enterprise",
    descripcion:
      "El marco de control para operar IA a escala: políticas, límites de actuación, trazabilidad, auditorías y cumplimiento normativo.",
    queSolucionamos:
      "La objeción que mata proyectos en la junta: quién responde si la IA se equivoca, cómo se audita y qué garantiza que cumple la regulación.",
    comoLoHacemos:
      "Definimos con sus áreas de riesgo y cumplimiento las políticas de actuación de cada agente, implementamos los guardrails técnicos que las hacen cumplir y establecemos el ciclo de auditoría.",
    ejemplo:
      "El comité de riesgos de una compañía de alimentos aprueba el despliegue de agentes en producción porque cada decisión queda trazada, cada límite es verificable y existe un procedimiento de detención inmediata.",
    sectoresRelevantes: ["Salud", "Legal", "Alimentos", "Manufactura"],
  },
  {
    id: "modernizacion-ai-native",
    slug: "migracion-y-modernizacion-ai-native",
    nivel: 3,
    nombre: "Migración y modernización AI-Native",
    descripcion:
      "Rediseño de sistemas y flujos heredados para que la IA no sea un parche encima, sino parte estructural de cómo opera el negocio.",
    queSolucionamos:
      "Tecnología heredada que hace inviable cualquier automatización seria: datos atrapados, integraciones frágiles y procesos que solo existen en la memoria de la gente.",
    comoLoHacemos:
      "Priorizamos por valor de negocio qué modernizar primero, construimos las capas de datos e integración que los agentes necesitan y migramos por fases sin detener la operación.",
    ejemplo:
      "Una manufacturera con veinte años de sistemas a la medida obtiene una capa de integración moderna sobre la cual sus primeros agentes operan sin esperar a reemplazar el ERP.",
    sectoresRelevantes: ["Manufactura", "Consumo", "Salud"],
  },
  {
    id: "acompanamiento-evolutivo",
    slug: "acompanamiento-evolutivo",
    nivel: 3,
    nombre: "Acompañamiento evolutivo y estabilización",
    descripcion:
      "Operación continua de su fuerza laboral digital: monitoreo, mejora de agentes, auditorías periódicas y evolución del sistema con su negocio.",
    queSolucionamos:
      "Sistemas de IA que se degradan en silencio: los modelos cambian, los procesos cambian y nadie ajusta los agentes hasta que fallan en producción.",
    comoLoHacemos:
      "Establecemos el ciclo de monitoreo y evaluación continua, auditamos los guardrails periódicamente y evolucionamos los agentes con las prioridades de su negocio, transfiriendo capacidad a su equipo en cada ciclo.",
    ejemplo:
      "Tras implementar su fuerza laboral digital, una empresa de consumo mantiene un ciclo mensual de revisión donde se miden los agentes contra sus métricas, se ajustan los que se desviaron y se priorizan las siguientes automatizaciones.",
    sectoresRelevantes: ["Consumo", "Manufactura", "Alimentos", "Salud", "Legal"],
  },
]

// Roles de la Fuerza Laboral Digital: ejemplos de casos de uso, no productos sueltos con precio.
// Se muestran como galería para ilustrar qué puede cumplir la nómina digital dentro de un proyecto.
export const roles: Role[] = [
  {
    id: "cotizaciones-propuestas",
    icono: "cotizaciones",
    nombre: "Cotizaciones y propuestas",
    descripcion: "Genera cotizaciones y propuestas en minutos, con sus reglas y plantillas.",
  },
  {
    id: "atencion-agendamiento",
    icono: "agendamiento",
    nombre: "Atención y agendamiento",
    descripcion: "Atiende consultas frecuentes y gestiona agendas de principio a fin.",
  },
  {
    id: "administrativo-financiero",
    icono: "finanzas",
    nombre: "Administrativo y financiero",
    descripcion: "Ejecuta conciliaciones, cuentas por pagar y seguimiento de cartera.",
  },
]
