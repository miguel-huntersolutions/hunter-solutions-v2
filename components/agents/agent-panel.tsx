"use client"

import { useRef, useState } from "react"
import { SendHorizontal } from "lucide-react"

type Message = { role: "user" | "assistant"; content: string }

type AgentPanelProps = {
  endpoint: string
  title: string
  placeholder: string
  /** Sugerencias de arranque en un clic */
  suggestions?: string[]
  /** Tono visual del panel */
  tone?: "light" | "dark"
}

/**
 * Panel conversacional genérico para los agentes HST.
 * Degradación explícita: si el endpoint falla, se muestra un estado honesto
 * con la alternativa humana (agendar sesión), nunca un error crudo.
 */
export function AgentPanel({ endpoint, title, placeholder, suggestions = [], tone = "dark" }: AgentPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")
  const scrollRef = useRef<HTMLDivElement>(null)

  const dark = tone === "dark"
  const last = messages[messages.length - 1]
  const lastAssistantMessage = last?.role === "assistant" ? last.content : ""

  async function send(text: string) {
    const content = text.trim()
    if (!content || status === "loading") return
    const next: Message[] = [...messages, { role: "user", content }]
    setMessages(next)
    setInput("")
    setStatus("loading")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok || !res.body) throw new Error(`status ${res.status}`)
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let assistant = ""
      setMessages((m) => [...m, { role: "assistant", content: "" }])
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        assistant += decoder.decode(value, { stream: true })
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: assistant }])
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
      }
      setStatus("idle")
    } catch {
      setMessages(next)
      setStatus("error")
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div
      className={`flex h-full min-h-[320px] flex-col overflow-hidden rounded-xl border shadow-lg ${
        dark ? "border-white/10 bg-ink" : "border-line bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-2 bg-navy px-3 py-2.5">
        <p className="flex items-center gap-2 text-caption font-semibold text-white">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[11px] font-bold text-white">
            AI
          </span>
          {title}
        </p>
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-line">
          <span aria-hidden className="h-2 w-2 rounded-full bg-teal" />
          En línea
        </span>
      </div>

      {/* Sin aria-live sobre el hilo: con la respuesta llegando por chunks, un lector
          de pantalla releería la conversación entera en cada actualización. El anuncio
          lo hace la región viva de más abajo, una sola vez y con la respuesta completa. */}
      <div ref={scrollRef} className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
        {messages.length === 0 && suggestions.length > 0 && (
          <div className="flex flex-col items-start gap-1">
            <p className={`text-caption ${dark ? "text-line" : "text-slate"}`}>
              Pruebe con una de estas preguntas o escriba la suya:
            </p>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className={`rounded-lg border px-2 py-1.5 text-left text-caption transition-colors ${
                  dark
                    ? "border-white/15 bg-white/5 text-line hover:border-teal hover:text-white"
                    : "border-line bg-bg text-slate hover:border-teal hover:text-navy"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-caption leading-relaxed whitespace-pre-wrap ${
              m.role === "user"
                ? `self-end rounded-br-sm ${dark ? "bg-teal text-white" : "bg-navy text-white"}`
                : `self-start rounded-bl-sm ${dark ? "bg-navy text-line" : "bg-bg text-ink"}`
            }`}
          >
            {m.content || "…"}
          </div>
        ))}

        {status === "error" && (
          <div className={`self-start border px-2 py-1 text-caption ${dark ? "border-slate text-line" : "border-line text-slate"}`}>
            El agente no está disponible en este momento. Puede{" "}
            <a href="#contacto" className="font-semibold text-teal underline">
              agendar una sesión de 30 minutos
            </a>{" "}
            y el equipo le responde en persona.
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {status === "loading" ? "" : lastAssistantMessage}
      </p>

      <form onSubmit={onSubmit} className={`flex border-t ${dark ? "border-slate" : "border-line"}`}>
        <label htmlFor={`agent-input-${title}`} className="sr-only">
          {placeholder}
        </label>
        <input
          id={`agent-input-${title}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className={`min-w-0 flex-1 bg-transparent px-2 py-1 text-body outline-none ${
            dark ? "text-white placeholder:text-slate" : "text-ink placeholder:text-slate"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="m-1.5 flex items-center gap-1 rounded-lg bg-teal px-3 py-1.5 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
        >
          {status === "loading" ? "Pensando…" : "Enviar"}
          <SendHorizontal size={16} aria-hidden />
        </button>
      </form>

      <p className={`border-t px-2 py-1 text-[11px] leading-snug ${dark ? "border-slate text-slate" : "border-line text-slate"}`}>
        Respuestas generadas con IA; pueden contener errores. No incluya datos personales ni
        información confidencial. <a href="/legal/uso-de-ia" className="underline">Cómo usamos la IA</a>.
      </p>
    </div>
  )
}
