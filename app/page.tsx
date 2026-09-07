import { Hero } from "@/components/home/hero"
import { StatBand } from "@/components/home/stat-band"
import { Concept } from "@/components/home/concept"
import { Problems } from "@/components/home/problems"
import { RolesGallery } from "@/components/home/roles-gallery"
import { Catalog } from "@/components/home/catalog"
import { RecommenderLazy } from "@/components/home/recommender-lazy"
import { Cases } from "@/components/home/cases"
import { GovernanceStrip } from "@/components/home/governance-strip"
import { Differentiators } from "@/components/home/differentiators"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"
import { FaqJsonLd } from "@/components/seo/faq-jsonld"
import type { Metadata } from "next"

// og:title unificado con el H1 del hero (mismo mensaje comercial).
export const metadata: Metadata = {
  openGraph: {
    title: "Agentes de IA y Fuerza Laboral Digital para empresas en Colombia",
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBand />
      <Concept />
      <Problems />
      <RolesGallery />
      <Catalog />
      <RecommenderLazy />
      <Cases />
      <GovernanceStrip />
      <Differentiators />
      <Faq />
      <Contact />
      <FaqJsonLd />
    </>
  )
}
