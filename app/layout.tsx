import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Open_Sans } from 'next/font/google'
import { brand } from '@/content'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: 'Hunter Solutions Tech — Automatización e IA que puedes probar',
    template: '%s | Hunter Solutions Tech',
  },
  description:
    'Consultora AI-native en Colombia. Automatización, agentes de IA y desarrollo a la medida por niveles de inversión claros. Prueba la IA en la página antes de agendar.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/brand/favicon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'Hunter Solutions Tech',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#182543',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO" className={`${openSans.variable} bg-bg`}>
      <body className="antialiased font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-navy focus:px-2 focus:py-1 focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
