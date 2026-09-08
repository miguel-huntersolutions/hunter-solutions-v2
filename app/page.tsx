import type { Metadata } from "next"
import { Hero } from "@/components/home/hero"
import { DiagnosticoBlock } from "@/components/home/diagnostico-block"
import { Prueba } from "@/components/home/prueba"
import { Contact } from "@/components/home/contact"
import { FaqJsonLd } from "@/components/seo/faq-jsonld"

// og:title unificado con el H1 del hero (mismo mensaje comercial).
// Se actualiza en el Prompt 2, cuando el titular pase a leerse de positioning.h1.
export const metadata: Metadata = {
  openGraph: {
    title: "Agentes de IA y Fuerza Laboral Digital para empresas en Colombia",
  },
}

/**
 * Home de cuatro bloques (Prompt 1 del backlog del landing minimalista).
 *
 * Las once secciones que salieron viven en components/legacy/ sin modificar y se
 * reubican en el Prompt 6. FaqJsonLd se conserva a propósito: alimenta a los
 * buscadores aunque el bloque de preguntas ya no se vea aquí.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DiagnosticoBlock />
      <Prueba />
      <Contact />
      <FaqJsonLd />
    </>
  )
}
