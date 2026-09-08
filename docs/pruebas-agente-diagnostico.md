# Pruebas del Agente de Diagnóstico

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** punto 6 del Prompt 3 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

---

## Estado: pendiente de ejecutar

El P3 pide correr los tres ejemplos contra el agente y pegar aquí las respuestas
completas. **No se pudo hacer:** el entorno local no tiene la credencial del AI Gateway.

```
POST /api/agents/diagnostico  ->  HTTP 503  {"error":"Agente no disponible"}
```

```
AI_GATEWAY_* en el entorno: 0
.env.local: no existe
```

No hay respuestas que pegar. Inventarlas dejaría este documento diciendo que el cierre
fijo funciona sin que nadie lo haya visto funcionar, que es justo lo contrario de para lo
que sirve la prueba.

## Cómo ejecutarla

Con la credencial del AI Gateway de Vercel en `.env.local`:

```bash
cp .env.example .env.local     # y rellenar AI_GATEWAY_API_KEY
pnpm build && pnpm start -p 3030
```

Y para cada uno de los tres ejemplos:

```bash
curl -s -X POST http://localhost:3030/api/agents/diagnostico \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"Se me pierden facturas por cobrar y nadie hace seguimiento."}]}'
```

Los otros dos:

- `Recibimos cientos de hojas de vida y no alcanzamos a leerlas.`
- `Buscar una cláusula en nuestros contratos toma horas.`

### Qué debe traer cada respuesta

El rol (`AGENT_ROLES.diagnostico` en [`app/api/agents/[agent]/route.ts`](../app/api/agents/[agent]/route.ts))
obliga a cuatro cosas, en este orden:

1. Qué está pasando en el proceso, en una o dos frases.
2. La capacidad que aplica, y solo una de estas seis: Agente de Cobranza, Agente de
   Documentos, Agente de Atención, Agente de Auditoría, Agente de Gestión, Agente de
   Agendamiento.
3. El servicio del catálogo y el nivel de inversión con su rango publicado.
4. El cierre literal: *"Si quiere que lo revisemos con su caso real, agende 30 minutos sin
   costo en la sección Hablemos de esta página."*

Y ninguna puede contener "nómina digital". Si alguna respuesta se salta un punto, se ajusta
el rol y se repite.

---

## Lo que sí quedó verificado, sin modelo

Los guardrails son lógica pura y se prueban sin llamar al LLM. Se añadieron cuatro casos a
[`lib/agents/guardrails.test.ts`](../lib/agents/guardrails.test.ts) (20/20 en verde).

### El cierre fijo no dispara falsos positivos

Es el riesgo real del P3: si el cierre obligatorio activara `AMOUNT_PATTERNS` o
`GUARANTEE_PATTERN`, **todas** las respuestas del agente entrarían en el reintento
correctivo y acabarían en `SAFE_FALLBACK`. El agente sería inservible.

Comprobado que no ocurre, ni con la frase sola ni dentro de una respuesta completa que
incluye un rango publicado:

> Su cartera se está quedando sin quien la persiga, que es un problema de proceso, no de
> personas. La capacidad que aplica es un Agente de Cobranza. El servicio es Automatización
> de un proceso documental, en el Nivel 2 · Implementa: $10.000.000 COP a $50.000.000 COP,
> sin IVA. Si quiere que lo revisemos con su caso real, agende 30 minutos sin costo en la
> sección Hablemos de esta página.

Cero violaciones. El "30 minutos" no se confunde con un importe porque los patrones exigen
la palabra *millones* o el símbolo `$` con separadores de miles.

### El guardrail nuevo funciona

`expresion_retirada` bloquea "nómina digital" en cualquier grafía, con tilde o sin ella,
en mayúsculas o minúsculas, y no se confunde con el nombre vigente de la oferta:

| Texto | Resultado |
|---|---|
| "Le construimos su nómina digital." | bloqueado |
| "Trabajamos con NOMINA DIGITAL desde el día uno." | bloqueado |
| "Le construimos una Fuerza Laboral Digital." | pasa |

Cuando se dispara, `correctiveInstruction` se lo dice al modelo con el nombre correcto de
la oferta, así que el reintento tiene con qué corregirse.
