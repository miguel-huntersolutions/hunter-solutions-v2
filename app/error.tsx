"use client"

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 px-2 py-12 md:px-3">
      <p className="text-caption font-semibold uppercase tracking-wide text-teal">Error</p>
      <h1 className="text-h1 font-bold text-navy text-balance">Algo salió mal</h1>
      <p className="max-w-[60ch] text-body leading-relaxed text-slate">
        Ocurrió un error inesperado al cargar esta sección. Puedes intentarlo de nuevo; si el
        problema persiste, escríbenos y lo revisamos.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
      >
        Intentar de nuevo
      </button>
    </div>
  )
}
