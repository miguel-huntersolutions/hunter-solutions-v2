# Correcciones de lenguaje

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** Prompt 7a de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

Las reglas de marca ya no dependen de que alguien las recuerde: fallan el build.

---

## Textos corregidos

### Promesas absolutas

| Archivo | Antes | Ahora |
|---|---|---|
| `content/narrative.ts` | "Supervisión humana **siempre**" | "Supervisión humana en cada agente" |
| `content/narrative.ts` | "propiedad **total** del código y los datos" | "propiedad del código y los datos" |
| `content/commercial.ts` | "la decisión final **siempre** en manos humanas" | "la decisión final en manos humanas" |
| `content/commercial.ts` | "**siempre** con validación del abogado responsable" | "con validación del abogado responsable" |
| `content/commercial.ts` | "su equipo de TI con control **total** del entorno" | "su equipo de TI con control del entorno" |
| `content/resources.ts` | "pueden requerir **siempre** un visto bueno humano" | "pueden requerir un visto bueno humano" |
| `content/resources.ts` | "para que **siempre** haya un dueño" | "para que haya un dueño" |
| `content/trust.ts` | "La decisión de entrevistar es **siempre** de una persona." | "La decisión de entrevistar es de una persona." |
| `content/sectores.ts` | "queda **siempre** en manos del personal de salud" | "queda en manos del personal de salud" |

### Guiones largos en copy visible

Los cuatro estaban en `content/sectores.ts`:

| Antes | Ahora |
|---|---|
| "el trabajo de base —buscar, comparar y redactar— y el abogado" | "el trabajo de base (buscar, comparar y redactar) y el abogado" |
| "el back office administrativo —órdenes de compra…—" | "el back office administrativo (órdenes de compra…)" |
| "tareas administrativas —agendar, tramitar—." | "tareas administrativas: agendar, tramitar." |
| "Procesos de alto volumen —como la preselección— operados" | "Procesos de alto volumen, como la preselección, operados" |

Y uno más en `app/llms-full.txt/route.ts`: el título usaba guion largo, ahora dos puntos.

### "Nómina digital"

Las cinco apariciones cayeron por otras vías: tres en componentes que el Prompt 6
reubicó o el 7a eliminó, una en `/gobernanza` (reescrita como "una fuerza laboral digital
se gobierna como un equipo de personas: con roles claros, supervisión y trazabilidad") y
una en un comentario de `content/commercial.ts`, que no es copy.

---

## Las reglas que ahora lo impiden

### En el contrato de contenido (`scripts/validate-content.ts`)

`PROHIBIDAS` suma "nómina digital", "nomina digital", "bajo costo", "compañía joven",
"arquitectos de soluciones" y "100%". Se conservan las excepciones documentadas de
`promise.capacidad` y de "no como cifra garantizada".

Regla nueva de **guion largo**: falla ante `—` en cualquier string de `content/`, salvo en
los campos `fuente`, que son referencias internas a documentos.

**Los absolutos se vetan como promesa, no como palabra.** Esta es la parte donde el prompt,
aplicado al pie de la letra, empeoraba el copy. "Supervisión humana siempre" es una promesa
absoluta y debía caer. Pero el repositorio también tenía:

> "**No siempre** necesita lo más sofisticado."
> "Autonomía **total** no es el objetivo; el objetivo es capacidad con control."

Esas dos frases son exactamente el matiz que la marca quiere, dicho con las palabras que el
prompt manda prohibir. Prohibirlas a secas habría obligado a reescribir en peor las dos
únicas frases que ya hacían bien el trabajo. La regla busca `\b(siempre|total)\b` y se
desactiva si hay una negación a menos de catorce caracteres. Las dos frases sobreviven; las
nueve promesas absolutas cayeron.

El escaneo se amplió a `positioning`, `governance`, `partners`, `teamExperience`,
`training`, `sectorPages` y `resources`, que no se miraban.

### Fuera de `content/`: `pnpm check:copy`

Script nuevo, [`scripts/check-copy.ts`](../scripts/check-copy.ts), en `prebuild` después del
contrato. Revisa `app/`, `components/` y `content/`, salta comentarios y deja fuera:

- **`app/api/`**: son rutas de servidor. La plantilla del correo de leads va al equipo de
  HST, no al cliente, y su CSS lleva `width:100%`, que no es la promesa vetada.
- **`lib/agents/`**: los prompts y los guardrails nombran "nómina digital" precisamente
  para prohibirla.
- **Líneas `fuente:`**: misma excepción que el contrato.

Sin esos recortes el script daba diez falsos positivos y habría sido imposible dejarlo en
`prebuild`.

---

## Componentes eliminados

El P7a pide borrar lo que quedó en `components/legacy/` sin que nadie lo importe. Nueve
archivos: `cases`, `catalog`, `concept`, `differentiators`, `faq`, `governance-strip`,
`recommender-lazy`, `recommender` y `stat-band`.

Quedan tres, todos en uso desde `/servicios`: `problems`, `roles-gallery` e
`investment-chart`. La carpeta ya no contiene nada retirado, así que su nombre engaña;
conviene renombrarla a `components/sections/`.

---

## Verificación

Las seis reglas se probaron sembrando un titular con todo a la vez:

```
- Vocabulario prohibido "garantizado" en content.positioning.nuevosTitulo
- Vocabulario prohibido "bajo costo" en content.positioning.nuevosTitulo
- Vocabulario prohibido "compañía joven" en content.positioning.nuevosTitulo
- Vocabulario prohibido "100%" en content.positioning.nuevosTitulo
- Guion largo en content.positioning.nuevosTitulo. Use punto, coma o dos puntos.
- Promesa absoluta "siempre" en content.principles[3].titulo: Supervisión humana siempre
```

Y `check:copy` sembrando copy vetado en un componente:

```
- components/home/prueba.tsx:26  "garantizado"  Ver caso — resultado garantizado
- components/home/prueba.tsx:26  "guion largo"  Ver caso — resultado garantizado
```
