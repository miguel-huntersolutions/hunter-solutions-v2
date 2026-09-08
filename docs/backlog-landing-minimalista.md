# Backlog: Landing minimalista de impacto (v2, ajustado al código real)
**Sitio:** https://www.huntersolutions.tech/ · **Repo:** https://github.com/miguel-huntersolutions/hunter-solutions-v2
**Fecha:** 2026-09-08 · **Versión:** v2 (reemplaza a v1 del 2026-09-07) · **Área:** Marketing / Tecnología

Esta versión se escribió después de leer el código del repositorio. Los prompts nombran archivos, componentes y funciones que existen, y respetan las reglas que el propio repo ya impone (contrato de contenido en prebuild, corpus de agentes generado desde el contenido, guardrails de salida).

---

## 1. Lo que el código cambió respecto a la v1

| Supuesto de la v1 | Realidad en el repo | Efecto en el backlog |
|---|---|---|
| Next.js 15, npm | **Next.js 16.2, React 19, Tailwind 4, pnpm** (hay `pnpm-lock.yaml`), shadcn sobre base-ui, lucide, recharts, zod 4 | Todos los comandos son `pnpm`. Nada de `npm install`. |
| Habría que extraer el copy a `content/` | **Ya existe `content/` como fuente única** (`brand.ts`, `narrative.ts`, `commercial.ts`, `trust.ts`, `sectores.ts`, `resources.ts`) y un **contrato de contenido en prebuild** (`scripts/validate-content.ts`) que rompe el build si hay vocabulario prohibido o si cambian los conteos (5 sectores, 8 diferenciadores, 6 FAQ, 3 problemas, 18 servicios, 1 puerta de entrada) | Los prompts editan `content/` y **actualizan el validador en el mismo cambio**, si no el build falla. Se aprovecha el validador para vetar "nómina digital" y los guiones largos. |
| Habría que crear llms.txt, robots, sitemap, JSON-LD | **Ya existen** `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`, `app/robots.ts`, `app/sitemap.ts`, `components/seo/org-jsonld.tsx`, `components/seo/faq-jsonld.tsx` y OG images por ruta | La épica de versión para agentes se reduce a lo que falta: espejo Markdown por ruta, `oferta.json`, bots de IA en robots, JSON-LD de Service, enlace en footer. |
| El agente habría que conectarlo a la fuente de contenido | **Ya lo está**: `lib/agents/corpus.ts` genera el corpus desde `content/`, `lib/agents/runtime.ts` arma el system prompt, `lib/agents/guardrails.ts` valida la salida (importes fuera de rango, garantías, datos sensibles) con reintento y respuesta segura | El Prompt 3 no toca la arquitectura del agente; ajusta el rol, la ubicación del panel y el cierre fijo. |
| El recomendador era una ruta | Es una **sección de la home** (`components/home/recommender.tsx`, cargada lazy) con API `app/api/recomendador/route.ts` que tiene mapeo por reglas determinista y opción LLM | No hay redirect que hacer; se retira la sección y se deja la API marcada como deprecated. |
| El ancla de contacto sería `#hablemos` | El ancla real es **`#contacto`** y la usan el header, las páginas de sector y varios enlaces | Se conserva `#contacto`. No se rompe nada. |
| El H1 del hero está en el componente | **Está partido**: `positioning.h1` en `content/narrative.ts` dice "No leas sobre nuestra IA. Habla con ella." (lo usa llms.txt), mientras `components/home/hero-headline.tsx` renderiza otro texto con un `sr-only` distinto para SEO | El nuevo titular se escribe UNA vez en `content/narrative.ts` y `HeroHeadline` lo lee de ahí. Se corrige la triple versión. |
| El agente de diagnóstico es una sección | Está **dentro del hero**, en la columna derecha, sobre una imagen `public/abstract/digital-workforce.png` con blur | Se saca a su propio bloque bajo el hero, sin la imagen de fondo. |
| Sectores: cambiar un desplegable | El sector aparece en **seis lugares acoplados**: `content/narrative.ts` (`sectors`), `content/sectores.ts` (páginas `/sectores/[slug]` con imágenes en `public/sectores/`), `services[].sectoresRelevantes`, el enum zod de `app/api/recomendador/route.ts`, el select de `components/home/contact.tsx` y el corpus de agentes | Cambiar a Salud, Alimentos, Legal, Comercial y Agrícola exige páginas y copy nuevos para Comercial y Agrícola. Va como épica propia (P7b) con decisión de Migue. |

### Hallazgos que la v1 no tenía y que hay que corregir sí o sí

1. **Placeholders visibles en producción.** `content/trust.ts` tiene métricas con valor `"[COMPLETAR con dato real del cliente]"` y `app/casos/[slug]/page.tsx` las renderiza tal cual. `app/sectores/[slug]/page.tsx` muestra `"[COMPLETAR con un caso autorizado del sector ...]"`. Un cliente puede verlo hoy.
2. **WhatsApp incoherente.** `content/brand.ts` tiene `whatsapp: "+573000000000"` (placeholder con TODO) y ese valor alimenta el corpus de los agentes; `components/home/contact.tsx` tiene hardcodeado `573043913066`. El agente de diagnóstico está dando un número falso.
3. **"nómina digital" en 5 lugares:** `components/home/concept.tsx`, `components/home/roles-gallery.tsx`, `components/home/cases.tsx`, `app/gobernanza/page.tsx` y un comentario en `content/commercial.ts`.
4. **Errores de tipo silenciados.** `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`. El build pasa aunque haya errores de TypeScript.
5. **Esquinas redondeadas contra la marca.** `design/tokens.ts` fija `radius: 0` (esquinas rectas), pero hero, catálogo, casos y botones usan `rounded-full` y `rounded-2xl`.
6. **Etiqueta "Más elegido" con hack de posición.** `components/home/catalog.tsx` la coloca con `-mt-[26px]`, por eso se ve descuadrada.
7. **Repo ligado a v0.** El README y `.gitignore` muestran que v0.app empuja commits a `main` y cada merge despliega. Si alguien abre un chat de v0 mientras Claude Code trabaja, habrá conflictos.
8. **El corpus dice "Catálogo de servicios (20)"** pero hay 18 servicios y el validador exige 18. Detalle menor, se corrige de paso.
9. **Guiones largos (—)** en varios archivos de `content/`. El validador no los detecta.
10. **Rate limit en memoria por instancia** (`lib/agents/runtime.ts`). En Vercel serverless no es efectivo entre instancias. No se toca en este backlog, pero queda anotado.

---

## 2. Mapa del repositorio (lo que Claude Code encontrará)

