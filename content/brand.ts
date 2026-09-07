import type { Brand, Claim } from "./types"

// TODO negocio: confirmar URLs de redes definitivas.
export const brand: Brand = {
  legalName: "Hunter Solutions Tech",
  shortName: "Hunter Solutions Tech",
  descriptorCopy: "TECH | AI-NATIVE",
  domain: "https://www.huntersolutions.tech",
  email: "hola@huntersolutions.tech",
  whatsapp: "+573043913066",
  socials: [
    { red: "LinkedIn", url: "https://www.linkedin.com/company/hunter-solutions-tech" },
    { red: "Instagram", url: "https://www.instagram.com/huntersolutions.tech" },
    { red: "TikTok", url: "https://www.tiktok.com/@huntersolutions.tech" },
  ],
}

// Todo claim numérico publicado lleva encuadre y fuente. Sin ellos, el build falla.
export const claims: Record<string, Claim> = {
  hojasDeVidaMes: {
    valor: "cientos",
    encuadre:
      "El equipo ha construido sistemas que procesan cientos de hojas de vida al mes, integrados a los sistemas de recursos humanos del cliente.",
    fuente: "HST_Oferta_Cliente_Definitiva.docx — sección de experiencia",
    vigencia: "2026",
  },
  sesionDiagnostico: {
    valor: 30,
    encuadre:
      "La sesión de diagnóstico con el equipo dura 30 minutos y no tiene costo.",
    fuente: "HST_Oferta_Cliente_Definitiva.docx — cierre comercial",
    vigencia: "2026",
  },
  pruebaEnSegundos: {
    valor: 10,
    encuadre:
      "Cualquier visitante puede probar la IA de HST en la página en unos 10 segundos, sin registrarse.",
    fuente: "SDD v3 — principio 5: prueba primero, promesa después",
    vigencia: "2026",
  },
}
