# Verificación del landing minimalista

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** Prompt 8 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

Medido sobre el build de producción (`pnpm build && pnpm start`), 104 rutas.

**Resultado: 26 PASA, 2 FALLA, 3 no ejecutables.** Los dos fallos son el mismo problema
—la altura de la home— y no se corrigen apretando: son el contenido que el propio backlog
especifica. Los tres no ejecutables necesitan credenciales o herramientas que no están
instaladas.

---

## Estructura

| | Comprobación | Evidencia |
|---|---|---|
| PASA | `app/page.tsx` importa exactamente Hero, DiagnosticoBlock, Prueba, Contact y FaqJsonLd | Cinco imports, ninguno más |
| PASA | Un único H1 en la home, y es `positioning.h1` | `h1: 1` · "Hay trabajo en su empresa que hoy nadie hace. Nosotros lo hacemos." |
| PASA | Header con tres elementos | Servicios, Casos, Hablemos |
| PASA | Los botones de la home llevan a `#contacto` | `#contacto` ×2 (hero y cierre de Prueba) |
| PASA · con matiz | Enlaces a otras páginas | `/servicios#niveles` ×2, `/gobernanza` ×1, dos "Ver caso". **Además** `/privacidad` ×2 y `/legal/uso-de-ia` ×1 |
| **FALLA** | Altura máxima 2 pantallas en 1440×900 | **4.597 px = 5,11 pantallas** |
| **FALLA** | Altura máxima 4 pantallas en 390×844 | **6.735 px = 7,98 pantallas** |
| PASA | Ningún componente nuevo usa `rounded-full` ni `rounded-2xl` | 0 en hero, diagnostico-block y prueba |

**Sobre el matiz de los enlaces:** los dos `/privacidad` son el enlace legal de la casilla
de consentimiento y el del aviso de cookies; el `/legal/uso-de-ia` es el descargo al pie del
panel del agente. No son CTAs, son obligaciones legales dentro de sus componentes. La regla
del backlog apuntaba a que no hubiera llamadas a la acción compitiendo, y eso se cumple.

**Sobre la altura.** Este es el hallazgo de fondo de la verificación. Desglose en 1440×900:

| Bloque | Alto |
|---|---|
| hero | 934 px |
| diagnóstico | 958 px |
| prueba | 1.100 px |
| contacto | 1.039 px |
| cabecera y pie | 566 px |

Dos pantallas son 1.800 px. Cabecera y pie ya se llevan 566, así que quedarían 1.234 px para
un hero, un panel conversacional, tres tarjetas de caso y un formulario. **No es alcanzable
con el contenido que el backlog especifica**, ni comprimiendo el espaciado: el hero ya se
recortó en el Prompt 2 para que su CTA no cayera bajo el pliegue, y el formulario ya bajó de
cinco campos a tres en el Prompt 5.

En móvil la brecha es mayor porque las tres tarjetas se apilan (1.835 px) y el formulario
pone sus dos preguntas debajo (1.718 px).

Lo realista son **4 pantallas en desktop y 8 en móvil**, o recortar contenido de verdad: el
candidato natural es el bloque de prueba, pasando de tres tarjetas a una línea con enlace.
Es decisión de negocio, no de implementación.

---

## Contenido

| | Comprobación | Evidencia |
|---|---|---|
| PASA | `pnpm validate:content` | 18 servicios, 3 niveles, 2 casos autorizados |
| PASA | `pnpm check:copy` | Vocabulario limpio en app/, components/ y content/ |
| PASA · con excepción | "nómina digital" en app/, components/, content/, lib/ | Cero como copy. Quedan 6 apariciones, todas prohibiéndola: el rol del agente, dos en `guardrails.ts` y tres en su test |
| PASA | `[COMPLETAR` en el HTML de `/casos/*` y `/sectores/*` | 0 archivos de 7 |
| PASA | Guion largo o emoji en copy visible | 0 en la home |
| PASA | Sectores foco coherentes | Salud, Alimentos, Legal, Comercial, Agrícola en `sectors`, `/servicios`, corpus, `llms.txt` y `oferta.json` |
| PASA | "Más elegido" solo sobre Nivel 2, sin margen negativo | 0 apariciones de `mt-[26px]` |
| PASA | WhatsApp, el mismo número en todas partes | Un solo literal en el código (`content/brand.ts`); el resto se deriva de `whatsappUrl()` |
| PASA | Ningún resultado de caso con cifra fuera del content model | Las métricas con marcador no se pintan |

---

## Funcional

