# Mapa del landing actual

**Repositorio:** `hunter-solutions-v2` · **Fecha:** 2026-09-07
**Origen:** Prompt 0 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

Documento de solo lectura. Ningún archivo fue modificado para producirlo.

> **Corrección de partida:** el backlog asume Next.js 15 y `npm`. El repositorio usa
> **Next.js 16.2.6** con **pnpm** (hay `pnpm-lock.yaml`). Los prompts que cierran con
> `npm run build` deben leerse como `pnpm build`.

---

## 1. Página de inicio y secciones

**Archivo:** [`app/page.tsx`](../app/page.tsx) (41 líneas). No tiene JSX propio más allá
de la lista de componentes: el orden de la home es literalmente el orden de ese archivo.

| # | Componente | Archivo | `id` de sección | Qué es |
|---|---|---|---|---|
| 1 | `Hero` | `components/home/hero.tsx` | — | Titular, párrafo, 2 CTAs, chips de sectores **y el Agente de Diagnóstico embebido a la derecha** |
| 2 | `StatBand` | `components/home/stat-band.tsx` | — | Franja de 4 cifras derivadas del content model (18/4/3/5) |
| 3 | `Concept` | `components/home/concept.tsx` | `fuerza-laboral` | Fuerza Laboral Digital: su gente / sus agentes / juntos |
| 4 | `Problems` | `components/home/problems.tsx` | `problemas` | Los tres frenos |
| 5 | `RolesGallery` | `components/home/roles-gallery.tsx` | `roles` | Casos de uso (roles que cumple la oferta) |
| 6 | `Catalog` | `components/home/catalog.tsx` | `servicios` | Catálogo por niveles con rangos; incluye `InvestmentChart` |
| 7 | `RecommenderLazy` | `components/home/recommender-lazy.tsx` | `recomendador` | Recomendador de Nivel, montado en diferido |
| 8 | `Cases` | `components/home/cases.tsx` | `casos` | Casos de éxito |
| 9 | `GovernanceStrip` | `components/home/governance-strip.tsx` | `gobernanza` | Gobernanza de IA |
| 10 | `Differentiators` | `components/home/differentiators.tsx` | `diferenciadores` | Por qué HST (8 diferenciadores) + "Dónde hemos operado" |
| 11 | `Faq` | `components/home/faq.tsx` | `faq` | Preguntas frecuentes |
| 12 | `Contact` | `components/home/contact.tsx` | `contacto` | Formulario |
| — | `FaqJsonLd` | `components/seo/faq-jsonld.tsx` | — | Solo JSON-LD, sin salida visual |

### Diferencias con lo que esperaba el backlog

El backlog esperaba 12 secciones con **"agente de diagnóstico"** como sección independiente
en segundo lugar. La realidad es distinta en dos puntos que afectan al Prompt 3:

1. **No existe una sección de agente de diagnóstico.** El agente vive *dentro del hero*:
   [`hero.tsx`](../components/home/hero.tsx) monta `<AgentPanel endpoint="/api/agents/diagnostico">`
   en la columna derecha. No está enterrado al fondo de la página: está en la primera
   pantalla, al lado del titular. El P3 parte de que "hoy está enterrado"; conviene
   revisar esa premisa antes de ejecutarlo.
2. **Existe `StatBand`**, que el backlog no lista.

Medido sobre la home renderizada en producción: **10 secciones con `id`**, **20 enlaces
y 6 botones en el contenido** (26 CTAs, sin contar cabecera ni pie). El backlog decía 18.

Destinos de esas CTAs: `/servicios` ×4, `/privacidad` ×2, y uno cada uno de `#contacto`,
`#servicios`, `/#recomendador`, `/casos`, los dos casos, `/gobernanza`, `/preguntas`,
`/legal/uso-de-ia`, tres fichas de servicio y el WhatsApp.

---

## 2. Dónde vive el contenido

**Datos de negocio:** `content/*.ts`, 10 archivos, 1.665 líneas.

| Archivo | Contiene |
|---|---|
| `brand.ts` | Nombre, dominio, **correo**, WhatsApp, redes, claims con encuadre y fuente |
| `narrative.ts` | Sectores, posicionamiento, 3 problemas, 6 principios, 4 etapas, promesa, CNT, 8 diferenciadores, 6 FAQ |
| `commercial.ts` | 3 niveles con rangos, **18 servicios**, roles |
| `trust.ts` | Gobernanza, casos, experiencia del equipo, aliados, formación |
| `resources.ts` | 4 artículos de `/recursos` (todos en `estado: "borrador"`) |
| `sectores.ts` | 5 páginas de sector |
| `legal.ts` | Privacidad, términos, uso de IA |
| `media.ts` | Rutas de imagen y textos de apoyo de sector |
| `types.ts` / `index.ts` | Tipos y barril de exportación |

