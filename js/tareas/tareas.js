// CRUD completo de tareas. Sin HTML aquí: solo datos.
import { cargar, guardar } from '../compartido/almacenamiento.js';
import { generarId } from '../compartido/utilidades.js';

const CLAVE = 'tareas.lista';

export function obtenerTareas() {                 // READ
  return cargar(CLAVE);
}

export function crearTarea(titulo) {              // CREATE
  const texto = titulo.trim();
  if (!texto) throw new Error('El título es obligatorio');
  const tareas = obtenerTareas();
  tareas.push({ id: generarId(), titulo: texto, hecha: false });
  guardar(CLAVE, tareas);
}

export function alternarTarea(id) {               // UPDATE (hecha / pendiente)
  const tareas = obtenerTareas().map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t));
  guardar(CLAVE, tareas);
}

export function editarTarea(id, nuevoTitulo) {    // UPDATE (título)
  const texto = nuevoTitulo.trim();
  if (!texto) throw new Error('El título es obligatorio');
  guardar(CLAVE, obtenerTareas().map((t) => (t.id === id ? { ...t, titulo: texto } : t)));
}

export function eliminarTarea(id) {               // DELETE
  guardar(CLAVE, obtenerTareas().filter((t) => t.id !== id));
}

export function vaciarTareas() {                  // DELETE (todas)
  guardar(CLAVE, []);
}
