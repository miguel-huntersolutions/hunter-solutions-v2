// Textos legales. Los documentos con "// TODO legal:" muestran un aviso de
// borrador en la página hasta que el equipo legal los ratifique (E14).

export type LegalDoc = {
  slug: string
  titulo: string
  actualizado: string
  /** Secciones de título + párrafos */
  secciones: { titulo: string; parrafos: string[] }[]
  /** Marcador de revisión legal pendiente */
  borrador: boolean
}

export const privacidad: LegalDoc = {
  slug: "privacidad",
  titulo: "Política de tratamiento de datos personales",
  actualizado: "2026-07-20",
  // TODO legal: borrador redactado desde la especificación; pendiente de ratificación por asesor jurídico.
  borrador: true,
  secciones: [
    {
      titulo: "1. Responsable del tratamiento",
      parrafos: [
        "Hunter Solutions Tech S.A.S. (en adelante, «HST»), sociedad colombiana, es la responsable del tratamiento de los datos personales recogidos a través de este sitio web, del correo comercial@huntersolutions.tech y de sus canales de atención.",
        "Esta política se expide en cumplimiento de la Ley 1581 de 2012, el Decreto 1377 de 2013 y las demás normas que los complementen o modifiquen.",
      ],
    },
    {
      titulo: "2. Datos que tratamos y finalidades",
      parrafos: [
        "A través de los formularios de este sitio recogemos: nombre, correo electrónico de trabajo, sector de la empresa y la descripción del reto que usted decide compartir. La finalidad es exclusivamente responder su solicitud, coordinar sesiones de diagnóstico y, si usted lo autoriza, enviarle información sobre nuestros servicios.",
        "Las conversaciones con los agentes de IA de este sitio no requieren registro y no deben contener datos personales ni información confidencial; así se advierte junto a cada agente. No usamos el contenido de esas conversaciones para entrenar modelos de terceros.",
      ],
    },
    {
      titulo: "3. Consentimiento",
      parrafos: [
        "Todo formulario que capture datos personales incluye una casilla de autorización no premarcada. Sin esa autorización el envío queda bloqueado. Registramos la fecha y la versión de la política vigente al momento de otorgar el consentimiento.",
      ],
    },
    {
      titulo: "4. Derechos del titular",
      parrafos: [
        "Como titular usted puede conocer, actualizar, rectificar y suprimir sus datos, solicitar prueba de la autorización otorgada, ser informado sobre el uso que se les ha dado y revocar la autorización en cualquier momento.",
        "Para ejercer estos derechos escriba a comercial@huntersolutions.tech indicando su nombre y la solicitud. Responderemos en los plazos previstos por la Ley 1581 de 2012: consultas en máximo diez (10) días hábiles y reclamos en máximo quince (15) días hábiles.",
      ],
    },
    {
      titulo: "5. Dónde viven los datos",
      parrafos: [
        "Los datos de los formularios se transmiten a los sistemas de gestión comercial de HST. En los proyectos con clientes, el despliegue puede realizarse en la nube o dentro del perímetro del cliente, según sus políticas de seguridad; el código, la configuración y los datos del proyecto son propiedad del cliente.",
      ],
    },
    {
      titulo: "6. Cookies y analítica",
      parrafos: [
        "Este sitio usa únicamente analítica agregada y respetuosa de la privacidad para entender qué secciones se usan. La analítica no esencial solo se activa después de su consentimiento en el aviso de cookies, que puede rechazar sin perder ninguna funcionalidad.",
      ],
    },
    {
      titulo: "7. Vigencia y cambios",
      parrafos: [
        "Esta política rige desde su publicación y permanece vigente mientras HST trate datos personales. Cualquier cambio sustancial se publicará en esta misma página con nueva fecha de actualización.",
      ],
    },
  ],
}

export const usoDeIa: LegalDoc = {
  slug: "uso-de-ia",
  titulo: "Cómo usamos la IA en este sitio",
  actualizado: "2026-07-20",
  borrador: false,
  secciones: [
    {
      titulo: "Qué hacen los agentes de este sitio",
      parrafos: [
        "Los agentes conversacionales de este sitio (Diagnóstico, Cerebro Corporativo y Asistente de Privacidad) generan sus respuestas con modelos de lenguaje sobre un corpus factual controlado: el catálogo de servicios, los niveles de inversión, la metodología, la gobernanza y los casos publicados.",
        "Las respuestas son generadas por IA y pueden contener errores. Ninguna respuesta de un agente constituye una cotización, un compromiso contractual ni asesoría legal.",
      ],
    },
    {
      titulo: "Guardrails publicados",
      parrafos: [
        "Los agentes tienen límites explícitos: no inventan precios ni servicios fuera del catálogo, no prometen resultados numéricos no autorizados, no piden datos personales y remiten a una persona del equipo cuando la conversación lo requiere.",
        "Cada respuesta pasa por una capa de validación automática; si una respuesta viola las reglas, se corrige o se reemplaza por una respuesta segura con alternativa humana.",
      ],
    },
    {
      titulo: "Sus conversaciones",
      parrafos: [
        "No necesita registrarse para usar los agentes. Le pedimos no incluir datos personales ni información confidencial en las conversaciones. No usamos sus conversaciones para entrenar modelos de terceros.",
      ],
    },
  ],
}

export const terminos: LegalDoc = {
  slug: "terminos",
  titulo: "Términos de uso del sitio",
  actualizado: "2026-07-20",
  // TODO legal: pendiente de redacción y ratificación por asesor jurídico.
  borrador: true,
  secciones: [
    {
      titulo: "Uso del sitio",
      parrafos: [
        "Este sitio presenta los servicios de Hunter Solutions Tech S.A.S. y ofrece herramientas de demostración basadas en IA. El contenido es informativo: los alcances, precios y condiciones definitivos de cualquier proyecto se pactan por escrito en la propuesta correspondiente.",
      ],
    },
    {
      titulo: "Herramientas de demostración",
      parrafos: [
        "Las herramientas jugables y los agentes de este sitio son demostraciones. Sus resultados son orientativos, se generan con IA y no constituyen diagnósticos definitivos, cotizaciones ni asesoría profesional.",
      ],
    },
  ],
}

export const legalDocs: LegalDoc[] = [privacidad, usoDeIa, terminos]