```
app/page.tsx                 home: Hero, Concept, Problems, RolesGallery, Catalog,
                             RecommenderLazy, Cases, GovernanceStrip, Differentiators,
                             Faq, Contact, FaqJsonLd
app/layout.tsx               Open Sans (next/font), SiteHeader, SiteFooter, CookieNotice,
                             OrgJsonLd, @vercel/analytics
app/servicios/page.tsx       niveles + servicios + Sectors + EngagementModels + ToolsLazy
app/servicios/[slug]         ficha por servicio (18)
app/casos, app/casos/[slug]  casos (2 publicados; métricas con placeholder)
app/sectores/[slug]          5 páginas de sector (Legal, Manufactura, Salud, Alimentos, Consumo)
app/fuerza-laboral-digital   página del concepto
app/gobernanza, /preguntas, /formacion, /aliados, /recursos, /privacidad, /terminos, /legal/uso-de-ia
app/api/agents/[agent]       diagnostico | cerebro | privacidad (Vercel AI SDK, modelo openai/gpt-4o-mini vía AI Gateway)
app/api/recomendador         recomendador de nivel (reglas + LLM opcional)
app/api/herramientas/[tool]  3 herramientas jugables (viven en /servicios)
app/api/leads                formulario: zod, honeypot, LEADS_WEBHOOK_URL, Resend
app/llms.txt, app/llms-full.txt, app/robots.ts, app/sitemap.ts
middleware.ts                X-Robots-Tag noindex fuera del host de producción
content/*.ts                 fuente única de verdad (ver arriba)
scripts/validate-content.ts  contrato de contenido en prebuild (zod + vocabulario prohibido + conteos)
lib/agents/{corpus,runtime,guardrails}.ts
lib/seo.ts                   SITE_URL, absoluteUrl, organizationJsonLd
components/home/*            secciones de la home
components/layout/site-header.tsx (NAV de 8 ítems + botón "Agendar diagnóstico" a /#contacto)
components/layout/site-footer.tsx (2 columnas: Empresa, Legal)
components/agents/agent-panel.tsx (panel conversacional genérico)
components/ui/section.tsx    Section (eyebrow, title, intro, tone) y Eyebrow
design/tokens.ts             colores, Open Sans, radius 0, proporción 60-30-10
docs/                        dominio-vercel.md, ga4-canal-ia.md
```

Variables de entorno que usa el código: `NEXT_PUBLIC_SITE_URL`, `LEADS_WEBHOOK_URL`, `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`, y la credencial del AI Gateway de Vercel para los agentes (no aparece en el código porque el SDK la toma del entorno de Vercel).

---

## 3. Cómo usar este backlog

1. Copia este archivo al repo como `docs/backlog-landing-minimalista.md` y haz commit en `main` antes de empezar.
2. **Pausa v0.** Nadie abre el proyecto en v0.app hasta que el PR final esté mergeado.
3. Abre Claude Code en la raíz del repo. Cada sesión: "Lee docs/backlog-landing-minimalista.md y ejecuta solo el Prompt N. No avances al siguiente."
4. Orden: **0 → 1 → 2 → 3 → 4 → 5 → 6 → 7a → 7b → 9 → 8.** Todo en la rama `feat/landing-minimalista`.
5. Cada prompt termina con `pnpm validate:content`, `pnpm lint` y `pnpm build` limpios y un resumen de archivos tocados.
6. Regla para todos: no inventar copy fuera del que está aquí. Si falta, marcar `[PENDIENTE COPY]` y seguir. Todo el copy en español de Colombia, trato de usted, sin emojis, sin guiones largos.

---

## 4. Resumen

| ID | Épica | Resultado | Prioridad |
|---|---|---|---|
| P0 | Línea base y saneamiento previo | Build reproducible, TypeScript sin silenciar, placeholders ocultos, WhatsApp unificado | Alta |
| P1 | Nueva estructura de la home | `app/page.tsx` con 4 bloques; lo demás a `components/legacy/` | Alta |
| P2 | Hero y copy de valor | Titular único en `content/narrative.ts`, leído por `HeroHeadline`; una CTA | Alta |
| P3 | Agente de diagnóstico protagonista | Bloque propio bajo el hero; cierre fijo; absorbe al recomendador | Alta |
| P4 | Prueba en 3 tarjetas + línea de confianza | Reutiliza `publishedCases`; tercera tarjeta "operamos con esto" | Alta |
| P5 | Contacto único, menú de 3, footer | Formulario de 3 campos; NAV reducido; footer con lo secundario | Alta |
| P6 | Reubicar contenido retirado | /servicios, /gobernanza, /nosotros (nuevo), /preguntas | Media |
| P7a | Lenguaje: vetos en el validador | "nómina digital", guiones largos y palabras prohibidas bloqueadas en prebuild | Alta |
| P7b | Sectores foco vigentes | Salud, Alimentos, Legal, Comercial, Agrícola en los 6 puntos acoplados | Alta (requiere decisión) |
| P9 | Versión para agentes de IA y LLM | Espejo Markdown, oferta.json, bots de IA, Service JSON-LD, enlace en footer | Alta |
| P8 | Verificación final y PR | Checklist, Lighthouse, PR a main sin merge | Alta |

---

## Prompt 0: Línea base y saneamiento previo

```
Actúa como desarrollador senior en este repositorio Next.js 16 (App Router, React 19,
Tailwind 4, pnpm). Lee primero docs/backlog-landing-minimalista.md completo para
entender a dónde va el rediseño. Crea la rama feat/landing-minimalista desde main.

PARTE A: línea base (solo medir, no arreglar todavía).
1. pnpm install. Corre pnpm validate:content, pnpm lint y pnpm build. Anota el
   resultado de cada uno en docs/linea-base.md.
2. Cambia temporalmente next.config.mjs a typescript.ignoreBuildErrors: false y
   vuelve a correr pnpm build. Lista TODOS los errores de tipo que aparezcan en
   docs/linea-base.md. Si son pocos (menos de 10), corrígelos y deja
   ignoreBuildErrors en false definitivamente. Si son muchos, vuelve a true, deja la
   lista y sigue: se corrigen en el Prompt 8.
3. Verifica qué variables de entorno hacen falta para correr los agentes en local
   (el SDK de Vercel AI usa el AI Gateway con el modelo "openai/gpt-4o-mini" en
   lib/agents/runtime.ts). Documenta en docs/linea-base.md cómo probarlos en local
   sin exponer credenciales.

PARTE B: saneamiento que no puede esperar (son errores visibles en producción).
4. Placeholders públicos. En content/trust.ts las métricas de los casos tienen
   valor "[COMPLETAR con dato real del cliente]" y app/casos/[slug]/page.tsx las
   pinta. En app/sectores/[slug]/page.tsx se pinta "[COMPLETAR con un caso
   autorizado del sector ...]". Haz dos cosas:
   a) En el renderizado de casos, filtra las métricas cuyo valor empiece por
      "[COMPLETAR" para que no se muestren; si no queda ninguna, no se pinta la
      rejilla de métricas.
   b) En la página de sector, reemplaza el texto entre corchetes por el párrafo
      que ya existe debajo ("Aún no publicamos un caso autorizado de este
      sector...") y elimina el corchete.
   c) Agrega al final de scripts/validate-content.ts una regla que falle si
      cualquier string de content/ que se muestre al cliente contiene "[COMPLETAR"
      o "[PENDIENTE", EXCEPTO los campos resultado.metricas[].valor de los casos
      (esos pueden quedar como recordatorio interno porque ya no se pintan).
5. WhatsApp único. content/brand.ts tiene whatsapp "+573000000000" (placeholder)
   y components/home/contact.tsx hardcodea 573043913066. El corpus de los agentes
   (lib/agents/corpus.ts) usa el de brand.ts, así que el agente está dando un
   número falso. Pon en content/brand.ts el número real +573043913066, exporta
   desde content/index.ts un helper whatsappUrl(mensaje) que construya
   https://wa.me/<número sin +>?text=<mensaje codificado>, y haz que contact.tsx
   lo use. Elimina el hardcode.
6. Corrige el encabezado "## Catálogo de servicios (20)" en lib/agents/corpus.ts
   para que use services.length.

Termina con pnpm validate:content, pnpm lint y pnpm build limpios y un commit
por parte (A y B).
```

