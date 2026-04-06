// src/utils/math.utils.ts

export const parseExpression = (expr: string): string => {
  let parsed = expr;

  parsed = parsed.replace(/π/g, "Math.PI");

  parsed = parsed
    .replace(/sin/g, "Math.sin")
    .replace(/cos/g, "Math.cos")
    .replace(/tan/g, "Math.tan")
    .replace(/√/g, "Math.sqrt")
    .replace(/ln/g, "Math.log")
    .replace(/log/g, "Math.log10")
    .replace(/exp/g, "Math.exp");

  // ⚡ potencias
  parsed = parsed.replace(/\^/g, "**");

  parsed = parsed
    .replace(/(\d)(x)/g, "$1*$2")
    .replace(/(\d)(Math\.)/g, "$1*$2")
    .replace(/(\))(Math\.)/g, "$1*$2")
    .replace(/(\d)\(/g, "$1*(")
    .replace(/(\))(x)/g, "$1*$2");

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

    const test = fn(1);

    if (typeof test !== "number" || isNaN(test)) {
      throw new Error("Resultado inválido");
    }

    return { fn, error: null };

  } catch (error) {
    return { fn: null, error: "Expresión inválida" };
  }
};