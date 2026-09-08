# Línea base antes del rediseño

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** Prompt 0 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

---

## Parte A · Medición

### Estado de los comandos

| Comando | Resultado |
|---|---|
| `pnpm install` | Correcto |
| `pnpm validate:content` | **Correcto.** 18 servicios, 3 niveles, 3 problemas, 4 etapas, 6 principios, 8 diferenciadores, 6 FAQ, 2 casos autorizados |
| `pnpm lint` | **0 errores, 0 warnings** |
| `pnpm test` | **16/16** (Vitest, `lib/agents/guardrails.test.ts`) |
| `pnpm build` | **Correcto**, 69 rutas |

### Errores de TypeScript

El P0 pide poner `typescript.ignoreBuildErrors: false` y contar los errores.
**Ya no hace falta:** la clave se eliminó de `next.config.mjs` antes de este backlog, así
que el build ya verifica tipos de verdad. El log lo confirma:

```
Running TypeScript ...
Finished TypeScript in 3.5s ...
```

**Errores de tipo: 0.** `npx tsc --noEmit` también sale limpio. El hallazgo 4 de la
sección 1 del backlog ("errores de tipo silenciados") está resuelto.

### Cómo probar los agentes en local

Los agentes usan el AI Gateway de Vercel a través del AI SDK:
`AGENT_MODEL = "openai/gpt-4o-mini"` en [`lib/agents/runtime.ts`](../lib/agents/runtime.ts).
La credencial es **`AI_GATEWAY_API_KEY`**, que el SDK lee del entorno; por eso no aparece
en ningún `process.env` del código.

Todas las variables están documentadas en [`.env.example`](../.env.example). Para local:

```bash
cp .env.example .env.local   # .env.local está en .gitignore
pnpm dev
```

Sin credenciales el sitio arranca igual y degrada de forma explícita:

| Endpoint | Sin variables | Motivo |
|---|---|---|
| `/api/recomendador` | **200** | Cae al mapeo por reglas, determinista, sin LLM |
| `/api/agents/*` | **503** | Falta `AI_GATEWAY_API_KEY` |
| `/api/herramientas/*` | **503** | Ídem |
| `/api/leads` | **502** | Ningún canal de entrega configurado |

Nunca se pegan credenciales en el código ni en `.env.example`: ese archivo lleva solo los
nombres y valores vacíos.

---

## Parte B · Saneamiento aplicado

### 1. Placeholders que se veían en producción

Eran reales y públicos. Seis métricas con `[COMPLETAR con dato real del cliente]` en
[`content/trust.ts`](../content/trust.ts) que [`app/casos/[slug]/page.tsx`](../app/casos/[slug]/page.tsx)
pintaba tal cual, y `[COMPLETAR con un caso autorizado del sector ...]` en las cuatro
páginas de sector sin caso.

- **Casos:** la ficha filtra las métricas cuyo valor empieza por `[`. Si no queda ninguna,
  la rejilla entera no se pinta. Los valores siguen en `content/trust.ts` como recordatorio
  interno: cuando haya un número medido se escribe ahí y vuelve a aparecer solo.
- **Sector:** el corchete desapareció. El texto que ya existía debajo pasa a ser el mensaje
  principal: *"Aún no publicamos un caso autorizado de este sector."*
- **Contrato de contenido:** regla nueva `T-CON-11` en
  [`scripts/validate-content.ts`](../scripts/validate-content.ts). Falla el build si
  cualquier string de `content/` contiene `[COMPLETAR` o `[PENDIENTE`, con una única
  excepción documentada: `cases[].resultado.metricas[].valor`.

Verificado en el HTML compilado: **cero apariciones** de `COMPLETAR` en las dos fichas de
caso y en las cinco páginas de sector.

Y verificado que la regla falla de verdad, no solo que pasa:

```
- Marcador de relleno "[completar...]" en content.positioning.nuevosTitulo
- Marcador de relleno "[pendiente...]" en content.services[0].descripcion
```

> Al escribir la regla se vio que `positioning` no entraba en ningún escaneo del validador,
> ni el de marcadores ni el de vocabulario prohibido. Es contenido visible (el H1, el
> párrafo de apoyo, la invitación). Se añadió, junto con `governance`, `partners`,
> `teamExperience`, `training`, `sectorPages` y `resources`, que tampoco se escaneaban.

### 2. WhatsApp

Ya estaba unificado antes de este backlog: `content/brand.ts` tiene el número real
`+573043913066` y el corpus de los agentes lo publica correctamente. Lo que faltaba era el
helper: `contact.tsx` construía la URL a mano.

Ahora [`content/brand.ts`](../content/brand.ts) exporta `whatsappUrl(mensaje)`, reexportado
desde `content/index.ts`. Vive junto al dato y no en el barril, para que un componente
cliente pueda importarlo sin arrastrar todo `content/` al bundle.

### 3. Corpus

`"## Catálogo de servicios (20)"` ya usa `services.length`. Resuelto antes de este backlog.

---

## Estado tras el Prompt 0

| Comando | Resultado |
|---|---|
| `pnpm validate:content` | Correcto |
| `pnpm lint` | 0 errores, 0 warnings |
| `pnpm build` | Correcto, 69 rutas, con verificación de tipos |
| `pnpm test` | 16/16 |

## Hallazgos del backlog ya resueltos antes de empezar

De los diez de la sección 1, cuatro estaban hechos:

| # | Hallazgo | Estado |
|---|---|---|
| 2 | WhatsApp incoherente | Resuelto (faltaba solo el helper, hecho aquí) |
| 4 | `typescript.ignoreBuildErrors: true` | Resuelto: la clave ya no existe |
| 8 | Corpus dice "(20)" con 18 servicios | Resuelto |
| 10 | Rate limit en memoria por instancia | **Resuelto**, contra lo que dice el backlog: hay contador compartido sobre Redis REST con degradación al contador local |

Siguen abiertos y les toca su prompt: placeholders (hecho aquí), "nómina digital" ×5 (P7a),
esquinas redondeadas contra `radius: 0` (decisión), hack `-mt-[26px]` de "Más elegido" (P6),
guiones largos (P7a), y la pausa de v0 (proceso).

## Diferencias entre el mapa del backlog y el repositorio

El mapa de la sección 2 se escribió antes de los últimos cambios:

- `app/page.tsx` incluye **`StatBand`** entre `Hero` y `Concept`. El P1 no la lista en la
  estructura nueva ni la manda a `legacy/`, así que quedaría huérfana.
- **`middleware.ts` ya no existe: es `proxy.ts`** (Next 16 deprecó el nombre). El P9.4 pide
  editar `middleware.ts`.
- El NAV tiene **9 ítems**, no 8: se añadió Newsletter.
- Existen **`/newsletter`** (con su modelo de contenido en `content/newsletter/*.json` y su
  guion de ingesta) y el gate de publicación de `/recursos`. El backlog no los conoce. El P5
  deja fuera del menú a Newsletter y Recursos.
- `docs/` ya tiene `mapa-landing-actual.md` además de los dos archivos que lista.
