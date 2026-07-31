import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Solo el dominio de producción canónico debe ser indexable.
const PRODUCTION_HOST = "www.huntersolutions.tech"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // El header host puede incluir el puerto (p. ej. localhost:3000); lo ignoramos.
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase()

  // Cualquier host que no sea exactamente el de producción (entorno de desarrollo,
  // previews *.vercel.app, apex sin www, etc.) devuelve noindex, nofollow.
  if (host !== PRODUCTION_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow")
  }

  return response
}

export const config = {
  // Excluimos archivos internos de Next y assets estáticos; el resto del sitio pasa por aquí.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
