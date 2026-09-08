# Reubicación del contenido que salió de la home

**Rama:** `feat/landing-minimalista` · **Fecha:** 2026-09-08
**Origen:** Prompt 6 de [backlog-landing-minimalista.md](backlog-landing-minimalista.md)

Nada se perdió. La home pasó de doce secciones a cuatro; esto es dónde quedó cada una.

| Bloque retirado | Ruta destino | Componente | Nota |
|---|---|---|---|
| Concept (Fuerza Laboral Digital) | `/fuerza-laboral-digital` | ya existía | **No se insertó.** Ver abajo |
| Problems (los tres frenos) | `/servicios` | `components/legacy/problems.tsx` | Segundo bloque, retitulado "Por dónde se atasca" |
| RolesGallery (casos de uso) | `/servicios` | `components/legacy/roles-gallery.tsx` | Tras los niveles, como "Ejemplos de lo que un agente opera" |
| Catalog | `/servicios` | ya listaba niveles | Solo se integró lo que faltaba: el gráfico y la etiqueta |
| InvestmentChart | `/servicios` | `components/legacy/investment-chart.tsx` | Dentro del ancla `#niveles` |
| RecommenderLazy | — | — | No se reubica: su función la hace el Agente de Diagnóstico |
| Cases | `/casos` | ya listaba los casos | Se añadió la prueba propia desde `pruebaPropia` |
| GovernanceStrip | `/gobernanza` | ya existía | Verificado; se corrigió el vocabulario |
| Differentiators (8) | **`/nosotros`** | página nueva | Reagrupados en 3 bloques |
| Faq (6) | `/preguntas` | ya existía | Sin cambios |
| StatBand | — | — | Sin uso desde el Prompt 2 |

---

## Decisiones que el prompt dejaba abiertas

### Concept no se insertó en `/fuerza-laboral-digital`

El P6 pide verificar si la página ya cubre lo mismo y, si no, insertar el componente.
**Ya lo cubre:** explica qué es exactamente una Fuerza Laboral Digital, en qué se diferencia
de una automatización tradicional, por qué no es un chatbot, cómo se mantiene la supervisión
humana y si hay que reemplazar el ERP. Insertar `Concept` habría repetido el mismo argumento
con otro encuadre, y además arrastra la metáfora de la "nómina digital" que el P7a retira.

### El orden de `/servicios`

El P6 se contradice: la tabla dice que Concept "en /servicios NO va", pero el cierre describe
el orden final empezando por "concepto". Se siguió la instrucción explícita. El orden real es:

```
cabecera → Por dónde se atasca → #niveles (gráfico + los 3 niveles con sus servicios)
→ Ejemplos de lo que un agente opera → CTA al Agente de Diagnóstico
→ Sectores → Modelos comerciales → Herramientas
```

### La etiqueta "Más elegido"

Estaba posicionada con `-mt-[26px]`, un ajuste a ojo que la dejaba descuadrada. Ahora es un
elemento del flujo dentro de la cabecera del Nivel 2, con `w-fit`. Sin margen negativo.

### Anclas internas que apuntaban a la home

- `/servicios` enlazaba a `/#recomendador`: ahora ofrece el Agente de Diagnóstico en `/#diagnostico`.
- `components/legacy/catalog.tsx` tenía el mismo enlace; corregido para que el P6 no lo heredara roto.
- `app/casos/[slug]` enlazaba a `/#casos`: ahora a `/casos`.

No queda ningún enlace a `#servicios`, `#fuerza-laboral`, `#recomendador`, `#casos`,
`#gobernanza`, `#preguntas`, `#roles`, `#problemas`, `#diferenciadores` ni `#faq` desde la home.

---

## Estado de `components/legacy/`

| Componente | Uso |
|---|---|
| `problems` | `/servicios` |
| `roles-gallery` | `/servicios` |
| `investment-chart` | `/servicios` |
| `recommender` | solo por `recommender-lazy` |
| `cases`, `catalog`, `concept`, `differentiators`, `faq`, `governance-strip`, `recommender-lazy`, `stat-band` | **sin usar** |

Los que quedan sin usar se eliminan en el P7a, que lo pide explícitamente.

> **Nota de nomenclatura:** tres componentes activos de `/servicios` viven en una carpeta
> llamada `legacy/`. Una vez el P7a borre los que sobran, conviene renombrarla —
> `components/sections/` — o moverlos. No se hizo aquí para no mezclar un cambio de
> estructura con la reubicación.

## Rutas

`/nosotros` es nueva: metadata propia, un único H1, y está en `app/sitemap.ts`. El build
pasó de 69 a 70 rutas.