| | Comprobación | Evidencia |
|---|---|---|
| **No ejecutable** | Agente de Diagnóstico con los tres ejemplos | HTTP 503: falta `AI_GATEWAY_API_KEY`. Ver [pruebas-agente-diagnostico.md](pruebas-agente-diagnostico.md) |
| PASA | Formulario de tres campos con consentimiento y honeypot | `nombre`, `email`, `reto`, `consentimiento`, `empresa_web`. Sin `sector` |
| PASA | WhatsApp con mensaje prellenado | `wa.me/573043913066?text=Hola%2C%20quiero%20agendar%20un%20diagn%C3%B3stico%20de%2030%20minutos` |
| PASA | `/nosotros` existe, con metadata y en el sitemap | 200, un H1, canonical propio |
| PASA | Ningún enlace roto | 17 rutas de cabecera, home y pie: todas 200 |
| n/a | Redirect 301 de `/recomendador` | Esa ruta nunca existió: era una sección de la home |

Lo que sí se pudo verificar del agente sin modelo: el cierre literal obligatorio **no**
dispara `AMOUNT_PATTERNS` ni `GUARANTEE_PATTERN`, ni solo ni dentro de una respuesta con
rango publicado. Si lo hiciera, todas las respuestas acabarían en `SAFE_FALLBACK`. Cuatro
tests nuevos, 20/20.

---

## Versión para agentes

| | Comprobación | Evidencia |
|---|---|---|
| PASA | `/llms.txt` y `/llms-full.txt` | 200, `text/plain`, `Cache-Control: public, max-age=3600` |
| PASA | Espejo Markdown por ruta con frontmatter | 32 rutas, `text/markdown`, con title, description, url, updated y language |
| PASA | Negociación de contenido | `Accept: text/markdown` en `/servicios` devuelve `text/markdown`; sin él, `text/html` |
| PASA | Ruta sin espejo | 404 **en Markdown**, no en HTML |
| PASA | `/oferta.json` cumple `/oferta.schema.json` | 14 campos requeridos, ninguno faltante, ninguno sin declarar |
| PASA | `pnpm check:coherencia` | Los 3 rangos coinciden en web, corpus y oferta |
| PASA · parcial | JSON-LD sin errores | Organization, Service ×3, FAQPage y Article son JSON válido con los campos requeridos. **No se pasó por el validador de schema.org**: requiere red |
| PASA | robots.txt con los bots de IA | GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Google-Extended, Bingbot, CCBot, Applebot-Extended |
| PASA | Sitemap con `/llm/` y `/oferta.json` | 73 URLs: 32 espejos más la oferta |
| PASA | Pie con "Versión para agentes de IA" | Columna Legal, apuntando a `/llms.txt` |
| PASA | **Prueba de fuente única** | Ver abajo |

### La prueba de fuente única

Se cambió `rangoMax` del Nivel 1 de 10.000.000 a 9.000.000 en `content/commercial.ts`, se
compiló y se buscó el valor nuevo en las cinco salidas:

```
/servicios      2 apariciones
/llm/servicios  1
/llms.txt       1
/oferta.json    1
corpus          1
```

Revertido y confirmado el regreso a 10.000.000. Una sola edición mueve las cinco.

---

## Calidad

| | Comprobación | Evidencia |
|---|---|---|
| PASA | `typescript.ignoreBuildErrors` en false y build limpio | La clave ya no existe; el build corre `tsc` |
| PASA | `pnpm lint` | 0 errores, 0 warnings |
| PASA | `pnpm test` | 20/20 |
| **No ejecutable** | Lighthouse móvil ≥ 90 / 95 / 95 | Lighthouse no está instalado |
| **No ejecutable** | Contraste AA medido | Requiere herramienta de auditoría |
| PASA | Open Sans como única fuente | Una sola familia en el árbol de la home |
| PASA | Sin desborde horizontal en móvil | `scrollWidth === clientWidth` en 390×844 |

---

## Antes del PR

1. **Decidir sobre la altura.** Es el único criterio de aceptación que falla y no se arregla
   sin quitar contenido.
2. **Validar el titular con Sandra y César.** Está escrito literal como pide el Prompt 2 y
   es la decisión más visible del rediseño. Cambiarlo es una línea en `content/narrative.ts`.
3. **Probar el agente con credencial.** Es el único punto funcional sin verificar.
4. **Crear `/sectores/comercial` y `/sectores/agricola`.** Bloqueado por copy y dos imágenes.
5. **Instalar Lighthouse y Playwright** si se quieren las métricas del Prompt 8.
6. **Renombrar `components/legacy/`.** Ya solo contiene tres componentes en uso.
