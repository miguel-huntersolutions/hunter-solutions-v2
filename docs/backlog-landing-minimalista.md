# Backlog: Landing minimalista de impacto
**Sitio:** https://www.huntersolutions.tech/ · **Stack:** Next.js 15 (App Router), TypeScript strict, Tailwind, Vercel
**Fecha:** 2026-09-07 · **Versión:** v1 · **Área:** Marketing / Tecnología
**Origen:** análisis del landing actual (12 secciones, 18 CTAs, 9 ítems de menú) y decisiones de propuesta de valor vigentes (prueba del dinero, sin "nómina digital", sectores foco Salud, Alimentos, Legal, Comercial y Agrícola).

---

## Cómo usar este backlog

1. Abre Claude Code en la raíz del repositorio del sitio.
2. Pega primero el **Prompt 0 (contexto maestro)**. Ese prompt no cambia código: explora el repo y devuelve un mapa. Revísalo antes de seguir.
3. Ejecuta los prompts 1 a 7 **en orden**, uno por sesión o uno por rama. Cada uno termina con `npm run build` limpio y un resumen de archivos tocados.
4. Luego el Prompt 9 (versión para agentes de IA y LLM), que se construye sobre el contenido ya corregido.
5. El Prompt 8 es la verificación final. No se despliega a producción sin pasarlo.
5. Todo se trabaja en la rama `feat/landing-minimalista`. Producción se toca solo con el merge final.

Regla para todos los prompts: no inventar copy nuevo fuera del que está en este documento. Si algo falta, el agente lo marca como `[PENDIENTE COPY]` y sigue.

---

## Resumen del backlog

| ID | Épica | Resultado esperado | Prioridad | Depende de |
|---|---|---|---|---|
| P0 | Mapa del repositorio | Inventario de secciones, componentes, rutas y contenido | Alta | ninguna |
| P1 | Nueva estructura del landing | `app/page.tsx` con 4 bloques y nada más | Alta | P0 |
| P2 | Hero y copy de valor | Titular de plata, no de agentes; una sola CTA | Alta | P1 |
| P3 | Agente de diagnóstico protagonista | Absorbe al recomendador; ubicado bajo el hero | Alta | P1 |
| P4 | Prueba en 3 tarjetas + línea de confianza | Legal, Consumo, HST mismo; enlace a gobernanza | Alta | P1 |
| P5 | Contacto único y navegación de 3 ítems | Formulario de 3 campos, WhatsApp, menú reducido, footer con lo secundario | Alta | P1 |
| P6 | Reubicar contenido retirado | Servicios, Gobernanza, Nosotros, Preguntas reciben lo que sale del landing | Media | P1 a P5 |
| P7 | Correcciones de lenguaje y datos | Sin "nómina digital", sectores vigentes, etiqueta "Más elegido" bien puesta | Alta | P0 |
| P9 | Versión para agentes de IA y LLM | El sitio existe en dos versiones: la humana (la normal) y una legible por agentes y modelos: llms.txt, páginas en Markdown, JSON de la oferta, datos estructurados y robots para bots de IA | Alta | P1 a P7 |
| P8 | Verificación final | Checklist de aceptación, Lighthouse, build, revisión visual, verificación de la versión para agentes | Alta | todo |

Nota de orden: P9 se ejecuta después de P7 y antes de P8, porque la versión para agentes se genera a partir del contenido ya corregido.

---

## Prompt 0: Mapa del repositorio (solo lectura)

```
Actúa como arquitecto front-end senior en este repositorio Next.js 15 (App Router,
TypeScript, Tailwind) del sitio corporativo de Hunter Solutions Tech. Tu tarea es
SOLO explorar y documentar. No modifiques ningún archivo.

Entrega un archivo docs/mapa-landing-actual.md con:

1. Ruta y archivo de la página de inicio y la lista ORDENADA de secciones que
   renderiza, con el componente que corresponde a cada una. Hoy esperamos 12:
   hero, agente de diagnóstico, fuerza laboral digital (su gente / sus agentes /
   juntos), los tres frenos, casos de uso, catálogo por niveles, recomendador de
   nivel, casos de éxito, gobernanza, por qué HST, preguntas frecuentes y
   formulario de contacto. Confirma o corrige.
2. Dónde vive el contenido de texto: archivos de contenido (json, ts, md, mdx),
   CMS, o hardcodeado en componentes. Lista los archivos.
3. Componentes de navegación (header, footer) y de dónde sale el menú.
4. Rutas existentes además de la home (servicios, casos, gobernanza, formación,
   recursos, aliados, preguntas, privacidad, términos, uso de IA en sitio, etc.)
   y qué componentes reutilizan.
5. Cómo funcionan el agente de diagnóstico y el recomendador de nivel: API
   routes, prompts, variables de entorno, componentes cliente. Indica si comparten
   código.
6. Formulario de contacto: campos, validación, a dónde envía, opciones del
   desplegable de sector.
7. Todas las apariciones de las cadenas "nómina digital", "Nómina Digital" y
   "nomina digital" con archivo y línea.
8. Tokens de marca (colores, fuente Open Sans, espaciados) y dónde están.
9. Estado de calidad: resultado de npm run lint y npm run build, tests si existen.

Cierra con una sección "Riesgos para el rediseño" con lo que veas frágil
(acoplamientos, contenido duplicado, componentes que se usan en varias rutas).
```

