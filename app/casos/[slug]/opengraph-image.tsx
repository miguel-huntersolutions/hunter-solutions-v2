import { publishedCases } from "@/content"
import { renderOgImage, ogSize, ogContentType } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Caso de Hunter Solutions Tech"

export function generateStaticParams() {
  return publishedCases.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = publishedCases.find((c) => c.slug === slug)
  return renderOgImage({
    kicker: cs ? `Caso · Sector ${cs.sector}` : "Casos",
    title: cs?.titulo ?? "Casos de IA aplicada",
  })
}
