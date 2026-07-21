import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  tone?: "bg" | "white" | "navy"
  children: ReactNode
}

const TONE_CLASSES: Record<NonNullable<SectionProps["tone"]>, string> = {
  bg: "bg-bg text-ink",
  white: "bg-white text-ink",
  navy: "bg-navy text-white",
}

export function Section({ id, eyebrow, title, intro, tone = "bg", children }: SectionProps) {
  const dark = tone === "navy"
  return (
    <section id={id} className={TONE_CLASSES[tone]}>
      <div className="mx-auto max-w-[1200px] px-2 py-8 md:px-3 md:py-10">
        {(eyebrow || title || intro) && (
          <header className="mb-5 flex max-w-[70ch] flex-col gap-2">
            {eyebrow && (
              <p className="text-caption font-semibold uppercase tracking-wide text-teal">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`text-h2 font-bold text-balance ${dark ? "text-white" : "text-navy"}`}>
                {title}
              </h2>
            )}
            {intro && (
              <p className={`text-body leading-relaxed ${dark ? "text-line" : "text-slate"}`}>
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
