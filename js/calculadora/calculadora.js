// LÓGICA pura: no toca el HTML. Recibe datos, devuelve resultados.

const operaciones = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => {
    if (b === 0) throw new Error('No se puede dividir entre 0');
    return a / b;
  },
};

export function calcular(a, operador, b) {
  const operacion = operaciones[operador];
  if (!operacion) throw new Error('Operador no válido');
  return operacion(a, b);
}
