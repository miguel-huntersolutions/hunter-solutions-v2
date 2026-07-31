/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Dominio canónico: el apex sin www redirige 301 a la versión con www.
      // Refuerza en código el redirect que también debe configurarse en el panel de Vercel.
      {
        source: "/:path*",
        has: [{ type: "host", value: "huntersolutions.tech" }],
        destination: "https://www.huntersolutions.tech/:path*",
        permanent: true,
      },
      // Servicios retirados del catálogo: ahora son roles de la Fuerza Laboral Digital.
      // Redirigimos sus rutas antiguas a Servicios para no romper enlaces.
      {
        source: "/servicios/agente-de-atencion-y-agendamiento",
        destination: "/servicios",
        permanent: true,
      },
      {
        source: "/servicios/agente-de-back-office",
        destination: "/servicios",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