---

## Prompt 1: Nueva estructura de la home

```
Actúa como desarrollador front-end senior en el repositorio de Hunter Solutions
Tech (Next.js 16 App Router, React 19, Tailwind 4, pnpm), rama
feat/landing-minimalista. Lee docs/backlog-landing-minimalista.md.

OBJETIVO: la home pasa de 12 secciones y 18 botones a 4 bloques y una sola CTA.

ESTRUCTURA NUEVA de app/page.tsx, en este orden y sin ninguna sección más:

  <Hero />               components/home/hero.tsx (se reescribe en Prompt 2)
  <DiagnosticoBlock />   components/home/diagnostico-block.tsx (nuevo, Prompt 3)
  <Prueba />             components/home/prueba.tsx (nuevo, Prompt 4)
  <Contact />            components/home/contact.tsx (se simplifica en Prompt 5)
  <FaqJsonLd />          se conserva (alimenta a buscadores aunque el FAQ no se vea)

MOVIMIENTOS:
- Crea components/legacy/ y mueve ahí, sin modificarlos: concept.tsx, problems.tsx,
  roles-gallery.tsx, catalog.tsx, investment-chart.tsx, recommender.tsx,
  recommender-lazy.tsx, cases.tsx, governance-strip.tsx, differentiators.tsx,
  faq.tsx. Actualiza cualquier import que los use fuera de la home (revisa
  app/servicios/page.tsx: usa Sectors, EngagementModels y ToolsLazy, que NO se
  mueven porque no son de la home). Se reubican en el Prompt 6.
- lazy-mount.tsx, tool-placeholder.tsx, tools.tsx, tools-lazy.tsx, sectors.tsx,
  engagement-models.tsx, stat-band.tsx se quedan donde están.

REGLAS DE LA HOME:
- Un único destino de CTA: el ancla #contacto (es la que ya usan el header y las
  páginas de sector; no la renombres).
- Los únicos enlaces de la home que salen a otra página son: "Precios publicados
  por nivel" (a /servicios#niveles), "Así lo gobernamos." (a /gobernanza) y los
  "Ver caso" de las tarjetas (a /casos/[slug]).
- Altura máxima: 2 pantallas en 1440x900 y 4 en 390x844.
- Esquinas rectas. design/tokens.ts fija radius 0; en los componentes nuevos no
  uses rounded-full ni rounded-2xl. Los botones nuevos siguen el estilo del botón
  "Agendar diagnóstico" del header (bg-navy, sin radio), no el de píldora del hero
  actual.
- Sin librerías nuevas. Sin imágenes de stock.
- Los componentes nuevos pueden ser cascarones con [PENDIENTE COPY]; el copy llega
  en los prompts 2 a 5.
- La metadata openGraph.title de app/page.tsx se actualiza en el Prompt 2.

Termina con pnpm validate:content, pnpm lint y pnpm build limpios y un resumen.
```

---

## Prompt 2: Hero y copy de valor

```
Actúa como desarrollador front-end senior y redactor de marca en el repositorio de
Hunter Solutions Tech, rama feat/landing-minimalista. Lee
docs/backlog-landing-minimalista.md.

PROBLEMA A RESOLVER: hoy el titular existe en tres versiones distintas.
content/narrative.ts tiene positioning.h1 = "No leas sobre nuestra IA. Habla con
ella." (lo usan llms.txt y el corpus de agentes); components/home/hero-headline.tsx
pinta "Contrate una Fuerza Laboral Digital. No lea sobre ella: pruébela." y además
mete un sr-only con "Agentes de IA y Fuerza Laboral Digital para empresas en
Colombia." Tres mensajes para un solo H1. A partir de ahora el titular vive UNA vez
en content/narrative.ts y todo lo lee de ahí.

1. En content/narrative.ts, reemplaza el objeto positioning por:

   positioning = {
     h1: "Hay trabajo en su empresa que hoy nadie hace. Nosotros lo hacemos.",
     h1Lineas: ["Hay trabajo en su empresa que hoy nadie hace.", "Nosotros lo hacemos."],
     apoyo: "Cobranza que no se persigue, documentos que no se revisan, clientes que no reciben respuesta a tiempo. Construimos capacidades digitales que se conectan a sus sistemas y ejecutan ese trabajo, con supervisión de su equipo.",
     invitacion: "Cuéntele su reto al Agente de Diagnóstico y sepa por dónde empezar.",
     nuevosTitulo: "Nuevos como marca, no en oficio",
     nuevosArgumento: (déjalo como está),
   }
   Agrega h1Lineas al tipo Positioning en content/types.ts.

2. Reescribe components/home/hero-headline.tsx para que el H1 sea exactamente
   positioning.h1 (sin sr-only alternativo) y pinte las dos líneas de h1Lineas con
   la animación hero-line que ya existe en globals.css. La segunda línea en
   text-line como hoy.

3. Reescribe components/home/hero.tsx:
   - Mantén SurfaceProvider tone="dark", bg-navy, la rejilla hst-grid y el
     resplandor hst-glow.
   - Quita la columna derecha con AgentPanel y la imagen
     /abstract/digital-workforce.png (el agente pasa a su propio bloque en el
     Prompt 3).
   - Contenido, en una sola columna centrada a la izquierda con max-w-[64ch]:
       Eyebrow: "Hunter Solutions Tech · Consultora AI-native · Colombia"
       H1: HeroHeadline
       Párrafo: positioning.apoyo
       Botón único: "Agendar diagnóstico de 30 minutos, sin costo" -> #contacto
         (estilo bg-teal, sin radio, texto blanco, hover bg-teal-dark)
       Línea de confianza pequeña, en una fila, separada por espacios, sin iconos:
         "El activo es suyo."  "Independientes de proveedor."  "Precios publicados."
         donde "Precios publicados." es Link a /servicios#niveles.
   - Quita la lista de chips de sectores del hero.
   - Quita el botón "Ver servicios".

4. Metadata:
   - app/layout.tsx title.default: "Hunter Solutions Tech | El trabajo que hoy
     nadie hace en su empresa, hecho"
   - app/layout.tsx description (máximo 155 caracteres): "Capacidades digitales
     que se conectan a sus sistemas y ejecutan el trabajo que hoy nadie hace.
     Consultora AI-native en Colombia."
   - app/page.tsx openGraph.title = positioning.h1 (impórtalo, no lo dupliques).
   - Revisa app/opengraph-image.tsx: si pinta un titular literal, que lea
     positioning.h1.

5. Actualiza scripts/validate-content.ts para exigir que positioning.h1 NO
   contenga las palabras "IA", "inteligencia artificial", "agentes" ni "Fuerza
   Laboral Digital" (regla: el titular habla de trabajo y plata, no de tecnología).

Accesibilidad: un solo H1 en la home, contraste AA, foco visible en el botón,
área de toque mínima 44px en móvil.

Termina con pnpm validate:content, pnpm lint y pnpm build limpios.
```

