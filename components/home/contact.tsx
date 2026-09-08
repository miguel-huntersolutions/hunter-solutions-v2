"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { brand, whatsappUrl } from "@/content/brand"
import { faqs } from "@/content/narrative"
import { Section } from "@/components/ui/section"

const WHATSAPP_URL = whatsappUrl("Hola, quiero agendar un diagnóstico de 30 minutos")

// Las dos preguntas que aparecen junto al formulario salen del mismo content
// model que alimenta /preguntas y el corpus de los agentes. No se duplican aquí.
const PREGUNTAS_CLAVE = ["¿Garantizan el retorno de la inversión?", "¿Qué pasa con nuestros datos y nuestra información?"]
const faqsDelFormulario = PREGUNTAS_CLAVE.map((p) => faqs.find((f) => f.pregunta === p)).filter(
  (f): f is NonNullable<typeof f> => Boolean(f),
)

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus("sending")
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, origen: "home" }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      form.reset()
      setStatus("ok")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Section
      id="contacto"
      eyebrow="Hablemos"
      title="Agende una sesión de diagnóstico de 30 minutos, sin costo."
      intro="Salimos con dos o tres oportunidades concretas y por dónde empezar."
      tone="white"
    >
      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {/* Honeypot: los humanos no ven este campo */}
          <input
            type="text"
            name="empresa_web"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="lead-nombre" className="text-caption font-semibold text-navy">
              Nombre
            </label>
            <input
              id="lead-nombre"
              name="nombre"
              required
              maxLength={120}
              className="border border-line bg-bg px-2 py-2 text-body text-ink outline-none focus:border-teal"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lead-email" className="text-caption font-semibold text-navy">
              Correo de trabajo
            </label>
            <input
              id="lead-email"
              name="email"
              type="email"
              required
              maxLength={160}
              className="border border-line bg-bg px-2 py-2 text-body text-ink outline-none focus:border-teal"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lead-reto" className="text-caption font-semibold text-navy">
              ¿Cuál es el reto?
            </label>
            <textarea
              id="lead-reto"
              name="reto"
              required
              rows={4}
              maxLength={1000}
              placeholder="Cuéntenos en dos líneas qué se le está quedando sin hacer o dónde se le está perdiendo plata."
              className="border border-line bg-bg px-2 py-2 text-body text-ink outline-none placeholder:text-slate focus:border-teal"
            />
          </div>

          <div className="flex items-start gap-2">
            <input id="lead-consent" name="consentimiento" type="checkbox" required className="mt-1" />
            <label htmlFor="lead-consent" className="text-caption leading-relaxed text-slate">
              Autorizo el tratamiento de mis datos personales por Hunter Solutions Tech para responder
              esta solicitud, conforme a la Ley 1581 de 2012 y la{" "}
              <a href="/privacidad" className="underline">
                política de privacidad
              </a>
              .
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-[48px] items-center bg-navy px-5 py-3 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Solicitar la sesión"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center gap-2 border border-teal px-5 py-3 text-caption font-semibold uppercase tracking-wide text-teal-dark transition-colors hover:bg-teal hover:text-white"
            >
              <MessageCircle size={16} aria-hidden />
              Escríbanos por WhatsApp
            </a>
          </div>

          <p aria-live="polite" className="text-caption text-slate">
            {status === "ok" && "Listo. Le escribimos en menos de un día hábil para agendar."}
            {status === "error" &&
              `No pudimos registrar la solicitud. Escríbanos directamente a ${brand.email}.`}
          </p>
        </form>

        <div className="flex flex-col gap-5">
          {faqsDelFormulario.map((f) => (
            <div key={f.pregunta} className="flex flex-col gap-1">
              <p className="text-body font-bold text-navy">{f.pregunta}</p>
              <p className="text-body leading-relaxed text-slate">{f.respuesta}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
