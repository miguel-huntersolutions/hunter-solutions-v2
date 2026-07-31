import { renderOgImage, ogSize, ogContentType } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = "Hunter Solutions Tech: contrate una Fuerza Laboral Digital"

export default function Image() {
  return renderOgImage({
    kicker: "Consultora AI-native",
    title: "Contrate una Fuerza Laboral Digital. No lea sobre ella: pruébela.",
  })
}