---

## Prompt 3: Agente de diagnóstico protagonista

```
Actúa como desarrollador full-stack senior en el repositorio de Hunter Solutions
Tech, rama feat/landing-minimalista. Lee docs/backlog-landing-minimalista.md y
estos archivos antes de tocar nada: components/agents/agent-panel.tsx,
app/api/agents/[agent]/route.ts, lib/agents/runtime.ts, lib/agents/corpus.ts,
lib/agents/guardrails.ts, app/api/recomendador/route.ts,
components/legacy/recommender.tsx.

CONTEXTO: la arquitectura del agente está bien y NO se cambia: corpus generado
desde content/, system prompt con guardrails, validación de salida con reintento y
respuesta segura, rate limit. Lo que cambia es su lugar en la página, su rol y su
cierre, y que absorbe la función del recomendador de nivel.

1. Nuevo componente components/home/diagnostico-block.tsx (server component que
   envuelve al AgentPanel cliente), segundo bloque de la home, con id="diagnostico".
   Usa Section con tone="white":
     eyebrow: "Pruébelo ahora"
     title: "No lea sobre nuestra IA. Pruébela."
     intro: "Cuéntele su reto operativo. Le dice por dónde empezar, qué capacidad
             aplica y en qué nivel de inversión queda. Sin registrarse."
   Dentro, AgentPanel con:
     endpoint="/api/agents/diagnostico"
     title="Agente de Diagnóstico"
     placeholder="Ejemplo: cada mes se me quedan facturas sin cobrar y nadie las persigue."
     suggestions (reemplazan a las tres actuales):
       "Se me pierden facturas por cobrar y nadie hace seguimiento."
       "Recibimos cientos de hojas de vida y no alcanzamos a leerlas."
       "Buscar una cláusula en nuestros contratos toma horas."
     tone="light"
   Revisa que AgentPanel con tone="light" se vea bien sobre fondo blanco; si el
   panel solo está diseñado para dark, ajusta las clases del tono light. Sin la
   imagen de fondo del hero. Sin radio en las esquinas.

2. Rol del agente. En app/api/agents/[agent]/route.ts reemplaza
   AGENT_ROLES.diagnostico por:
   "Eres el Agente de Diagnóstico de Hunter Solutions Tech. El visitante te cuenta
   un reto operativo. Aplicas la lente CNT (cultura, negocio, tecnología), haces
   como máximo una pregunta de precisión si de verdad hace falta, y respondes en
   este orden: (1) qué está pasando en su proceso, en una o dos frases; (2) la
   capacidad que aplica, nombrada por función y solo entre estas: Agente de
   Cobranza, Agente de Documentos, Agente de Atención, Agente de Auditoría, Agente
   de Gestión, Agente de Agendamiento; (3) el servicio del catálogo y el nivel de
   inversión con su rango publicado; (4) SIEMPRE esta frase literal de cierre: 'Si
   quiere que lo revisemos con su caso real, agende 30 minutos sin costo en la
   sección Hablemos de esta página.' Nunca prometes cifras de retorno cerradas:
   usas 'rango', 'según el caso', 'medimos antes y después'. Nunca usas la
   expresión 'nómina digital'."

3. Fusión con el recomendador: la sección del recomendador ya no está en la home
   (quedó en components/legacy/). No la reubiques en ninguna página. En
   app/api/recomendador/route.ts agrega al inicio un comentario
   "@deprecated 2026-09: la recomendación de nivel la hace el agente de
   diagnóstico" y NO la borres (puede tener tráfico). Quita cualquier enlace
   interno a #recomendador (busca "recomendador" en app/ y components/).

4. Guardrails: en lib/agents/guardrails.ts agrega un patrón que marque violación
   si la respuesta contiene "nómina digital" (insensible a mayúsculas) y que el
   correctiveInstruction lo mencione. Verifica que el cierre literal del punto 2 no
   dispare falsos positivos en AMOUNT_PATTERNS ni GUARANTEE_PATTERN.

5. Analytics: en components/agents/agent-panel.tsx, cuando la respuesta llegue
   completa, dispara track("diagnostico_respondido") de @vercel/analytics con la
   propiedad endpoint. Solo en producción (ya hay un guard NODE_ENV en layout;
   respétalo o usa el mismo patrón).

6. Prueba manual documentada: corre los tres ejemplos de suggestions contra el
   agente en local y pega las respuestas completas en
   docs/pruebas-agente-diagnostico.md. Cada respuesta debe traer capacidad, nivel
   con rango y el cierre literal. Si alguna no lo trae, ajusta el rol y repite.

Termina con pnpm validate:content, pnpm lint y pnpm build limpios.
```

---

## Prompt 4: Prueba en tres tarjetas y línea de confianza

