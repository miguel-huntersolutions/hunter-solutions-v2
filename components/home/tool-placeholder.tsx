import { Section } from "@/components/ui/section"

type ToolPlaceholderProps = {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  tone?: "bg" | "white" | "navy"
  /** Estado: reservando espacio (idle) o descargando el widget (loading). */
  state?: "idle" | "loading"
}

/**
 * Placeholder accesible que reserva el espacio de una herramienta interactiva
 * mientras su código se descarga. Reutiliza <Section> para conservar el mismo
 * encabezado (título/intro) en el HTML inicial: así no se pierde el contenido
 * para SEO y se minimiza el salto de layout (CLS).
 */
export function ToolPlaceholder({
  id,
  eyebrow,
  title,
  intro,
  tone = "bg",
  state = "idle",
}: ToolPlaceholderProps) {
  const dark = tone === "navy"
  return (
    <Section id={id} eyebrow={eyebrow} title={title} intro={intro} tone={tone}>
      <div
        role="status"
        aria-live="polite"
        aria-busy={state === "loading"}
        className={`flex min-h-[280px] max-w-[860px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-6 text-center ${
          dark ? "border-white/20 text-line" : "border-line text-slate"
        }`}
      >
        <span
          aria-hidden
          className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-teal"
        />
        <p className="text-caption leading-relaxed">
          {state === "loading" ? "Cargando la herramienta interactiva…" : "Herramienta interactiva"}
        </p>
        <span className="sr-only">
          {title ? `${title}: ` : ""}
          la herramienta se carga automáticamente al llegar a esta sección.
        </span>
      </div>
    </Section>
  )
}
