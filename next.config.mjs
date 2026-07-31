/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Servicios retirados del catálogo: ahora son roles de la Fuerza Laboral Digital.
    // Redirigimos sus rutas antiguas a Servicios para no romper enlaces.
    return [
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
