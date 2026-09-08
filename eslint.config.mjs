import coreWebVitals from "eslint-config-next/core-web-vitals"
import typescript from "eslint-config-next/typescript"

// Configuración plana de ESLint. Junto con el `tsc` que ahora corre en el build
// (ya no hay `typescript.ignoreBuildErrors`), es la única red de análisis
// estático del proyecto: si esto pasa, el despliegue es seguro de compilar.
const config = [
  { ignores: [".next/**", "node_modules/**", "public/**"] },
  ...coreWebVitals,
  ...typescript,
]

export default config
