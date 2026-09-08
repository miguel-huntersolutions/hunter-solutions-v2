"use client"

import { useState } from "react"
import { brand } from "@/content/brand"

/** Formulario de postulación al Programa de Aliados (E13-S2): origen "aliados". */
export function PartnerForm() {
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
        body: JSON.stringify({ ...data, origen: "aliados" }),
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      form.reset()
      setStatus("ok")
    } catch {
      setStatus("error")
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-[720px] gap-3 md:grid-cols-2">
      <input
        type="text"
        name="empresa_web"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="partner-nombre" className="text-caption font-semibold text-navy">
          Nombre
        </label>
        <input
          id="partner-nombre"
          name="nombre"
          required
          maxLength={120}
          className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="partner-email" className="text-caption font-semibold text-navy">
          Correo de trabajo
        </label>
        <input
          id="partner-email"
          name="email"
          type="email"
          required
          maxLength={160}
          className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
        />
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label htmlFor="partner-mensaje" className="text-caption font-semibold text-navy">
          Quién es usted y a qué tipo de empresas tiene acceso
        </label>
        <textarea
          id="partner-mensaje"
          name="mensaje"
          required
          rows={3}
          maxLength={1000}
          className="border border-line bg-bg px-2 py-1 text-body text-ink outline-none focus:border-teal"
        />
      </div>

      <div className="flex items-start gap-2 md:col-span-2">
        <input id="partner-consent" name="consentimiento" type="checkbox" required className="mt-1" />
        <label htmlFor="partner-consent" className="text-caption leading-relaxed text-slate">
          Autorizo el tratamiento de mis datos personales por Hunter Solutions Tech para gestionar
          esta postulación, conforme a la Ley 1581 de 2012 y la{" "}
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
          {status === "sending" ? "Enviando…" : "Postularme como aliado"}
        </button>
        <p aria-live="polite" className="text-caption text-slate">
          {status === "ok" && "Recibido. El equipo le escribe para agendar la conversación."}
          {status === "error" &&
            `No pudimos registrar la postulación. Escríbanos a ${brand.email}.`}
        </p>
      </div>
    </form>
  )
}
