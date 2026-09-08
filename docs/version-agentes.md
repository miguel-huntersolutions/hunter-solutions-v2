# Versión para agentes de IA y modelos

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** Prompt 9 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

El sitio existe en dos versiones que salen de la misma fuente. Si cambia un rango en
`content/commercial.ts`, cambia en las dos y en el corpus de los agentes. Nada se escribe
dos veces, y el build falla si se desalinean.

---

## Rutas

| Ruta | Tipo | Qué es |
|---|---|---|
| `/llms.txt` | `text/plain` | Índice según la convención de llmstxt.org |
| `/llms-full.txt` | `text/plain` | Todas las páginas concatenadas |
| `/llm` | `text/markdown` | Espejo de la home |
| `/llm/servicios` · `/llm/servicios/[slug]` | `text/markdown` | Catálogo y las 18 fichas |
| `/llm/casos` · `/llm/casos/[slug]` | `text/markdown` | Casos publicados |
| `/llm/sectores/[slug]` | `text/markdown` | Las 5 páginas de sector |
| `/llm/gobernanza`, `/llm/nosotros`, `/llm/preguntas`, `/llm/fuerza-laboral-digital` | `text/markdown` | Páginas fijas |
| `/oferta.json` | `application/json` | La oferta completa, versionada |
| `/oferta.schema.json` | `application/json` | Su JSON Schema, generado con zod |

Son **32 espejos Markdown** más la oferta. Todas con `Cache-Control: public, max-age=3600`.

`/oferta.json` vive en la raíz y no bajo `/api`, porque `robots.txt` deshabilita `/api/`.

Una ruta sin espejo devuelve **404 en Markdown**, no en HTML.

## Negociación de contenido

Un agente que pide Markdown recibe el espejo sin cambiar de URL. Lo hace `proxy.ts`, que
reescribe la petición cuando `Accept` incluye `text/markdown` y la ruta tiene espejo:

```bash
curl -H "Accept: text/markdown" https://www.huntersolutions.tech/servicios
```

Comprobado en local:

```
Accept: text/markdown en /servicios -> text/markdown; charset=utf-8
sin Accept especial                 -> text/html; charset=utf-8
```

La lógica de `X-Robots-Tag` que ya tenía `proxy.ts` sigue intacta. El matcher excluye rutas
con punto, así que `/llms.txt` y `/oferta.json` no pasan por aquí; es lo correcto.

## Frontmatter

Cada Markdown abre con sus metadatos:

```
---
title: "Servicios por niveles, con rangos publicados"
description: "Catálogo de servicios de Hunter Solutions Tech organizado en tres niveles…"
url: https://www.huntersolutions.tech/servicios
updated: 2026-09-08
language: es-CO
---
```

`updated` es la fecha del build. Los cuerpos se generan en
[`lib/markdown.ts`](../lib/markdown.ts), un generador por tipo de página, todo leído de
`content/`. No hay texto escrito a mano en esos documentos.

## Datos estructurados

- **Organization**: ya existía, en `components/seo/org-jsonld.tsx`.
- **Service**: nuevo, uno por nivel en `/servicios`, con `priceSpecification` en COP,
  `valueAddedTaxIncluded: false` y `provider` referenciando por `@id` a la Organization.
  El Nivel 3 lleva solo `minPrice`, porque se comunica como "desde".
- **FAQPage**: ya existía.
- **Article**: ya existía en cada caso.
- `metadata.alternates.types` declara `text/markdown` apuntando a `/llm`.

## robots y sitemap

`robots.txt` declara reglas explícitas para GPTBot, ChatGPT-User, ClaudeBot, Claude-Web,
anthropic-ai, PerplexityBot, Google-Extended, Bingbot, CCBot y Applebot-Extended, todas con
`Allow: /` y el mismo `Disallow` de `/api/` y `/design-system`.

El sitemap pasó de 39 a **73 URLs**: incluye los 32 espejos y `/oferta.json`, con
`changeFrequency: weekly`.

## La fuente única, comprobada

`pnpm check:coherencia` corre en `prebuild` y falla el build si los rangos publicados dejan
de coincidir entre la web, el corpus de los agentes y la oferta:

```
✓ Coherencia: los 3 rangos publicados coinciden en la web, en el corpus y en la oferta
```

Verificado además que `/oferta.json` cumple su propio esquema: 14 campos requeridos, ninguno
faltante, ninguno sin declarar. 18 servicios, 2 casos, 6 preguntas.

Y que los tres canales dicen lo mismo:

| | Nivel 1 | Nivel 2 | Nivel 3 |
|---|---|---|---|
| `/servicios` y `llms.txt` | $1.000.000 a $10.000.000 COP | $10.000.000 a $50.000.000 COP | Desde $50.000.000 COP |
| `/oferta.json` | 1000000 – 10000000 | 10000000 – 50000000 | 50000000 – 200000000 |

## Mantenimiento

Se edita `content/` y todo se regenera en el build: la web, los espejos Markdown, `llms.txt`,
`llms-full.txt`, `oferta.json` y el corpus de los agentes. No hay ningún archivo que
actualizar a mano.

Si alguien introduce un rango escrito a mano en cualquiera de esos sitios, `check:coherencia`
rompe el build.

---

## Muestras

### `/llms.txt`

```
# Hunter Solutions Tech

> Hay trabajo en su empresa que hoy nadie hace. Nosotros lo hacemos. Cobranza que no se
persigue, documentos que no se revisan, clientes que no reciben respuesta a tiempo…

## Sectores foco

- Salud
- Alimentos
- Legal
- Comercial
- Agrícola

## Niveles de inversión

- Nivel 1 · Explora ($1.000.000 COP a $10.000.000 COP): Cada proyecto se cotiza según su alcance.
- Nivel 2 · Implementa ($10.000.000 COP a $50.000.000 COP): Cada proyecto se cotiza según su alcance.
- Nivel 3 · Escala (Desde $50.000.000 COP): Desde $50 millones COP.
```

### `/oferta.json`

```json
{
  "version": "2026-09-08",
  "aviso": "Rangos en COP sin IVA; el retorno se proyecta con supuestos, no se garantiza.",
  "sectoresFoco": ["Salud", "Alimentos", "Legal", "Comercial", "Agrícola"],
  "niveles": [
    { "id": 1, "nombre": "Nivel 1 · Explora", "rangoMin": 1000000, "rangoMax": 10000000 },
    { "id": 2, "nombre": "Nivel 2 · Implementa", "rangoMin": 10000000, "rangoMax": 50000000 },
    { "id": 3, "nombre": "Nivel 3 · Escala", "rangoMin": 50000000, "rangoMax": 200000000 }
  ]
}
```