---

## Prompt 1: Nueva estructura del landing

```
Actúa como desarrollador front-end senior (Next.js 15 App Router, TypeScript strict,
Tailwind) en el repositorio del sitio de Hunter Solutions Tech. Lee primero
docs/mapa-landing-actual.md. Trabaja en la rama feat/landing-minimalista.

OBJETIVO: convertir la página de inicio en un landing de 4 bloques. Hoy tiene 12
secciones y 18 botones; el visitante se pierde. Queremos que un gerente de una pyme
llegue y conecte con lo que vendemos en dos pantallas de scroll.

ESTRUCTURA NUEVA de app/page.tsx, en este orden y sin ninguna sección adicional:

  1. <Hero />              titular de valor + una frase + una CTA
  2. <AgenteDiagnostico /> la experiencia interactiva de la página
  3. <Prueba />            3 tarjetas de caso + 1 línea de confianza + 1 CTA
  4. <Hablemos />          formulario de 3 campos + WhatsApp

REGLAS:
- NO borres los componentes de las secciones que salen (fuerza laboral digital,
  tres frenos, casos de uso, catálogo por niveles, recomendador, gobernanza, por qué
  HST, FAQ). Muévelos a components/legacy/ o déjalos en su sitio pero sin
  importarlos en la home. Se reubican en el Prompt 6.
- Un solo destino de CTA en toda la home: el ancla #hablemos. Ninguna CTA de la
  home lleva a otra página, con dos excepciones: el enlace de texto "Precios
  publicados por nivel" (a /servicios) y la línea de confianza (a /gobernanza).
- Máximo 2 pantallas de scroll en desktop 1440x900 y 4 en móvil 390x844. Usa
  espaciado generoso, no comprimas.
- Conserva tokens de marca, Open Sans y el sistema de estilos existente. No
  introduzcas librerías nuevas.
- Mantén metadata SEO (title, description, OpenGraph) y el JSON-LD si existe;
  actualiza los textos en el Prompt 2.
- Los componentes nuevos pueden ser cascarones con el copy marcado como
  [PENDIENTE COPY] si aún no existe; el copy definitivo llega en los prompts 2 a 5.

Termina con npm run lint y npm run build limpios y un resumen de archivos creados,
modificados y retirados de la home.
```

---

## Prompt 2: Hero y copy de valor

