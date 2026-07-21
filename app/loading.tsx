export default function Loading() {
  return (
    <div
      className="mx-auto flex max-w-[1200px] flex-col gap-3 px-2 py-12 md:px-3"
      role="status"
      aria-label="Cargando contenido"
    >
      <div className="h-2 w-24 animate-pulse bg-line" />
      <div className="h-6 w-2/3 animate-pulse bg-line" />
      <div className="h-2 w-full animate-pulse bg-line" />
      <div className="h-2 w-5/6 animate-pulse bg-line" />
      <span className="sr-only">Cargando…</span>
    </div>
  )
}
