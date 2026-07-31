"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

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
 */
export function LazyMount({ children, placeholder, rootMargin = "300px" }: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
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
  }, [visible, rootMargin])

  return <div ref={ref}>{visible ? children : placeholder}</div>
}
