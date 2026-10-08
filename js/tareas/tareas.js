// CRUD completo de tareas. Sin HTML aquí: solo datos.
import { cargar, guardar } from '../compartido/almacenamiento.js';
import { generarId } from '../compartido/utilidades.js';

const CLAVE = 'tareas.lista';

// Regla única de validación: devuelve el título limpio o lanza un Error.
function validarTitulo(titulo) {
  const texto = titulo.trim(); // quita espacios al inicio y al final
  if (!texto) throw new Error('El título no puede estar vacío');
  return texto;
}

export function obtenerTareas() {                 // READ
  return cargar(CLAVE);
}

export function crearTarea(titulo) {              // CREATE
  const texto = validarTitulo(titulo);
  const tareas = obtenerTareas();
  tareas.push({ id: generarId(), titulo: texto, hecha: false });
  guardar(CLAVE, tareas);
}

export function alternarTarea(id) {               // UPDATE (hecha / pendiente)
  const tareas = obtenerTareas().map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t));
  guardar(CLAVE, tareas);
}

export function editarTarea(id, nuevoTitulo) {    // UPDATE (título)
  const texto = validarTitulo(nuevoTitulo);
  guardar(CLAVE, obtenerTareas().map((t) => (t.id === id ? { ...t, titulo: texto } : t)));
}

export function eliminarTarea(id) {               // DELETE
  guardar(CLAVE, obtenerTareas().filter((t) => t.id !== id));
}

export function vaciarTareas() {                  // DELETE (todas)
  guardar(CLAVE, []);
}
