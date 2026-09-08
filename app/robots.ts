import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

// Rastreadores de modelos y agentes. Se les permite todo el sitio, incluidos el
// espejo Markdown y la oferta en JSON: la versión para agentes existe para que
// la lean.
const BOTS_IA = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
  "CCBot",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/design-system"],
      },
      ...BOTS_IA.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/design-system"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
