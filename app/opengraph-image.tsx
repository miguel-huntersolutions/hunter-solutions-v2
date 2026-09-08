import { positioning } from "@/content"
import { renderOgImage, ogSize, ogContentType } from "@/lib/og"

export const size = ogSize
export const contentType = ogContentType
export const alt = positioning.h1

export default function Image() {
  return renderOgImage({
    kicker: "Consultora AI-native",
    title: positioning.h1,
  })
}
