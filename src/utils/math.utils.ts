// src/utils/math.utils.ts

export const parseExpression = (expr: string): string => {
  let parsed = expr;

  // 🔢 constantes
  parsed = parsed.replace(/π/g, "Math.PI");

  // 🧠 funciones (orden importante)
  parsed = parsed
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/√/g, "Math.sqrt")
    .replace(/ln/g, "Math.log")       // log natural
    .replace(/log/g, "Math.log10")    // log base 10
    .replace(/exp/g, "Math.exp");

  // ⚡ potencias
  parsed = parsed.replace(/\^/g, "**");

  // 🔥 auto multiplicación (más completo)
  parsed = parsed
    .replace(/(\d)(x)/g, "$1*$2")             // 2x → 2*x
    .replace(/(\d)(Math\.)/g, "$1*$2")        // 2sin → 2*Math.sin
    .replace(/(\))(Math\.)/g, "$1*$2")        // )sin → )*Math.sin
    .replace(/(\d)\(/g, "$1*(")               // 2( → 2*(
    .replace(/(\))(x)/g, "$1*$2");            // )x → )*x

  return parsed;
};

export const evaluateExpression = (
  expr: string
): { fn: ((x: number) => number) | null; error: string | null } => {
  try {
    if (!expr.trim()) {
      return { fn: null, error: "Escribe una función" };
    }

    const parsed = parseExpression(expr);

    const fn = new Function("x", `return ${parsed}`) as (x: number) => number;

    // 🔥 validación real
    const test = fn(1);

    if (typeof test !== "number" || isNaN(test)) {
      throw new Error("Resultado inválido");
    }

    return { fn, error: null };

  } catch (error) {
    return { fn: null, error: "Expresión inválida" };
  }
};