Además: `content/newsletter/*.json`, una edición por archivo, cargadas por
[`lib/newsletter.ts`](../lib/newsletter.ts).

**El contenido está validado.** [`scripts/validate-content.ts`](../scripts/validate-content.ts)
corre en `prebuild` y bloquea el despliegue si falla: conteos exactos (18 servicios, 5 sectores,
3 problemas, 4 etapas, 6 principios, 8 diferenciadores, 6 FAQ), claims sin fuente, rangos
solapados, referencias huérfanas, vocabulario prohibido y casos con resultado sin autorización.

> **Pero el copy de presentación NO está en `content/`.** Los `title`, `eyebrow` e `intro`
> de cada sección están escritos a mano en el componente: 13 componentes de `components/home/`
> llevan su `title=` literal. Ejemplo, `problems.tsx`: `title="Lo que detiene a las empresas
> frente a la IA"`. Esto es directamente relevante para el Prompt 9, que exige una sola fuente
> de verdad para la versión humana y la versión para agentes.

---

## 3. Navegación

**Cabecera:** [`components/layout/site-header.tsx`](../components/layout/site-header.tsx),
componente cliente. El menú es la constante `NAV`, **9 ítems**: Fuerza Laboral Digital,
Servicios, Casos, Gobernanza, Formación, Recursos, Newsletter, Aliados, Preguntas.
Hamburguesa en móvil.

**Pie:** [`components/layout/site-footer.tsx`](../components/layout/site-footer.tsx),
constante `COLUMNS`, **2 columnas** (el P5 asume 3):

- *Empresa* (8): Servicios, Casos, Gobernanza de IA, Formación, Recursos, Radar IA Semanal, Aliados, Preguntas frecuentes.
- *Legal* (3): Política de privacidad, Términos de uso, Uso de IA en este sitio.

Más una línea con `brand.email`, las tres redes y el copyright.

---

## 4. Rutas

| Ruta | Nota |
|---|---|
| `/` | Home |
| `/fuerza-laboral-digital` | Página pilar |
| `/servicios` · `/servicios/[slug]` | 18 fichas. **Reutiliza `Sectors`, `EngagementModels` y `ToolsLazy` de `components/home/`** |
| `/casos` · `/casos/[slug]` | 2 casos publicados |
| `/sectores/[slug]` | 5 páginas: legal, manufactura, salud, alimentos, consumo |
| `/recursos` · `/recursos/[slug]` | Los 4 artículos están en borrador, así que hoy el índice sale vacío y las fichas dan 404 |
| `/newsletter` · `/newsletter/[slug]` | Radar IA Semanal, 1 edición publicada |
| `/gobernanza`, `/formacion`, `/aliados`, `/preguntas` | Páginas simples |
| `/privacidad`, `/terminos`, `/legal/uso-de-ia` | Renderizan `LegalDocument` desde `content/legal.ts` |
| `/design-system` | Interna, `robots: noindex` |
| `/llms.txt`, `/llms-full.txt` | **Ya implementadas** como route handlers generados desde `content/` |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Metadata de Next |
| `/api/agents/[agent]`, `/api/herramientas/[tool]`, `/api/leads`, `/api/recomendador` | Endpoints |

**No existe `/nosotros`** (el P6 lo da por creable) ni **`/recomendador`** como ruta: el
recomendador es un componente de la home más su API. El 301 que pide el P6 no tiene origen.

Build actual: **69 rutas** estáticas o SSG.

---

## 5. Agente de diagnóstico y recomendador de nivel

**Sí comparten código.** Ambos pasan por [`lib/agents/runtime.ts`](../lib/agents/runtime.ts):
`AGENT_MODEL`, `rateLimit`, `getClientIp` y, el agente además, `buildSystemPrompt` y
`parseMessages`.

### Agente — `/api/agents/[agent]`

- Tres roles en el mismo endpoint: `diagnostico`, `cerebro`, `privacidad`. El rol es un
  string dentro de `AGENT_ROLES` en la propia route.
- El *system prompt* se arma en `buildSystemPrompt(rol)`: rol + guardrails fijos +
  **corpus factual**.
