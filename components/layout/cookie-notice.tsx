"use client"

import { useEffect, useState } from "react"

const STORAGE_KEY = "hst-cookie-notice-v1"

export function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // Si localStorage no está disponible, no mostramos el aviso repetidamente.
    }
  }, [])

  function acknowledge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      // noop
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Aviso de privacidad"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-navy px-4 py-3 text-white"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p className="text-caption leading-relaxed">
          Este sitio usa analítica anónima de Vercel (sin cookies de seguimiento) para entender el
          uso de la página. Los datos que envíes en formularios o a los agentes se tratan según la{" "}
          <a href="/privacidad" className="underline">
            política de privacidad
          </a>{" "}
          (Ley 1581 de 2012).
        </p>
        <button
          type="button"
          onClick={acknowledge}
          className="shrink-0 border border-white px-4 py-1.5 text-caption font-semibold uppercase tracking-wide text-white hover:bg-white hover:text-navy"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}