```
Actúa como desarrollador front-end senior y redactor de marca en el repositorio del
sitio de Hunter Solutions Tech, rama feat/landing-minimalista. Implementa el
contenido definitivo de components/home/Hero.tsx.

CONTEXTO DE MARCA (no negociable):
- El titular habla de plata y de trabajo, no de tecnología. La palabra "IA" no va
  en el titular. La IA es el cómo, no el qué.
- Prohibido en todo el sitio: "nómina digital", "bajo costo", "garantizado",
  "100%", "siempre", "total". Permitido: "capacidades", "Fuerza Laboral Digital"
  (solo como nombre de la oferta, no como explicación).
- Sin emojis, sin iconos decorativos, sin guiones largos en el copy.
- Tono: directo, colombiano, de negocio. Tratamiento de usted.

COPY DEL HERO:

  Etiqueta pequeña (sobre el titular):
    Hunter Solutions Tech · Consultora AI-native · Colombia

  Titular (H1):
    Hay trabajo en su empresa que hoy nadie hace.
    Nosotros lo hacemos.

  Frase de apoyo (un párrafo, máximo 2 líneas en desktop):
    Cobranza que no se persigue, documentos que no se revisan, clientes que no
    reciben respuesta a tiempo. Construimos capacidades digitales que se conectan
    a sus sistemas y ejecutan ese trabajo, con supervisión de su equipo.

  CTA principal (botón):
    Agendar diagnóstico de 30 minutos, sin costo   -> ancla #hablemos

  Tres frases de confianza bajo la CTA (texto pequeño, en una línea, separadas
  por espacio, sin iconos):
    El activo es suyo.   Independientes de proveedor.   Precios publicados.
  "Precios publicados" es enlace a /servicios#niveles.

REGLAS DE IMPLEMENTACIÓN:
- Un único H1 en toda la página.
- Sin imagen de stock. Si el hero tiene fondo visual, usa el sistema gráfico de
  marca existente (nodos, líneas, esquinas rectas). Nunca robots, cerebros
  azules ni código estilo Matrix.
- Actualiza metadata: title "Hunter Solutions Tech | Capacidades digitales que
  hacen el trabajo que hoy nadie hace", description de máximo 155 caracteres
  derivada de la frase de apoyo.
- Accesibilidad: contraste AA, foco visible en la CTA, tamaño mínimo de toque
  44px en móvil.

Termina con build limpio y captura del hero en desktop y móvil si tienes
Playwright disponible; si no, describe el resultado.
```

---

## Prompt 3: Agente de diagnóstico protagonista

```
Actúa como desarrollador full-stack senior en el repositorio del sitio de Hunter
Solutions Tech, rama feat/landing-minimalista. Lee docs/mapa-landing-actual.md,
sección del agente de diagnóstico y del recomendador de nivel.

OBJETIVO: el agente de diagnóstico es lo más diferente que tiene HST y hoy está
enterrado. Debe ser LA experiencia de la página, inmediatamente debajo del hero, y
debe absorber la función del recomendador de nivel (que desaparece de la home).

CAMBIOS:

1. Componente components/home/AgenteDiagnostico.tsx (cliente), ubicado como
   segundo bloque de la home.
   Título del bloque:
     No lea sobre nuestra IA. Pruébela.
   Subtítulo:
     Cuéntele su reto operativo. Le dice por dónde empezar, qué capacidad aplica
     y en qué nivel de inversión queda.
   Campo de texto con placeholder:
     Ejemplo: cada mes se me quedan facturas sin cobrar y nadie las persigue.
   Tres ejemplos clicables que llenan el campo (mantener los tres del sitio actual
   si existen; si no, usar estos):
     - Se me pierden facturas por cobrar y nadie hace seguimiento.
     - Recibimos cientos de hojas de vida y no alcanzamos a leerlas.
     - Buscar una cláusula en nuestros contratos toma horas.
   Botón: Enviar.
   Nota de descargo corta debajo (mantener la actual sobre uso de IA generativa).

2. Fusión con el recomendador: el prompt del sistema del agente debe incluir en su
   respuesta, SIEMPRE, tres cosas al final:
     - Capacidad que aplica (nombre en lenguaje de función: Agente de Cobranza,
       Agente de Documentos, Agente de Atención, Agente de Auditoría, Agente de
       Gestión, Agente de Agendamiento).
     - Nivel recomendado: Explora, Implementa o Escala, con el rango publicado
       (Explora COP 1 a 10 M, Implementa COP 10 a 50 M, Escala desde COP 50 M,
       todos sin IVA).
     - Un cierre fijo: "Si quiere que lo revisemos con su caso real, agende 30
       minutos sin costo." con enlace al ancla #hablemos.
   El agente responde solo dentro del catálogo publicado. Nunca promete cifras de
   retorno cerradas; usa "rango", "según el caso", "medimos antes y después".
   Prohibido que responda con "nómina digital".

3. Retira el componente del recomendador de la home y su entrada del menú. No
   borres su API route todavía; márcala como deprecated en un comentario.

4. Estado vacío y estado de error con copy en español; sin spinners genéricos, un
   texto "Analizando su reto..." basta.

5. Registra en analytics (si existe) el evento diagnostico_enviado con el nivel
   recomendado como propiedad.

Termina con build limpio y una prueba manual documentada con los tres ejemplos:
pega la respuesta obtenida en docs/pruebas-agente-diagnostico.md.
```

---

## Prompt 4: Prueba en tres tarjetas y línea de confianza