```
Actúa como desarrollador front-end senior en el repositorio de Hunter Solutions
Tech, rama feat/landing-minimalista. Lee docs/backlog-landing-minimalista.md,
content/trust.ts, content/index.ts (publishedCases) y components/legacy/cases.tsx.

Crea components/home/prueba.tsx, tercer bloque de la home, id="prueba", con
Section tone="bg":
  eyebrow: "Ya está funcionando"
  title: "Tres pruebas, sin cifras infladas."

Tres tarjetas del mismo tamaño, esquinas rectas, sin iconos ni imágenes, en grid
de 3 columnas en desktop y 1 en móvil:

  Tarjetas 1 y 2: se generan desde publishedCases (las dos que existen). Cada
  tarjeta muestra: sector (eyebrow pequeño), titulo, resultado.texto como frase
  principal, resultado.encuadre como nota pequeña y un Link "Ver caso" a
  /casos/[slug]. NO dupliques el texto: léelo del content model. NO pintes
  resultado.metricas.

  Tarjeta 3, estática, definida en content/trust.ts como nuevo export
  `pruebaPropia` (agrega el tipo en content/types.ts):
    sector: "Hunter Solutions Tech"
    titulo: "Operamos nuestra propia empresa con esto"
    texto: "Nuestros agentes gestionan la operación interna de HST todos los días.
            Es la demostración que mostramos en la primera reunión."
    nota: "Se lo mostramos en vivo en el diagnóstico."
  Sin enlace.

Debajo de las tarjetas, un párrafo de confianza (texto mediano, max-w-[64ch]):
  "Su código y sus datos son suyos. Cada decisión del agente queda registrada y
   las sensibles las aprueba una persona. Así lo gobernamos."
  "Así lo gobernamos." es Link a /gobernanza.
  Este texto también va en content/trust.ts (export `lineaConfianza`), no en el
  componente.

Línea secundaria pequeña: "Precios publicados por nivel." como Link a
/servicios#niveles.

Botón de cierre del bloque, mismo texto y estilo que el del hero:
  "Agendar diagnóstico de 30 minutos, sin costo" -> #contacto

Agrega en scripts/validate-content.ts la validación de pruebaPropia y
lineaConfianza (strings no vacíos, pasan por scanProhibited).

Termina con pnpm validate:content, pnpm lint y pnpm build limpios.
```

---

## Prompt 5: Contacto único, menú de tres ítems y footer

```
Actúa como desarrollador front-end senior en el repositorio de Hunter Solutions
Tech, rama feat/landing-minimalista. Lee docs/backlog-landing-minimalista.md,
components/home/contact.tsx, app/api/leads/route.ts,
components/layout/site-header.tsx y components/layout/site-footer.tsx.

PARTE A: components/home/contact.tsx (conserva id="contacto").
  Section tone="white":
    eyebrow: "Hablemos"
    title: "Agende una sesión de diagnóstico de 30 minutos, sin costo."
    intro: "Salimos con dos o tres oportunidades concretas y por dónde empezar."
  Formulario de TRES campos y nada más: nombre, email (Correo de trabajo) y reto
  (textarea, label "¿Cuál es el reto?", placeholder "Cuéntenos en dos líneas qué se
  le está quedando sin hacer o dónde se le está perdiendo plata.").
  - Elimina el select de sector y la constante SECTORS del componente. El esquema
    zod de app/api/leads/route.ts ya tiene sector como opcional; no hace falta
    tocarlo. Envía origen: "home".
  - Conserva el honeypot empresa_web, la casilla de consentimiento con el texto
    legal actual (Ley 1581 de 2012 y enlace a /privacidad) y la lógica de envío.
  - Botón principal: "Solicitar la sesión" (bg-navy, sin radio).
  - Botón secundario: "Escríbanos por WhatsApp" usando whatsappUrl("Hola, quiero
    agendar un diagnóstico de 30 minutos") del content model (Prompt 0).
  - Mensaje de éxito: "Listo. Le escribimos en menos de un día hábil para agendar."
  - Mensaje de error: el actual.
  Al lado del formulario (columna derecha en desktop, debajo en móvil), dos
  preguntas en texto plano, leídas de content/narrative.ts faqs por índice o por
  id: la de "¿Garantizan el retorno de la inversión?" y la de "¿Qué pasa con
  nuestros datos y nuestra información?". Pinta pregunta en negrita y respuesta
  en texto normal. No dupliques el texto.

PARTE B: components/layout/site-header.tsx.
  NAV pasa a: Servicios (/servicios), Casos (/casos). El botón "Agendar
  diagnóstico" se renombra a "Hablemos" y sigue apuntando a /#contacto. Tres
  elementos en total. El menú móvil con hamburguesa se conserva pero solo con esos
  tres. Elimina del NAV: Fuerza Laboral Digital, Gobernanza, Formación, Recursos,
  Aliados, Preguntas (siguen existiendo como páginas; van al footer).

PARTE C: components/layout/site-footer.tsx. COLUMNS pasa a tres:
  "Empresa": Servicios, Casos, Gobernanza de IA, Nosotros (/nosotros, se crea en
             el Prompt 6), Preguntas frecuentes.
  "Más": Fuerza Laboral Digital (/fuerza-laboral-digital), Formación, Recursos,
         Aliados.
  "Legal": Política de privacidad, Términos de uso, Uso de IA en este sitio,
           Versión para agentes de IA (/llms.txt, se completa en el Prompt 9).
  El grid pasa de md:grid-cols-3 a md:grid-cols-4 (logo + 3 columnas).
  En el bloque del logo, cambia el párrafo descriptivo por positioning.apoyo
  recortado a la primera frase, o por un texto fijo: "Consultora AI-native en
  Colombia. Capacidades digitales que ejecutan el trabajo que hoy nadie hace."
  Conserva la línea "Generadores de Soluciones con Inteligencia Artificial.
  TECH | AI-NATIVE."

Verifica que ninguna ruta del footer devuelva 404 (Nosotros puede quedar como
enlace roto hasta el Prompt 6; anótalo en el resumen).

Termina con pnpm validate:content, pnpm lint y pnpm build limpios.
```

---

## Prompt 6: Reubicar el contenido que salió de la home

