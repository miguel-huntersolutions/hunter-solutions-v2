export function HeroHeadline() {
  return (
    <h1 className="text-h1 font-extrabold leading-[1.08] tracking-tight text-balance md:text-display">
      {/* Encabezado comercial para SEO y lectores de pantalla: agentes de IA + fuerza laboral digital + Colombia */}
      <span className="sr-only">
        Agentes de IA y Fuerza Laboral Digital para empresas en Colombia.
      </span>
      <span aria-hidden className="hero-line block" style={{ animationDelay: "0.05s" }}>
        Contrate una <span className="hero-highlight">Fuerza Laboral Digital</span>.
      </span>
      <span aria-hidden className="hero-line block text-line" style={{ animationDelay: "0.35s" }}>
        No lea sobre ella: pruébela.
      </span>
    </h1>
  )
}
