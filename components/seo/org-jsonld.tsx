import { brand } from "@/content"
import { jsonLdScript } from "@/lib/seo"

export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    // @id estable para que otras entidades (p. ej. Service.provider) la referencien sin duplicar datos.
    "@id": `${brand.domain}/#organization`,
    name: brand.shortName,
    legalName: brand.legalName,
    url: brand.domain,
    email: brand.email,
    logo: `${brand.domain}/brand/icono.svg`,
    sameAs: brand.socials.map((s) => s.url),
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    knowsAbout: [
      "Automatización de procesos",
      "Agentes de IA",
      "Desarrollo de software a la medida",
      "Gobernanza de IA",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  )
}
