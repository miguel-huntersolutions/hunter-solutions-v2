import type { Metadata } from "next"
import { terminos } from "@/content/legal"
import { LegalDocument } from "@/components/legal/legal-document"

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Términos de uso del sitio de Hunter Solutions Tech.",
  alternates: { canonical: "/terminos" },
}

export default function TerminosPage() {
  return (
    <div className="bg-bg">
      <LegalDocument doc={terminos} />
    </div>
  )
}