```
Actúa como arquitecto de contenido y desarrollador senior en el repositorio de
Hunter Solutions Tech, rama feat/landing-minimalista. Lee
docs/backlog-landing-minimalista.md. Nada se pierde; se reubica según esta tabla,
reutilizando los componentes de components/legacy/ (adáptalos, no los reescribas).

  Concept (Fuerza Laboral Digital: su gente / sus agentes / juntos)
    -> app/fuerza-laboral-digital/page.tsx ya explica el concepto. Verifica que
       cubra lo mismo; si no, inserta Concept ahí. En /servicios NO va.
  Problems (los tres frenos)
    -> app/servicios/page.tsx, segundo bloque, titulado "Por dónde se atasca".
  RolesGallery (cotizaciones, atención, administrativo)
    -> app/servicios/page.tsx, dentro del bloque de niveles, como "Ejemplos de lo
       que un agente opera". Cambia el intro para que no diga "nómina digital".
  Catalog + InvestmentChart (niveles con precios)
    -> app/servicios/page.tsx ya lista niveles. Asegura un ancla id="niveles" en
       ese bloque (la home enlaza a /servicios#niveles). Si Catalog aporta algo que
       la página no tiene (el gráfico, la etiqueta "Más elegido"), intégralo. La
       etiqueta "Más elegido" se posiciona sin el hack -mt-[26px]: que sea un
       elemento del flujo dentro de la cabecera de la tarjeta del Nivel 2.
  RecommenderLazy -> no se reubica (lo hace el agente).
  Cases (casos completos + "Usamos nuestra propia nómina digital")
    -> app/casos/page.tsx ya lista los casos. Lleva ahí el bloque de "operamos con
       esto" usando pruebaPropia del content model (Prompt 4), no el texto viejo.
  GovernanceStrip (5 pilares)
    -> app/gobernanza/page.tsx ya existe. Verifica que tenga los cinco pilares
       (guardrails, trazabilidad, supervisión humana, despliegue flexible,
       independencia) y que NO diga "nómina digital" (hoy lo dice en la línea 88
       aprox.; cámbialo por "una fuerza laboral digital se gobierna como un equipo
       de personas: con roles claros, supervisión y trazabilidad").
  Differentiators (8)
    -> Nueva página app/nosotros/page.tsx con metadata propia, H1 "Nosotros" y los
       8 diferenciadores del content model reagrupados en 3 bloques:
         "El activo es suyo": El activo es del cliente, Independencia de modelo,
                              Despliegue donde usted decida
         "Sabemos operarlo": AI-Native de origen, Experiencia real del equipo,
                             Lente CNT
         "Promesa responsable": Promesa responsable, Precios de referencia
                                publicados
       Agrupa por titulo (los títulos están en content/narrative.ts). Incluye
       también positioning.nuevosTitulo y nuevosArgumento como cierre. CTA final
       a /#contacto con el texto del hero. Agrega /nosotros a app/sitemap.ts.
  Faq (6 preguntas)
    -> app/preguntas/page.tsx ya existe con todas. Sin cambios.

Cada página destino conserva un único H1 y metadata propia. Corre una búsqueda de
enlaces internos a anclas que ya no existen en la home (#servicios, #fuerza-laboral,
#recomendador, #casos, #gobernanza, #preguntas) en app/ y components/ y redirígelos
a la página correspondiente.

Entrega docs/reubicacion-contenido.md con la tabla bloque retirado -> ruta ->
componente. Termina con pnpm validate:content, pnpm lint y pnpm build limpios.
```

---

## Prompt 7a: Lenguaje, vetado en el validador

```
Actúa como editor de contenido y desarrollador en el repositorio de Hunter
Solutions Tech, rama feat/landing-minimalista. El repo ya tiene un contrato de
contenido en scripts/validate-content.ts que corre en prebuild y falla el build
ante vocabulario prohibido. Vamos a usarlo para que las reglas de marca no
dependan de la memoria de nadie.

1. Amplía PROHIBIDAS en scripts/validate-content.ts con: "nómina digital",
   "nomina digital", "bajo costo", "compañía joven", "arquitectos de soluciones",
   "100%", "siempre" (solo como palabra completa; usa regex de límite de palabra
   para "siempre" y "total"), "total". Mantén la excepción documentada de
   promise.capacidad y de "no como cifra garantizada".
   OJO: principles tiene el título "Supervisión humana siempre". Reescríbelo a
   "Supervisión humana en cada agente" antes de activar la regla.
2. Guiones largos. Agrega una regla que falle si un string de content/ contiene
   el carácter "—", EXCEPTO en los campos fuente de claims y de casos (son
   referencias internas a documentos). Corrige todos los que aparezcan en copy
   visible reemplazando por punto, coma o dos puntos.
3. Aplica scanProhibited también a: governance, teamExperience, partners,
   training, sectorPages, resources (hoy no se escanean; están en content/trust.ts,
   content/sectores.ts y content/resources.ts).
4. Componentes con copy literal fuera de content/. Busca en components/ y app/ las
   cadenas "nómina digital", "bajo costo", "compañía joven", "garantizado" y "—"
   y corrígelas. Casos conocidos: components/legacy/concept.tsx,
   components/legacy/roles-gallery.tsx, components/legacy/cases.tsx,
   app/gobernanza/page.tsx, comentario en content/commercial.ts. Los archivos en
   components/legacy/ que ya no se usan en ninguna ruta se eliminan en este paso
   (confirma con grep que nadie los importa antes de borrar).
5. Agrega un script pnpm "check:copy" que haga grep de esas cadenas en app/,
   components/ y content/ y falle si encuentra alguna. Inclúyelo en prebuild
   después de validate:content.
6. Corrige el rol de "cerebro" y "privacidad" en app/api/agents/[agent]/route.ts
   solo si contienen vocabulario vetado (revísalos).

Entrega docs/correcciones-lenguaje.md con archivo, texto anterior, texto nuevo.
Termina con pnpm validate:content, pnpm check:copy, pnpm lint y pnpm build
limpios.
```

---

## Prompt 7b: Sectores foco vigentes (requiere decisión previa de Migue, ver sección 6)

```
Actúa como desarrollador senior y arquitecto de contenido en el repositorio de
Hunter Solutions Tech, rama feat/landing-minimalista. Lee
docs/backlog-landing-minimalista.md, content/narrative.ts (sectors),
content/sectores.ts, content/commercial.ts (services[].sectoresRelevantes),
app/api/recomendador/route.ts y app/sectores/[slug]/page.tsx.

DECISIÓN DE NEGOCIO (ya tomada): los sectores foco de cara al cliente son
Salud, Alimentos, Legal, Comercial y Agrícola. Manufactura y Consumo dejan de ser
sectores foco; pueden citarse como experiencia del equipo.

El sector está acoplado en seis puntos. Cámbialos de forma coherente:

1. content/narrative.ts: sectors = ["Salud", "Alimentos", "Legal", "Comercial",
   "Agrícola"]. El validador exige 5: se cumple.
2. content/commercial.ts: en cada services[].sectoresRelevantes reemplaza
   "Manufactura" y "Consumo" por el o los sectores nuevos que apliquen con
   criterio conservador: procesos documentales, cotizaciones, cartera y ERP
   aplican a Comercial y Agrícola; salud y legal solo donde tenga sentido. Si no
   estás seguro, deja "Comercial". Ningún servicio puede quedar con un sector que
   no esté en sectors (agrega esa validación cruzada al validador).
3. content/sectores.ts: crea las páginas de Comercial (slug "comercial") y
   Agrícola (slug "agricola") con la misma estructura que las existentes. Copy:
   usa [PENDIENTE COPY] en bluf, dolores y agentes; NO inventes casos ni cifras.
   Las páginas de Manufactura y Consumo se conservan en el archivo y en el sitemap
   (tienen SEO y el caso de Consumo es real) pero se marcan con un campo nuevo
   `foco: false` y no se listan en el componente Sectors de /servicios ni en el
   corpus como sector atendido. Imágenes: reutiliza temporalmente
   public/sectores/consumo.png para Comercial y alimentos.png para Agrícola y
   anota en el resumen que hacen falta dos imágenes nuevas.
4. app/api/recomendador/route.ts: el enum zod de sector se genera de sectors,
   así que se ajusta solo; verifica.
5. components/home/contact.tsx: ya no tiene select de sector (Prompt 5). Si en
   otra página queda un desplegable de sector, sus opciones deben ser sectors +
   "Otro".
6. lib/agents/corpus.ts: la línea "Sectores atendidos" se genera de sectors;
   agrega después una línea: "Experiencia adicional del equipo: manufactura e
   importación, consumo masivo."
7. positioning.apoyo ya no menciona sectores (Prompt 2). Revisa app/opengraph-
   image.tsx, app/servicios/page.tsx y components/home/sectors.tsx por listas
   literales de sectores y hazlas leer de sectors.
8. El caso de consumo conserva sector: "Consumo" (es un dato real del caso).

Termina con pnpm validate:content, pnpm check:copy, pnpm lint y pnpm build
limpios y un listado de los [PENDIENTE COPY] que dejaste.
```

