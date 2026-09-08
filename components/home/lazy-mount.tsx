"use client"

import { useCallback, useState, type ReactNode } from "react"

type LazyMountProps = {
  children: ReactNode
  placeholder: ReactNode
  /** Margen de anticipación: empieza a cargar antes de que la sección entre al viewport. */
  rootMargin?: string
}

/**
 * Renderiza `placeholder` hasta que la sección se acerca al viewport; entonces
 * monta `children`. Difiere el trabajo de las herramientas interactivas pesadas
 * para que no compitan con el render inicial ni con el LCP. Si no hay
 * IntersectionObserver disponible, monta de inmediato (degradación segura).
 *
 * El observer se conecta desde un ref callback (con su función de limpieza, React
 * 19) en vez de un efecto: así el caso sin IntersectionObserver no necesita un
 * setState dentro de useEffect, que dispara renders en cascada.
 */
export function LazyMount({ children, placeholder, rootMargin = "300px" }: LazyMountProps) {
  const [visible, setVisible] = useState(false)

  const attach = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || visible) return
      if (typeof IntersectionObserver === "undefined") {
        setVisible(true)
        return
      }
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setVisible(true)
            io.disconnect()
          }
        },
        { rootMargin },
      )
      io.observe(el)
      return () => io.disconnect()
    },
    [visible, rootMargin],
  )

  return <div ref={attach}>{visible ? children : placeholder}</div>
}
