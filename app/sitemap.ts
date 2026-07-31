import type { MetadataRoute } from "next"
import { services, publishedCases, publishedResources, sectorPages } from "@/content"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL
  const now = new Date()

  const staticRoutes = [
    "",
    "/fuerza-laboral-digital",
    "/recursos",
    "/servicios",
    "/casos",
    "/gobernanza",
    "/formacion",
    "/aliados",
    "/preguntas",
    "/privacidad",
    "/terminos",
    "/legal/uso-de-ia",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }))

  const serviceRoutes = services.map((s) => ({
    url: `${base}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const caseRoutes = publishedCases.map((c) => ({
    url: `${base}/casos/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Solo artículos publicados; los borradores quedan fuera del sitemap.
  const resourceRoutes = publishedResources.map((r) => ({
    url: `${base}/recursos/${r.slug}`,
    lastModified: new Date(r.dateModified),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const sectorRoutes = sectorPages.map((s) => ({
    url: `${base}/sectores/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...caseRoutes, ...resourceRoutes, ...sectorRoutes]
}
