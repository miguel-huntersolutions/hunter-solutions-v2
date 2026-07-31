import { getServiceBySlug, getLevel, services } from "@/content"
import { renderOgImage, ogSize, ogContentType } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Servicio de Hunter Solutions Tech"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  const kicker = service ? getLevel(service.nivel).nombre : "Servicios"
  return renderOgImage({
    kicker,
    title: service?.nombre ?? "Servicios de IA aplicada",
  })
}
