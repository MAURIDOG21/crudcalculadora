// CRUD de gastos + cálculos (total y total por categoría).
import { cargar, guardar } from '../compartido/almacenamiento.js';
import { generarId } from '../compartido/utilidades.js';

const CLAVE = 'gastos.lista';

export const CATEGORIAS = ['Comida', 'Transporte', 'Casa', 'Ocio', 'Salud', 'Otros'];

function validar({ descripcion, monto, categoria }) {
  if (!descripcion.trim()) throw new Error('La descripción es obligatoria');
  if (!(monto > 0)) throw new Error('El monto debe ser mayor a 0');
  if (!CATEGORIAS.includes(categoria)) throw new Error('Categoría no válida');
}

export function obtenerGastos() {                          // READ
  return cargar(CLAVE);
}

export function crearGasto(datos) {                        // CREATE
  validar(datos);
  const gastos = obtenerGastos();
  gastos.push({ id: generarId(), ...datos, descripcion: datos.descripcion.trim() });
  guardar(CLAVE, gastos);
}

export function editarGasto(id, datos) {                   // UPDATE
  validar(datos);
  guardar(CLAVE, obtenerGastos().map((g) => (g.id === id ? { ...g, ...datos } : g)));
}

export function eliminarGasto(id) {                        // DELETE
  guardar(CLAVE, obtenerGastos().filter((g) => g.id !== id));
}

// ---- Cálculos (no modifican datos) ----
export function totalGeneral(gastos = obtenerGastos()) {
  return gastos.reduce((suma, g) => suma + g.monto, 0);
}

export function totalPorCategoria(gastos = obtenerGastos()) {
  return gastos.reduce((acc, g) => {
    acc[g.categoria] = (acc[g.categoria] || 0) + g.monto;
    return acc;
  }, {});
}