```
Actúa como desarrollador front-end senior en el repositorio del sitio de Hunter
Solutions Tech, rama feat/landing-minimalista. Implementa components/home/Prueba.tsx
como tercer bloque de la home.

OBJETIVO: reemplazar en la home a las secciones de casos de éxito, gobernanza (5
pilares) y por qué HST (8 diferenciadores) con una sola sección de prueba corta.
Ocho razones es lo mismo que ninguna.

CONTENIDO:

  Título del bloque:
    Ya está funcionando.

  Tres tarjetas, mismo tamaño, sin iconos, sin imágenes:

  Tarjeta 1
    Sector: Legal
    Título: Gestión inteligente de contratos
    Resultado: La búsqueda de precedentes y los primeros borradores pasaron de
    horas a minutos.
    Nota pequeña: Medición interna. Los tiempos varían por tipo de contrato.
    Enlace: Ver caso  -> /casos/[slug actual del caso legal]

  Tarjeta 2
    Sector: Consumo
    Título: Hojas de vida a escala
    Resultado: El equipo pasó de leer cientos de documentos al mes a entrevistar
    candidatos ya filtrados con criterios trazables.
    Nota pequeña: Cambio cualitativo. Las cifras dependen del volumen.
    Enlace: Ver caso  -> /casos/[slug actual del caso de consumo]

  Tarjeta 3
    Sector: Hunter Solutions Tech
    Título: Operamos nuestra propia empresa con esto
    Resultado: Nuestros agentes gestionan la operación interna de HST todos los
    días. Es la demostración que mostramos en la primera reunión.
    Nota pequeña: Se lo mostramos en vivo en el diagnóstico.
    Sin enlace.

  Línea de confianza debajo de las tarjetas (un párrafo, texto mediano):
    Su código y sus datos son suyos. Cada decisión del agente queda registrada y
    las sensibles las aprueba una persona. Así lo gobernamos.
  "Así lo gobernamos." es enlace a /gobernanza.

  Línea secundaria pequeña:
    Precios publicados por nivel.  -> enlace a /servicios#niveles

  CTA de cierre del bloque (botón, misma etiqueta del hero):
    Agendar diagnóstico de 30 minutos, sin costo  -> #hablemos

REGLAS:
- El texto de resultado de las tarjetas 1 y 2 debe salir de la fuente de contenido
  de casos que ya existe en el repo, no duplicarlo. Si hoy está hardcodeado,
  extráelo a un archivo de contenido y úsalo en ambos lugares.
- Sin cifras inventadas. Si un caso no tiene un número documentado, no se pone.
- Esquinas rectas, proporción 60-30-10 de marca, Open Sans.

Termina con build limpio.
```

---

## Prompt 5: Contacto único, navegación de 3 ítems y footer

```
Actúa como desarrollador front-end senior en el repositorio del sitio de Hunter
Solutions Tech, rama feat/landing-minimalista.

PARTE A: components/home/Hablemos.tsx, cuarto y último bloque de la home, con
id="hablemos".

  Título: Hablemos.
  Subtítulo: Agende una sesión de diagnóstico de 30 minutos, sin costo. Salimos
  con dos o tres oportunidades concretas y por dónde empezar.

  Formulario de TRES campos, nada más:
    - Nombre
    - Correo de trabajo
    - ¿Cuál es el reto? (textarea, placeholder: "Cuéntenos en dos líneas qué se
      le está quedando sin hacer o dónde se le está perdiendo plata.")
  Casilla de consentimiento de datos (mantener el texto legal actual, Ley 1581 de
  2012, con enlace a /privacidad).
  Botón principal: Solicitar sesión.
  Botón secundario: Escribir por WhatsApp (mantener el número actual y un mensaje
  prellenado: "Hola, quiero agendar un diagnóstico de 30 minutos").

  El campo Sector SALE del formulario de la home. Si el backend lo exige, envía
  "No indicado". Si el desplegable de sector se conserva en otra página, sus
  opciones deben ser exactamente: Salud, Alimentos, Legal, Comercial, Agrícola,
  Otro.

  Dos preguntas cortas al lado o debajo del formulario (texto, no acordeón):
    ¿Garantizan retorno?
    Garantizamos la capacidad entregada y funcionando. El retorno lo proyectamos
    con supuestos explícitos y lo medimos antes y después. Si quiere, parte del
    pago puede atarse al resultado.

    ¿Qué pasa con nuestros datos?
    El código y los datos son suyos. No se usan para entrenar modelos públicos y
    el despliegue puede quedar dentro de su perímetro.

  Mantener la validación, el envío y la confirmación actuales. Mensaje de éxito:
  "Listo. Le escribimos en menos de un día hábil para agendar."

PARTE B: navegación.
  Menú principal reducido a tres ítems: Servicios, Casos, Hablemos.
  "Hablemos" es botón (estilo CTA) y lleva a /#hablemos.
  Formación, Recursos, Aliados, Gobernanza y Preguntas SALEN del menú principal.
  En móvil el menú cabe sin hamburguesa; si no cabe, hamburguesa con los mismos
  tres ítems.

PARTE C: footer.
  Columna 1: Servicios, Casos, Gobernanza, Preguntas.
  Columna 2: Formación, Recursos, Aliados.
  Columna 3: Privacidad, Términos, Uso de IA en el sitio.
  Línea final: hola@huntersolutions.tech · LinkedIn · Instagram · TikTok ·
  "Consultora AI-native · Colombia" · © 2026 Hunter Solutions Tech.

Verifica que ningún enlace quede roto (todas las rutas del footer deben existir).
Termina con build limpio.
```

