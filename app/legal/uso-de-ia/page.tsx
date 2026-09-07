import type { Metadata } from "next"
import { usoDeIa } from "@/content/legal"
import { LegalDocument } from "@/components/legal/legal-document"

export const metadata: Metadata = {
  title: "Cómo usamos la IA",
  description:
    "Qué hacen los agentes de IA de este sitio, qué límites tienen y qué pasa con sus conversaciones.",
  alternates: { canonical: "/legal/uso-de-ia" },
}

export default function UsoDeIaPage() {
  return (
    <div className="bg-bg">
      <LegalDocument doc={usoDeIa} />
    </div>
  )
}
