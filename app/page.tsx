import { Hero } from "@/components/home/hero"
import { Problems } from "@/components/home/problems"
import { Process } from "@/components/home/process"
import { Catalog } from "@/components/home/catalog"
import { Cases } from "@/components/home/cases"
import { GovernanceStrip } from "@/components/home/governance-strip"
import { Differentiators } from "@/components/home/differentiators"
import { Faq } from "@/components/home/faq"
import { Contact } from "@/components/home/contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <Process />
      <Catalog />
      <Cases />
      <GovernanceStrip />
      <Differentiators />
      <Faq />
      <Contact />
    </>
  )
}
