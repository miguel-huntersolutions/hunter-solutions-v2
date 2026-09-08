import { Section } from "@/components/ui/section"

/**
 * Tercer bloque de la home: tres pruebas de que ya funciona, más la línea de
 * confianza que enlaza a gobernanza.
 *
 * Cascarón del Prompt 1. En el Prompt 4 las tarjetas 1 y 2 se generan desde
 * publishedCases y la tercera desde `pruebaPropia`, un export nuevo de
 * content/trust.ts; la línea de confianza también sale del content model.
 */
export function Prueba() {
  return (
    <Section id="prueba" eyebrow="Ya está funcionando" title="Tres pruebas, sin cifras infladas." tone="bg">
      <div className="border border-line bg-white p-6 text-body text-slate">
        [PENDIENTE COPY] Las tres tarjetas y la línea de confianza llegan en el Prompt 4.
      </div>
    </Section>
  )
}
