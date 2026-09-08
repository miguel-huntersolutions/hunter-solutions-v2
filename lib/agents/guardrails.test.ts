import { describe, expect, it } from "vitest"
import { levels } from "@/content"
import { stripMarkdown, validateAgentOutput } from "./guardrails"

/**
 * Estos tests fijan el comportamiento ACTUAL del guardrail de salida, no el
 * deseado. Sirven de red ante regresiones: si alguien toca los patrones, aquí
 * se ve qué deja de cubrir.
 *
 * El bloque "huecos conocidos" del final documenta casos que HOY pasan y no
 * deberían. Están escritos como expectativas para que, el día que se endurezcan
 * los patrones, el test falle y obligue a decidir conscientemente — no son
 * comportamiento aprobado.
 */

const tipos = (texto: string) => validateAgentOutput(texto).map((v) => v.tipo)

describe("validateAgentOutput · importes", () => {
  it("acepta los bordes de los rangos publicados", () => {
    // El conjunto permitido se deriva de levels: 1, 10, 50 y 200 millones.
    const bordes = levels.flatMap((l) => [l.rangoMin, l.rangoMax] as const)
    expect(new Set(bordes.map((v) => v / 1_000_000))).toEqual(new Set([1, 10, 50, 200]))

    expect(tipos("El nivel 1 va de $1 millón a $10 millones.")).toEqual([])
    expect(tipos("El nivel 3 arranca desde $50 millones.")).toEqual([])
  })

  it("bloquea un importe en millones que no es un borde publicado", () => {
    expect(tipos("Ese proyecto le costaría unos $17 millones.")).toEqual(["importe_no_publicado"])
    expect(tipos("Rondaría los 17 millones de pesos.")).toEqual(["importe_no_publicado"])
  })

  it("bloquea un importe escrito con separadores de miles y símbolo", () => {
    expect(tipos("Serían aproximadamente $17.500.000 COP.")).toEqual(["importe_no_publicado"])
  })

  it("acumula una violación por cada importe fuera de rango", () => {
    expect(tipos("Entre $17 millones y $23 millones.")).toEqual([
      "importe_no_publicado",
      "importe_no_publicado",
    ])
  })
})

describe("validateAgentOutput · promesas de resultado", () => {
  it("bloquea las formas explícitas de garantía", () => {
    expect(tipos("Le garantizamos un retorno del 40%.")).toEqual(["garantia_de_resultado"])
    expect(tipos("Es un retorno garantizado.")).toEqual(["garantia_de_resultado"])
    expect(tipos("Ofrecemos garantía de resultado.")).toEqual(["garantia_de_resultado"])
  })
})

describe("validateAgentOutput · datos sensibles", () => {
  it("bloquea las peticiones de datos sensibles", () => {
    expect(tipos("Envíe su número de tarjeta de crédito para continuar.")).toContain(
      "solicitud_datos_sensibles",
    )
    expect(tipos("Necesito su número de cédula.")).toContain("solicitud_datos_sensibles")
  })

  it("no se dispara si solo se nombra el dato, sin pedirlo", () => {
    expect(tipos("Nunca le pediremos su contraseña por este canal.")).toEqual([])
  })
})

describe("validateAgentOutput · respuestas limpias", () => {
  it("deja pasar una respuesta que no toca ninguna regla", () => {
    expect(
      tipos(
        "El punto de partida natural es el Diagnóstico de Oportunidades con IA. " +
          "Si quiere una lectura seria de su caso, agende la sesión de 30 minutos sin costo.",
      ),
    ).toEqual([])
  })
})

describe("validateAgentOutput · expresión retirada", () => {
  it("bloquea \"nómina digital\" en cualquier grafía", () => {
    expect(tipos("Le construimos su nómina digital.")).toEqual(["expresion_retirada"])
    expect(tipos("Trabajamos con NOMINA DIGITAL desde el día uno.")).toEqual(["expresion_retirada"])
  })

  it("no confunde el nombre vigente de la oferta", () => {
    expect(tipos("Le construimos una Fuerza Laboral Digital.")).toEqual([])
  })
})

describe("validateAgentOutput · cierre fijo del Agente de Diagnóstico", () => {
  // El rol obliga a terminar cada respuesta con esta frase literal. Si los
  // patrones de importe o de garantía la marcaran, el agente entraría en el
  // reintento correctivo en TODAS sus respuestas y acabaría en SAFE_FALLBACK.
  const CIERRE =
    "Si quiere que lo revisemos con su caso real, agende 30 minutos sin costo en la sección Hablemos de esta página."

  it("no dispara ninguna violación por sí solo", () => {
    expect(tipos(CIERRE)).toEqual([])
  })

  it("tampoco dentro de una respuesta completa con capacidad, nivel y rango", () => {
    const respuesta = [
      "Su cartera se está quedando sin quien la persiga, que es un problema de proceso, no de personas.",
      "La capacidad que aplica es un Agente de Cobranza.",
      "El servicio es Automatización de un proceso documental, en el Nivel 2 · Implementa: $10.000.000 COP a $50.000.000 COP, sin IVA.",
      CIERRE,
    ].join(" ")
    expect(tipos(respuesta)).toEqual([])
  })
})

describe("validateAgentOutput · huecos conocidos", () => {
  // Documentados, NO aprobados: si un cambio futuro los cierra, estos tests
  // fallan y hay que actualizarlos a propósito.

  it("no detecta importes abreviados con M", () => {
    expect(tipos("El rango sería de COP 20M.")).toEqual([])
  })

  it("no detecta importes escritos con letra", () => {
    expect(tipos("Estamos hablando de veinte millones de pesos.")).toEqual([])
  })

  it("no detecta importes con separadores pero sin símbolo de moneda", () => {
    expect(tipos("El valor aproximado es 20.000.000 de pesos.")).toEqual([])
  })

  it("no detecta promesas de resultado dichas con otro verbo", () => {
    expect(tipos("Nuestra metodología asegura que obtendrá el retorno esperado.")).toEqual([])
  })
})

describe("stripMarkdown", () => {
  it("quita negritas con asteriscos y con guiones bajos", () => {
    expect(stripMarkdown("Es **muy** claro y __directo__.")).toBe("Es muy claro y directo.")
  })

  it("quita los encabezados", () => {
    expect(stripMarkdown("## Servicios\nTexto")).toBe("Servicios\nTexto")
  })

  it("convierte las viñetas en punto medio", () => {
    expect(stripMarkdown("- uno\n* dos")).toBe("· uno\n· dos")
  })

  it("no altera un texto que ya viene en plano", () => {
    const plano = "Agende la sesión de diagnóstico de 30 minutos sin costo."
    expect(stripMarkdown(plano)).toBe(plano)
  })
})
