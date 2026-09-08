import { positioning } from "@/content"

/**
 * H1 de la home. El texto vive una sola vez en content/narrative.ts: antes había
 * tres versiones distintas (positioning.h1 para llms.txt y el corpus, otro texto
 * visible, y un sr-only con un tercero). Ahora lo que lee un buscador, lo que oye
 * un lector de pantalla y lo que ve una persona son la misma frase.
 *
 * Las líneas de h1Lineas se animan por separado con la animación hero-line de
 * globals.css; el texto no se duplica para conseguirlo.
 */
export function HeroHeadline() {
  return (
    <h1 className="text-h1 font-extrabold leading-[1.08] tracking-tight text-balance md:text-display">
      {positioning.h1Lineas.map((linea, i) => (
        <span
          key={linea}
          className={`hero-line block ${i > 0 ? "text-line" : ""}`}
          style={{ animationDelay: `${0.05 + i * 0.3}s` }}
        >
          {linea}
        </span>
      ))}
    </h1>
  )
}