---

## Prompt 9: Versión para agentes de IA y LLM (lo que falta, no lo que ya existe)

```
Actúa como desarrollador full-stack senior y especialista en GEO en el repositorio
de Hunter Solutions Tech, rama feat/landing-minimalista. Ejecuta esto DESPUÉS de
7a y 7b. Lee primero lo que ya existe: app/llms.txt/route.ts,
app/llms-full.txt/route.ts, app/robots.ts, app/sitemap.ts, middleware.ts,
components/seo/org-jsonld.tsx, components/seo/faq-jsonld.tsx, lib/seo.ts,
lib/agents/corpus.ts.

PRINCIPIO: el sitio existe en dos versiones que comparten content/ como única
fuente: la humana (la normal) y la versión para agentes de IA y modelos. El repo
ya tiene llms.txt, llms-full.txt, robots, sitemap, Organization y FAQPage JSON-LD
y un corpus de agentes generado del content model. NO los reescribas; complétalos.

1. llms.txt (app/llms.txt/route.ts): ajusta para que refleje el nuevo
   posicionamiento y sea completo:
   - La cita inicial usa positioning.h1 y positioning.apoyo (ya lo hace; verifica
     que con el nuevo texto lea bien).
   - Agrega secciones: "Sectores foco" (sectors), "Casos" con resultado.texto y
     resultado.encuadre de publishedCases, "Prueba propia" (pruebaPropia),
     "Gobernanza" con una línea por pilar de governance.observabilidad y
     governance.arquitectura, "Cómo contactar" con brand.email, whatsappUrl y el
     enlace a /#contacto, y una sección "Optional" con Formación, Recursos,
     Aliados, Preguntas y Nosotros.
   - Agrega enlaces a las versiones Markdown de cada página (punto 3).
   - Cache-Control: public, max-age=3600.
2. llms-full.txt: agrega páginas de sector (sectorPages con foco true), gobernanza
   completa, nosotros (diferenciadores agrupados) y preguntas. Mismo Cache-Control.
3. Espejo Markdown por ruta. Crea app/llm/[[...slug]]/route.ts que devuelva
   text/markdown; charset=utf-8 para: / (home), /servicios, /servicios/[slug],
   /casos, /casos/[slug], /gobernanza, /nosotros, /preguntas,
   /fuerza-laboral-digital, /sectores/[slug]. Cada Markdown lleva frontmatter con
   title, description, url (absoluta), updated (fecha de build) y language: es-CO.
   Genera el cuerpo desde content/ con helpers en lib/markdown.ts (uno por tipo
   de página); nada hardcodeado. Para rutas no soportadas devuelve 404 en
   Markdown.
4. Negociación de contenido en middleware.ts (ya existe y ya tiene matcher): si la
   petición trae Accept que incluya "text/markdown" y la ruta tiene espejo,
   reescribe (NextResponse.rewrite) a /llm/<ruta>. Conserva la lógica de
   X-Robots-Tag tal cual. Cuidado: el matcher actual excluye rutas con punto, así
   que /llms.txt no pasa por el middleware; está bien.
5. Oferta en JSON. Crea app/oferta.json/route.ts (en la raíz, NO bajo /api, porque
   robots deshabilita /api/) con export const dynamic = "force-static" que
   devuelva: version (fecha ISO de build), aviso ("Rangos en COP sin IVA; el
   retorno se proyecta con supuestos, no se garantiza"), brand (sin whatsapp
   crudo: usa la URL wa.me), sectores foco, niveles con rangoMin/rangoMax/nota,
   servicios (id, slug, nivel, nombre, descripcion, queSolucionamos,
   sectoresRelevantes, esPuertaDeEntrada, url absoluta), roles, casos publicados
   (sin metricas), gobernanza, promesa en 3 capas, etapas, faqs y contacto. Crea
   también app/oferta.schema.json/route.ts con un JSON Schema generado con zod
   (zod 4 trae z.toJSONSchema). Cache-Control 3600.
6. JSON-LD que falta:
   - Service por nivel con Offer y priceSpecification en COP (minPrice, maxPrice;
     el nivel 3 solo minPrice) y provider apuntando al @id de Organization que ya
     define components/seo/org-jsonld.tsx. Inyéctalo en app/servicios/page.tsx.
   - En app/casos/[slug]/page.tsx un Article (headline, about, datePublished =
     autorizacion.fecha, publisher = @id de Organization).
   - En app/layout.tsx, dentro de metadata.alternates, agrega types:
     { "text/markdown": "/llm" } y en cada página con espejo su ruta /llm/...
     correspondiente (usa generateMetadata donde ya exista).
7. app/robots.ts: además de la regla "*", agrega reglas explícitas de allow "/"
   para GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot,
   Google-Extended, Bingbot, CCBot y Applebot-Extended, manteniendo disallow de
   /api/ y /design-system. Agrega /llm/ y /oferta.json al sitemap (app/sitemap.ts)
   con changeFrequency weekly.
8. Descubrimiento humano: en components/layout/site-footer.tsx el enlace "Versión
   para agentes de IA" (creado en el Prompt 5) apunta a /llms.txt. Sin icono.
9. El agente de diagnóstico ya lee content/ vía lib/agents/corpus.ts; no lo
   toques. Solo verifica que corpus, llms.txt y oferta.json den los mismos rangos
   (escribe un test mínimo en scripts/check-coherencia.ts que compare los tres y
   agrégalo a prebuild).
10. docs/version-agentes.md: rutas, cómo se regeneran, ejemplos con curl
    (curl -H "Accept: text/markdown" https://www.huntersolutions.tech/servicios),
    y la nota de mantenimiento: se edita content/, todo se regenera.

Termina con pnpm validate:content, pnpm check:copy, pnpm lint y pnpm build
limpios, y las primeras 20 líneas de /llms.txt, /llm/servicios y /oferta.json
pegadas en docs/version-agentes.md.
```

