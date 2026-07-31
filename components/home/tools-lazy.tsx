"use client"

import dynamic from "next/dynamic"
import { LazyMount } from "./lazy-mount"
import { ToolPlaceholder } from "./tool-placeholder"

// Encabezado de la sección (idéntico al de <Tools>) para conservarlo en el HTML
// inicial y evitar salto de layout al montar las herramientas jugables.
const TOOLS_META = {
  id: "herramientas",
  eyebrow: "Herramientas jugables",
  title: "Valor primero, conversación después",
  intro:
    "Tres herramientas gratuitas con resultado completo en pantalla. Sin registro, sin dejar el correo, sin salir de la página.",
  tone: "white" as const,
}

const Tools = dynamic(() => import("./tools").then((m) => m.Tools), {
  ssr: false,
  loading: () => <ToolPlaceholder {...TOOLS_META} state="loading" />,
})

export function ToolsLazy() {
  return (
    <LazyMount placeholder={<ToolPlaceholder {...TOOLS_META} state="idle" />}>
      <Tools />
    </LazyMount>
  )
}
