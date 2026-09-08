"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "hst-cookie-notice-v1"

// localStorage es un store externo: se lee con useSyncExternalStore en vez de
// sincronizarlo a estado desde un efecto (que provoca renders en cascada).
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Si localStorage no está disponible tratamos el aviso como ya visto, para no
 * mostrarlo en bucle a quien tenga el almacenamiento bloqueado. */
function isAcknowledged(): boolean {
  try {
    return Boolean(window.localStorage.getItem(STORAGE_KEY))
  } catch {
    return true
  }
}

/** En el servidor no hay localStorage: el aviso no se pinta en el HTML y aparece
 * tras la hidratación, sin desajuste. */
function isAcknowledgedOnServer(): boolean {
  return true
}

export function CookieNotice() {
  const acknowledged = useSyncExternalStore(subscribe, isAcknowledged, isAcknowledgedOnServer)

  function acknowledge() {
    try {
      window.localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      // noop
    }
    for (const listener of listeners) listener()
  }

  if (acknowledged) return null

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