---

## Prompt 6: Reubicar el contenido que sale del landing

```
Actúa como arquitecto de contenido y desarrollador senior en el repositorio del
sitio de Hunter Solutions Tech, rama feat/landing-minimalista. Lee
docs/mapa-landing-actual.md. Nada de lo que salió de la home se pierde; se
reubica según esta tabla.

  Contenido retirado de la home           -> Destino
  ----------------------------------------------------------------------------
  Fuerza Laboral Digital (su gente / sus   -> /servicios, primer bloque, como
  agentes / juntos)                           explicación del concepto
  Los tres frenos                          -> /servicios, segundo bloque,
                                              titulado "Por dónde se atasca"
  Casos de uso (cotizaciones, atención,    -> /servicios, dentro del nivel que
  administrativo y financiero)                corresponda, como ejemplos
  Catálogo por niveles con precios         -> /servicios#niveles (ancla obligatoria;
                                              la home enlaza aquí). Corrige la
                                              etiqueta "Más elegido": debe verse
                                              SOLO sobre Implementa (Nivel 2).
  Recomendador de nivel                    -> Se elimina como sección. Su lógica
                                              ya vive en el agente de diagnóstico.
                                              Redirige /recomendador (si existe)
                                              a /#diagnostico con 301.
  Gobernanza (5 pilares)                   -> /gobernanza (ya existe). Verifica que
                                              contenga los cinco: guardrails,
                                              trazabilidad, supervisión humana,
                                              despliegue flexible, independencia.
  Por qué HST (8 diferenciadores)          -> /nosotros (crear si no existe).
                                              Reagrupar los 8 en 3 bloques:
                                              "El activo es suyo" (activo del
                                              cliente, independencia de modelo,
                                              despliegue elegible), "Sabemos
                                              operarlo" (AI-native de origen,
                                              experiencia real del equipo, lente
                                              CNT) y "Promesa responsable"
                                              (promesa en tres capas, precios
                                              publicados).
  Preguntas frecuentes                     -> /preguntas (ya existe). Mantener
                                              todas.
  Casos de éxito completos                 -> /casos (ya existe). Sin cambios.

REGLAS:
- Reutiliza los componentes que moviste a components/legacy/ en el Prompt 1;
  adáptalos, no los reescribas.
- Cada página destino tiene un único H1, metadata propia y una CTA al final que
  lleva a /#hablemos con la misma etiqueta de la home.
- Actualiza sitemap y cualquier índice interno de rutas.
- Si /servicios ya tiene contenido, integra sin duplicar; el orden final de
  /servicios es: concepto, por dónde se atasca, niveles con precios (#niveles)
  con casos de uso dentro, CTA.

Termina con build limpio y una tabla en docs/reubicacion-contenido.md que diga
para cada bloque retirado: dónde quedó, ruta y componente.
```

---

## Prompt 7: Correcciones de lenguaje y datos (todo el sitio)

