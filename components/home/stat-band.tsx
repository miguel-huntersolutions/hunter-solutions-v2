import { Layers, Compass, ShieldCheck, Building2 } from "lucide-react"
import { levels, sectors, services, stages } from "@/content"

const ICONS = [Compass, Layers, ShieldCheck, Building2]

export function StatBand() {
  const stats = [
    { value: `${services.length}`, label: "Servicios en catálogo, con rangos a la vista" },
    { value: `${stages.length}`, label: "Etapas con entregables que usted puede objetar" },
    { value: `${levels.length}`, label: "Niveles de inversión publicados, sin IVA" },
    { value: `${sectors.length}`, label: "Sectores atendidos en empresas medianas" },
  ]
  return null
}