---

## Prompt 8: Verificación final y PR

```
Actúa como QA senior y revisor de marca en el repositorio de Hunter Solutions Tech,
rama feat/landing-minimalista. No cambies código salvo para corregir lo que falle
aquí. Entrega docs/verificacion-landing.md con PASA / FALLA y evidencia por punto.

ESTRUCTURA
[ ] app/page.tsx importa exactamente Hero, DiagnosticoBlock, Prueba, Contact y
    FaqJsonLd. Nada más.
[ ] Un único H1 en la home y es positioning.h1.
[ ] Header: Servicios, Casos, Hablemos. Nada más.
[ ] Todos los botones de la home llevan a #contacto. Los únicos enlaces a otra
    página son "Precios publicados" (/servicios#niveles), "Así lo gobernamos."
    (/gobernanza) y los "Ver caso".
[ ] Altura de la home: máximo 2 pantallas en 1440x900 y 4 en 390x844 (mide con
    Playwright; Chromium ya está instalado). Anota píxeles.
[ ] Ningún componente nuevo usa rounded-full ni rounded-2xl.

CONTENIDO
[ ] pnpm validate:content y pnpm check:copy pasan.
[ ] grep -ri "nómina digital" en app/, components/, content/, lib/ da cero.
[ ] grep de "\[COMPLETAR" en el HTML renderizado de /casos/* y /sectores/* da
    cero (los placeholders de content/ no se pintan).
[ ] Ningún guion largo ni emoji en copy visible.
[ ] sectors = Salud, Alimentos, Legal, Comercial, Agrícola en la home, /servicios,
    corpus y llms.txt.
[ ] "Más elegido" solo sobre Nivel 2 y sin hack de margen negativo.
[ ] WhatsApp: el mismo número en brand.ts, contact.tsx, corpus y oferta.json.

FUNCIONAL
[ ] Agente de diagnóstico: con los tres ejemplos responde capacidad, nivel con
    rango y el cierre literal; sin "nómina digital"; guardrails no bloquean el
    cierre. Pega las respuestas.
[ ] Formulario: envío con 3 campos, consentimiento obligatorio, honeypot activo,
    mensaje de éxito nuevo. Prueba con LEADS_WEBHOOK_URL vacío (debe loguear) y
    con uno de prueba.
[ ] WhatsApp abre con el mensaje prellenado.
[ ] /nosotros existe, tiene metadata y está en el sitemap.
[ ] Ningún enlace roto en header, home, footer, /servicios, /casos, /gobernanza,
    /nosotros, /preguntas (crawler simple con Playwright).

VERSIÓN PARA AGENTES
[ ] /llms.txt y /llms-full.txt responden 200, text/plain, con Cache-Control.
[ ] Cada ruta humana con espejo responde en /llm/... con text/markdown y
    frontmatter.
[ ] curl -H "Accept: text/markdown" /servicios devuelve Markdown.
[ ] /oferta.json valida contra /oferta.schema.json; scripts/check-coherencia.ts
    pasa (mismos rangos en corpus, llms.txt y oferta.json).
[ ] JSON-LD Organization, Service, FAQPage y Article sin errores en el validador
    de schema.org.
[ ] robots.txt lista los bots de IA; sitemap incluye /llm/ y /oferta.json.
[ ] Footer tiene "Versión para agentes de IA".
[ ] Prueba de fuente única: cambia rangoMax del Nivel 1 en content/commercial.ts,
    pnpm build, confirma el cambio en /servicios, /llm/servicios, /llms.txt,
    /oferta.json y en el corpus. Revierte.

CALIDAD
[ ] typescript.ignoreBuildErrors en false y pnpm build limpio (si en el Prompt 0
    quedó en true, corrige aquí los errores restantes).
[ ] pnpm lint sin errores.
[ ] Lighthouse móvil de la home: Performance >= 90, Accessibility >= 95, SEO >= 95.
[ ] Contraste AA en hero, tarjetas y formulario. Open Sans única fuente.

Si todo pasa, abre el PR a main con título "Landing minimalista de impacto" y un
cuerpo que enlace docs/reubicacion-contenido.md, docs/correcciones-lenguaje.md,
docs/version-agentes.md, docs/verificacion-landing.md y los [PENDIENTE COPY]
abiertos. No hagas merge; lo aprueba Migue.
```

---

## 5. Criterios de aceptación del conjunto

Un visitante humano ve, en este orden y sin nada más: un titular sobre el trabajo que hoy nadie hace en su empresa, un campo donde escribe su reto y recibe capacidad y nivel, tres pruebas de que ya funciona y una única forma de agendar 30 minutos. Todo lo demás existe, un clic más adentro.

Un agente de IA o un modelo que llega al mismo dominio encuentra la misma información en /llms.txt, en Markdown por ruta y en /oferta.json, con los mismos rangos, casos y contacto que ve el humano, porque todo sale de `content/` y el build falla si algo se desalinea.

## 6. Decisiones que Claude Code no puede tomar (resolver antes de arrancar)

1. **Titular del hero.** "Hay trabajo en su empresa que hoy nadie hace. Nosotros lo hacemos." Validarlo con Sandra y César antes del Prompt 2. Es la decisión más visible del rediseño y el Prompt 2 lo escribe tal cual.
2. **Sectores (Prompt 7b).** Cambiar a Salud, Alimentos, Legal, Comercial y Agrícola implica dos páginas de sector nuevas sin copy real ni imagen, y despriorizar las de Manufactura y Consumo, que hoy tienen SEO y el único caso de consumo. Opciones: (a) ejecutar 7b ahora con [PENDIENTE COPY] y completar el copy después; (b) posponer 7b y dejar los 5 sectores actuales hasta tener el copy de Comercial y Agrícola. Recomendación: (a), porque el material comercial ya dice los cinco nuevos y la web no puede contradecirlo.
3. **WhatsApp.** Confirmar que +57 304 391 3066 es el número vigente; el Prompt 0 lo deja como único número en todo el sitio.
4. **v0.** Nadie abre el proyecto en v0.app hasta que el PR esté mergeado. Si v0 empuja un commit a main a mitad de camino, hay que rebasar la rama.
5. **Credenciales.** Confirmar que en Vercel están configuradas la del AI Gateway (agentes), `LEADS_WEBHOOK_URL` o `RESEND_API_KEY` + `LEADS_TO_EMAIL` + `LEADS_FROM_EMAIL` (formulario). Si `LEADS_WEBHOOK_URL` está vacío, los leads solo quedan en el log del servidor y se pierden con la instancia.
6. **Fuera de este backlog, pero anotado:** el rate limit de los agentes es en memoria por instancia (no protege en serverless) y las métricas reales de los casos siguen en `[COMPLETAR]` en `content/trust.ts`. Cuando haya un número medido, se pone ahí y vuelve a pintarse solo.
