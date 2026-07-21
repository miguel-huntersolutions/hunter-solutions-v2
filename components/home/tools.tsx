"use client"

import Link from "next/link"
import { useState } from "react"
import { Section } from "@/components/ui/section"

const TOOLS = [
  {
    id: "optimizador-de-prompts",
    nombre: "Optimizador de Prompts",
    descripcion: "Pegue un prompt que use en su trabajo y reciba una versión mejorada con la explicación de cada cambio.",
    placeholder: "Pegue aquí el prompt que quiere mejorar…",
  },
  {
    id: "generador-caso-de-uso",
    nombre: "Generador de Caso de Uso IA",
    descripcion: "Describa su empresa o un proceso y reciba un caso de uso de IA concreto, con integración y supervisión incluidas.",
    placeholder: "Describa su empresa o el proceso que quiere explorar…",
  },
  {
    id: "diagnostico-express",
    nombre: "Diagnóstico Express de Proceso",
    descripcion: "Describa un proceso de su operación y reciba una lectura CNT honesta: automatizarlo, prepararlo o dejarlo como está.",
    placeholder: "Describa el proceso: quién lo hace, con qué sistemas, cada cuánto…",
  },
] as const

type ToolResult = {
  resultado: string
  siguientePaso: {
    servicio: { nombre: string; slug: string; descripcion: string }
    freno: string | null
  } | null
}

export function Tools() {
  const [active, setActive] = useState<(typeof TOOLS)[number]["id"]>(TOOLS[0].id)
  const [entrada, setEntrada] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "limit">("idle")
  const [result, setResult] = useState<ToolResult | null>(null)

  const tool = TOOLS.find((t) => t.id === active)!

  function switchTool(id: (typeof TOOLS)[number]["id"]) {
    setActive(id)
    setEntrada("")
    setResult(null)
    setStatus("idle")
  }

  async function run() {
    if (entrada.trim().length < 10 || status === "loading") return
    setStatus("loading")
    setResult(null)
    try {
      const res = await fetch(`/api/herramientas/${active}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entrada: entrada.trim() }),
      })
      if (res.status === 429) {
        setStatus("limit")
        return
      }
      if (!res.ok) throw new Error(`status ${res.status}`)
      setResult((await res.json()) as ToolResult)
      setStatus("idle")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section
      id="herramientas"
      eyebrow="Herramientas jugables"
      title="Valor primero, conversación después"
      intro="Tres herramientas gratuitas con resultado completo en pantalla. Sin registro, sin dejar el correo, sin salir de la página."
      tone="white"
    >
      <div className="max-w-[860px]">
        {/* Selector de herramienta */}
        <div role="tablist" aria-label="Herramientas" className="flex flex-col gap-1 md:flex-row">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => switchTool(t.id)}
              className={`border-b-4 px-3 py-2 text-left text-caption font-semibold uppercase tracking-wide transition-colors ${
                active === t.id
                  ? "border-teal bg-bg text-navy"
                  : "border-transparent text-slate hover:text-navy"
              }`}
            >
              {t.nombre}
            </button>
          ))}
        </div>

        <div className="border border-line bg-bg p-3">
          <p className="text-caption leading-relaxed text-slate">{tool.descripcion}</p>

          <label htmlFor="tool-entrada" className="sr-only">
            {tool.placeholder}
          </label>
          <textarea
            id="tool-entrada"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value.slice(0, 1500))}
            rows={4}
            maxLength={1500}
            placeholder={tool.placeholder}
            className="mt-2 w-full border border-line bg-white px-2 py-1 text-body text-ink outline-none focus:border-teal"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={run}
              disabled={status === "loading" || entrada.trim().length < 10}
              className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal disabled:opacity-60"
            >
              {status === "loading" ? "Generando…" : "Generar resultado"}
            </button>
            <p className="text-caption text-slate">{entrada.length}/1500 caracteres · sin registro</p>
          </div>

          <div aria-live="polite">
            {status === "error" && (
              <div className="mt-2 border border-line bg-white p-2 text-caption text-slate">
                La herramienta no está disponible en este momento.{" "}
                <button type="button" onClick={run} className="font-semibold text-teal underline">
                  Reintentar
                </button>{" "}
                o{" "}
                <a href="#diagnostico" className="font-semibold text-teal underline">
                  hablar con el Agente de Diagnóstico
                </a>
                .
              </div>
            )}
            {status === "limit" && (
              <div className="mt-2 border border-line bg-white p-2 text-caption text-slate">
                Alcanzó el límite de 5 ejecuciones por hora de esta herramienta. Si quiere seguir
                explorando,{" "}
                <a href="#contacto" className="font-semibold text-teal underline">
                  agende la sesión de 30 minutos sin costo
                </a>
                .
              </div>
            )}
            {result && (
              <div className="mt-3 border border-line bg-white p-3">
                <p className="text-caption font-semibold uppercase tracking-wide text-teal">
                  Resultado
                </p>
                <div className="mt-1 text-body leading-relaxed text-ink whitespace-pre-wrap">
                  {result.resultado}
                </div>
                {result.siguientePaso && (
                  <div className="mt-3 border-t border-line pt-2">
                    <p className="text-caption text-slate">
                      Si esto le resultó útil, el siguiente paso natural del catálogo es{" "}
                      <Link
                        href={`/servicios/${result.siguientePaso.servicio.slug}`}
                        className="font-semibold text-navy underline decoration-teal underline-offset-4"
                      >
                        {result.siguientePaso.servicio.nombre}
                      </Link>
                      .
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="mt-2 text-[11px] leading-snug text-slate">
            Resultados generados con IA; pueden contener errores. No incluya datos personales ni
            información confidencial.{" "}
            <Link href="/legal/uso-de-ia" className="underline">
              Cómo usamos la IA
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  )
}
