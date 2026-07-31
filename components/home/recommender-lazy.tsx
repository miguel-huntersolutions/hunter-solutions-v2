"use client"

import dynamic from "next/dynamic"
import { LazyMount } from "./lazy-mount"
import { ToolPlaceholder } from "./tool-placeholder"

// Encabezado de la sección (idéntico al de <Recommender>) para conservarlo en el
// HTML inicial y evitar salto de layout al montar el widget.
const RECO_META = {
  id: "recomendador",
  eyebrow: "Recomendador de Nivel",
  title: "Tres respuestas y le decimos por dónde empezar",
  intro:
    "El asistente interpreta su caso, pero el resultado sale siempre del catálogo publicado: nivel, rango y servicios reales.",
} as const

const Recommender = dynamic(() => import("./recommender").then((m) => m.Recommender), {
  ssr: false,
  loading: () => <ToolPlaceholder {...RECO_META} state="loading" />,
})

export function RecommenderLazy() {
  return (
    <LazyMount placeholder={<ToolPlaceholder {...RECO_META} state="idle" />}>
      <Recommender />
    </LazyMount>
  )
}
