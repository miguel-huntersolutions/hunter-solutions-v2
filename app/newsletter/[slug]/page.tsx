import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { brand } from "@/content"
import { absoluteUrl, jsonLdScript } from "@/lib/seo"
import { formatIssueDate, getIssueBySlug, publishedIssues } from "@/lib/newsletter"

export function generateStaticParams() {
  return publishedIssues().map((i) => ({ slug: i.slug }))
}

/** Un slug que no corresponde a una edición publicada es 404, no una página vacía. */
export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const issue = getIssueBySlug(slug)
  if (!issue) return {}
  const path = `/newsletter/${issue.slug}`
  return {
    title: `${issue.titulo} · Radar IA Semanal`,
    description: issue.extracto,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: issue.titulo,
      description: issue.extracto,
      url: path,
      publishedTime: issue.datePublished,
    },
  }
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const issue = getIssueBySlug(slug)
  if (!issue) notFound()

  const url = absoluteUrl(`/newsletter/${issue.slug}`)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: issue.titulo,
    description: issue.extracto,
    url,
    mainEntityOfPage: url,
    datePublished: issue.datePublished,
    dateModified: issue.datePublished,
    isPartOf: {
      "@type": "PublicationIssue",
      issueNumber: issue.numero,
      name: "Radar IA Semanal",
    },
    author: { "@type": "Organization", name: brand.legalName, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: brand.legalName, url: absoluteUrl("/") },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Radar IA Semanal", item: absoluteUrl("/newsletter") },
      { "@type": "ListItem", position: 3, name: issue.titulo, item: url },
    ],
  }

  return (
    <div className="bg-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }} />

      {/*
        Barra de ubicación, no portada: la edición trae su propio hero con su H1.
        Duplicar aquí el titular dejaba dos <h1> en la página.
      */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1040px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-2 py-2.5">
          <nav aria-label="Ruta de navegación" className="text-caption text-slate">
            <Link href="/" className="underline decoration-line underline-offset-2 hover:text-teal">
              Inicio
            </Link>
            <span aria-hidden className="mx-1.5">
              /
            </span>
            <Link
              href="/newsletter"
              className="underline decoration-line underline-offset-2 hover:text-teal"
            >
              Radar IA Semanal
            </Link>
            <span aria-hidden className="mx-1.5">
              /
            </span>
            <span className="text-navy">Edición {issue.numero}</span>
          </nav>
          <p className="text-caption text-slate">
            <time dateTime={issue.datePublished}>{formatIssueDate(issue.datePublished)}</time>
          </p>
        </div>
      </div>

      {/*
        La edición trae su propia maqueta. El CSS ya viene acotado a .hst-nl por
        scripts/import-newsletter.ts: las variables y las reglas de body se izan
        al contenedor y el resto vive dentro de un @scope, así que reglas como
        `section{}` o `p{}` no se escapan al resto del sitio.
      */}
      <style dangerouslySetInnerHTML={{ __html: issue.css }} />
      <div className="hst-nl" dangerouslySetInnerHTML={{ __html: issue.html }} />

      <div className="mx-auto max-w-[1040px] px-2 py-8">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-2 text-caption font-semibold uppercase tracking-wide text-teal-dark hover:text-navy"
        >
          <ArrowLeft size={16} aria-hidden />
          Ver todas las ediciones
        </Link>
      </div>
    </div>
  )
}
