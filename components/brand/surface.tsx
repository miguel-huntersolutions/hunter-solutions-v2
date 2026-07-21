"use client"

import { createContext, useContext, type ReactNode } from "react"

type SurfaceTone = "dark" | "light"

const SurfaceContext = createContext<SurfaceTone>("light")

export function SurfaceProvider({
  tone,
  children,
}: {
  tone: SurfaceTone
  children: ReactNode
}) {
  return <SurfaceContext.Provider value={tone}>{children}</SurfaceContext.Provider>
}

export function useSurfaceTone(): SurfaceTone {
  return useContext(SurfaceContext)
}
