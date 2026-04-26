from sympy import symbols, simplify
from sympy.parsing.sympy_parser import parse_expr


def comparar_funciones(funcion_correcta, respuesta_usuario):
    try:
        x = symbols("x")

        # limpiar formato
        f1 = funcion_correcta.replace("y =", "").replace("y=", "").strip()
        f2 = respuesta_usuario.replace("y =", "").replace("y=", "").strip()

        expr1 = parse_expr(f1)
        expr2 = parse_expr(f2)

        diferencia = simplify(expr1 - expr2)

        return diferencia == 0

    except Exception as e:
        print("ERROR SYMPY:", e)
        return False