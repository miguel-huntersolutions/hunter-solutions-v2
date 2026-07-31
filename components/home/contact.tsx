"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Section } from "@/components/ui/section"

const SECTORS = ["Legal", "Manufactura", "Salud", "Alimentos", "Consumo", "Otro"] as const

// WhatsApp de contacto (+57 304 391 3066) con un mensaje inicial prellenado.
const WHATSAPP_URL =
  "https://wa.me/573043913066?text=" +
  encodeURIComponent("Hola, quiero agendar una sesión de diagnóstico de 30 minutos.")

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
        body: JSON.stringify(data),
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
      title="Agende una sesión de diagnóstico de 30 minutos, sin costo"
      intro="Cuéntenos su reto y coordinamos la sesión. También puede empezar ahora mismo con el Agente de Diagnóstico, sin dejar sus datos."
      tone="white"
    >
      <form onSubmit={onSubmit} className="grid max-w-[720px] gap-3 md:grid-cols-2">
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
            className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
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
            className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lead-sector" className="text-caption font-semibold text-navy">
            Sector
          </label>
          <select
            id="lead-sector"
            name="sector"
            required
            className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
          >
            {SECTORS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label htmlFor="lead-reto" className="text-caption font-semibold text-navy">
            Cuéntenos su reto en una o dos frases
          </label>
          <textarea
            id="lead-reto"
            name="reto"
            required
            rows={3}
            maxLength={1000}
            className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
          />
        </div>

        <div className="flex items-start gap-2 md:col-span-2">
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

        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-navy px-3 py-1 text-caption font-semibold uppercase tracking-wide text-white transition-colors hover:bg-teal disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Solicitar la sesión"}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-teal px-3 py-1 text-caption font-semibold uppercase tracking-wide text-teal-dark transition-colors hover:bg-teal hover:text-white"
          >
            <MessageCircle size={16} aria-hidden />
            Escríbanos por WhatsApp
          </a>
          <p aria-live="polite" className="text-caption text-slate">
            {status === "ok" && "Recibido. El equipo le escribe para coordinar la sesión."}
            {status === "error" &&
              "No pudimos registrar la solicitud. Escríbanos directamente a hola@huntersolutions.tech."}
          </p>
        </div>
      </form>
    </Section>
  )
}
