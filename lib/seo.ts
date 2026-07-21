import { brand } from "@/content"

export const SITE_URL = `https://${brand.domain}`

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
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
