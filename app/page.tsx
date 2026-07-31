import { Hero } from "@/components/home/hero"
import { Concept } from "@/components/home/concept"
import { Problems } from "@/components/home/problems"
import { RolesGallery } from "@/components/home/roles-gallery"
import { Catalog } from "@/components/home/catalog"
import { Recommender } from "@/components/home/recommender"
import { Cases } from "@/components/home/cases"
import { GovernanceStrip } from "@/components/home/governance-strip"
import { Differentiators } from "@/components/home/differentiators"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"
import { FaqJsonLd } from "@/components/seo/faq-jsonld"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Concept />
      <Problems />
      <RolesGallery />
      <Catalog />
      <Recommender />
      <Cases />
      <GovernanceStrip />
      <Differentiators />
      <Faq />
      <Contact />
      <FaqJsonLd />
    </>
  )
}