- El corpus lo **genera** [`lib/agents/corpus.ts`](../lib/agents/corpus.ts) desde el content
  model (~26.000 caracteres, ~6.500 tokens). Un agente no puede citar un servicio, un rango
  ni una etapa que no exista publicada.
- La entrada del visitante se encapsula en `<entrada_del_visitante>` y se declara como dato.
- La salida se valida en [`lib/agents/guardrails.ts`](../lib/agents/guardrails.ts) antes de
  devolverse: importes fuera de rango, promesas de resultado y peticiones de datos sensibles
  disparan un reintento correctivo y, si vuelve a fallar, `SAFE_FALLBACK`.
- Cliente: [`components/agents/agent-panel.tsx`](../components/agents/agent-panel.tsx),
  genérico y reutilizable (lo usan el hero y `/privacidad`).

### Recomendador — `/api/recomendador`

- Entrada: `problemaId` (enum de `problems`), `sector` (**`z.enum(sectors)`**), `textoLibre`.
- **Sin texto libre no llama al modelo:** aplica `ruleBasedRecommendation`, determinista.
- Con texto libre usa `generateText` con salida estructurada y, ante cualquier fallo, cae
  al mismo mapeo por reglas. Funciona con o sin LLM.
- Cliente: `components/home/recommender.tsx`, montado en diferido por `recommender-lazy.tsx`.

### Modelo y variables de entorno

`AGENT_MODEL = "openai/gpt-4o-mini"`, un identificador del **AI Gateway de Vercel**, que se
autentica con `AI_GATEWAY_API_KEY` (la lee el SDK, no aparece en nuestro código). Las demás:
`NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`,
`LEADS_WEBHOOK_URL`, `UPSTASH_REDIS_REST_URL`/`_TOKEN` o `KV_REST_API_URL`/`_TOKEN`.
Todas documentadas en [`.env.example`](../.env.example).

---

## 6. Formulario de contacto

[`components/home/contact.tsx`](../components/home/contact.tsx), cliente. Envía `POST`
JSON a `/api/leads`.

| Campo | Tipo | Obligatorio |
|---|---|---|
| `nombre` | texto, máx. 120 | sí |
| `email` | email, máx. 160 | sí |
| `sector` | select | sí |
| `reto` | textarea, máx. 1000 | sí |
| `consentimiento` | checkbox (Ley 1581) | sí |
| `empresa_web` | honeypot oculto | debe llegar vacío |

**Opciones del desplegable de sector, hoy:** Legal, Manufactura, Salud, Alimentos, Consumo, Otro.
Están **escritas a mano** en la constante `SECTORS` del componente, duplicando
`content/narrative.ts`.

Validación en servidor con Zod. El lead se entrega por webhook (`LEADS_WEBHOOK_URL`) y/o
por correo con Resend; si ningún canal lo acepta responde **502** y registra una traza con
el correo enmascarado. Registra `consentGrantedAt` y `consentVersion`.

---

## 7. Apariciones de "nómina digital"

Cinco, todas en minúscula:

| Archivo | Línea | Texto |
|---|---|---|
| `components/home/concept.tsx` | 29 | "Así como su empresa tiene una nómina de personas, desarrollamos su **nómina digital**: colaboradores de IA que…" |
| `components/home/roles-gallery.tsx` | 17 | "…roles que la **nómina digital** cumple dentro de un proyecto…" |
| `components/home/cases.tsx` | 75 | "Usamos nuestra propia **nómina digital**" |
| `app/gobernanza/page.tsx` | 88 | "…**nómina digital** se gobierna como una de personas: con roles claros…" |
| `content/commercial.ts` | 315 | Comentario de código: "…qué puede cumplir la **nómina digital** dentro de un proyecto." |

El P7 da reemplazo para dos de las cinco. La de `concept.tsx` no es una frase suelta: es la
**metáfora que sostiene toda la sección**, incluido su titular *"Su nómina de personas ya
existe. Le construimos la digital."* Eliminarla obliga a reescribir el bloque, no a sustituir
una expresión.

---

## 8. Tokens de marca

Viven en **dos sitios que no coinciden**:

- [`design/tokens.ts`](../design/tokens.ts): objeto declarativo. Documenta la proporción
  60-30-10, el único degradado permitido (el del logo), la escala de 8px y **`radius: 0`,
  "esquinas rectas en toda la UI"**.
- [`app/globals.css`](../app/globals.css): el `@theme` que Tailwind 4 usa de verdad.

Divergencias verificadas:

