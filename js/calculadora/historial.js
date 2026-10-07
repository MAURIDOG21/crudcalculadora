// CRUD del historial: Crear, Leer, Eliminar (un cálculo no se "edita").
import { cargar, guardar } from '../compartido/almacenamiento.js';
import { generarId } from '../compartido/utilidades.js';

const CLAVE = 'calculadora.historial';

export function obtenerHistorial() {            // READ
  return cargar(CLAVE);
}

export function agregarAlHistorial(expresion, resultado) {   // CREATE
  const historial = obtenerHistorial();
  historial.unshift({ id: generarId(), expresion, resultado }); // unshift = al inicio
  guardar(CLAVE, historial);
}

export function eliminarDelHistorial(id) {      // DELETE
  guardar(CLAVE, obtenerHistorial().filter((item) => item.id !== id));
}

export function limpiarHistorial() {            // DELETE (todo)
  guardar(CLAVE, []);
}