```
Actúa como editor de contenido y desarrollador en el repositorio del sitio de
Hunter Solutions Tech, rama feat/landing-minimalista. Aplica estas correcciones en
TODO el sitio, no solo en la home. Usa la lista de apariciones de
docs/mapa-landing-actual.md como punto de partida y vuelve a buscar.

1. "nómina digital" / "Nómina Digital" / "nomina digital": eliminar en todas sus
   formas, incluidos prompts de agentes, metadata, alt de imágenes y JSON-LD.
   Reemplazos por contexto:
     - "Le construimos la digital" -> "Le construimos las capacidades digitales
       que le faltan."
     - "Usamos nuestra propia nómina digital" -> "Operamos nuestra propia empresa
       con estos agentes."
     - Cualquier otra -> "Fuerza Laboral Digital" o "capacidades digitales", la
       que lea mejor.
2. Sectores: toda lista, desplegable, filtro o etiqueta de sector debe usar
   exactamente Salud, Alimentos, Legal, Comercial, Agrícola (y Otro donde aplique).
   Manufactura y Consumo dejan de aparecer como sectores foco; pueden quedar solo
   como etiqueta del caso de éxito de consumo, que es real.
3. Palabras prohibidas en copy de cara a cliente: "bajo costo", "garantizado",
   "100%", "siempre", "total", "arquitectos de soluciones", "compañía joven".
   Busca y reescribe cada aparición manteniendo el sentido. "Garantizamos la
   capacidad" sí se permite.
4. Guiones largos (—) en copy: reemplazar por punto, coma o dos puntos.
5. Emojis e iconos decorativos en texto: eliminar.
6. Etiqueta "Más elegido": debe renderizarse únicamente sobre el nivel Implementa.
7. Metadata y OpenGraph de todas las rutas: título y descripción coherentes con
   el nuevo posicionamiento; ninguna con las palabras prohibidas.

Entrega docs/correcciones-lenguaje.md con la tabla archivo, línea, texto anterior,
texto nuevo. Termina con build limpio.
```

---

## Prompt 9: Versión para agentes de IA y LLM