| | `design/tokens.ts` | `app/globals.css` |
|---|---|---|
| `line` | `#D5DAE2` | `#d9dee5` |
| `bg` | `#F6F7F9` | `#f5f7f9` |
| Radios | `0` | `--radius-sm` a `--radius-2xl` y `--radius-full` |

En los componentes hay 19 `rounded-lg`, 13 `rounded-full`, 10 `rounded-xl` y 6 `rounded-2xl`.
La UI real **no** usa esquinas rectas. Los prompts 2 y 4 piden "esquinas rectas": eso
contradice el diseño implantado, no lo restaura.

**Tipografía:** Open Sans vía `next/font/google` en `app/layout.tsx`, variable
`--font-open-sans`. Escala propia (`--text-*: initial` borra la de Tailwind): `caption`,
`body`, `lead`, `h3`, `h2`, `h1`, `display`. **No existe `text-body-lg`.**

---

## 9. Estado de calidad

| Comando | Resultado |
|---|---|
| `pnpm lint` | **0 errores, 0 warnings** |
| `pnpm build` | **Correcto**, 69 rutas, verificación de tipos activa |
| `pnpm test` | **16/16** (Vitest, `lib/agents/guardrails.test.ts`) |
| `pnpm validate:content` | Correcto |

No hay Playwright ni Lighthouse instalados; el P8 los da por disponibles.

---

## Riesgos para el rediseño

**1 · La premisa del P3 no se sostiene.** El agente de diagnóstico no está enterrado: está
en el hero, primera pantalla. Moverlo a "segundo bloque" es bajarlo, no subirlo.

**2 · Cambiar los sectores es una migración, no una corrección de lenguaje.** El P7 los trata
como un buscar-y-reemplazar. `sectors` alimenta: 5 páginas `/sectores/[slug]` con JSON-LD y
sitemap (`manufactura` y `consumo` desaparecerían), los `sectoresRelevantes` de los 18
servicios, el `z.enum(sectors)` que define el contrato de `/api/recomendador`, el corpus de
los agentes, el validador de contenido y el array duplicado en `contact.tsx`.

**3 · El copy de sección está en los componentes, no en `content/`.** El P9 exige una sola
fuente de verdad para la versión humana y la de agentes. Hoy los datos sí lo están, pero los
títulos e introducciones de las 13 secciones no. Extraerlos es trabajo previo al P9.

**4 · El contenido se renderiza fuera de `<main>`.** Verificado en `/` y en `/servicios`
sobre el build de producción: `<main id="contenido">` contiene solo el esqueleto de
`app/loading.tsx` y el contenido real queda en un `div` hermano en `<body>`. El enlace de
salto de accesibilidad apunta a un contenedor vacío. Observado en el navegador integrado;
conviene confirmarlo en un Chrome normal antes de darlo por cierto.

**5 · `components/home/` no es solo de la home.** `Sectors`, `EngagementModels` y `ToolsLazy`
se usan desde `/servicios`. El P1 dice "muévelos a `components/legacy/`": hacerlo a ciegas
rompe `/servicios`.

**6 · El P5 reduce el menú a 3 ítems.** Eso saca de la navegación Recursos y Newsletter,
ambas secciones activas. Newsletter tiene una edición publicada y cadencia semanal.

**7 · Esquinas rectas.** Los prompts 2 y 4 piden lo que dice `design/tokens.ts`, no lo que
tiene la UI. Es una decisión de diseño, no una corrección: hay que tomarla a propósito.

**8 · El correo.** El backlog escribe `hola@huntersolutions.tech` en el P5 y en el P9.
**El vigente es `comercial@huntersolutions.tech`**, ya aplicado en `brand.email`, en la
política de privacidad y en `.env.example`. Ejecutar esos prompts al pie de la letra lo
revierte.

**9 · `/recursos` está vacío.** Los cuatro artículos están en `estado: "borrador"` y el
flag ya se respeta. Cualquier prompt que enlace a un artículo concreto fallará hasta que se
publiquen.

**10 · v0 empuja commits a este repositorio.** Ya retiró secciones por su cuenta antes
(commit `874817a`, "remove unused StatBand and team experience sections"). Trabajar en
`feat/landing-minimalista` no impide que v0 toque `main` en paralelo.

**11 · `content/index.ts` llega a componentes cliente** (`recommender.tsx`,
`investment-chart.tsx`). Cualquier módulo con `fs` que se exporte desde ahí rompe el build
del cliente. Por eso `lib/newsletter.ts` vive aparte.
