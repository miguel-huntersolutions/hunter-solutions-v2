import { Hero } from "@/components/home/hero"
import { DigitalWorkforce } from "@/components/home/digital-workforce"
import { Problems } from "@/components/home/problems"
import { AugmentTeam } from "@/components/home/augment-team"
import { Process } from "@/components/home/process"
import { Catalog } from "@/components/home/catalog"
import { RolesGallery } from "@/components/home/roles-gallery"
import { EngagementModels } from "@/components/home/engagement-models"
import { Sectors } from "@/components/home/sectors"
import { Cases } from "@/components/home/cases"
import { Tools } from "@/components/home/tools"
import { Recommender } from "@/components/home/recommender"
import { DigitalAnatomy } from "@/components/home/digital-anatomy"
import { GovernanceStrip } from "@/components/home/governance-strip"
import { Differentiators } from "@/components/home/differentiators"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <DigitalWorkforce />
      <Problems />
      <AugmentTeam />
      <Process />
      <Catalog />
      <RolesGallery />
      <EngagementModels />
      <Recommender />
      <Tools />
      <Sectors />
      <Cases />
      <DigitalAnatomy />
      <GovernanceStrip />
      <Differentiators />
      <Faq />
      <Contact />
    </>
  )
}
