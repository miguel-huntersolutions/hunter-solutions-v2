import { brand } from "@/content"

// Dominio de producción canónico (con www, sin barra final). La variable de entorno
// tiene prioridad; el fallback evita el bug de protocolo duplicado (https://https://...).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.huntersolutions.tech").replace(
  /\/+$/,
  "",
)

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString()
}

/** Organization JSON-LD para el layout raíz */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.legalName,
    alternateName: brand.shortName,
    url: SITE_URL,
    email: brand.email,
    description: brand.descriptorCopy,
    sameAs: brand.socials.map((s) => s.url),
    address: { "@type": "PostalAddress", addressCountry: "CO" },
  }
}

/** Serializa JSON-LD para inyectar en un <script> */
export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
