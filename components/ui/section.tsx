import type { ReactNode } from "react"

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  intro?: string
  tone?: "bg" | "white" | "navy"
  align?: "left" | "center"
  children: ReactNode
}

const TONE_CLASSES: Record<NonNullable<SectionProps["tone"]>, string> = {
  bg: "bg-bg text-ink",
  white: "bg-white text-ink",
  navy: "bg-navy text-white",
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption font-semibold uppercase tracking-wide ${
        tone === "dark"
          ? "border-teal/40 bg-white/5 text-teal"
          : "border-teal/30 bg-teal-soft text-teal-dark"
      }`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-teal" />
      {children}
    </span>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = "bg",
  align = "left",
  children,
}: SectionProps) {
  const dark = tone === "navy"
  const centered = align === "center"
  return (
    <section id={id} className={TONE_CLASSES[tone]}>
      <div className="mx-auto max-w-[1200px] px-2 py-10 md:px-3 md:py-14">
        {(eyebrow || title || intro) && (
          <header
            className={`mb-8 flex flex-col gap-3 ${
              centered ? "mx-auto max-w-[52ch] items-center text-center" : "max-w-[62ch]"
            }`}
          >
            {eyebrow && <Eyebrow tone={dark ? "dark" : "light"}>{eyebrow}</Eyebrow>}
            {title && (
              <h2
                className={`text-h2 font-bold text-balance md:text-h1 ${
                  dark ? "text-white" : "text-navy"
                }`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <p className={`text-lead leading-relaxed text-pretty ${dark ? "text-line" : "text-slate"}`}>
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