```
Actúa como desarrollador full-stack senior y especialista en GEO (Generative Engine
Optimization) en el repositorio del sitio de Hunter Solutions Tech, rama
feat/landing-minimalista. Ejecuta esto SOLO después del Prompt 7, porque la versión
para agentes se genera a partir del contenido ya corregido.

OBJETIVO: el sitio debe existir en dos versiones que comparten la misma fuente de
contenido.
  - Versión humana: la que ya construimos (la normal).
  - Versión para agentes de IA y LLM: la misma información, sin diseño, en
    formatos que un modelo o un agente pueda leer, citar y usar para actuar
    (recomendar a HST, cotizar dentro del catálogo publicado, agendar).
Principio: una sola fuente de verdad. Nada se escribe dos veces. Si el contenido
vive en archivos de contenido (ts, json, md), ambas versiones se generan de ahí.
Si hoy hay copy hardcodeado en componentes, extráelo primero a
content/ (una carpeta por tipo: oferta, niveles, casos, gobernanza, faq, contacto).

ENTREGABLES:

1. /llms.txt (estático en public/ o generado en build).
   Sigue la convención llmstxt.org: H1 con el nombre, una cita corta de
   posicionamiento, párrafo de contexto y secciones con enlaces a las versiones
   Markdown de cada página. Contenido mínimo:
     - Qué es HST en dos frases (consultora AI-native en Colombia que construye
       capacidades digitales: agentes que se conectan a los sistemas del cliente y
       ejecutan trabajo que hoy nadie hace).
     - Sectores foco: Salud, Alimentos, Legal, Comercial, Agrícola.
     - Niveles y rangos publicados sin IVA: Explora COP 1 a 10 M, Implementa
       COP 10 a 50 M, Escala desde COP 50 M.
     - Los dos casos reales con su resultado encuadrado (sin cifras inventadas).
     - Gobernanza en una línea por pilar.
     - Cómo contactar: hola@huntersolutions.tech, WhatsApp, diagnóstico de 30
       minutos sin costo, enlace a /#hablemos.
     - Sección "Optional" con Formación, Recursos, Aliados, Preguntas.
   Prohibido en este archivo: "nómina digital", "bajo costo", "garantizado",
   emojis, guiones largos.

2. /llms-full.txt: concatenación de todas las páginas en Markdown, generada en
   build a partir de content/. No se edita a mano.

3. Versión Markdown de cada página. Implementa las dos vías:
   a) Ruta espejo: /llm/[misma ruta] devuelve text/markdown (por ejemplo
      /llm/servicios, /llm/casos, /llm/gobernanza, /llm/preguntas, /llm/nosotros
      y /llm para la home).
   b) Negociación de contenido: si la petición a cualquier ruta humana trae
      Accept: text/markdown, el middleware la reescribe a su espejo /llm/....
   Cada Markdown lleva al inicio un frontmatter con title, description, url,
   updated y language: es-CO.

4. /api/oferta.json (o /oferta.json estático): la oferta completa en JSON
   estable y versionado: niveles con rangos, servicios por nivel, casos de uso,
   casos reales, gobernanza, sectores, modelos comerciales (desarrollo de
   capacidades, augmentation, pago por eficiencia) y contacto. Incluye un campo
   "version" con fecha y un campo "aviso" que diga que los rangos son sin IVA y
   que el retorno se proyecta con supuestos, no se garantiza. Publica el esquema
   en /api/oferta.schema.json.

5. Datos estructurados en la versión humana: JSON-LD de Organization (nombre,
   URL, logo, correo, sameAs con LinkedIn, Instagram y TikTok, areaServed
   Colombia), Service por nivel con Offer y priceRange en COP, FAQPage en
   /preguntas, y Article o CaseStudy en cada caso. Valida con el validador de
   schema.org o con una librería de test.

6. robots.txt: permitir explícitamente GPTBot, ClaudeBot, Claude-Web, anthropic-ai,
   PerplexityBot, Google-Extended, Bingbot, CCBot y Applebot-Extended en todo el
   sitio, incluidos /llm/ y /llms*.txt. Bloquear solo /api/ excepto
   /api/oferta.json y /api/oferta.schema.json. Sitemap con las rutas humanas y
   las rutas /llm/.

7. Descubrimiento desde la versión humana:
   - En el <head> de cada página: <link rel="alternate" type="text/markdown"
     href="/llm/[ruta]"> y un <link> a /llms.txt.
   - En el footer, columna 3, un enlace de texto pequeño: "Versión para agentes
     de IA" que lleva a /llms.txt. Sin icono.

8. Agente de diagnóstico: su prompt del sistema debe leer el mismo
   /api/oferta.json (o el contenido de content/) para responder dentro del
   catálogo. Así la versión humana, la versión para agentes y el agente propio
   dicen exactamente lo mismo.

9. Documentación: docs/version-agentes.md con la lista de rutas, cómo se
   regeneran los archivos en build, cómo probar la negociación de contenido con
   curl (ejemplo: curl -H "Accept: text/markdown" https://www.huntersolutions.tech/servicios)
   y una nota de mantenimiento: cuando cambie un precio o un caso, se edita
   content/ y todo se regenera.

REGLAS:
- Sin librerías nuevas salvo una para convertir el contenido a Markdown si hace
  falta; justifícala en el resumen.
- Los archivos generados no se versionan en git si se producen en build; si se
  producen en un script, deja el script en scripts/ y documenta cuándo correrlo.
- Cache-Control razonable en /llm/ y /llms*.txt (por ejemplo 1 hora) para que los
  bots no reciban contenido viejo por días.

Termina con build limpio, curl de prueba a /llms.txt, /llm/servicios y
/api/oferta.json con los primeros 20 renglones de cada respuesta pegados en
docs/version-agentes.md.
```

---

## Prompt 8: Verificación final

