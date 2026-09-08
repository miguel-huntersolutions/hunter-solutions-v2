# hunter-solutions-v2

Sitio de Hunter Solutions Tech: catálogo de servicios por niveles de inversión, casos, recursos y
tres agentes de IA que el visitante puede probar sin registrarse.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · AI SDK 7.

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # y rellene los valores
pnpm dev
```

El sitio queda en http://localhost:3000. Sin variables de entorno arranca igual: los agentes
responden 503 y el recomendador cae a su mapeo por reglas, que no necesita LLM.

## Scripts

| Comando                 | Qué hace                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `pnpm dev`              | Servidor de desarrollo.                                               |
| `pnpm build`            | Valida el contenido (`prebuild`), verifica tipos y compila.           |
| `pnpm start`            | Sirve la compilación de producción.                                   |
| `pnpm lint`             | ESLint con la configuración plana de Next.                            |
| `pnpm validate:content` | Solo el contrato de contenido, sin compilar.                          |

## Variables de entorno

Todas están documentadas en [`.env.example`](.env.example). Ninguna es obligatoria para levantar el
proyecto; cada una habilita una capacidad concreta (agentes, rate limiting compartido, entrega de
leads). En Vercel se configuran en el panel del proyecto.

## Cómo está organizado

**`content/` es la fuente única de verdad.** Ningún componente contiene un precio, una cifra ni un
nombre de servicio literal: todo se lee de aquí. Eso permite dos cosas que sostienen el resto del
proyecto:

- **Contrato de contenido.** [`scripts/validate-content.ts`](scripts/validate-content.ts) corre en
  `prebuild` y bloquea el despliegue si el contenido se rompe: conteos que no cuadran, claims
  numéricos sin encuadre ni fuente, rangos de inversión solapados, referencias cruzadas huérfanas,
  vocabulario comercial prohibido, casos con resultado pero sin autorización registrada.
- **Corpus de los agentes.** [`lib/agents/corpus.ts`](lib/agents/corpus.ts) genera el corpus factual
  desde ese mismo modelo, así que un agente no puede citar un servicio, un rango o una etapa que no
  exista publicada.

```
app/                 Rutas (App Router). app/api/ son los endpoints de servidor.
components/          UI. home/ son las secciones de la portada; ui/ los primitivos.
content/             Modelo de contenido validado + media.ts (rutas de imagen).
lib/agents/          Corpus, guardrails, rate limiting y prompts de sistema.
lib/seo.ts           Dominio canónico y JSON-LD.
design/tokens.ts     Tokens de marca.
scripts/             Contrato de contenido.
docs/                Notas de operación (dominio en Vercel, GA4).
proxy.ts             Cabecera noindex fuera del dominio de producción.
```

## Agentes y guardrails

Tres agentes (`/api/agents/diagnostico`, `/cerebro`, `/privacidad`) y tres herramientas
(`/api/herramientas/*`) comparten la misma cadena de contención:

1. La entrada del visitante se encapsula entre delimitadores y se declara como dato, no como
   instrucción.
2. El modelo solo puede afirmar lo que está en el corpus factual.
3. La salida se valida antes de devolverse ([`lib/agents/guardrails.ts`](lib/agents/guardrails.ts)):
   importes fuera de los rangos publicados, promesas de resultado garantizado o peticiones de datos
   sensibles disparan un reintento correctivo y, si vuelve a fallar, una respuesta segura.

Todos los endpoints tienen rate limiting por IP. Es compartido entre instancias si hay un Redis REST
configurado; si no, degrada a un contador en memoria y lo advierte en el arranque.

## Imágenes

Las fotografías de `public/` van en WebP. Eran PNG sin pérdida de ~1,5 MB cada una; la de la portada
se sirve como fondo CSS, fuera del optimizador de `next/image`, así que el formato importa.

## Despliegue

Cada merge a `main` despliega en Vercel. El proyecto está enlazado a
[v0](https://v0.app/chat/projects/prj_a4tBPWTe58KdfrCbTqcIHeaj1NQq), que puede empujar commits
directamente al repositorio.

El redirect del apex al dominio con `www` está en `next.config.mjs` y debe configurarse también en
el panel de Vercel; ver [`docs/dominio-vercel.md`](docs/dominio-vercel.md).
