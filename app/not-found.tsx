import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 px-2 py-12 md:px-3">
      <p className="text-caption font-semibold uppercase tracking-wide text-teal">Error 404</p>
      <h1 className="text-h1 font-bold text-navy text-balance">Esta página no existe</h1>
      <p className="max-w-[60ch] text-body leading-relaxed text-slate">
        La dirección que buscas no está en el sitio. Puede que el enlace haya cambiado o que la
        página se haya movido.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
        >
          Ir al inicio
        </Link>
        <Link
          href="/servicios"
          className="border border-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
        >
          Ver servicios
        </Link>
      </div>
    </div>
  )
}