```
Actúa como QA senior y revisor de marca en el repositorio del sitio de Hunter
Solutions Tech, rama feat/landing-minimalista. No cambies código salvo para
corregir lo que falle en esta lista. Entrega docs/verificacion-landing.md con el
resultado de cada punto (PASA / FALLA y evidencia).

ESTRUCTURA
[ ] La home renderiza exactamente 4 bloques: Hero, AgenteDiagnostico, Prueba,
    Hablemos. Ningún otro componente de sección está importado en app/page.tsx.
[ ] Un único H1 en la home.
[ ] Menú principal con 3 ítems: Servicios, Casos, Hablemos.
[ ] Todas las CTAs de la home (botones) llevan a #hablemos. Los únicos enlaces
    externos a la home son "Precios publicados" (/servicios#niveles) y "Así lo
    gobernamos." (/gobernanza) y los "Ver caso".
[ ] Altura total de la home: máximo 2 pantallas en 1440x900 y 4 en 390x844.
    Mide con Playwright y anota los píxeles.

CONTENIDO
[ ] grep -ri "nómina digital\|nomina digital" en todo el repo devuelve cero
    resultados, incluidos prompts de agentes.
[ ] grep de "bajo costo", "garantizado", "100%", "compañía joven", "arquitectos de
    soluciones" en contenido de cara a cliente devuelve cero.
[ ] Ningún guion largo (—) ni emoji en copy de cara a cliente.
[ ] Desplegables de sector = Salud, Alimentos, Legal, Comercial, Agrícola, Otro.
[ ] Etiqueta "Más elegido" solo sobre Implementa.
[ ] Ningún resultado de caso con cifra que no esté en la fuente de contenido.

FUNCIONAL
[ ] Agente de diagnóstico: con los tres ejemplos del placeholder responde con
    capacidad, nivel y el cierre fijo con enlace a #hablemos. Sin "nómina
    digital" en ninguna respuesta.
[ ] Formulario: envío exitoso con tres campos, mensaje de confirmación correcto,
    validación de correo, consentimiento obligatorio.
[ ] WhatsApp abre con el mensaje prellenado.
[ ] /recomendador (si existía) redirige 301 a /#diagnostico.
[ ] Ningún enlace roto en header, home y footer (usa un crawler simple o
    Playwright).

VERSIÓN PARA AGENTES DE IA Y LLM
[ ] /llms.txt responde 200 con text/plain, sigue la convención llmstxt.org y no
    contiene "nómina digital", "bajo costo", "garantizado", emojis ni guiones
    largos.
[ ] /llms-full.txt responde 200 y contiene todas las páginas humanas.
[ ] Cada ruta humana tiene su espejo /llm/[ruta] en text/markdown con frontmatter
    (title, description, url, updated, language).
[ ] curl -H "Accept: text/markdown" a /servicios devuelve el Markdown, no el HTML.
[ ] /api/oferta.json valida contra /api/oferta.schema.json; los rangos coinciden
    exactamente con los de /servicios#niveles y con los de /llms.txt.
[ ] El agente de diagnóstico responde con los mismos rangos que /api/oferta.json
    (prueba con los tres ejemplos).
[ ] JSON-LD de Organization, Service, FAQPage y de cada caso sin errores en el
    validador de schema.org.
[ ] robots.txt permite a GPTBot, ClaudeBot, PerplexityBot y Google-Extended; el
    sitemap incluye las rutas /llm/.
[ ] Cada página humana lleva <link rel="alternate" type="text/markdown"> y el
    footer tiene el enlace "Versión para agentes de IA".
[ ] Cambia un precio de prueba en content/, corre el build y confirma que cambia
    en la home, en /servicios, en /llm/servicios, en /llms.txt y en
    /api/oferta.json. Revierte el cambio.

CALIDAD
[ ] npm run lint y npm run build sin errores ni warnings.
[ ] Lighthouse móvil de la home: Performance >= 90, Accessibility >= 95,
    SEO >= 95. Anota los valores.
[ ] Contraste AA en hero, tarjetas y formulario.
[ ] Open Sans es la única fuente cargada.

Si todo pasa, prepara el PR a main con título "Landing minimalista de impacto" y
un cuerpo que liste: bloques nuevos, contenido reubicado (enlace a
docs/reubicacion-contenido.md), correcciones de lenguaje y resultados de
Lighthouse. No hagas merge; lo aprueba Migue.
```

---

## Criterios de aceptación del backlog completo

La entrega se considera terminada cuando un visitante que llega a la home ve, en este orden y sin nada más: un titular sobre el trabajo que hoy nadie hace en su empresa, un campo donde escribe su reto y recibe una respuesta con capacidad y nivel, tres pruebas de que ya funciona, y una única forma de agendar 30 minutos. Todo lo demás existe en el sitio, pero un clic más adentro.

Y cuando un agente de IA o un modelo (ChatGPT, Claude, Perplexity, Gemini o el agente de un cliente) llega al mismo dominio, encuentra la misma información en /llms.txt, en Markdown por ruta y en /api/oferta.json, con los mismos rangos, los mismos casos y el mismo contacto que ve el humano. Una sola fuente de contenido alimenta las dos versiones y al agente de diagnóstico propio.

## Pendientes que no resuelve Claude Code

- Validar con los socios el titular del hero antes de ejecutar el Prompt 2. Es la decisión de marca más visible del rediseño.
- Confirmar que el agente de diagnóstico responde con calidad suficiente para ser el protagonista. Si no, el Prompt 3 debe incluir una iteración del prompt del sistema con casos de prueba reales de los cinco sectores.
- Número de WhatsApp y correo de destino del formulario: verificar que sean los vigentes.
