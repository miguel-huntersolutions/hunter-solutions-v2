"use client"

import Link from "next/link"
import { useState } from "react"
import { problems, sectors } from "@/content"
import { Section } from "@/components/ui/section"

type Result = {
  nivel: { id: number; nombre: string; rango: string; nota: string }
  justificacion: string
  servicios: { id: string; slug: string; nombre: string; descripcion: string }[]
}

export function Recommender() {
  const [step, setStep] = useState(1)
  const [problemaId, setProblemaId] = useState<string | null>(null)
  const [sector, setSector] = useState<string | null>(null)
  const [textoLibre, setTextoLibre] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "limit">("idle")
  const [result, setResult] = useState<Result | null>(null)

  async function submit() {
    if (!problemaId || !sector) return
    setStatus("loading")
    try {
      const res = await fetch("/api/recomendador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemaId,
          sector,
          textoLibre: textoLibre.trim() || undefined,
        }),
      })
      if (res.status === 429) {
        setStatus("limit")
        return
      }
      if (!res.ok) throw new Error(`status ${res.status}`)
      setResult((await res.json()) as Result)
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  function reset() {
    setStep(1)
    setProblemaId(null)
    setSector(null)
    setTextoLibre("")
    setResult(null)
    setStatus("idle")
  }

  return (
    <Section
      id="recomendador"
      eyebrow="Recomendador de Nivel"
      title="Tres respuestas y le decimos por dónde empezar"
      intro="El asistente interpreta su caso, pero el resultado sale siempre del catálogo publicado: nivel, rango y servicios reales."
    >
      <div className="max-w-[720px] border border-line bg-white p-3" data-testid="recomendador-inicio">
        {!result ? (
          <>
            {/* Barra de progreso */}
            <div className="mb-3 flex gap-1" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <div key={n} className={`h-1 flex-1 ${step >= n ? "bg-teal" : "bg-line"}`} />
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              Paso {step} de 3
            </p>

            {step === 1 && (
              <fieldset>
                <legend className="mb-2 text-h3 font-bold text-navy">
                  ¿Cuál de estas situaciones describe mejor su reto?
                </legend>
                <div className="flex flex-col gap-1">
                  {problems.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      data-testid="paso-1-opcion"
                      onClick={() => {
                        setProblemaId(p.id)
                        setStep(2)
                      }}
                      className={`border p-2 text-left text-body transition-colors ${
                        problemaId === p.id
                          ? "border-teal bg-bg text-navy"
                          : "border-line text-slate hover:border-teal hover:text-navy"
                      }`}
                    >
                      <span className="font-semibold text-navy">{p.titulo}.</span> {p.descripcion}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="mb-2 text-h3 font-bold text-navy">¿En qué sector opera?</legend>
                <div className="flex flex-wrap gap-1">
                  {sectors.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid="paso-2-opcion"
                      onClick={() => {
                        setSector(s)
                        setStep(3)
                      }}
                      className={`border px-3 py-1 text-body transition-colors ${
                        sector === s
                          ? "border-teal bg-bg text-navy"
                          : "border-line text-slate hover:border-teal hover:text-navy"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="reco-texto" className="mb-2 block text-h3 font-bold text-navy">
                  ¿Quiere contarnos algo más? (opcional)
                </label>
                <textarea
                  id="reco-texto"
                  value={textoLibre}
                  onChange={(e) => setTextoLibre(e.target.value.slice(0, 200))}
                  rows={3}
                  maxLength={200}
                  placeholder="Ej.: recibimos 300 facturas al mes y las digitamos a mano…"
                  className="w-full border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
                />
                <p className="mt-1 text-caption text-slate">{textoLibre.length}/200 caracteres</p>
              </div>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="border border-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  Atrás
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  data-testid="recomendador-enviar"
                  onClick={submit}
                  disabled={status === "loading"}
                  className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal disabled:opacity-60"
                >
                  {status === "loading" ? "Calculando…" : "Ver mi recomendación"}
                </button>
              )}
              <p aria-live="polite" className="text-caption text-slate">
                {status === "error" &&
                  "No pudimos calcular la recomendación. Intente de nuevo o agende la sesión de 30 minutos."}
                {status === "limit" &&
                  "Alcanzó el límite por hora. Agende la sesión de 30 minutos y lo resolvemos en persona."}
              </p>
            </div>
          </>
        ) : (
          <div data-testid="recomendador-resultado" className="flex flex-col gap-3">
            <div className="bg-navy p-3 text-white">
              <p className="text-caption font-semibold uppercase tracking-wide text-teal">
                Nivel sugerido
              </p>
              <h3 className="text-h3 font-bold">{result.nivel.nombre}</h3>
              <p className="text-h3 font-bold text-teal">{result.nivel.rango}</p>
              <p className="mt-1 text-caption text-line">Sin IVA · {result.nivel.nota}</p>
            </div>

            <p className="text-body leading-relaxed text-slate">{result.justificacion}</p>

            <div className="grid gap-2 md:grid-cols-2">
              {result.servicios.map((s) => (
                <Link
                  key={s.id}
                  href={`/servicios/${s.slug}`}
                  className="border border-line bg-bg p-2 transition-colors hover:border-teal"
                >
                  <p className="text-caption font-semibold text-navy">{s.nombre}</p>
                  <p className="mt-0.5 text-caption leading-snug text-slate">{s.descripcion}</p>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="#diagnostico"
                className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal"
              >
                Profundizar con el Agente de Diagnóstico
              </a>
              <a
                href="#contacto"
                className="border border-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Agendar sesión de 30 minutos
              </a>
              <button
                type="button"
                onClick={reset}
                className="px-3 py-1 text-caption font-semibold uppercase tracking-wide text-slate underline underline-offset-4 hover:text-navy"
              >
                Empezar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
