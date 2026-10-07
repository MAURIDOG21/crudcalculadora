// CRUD de contactos + búsqueda.
import { cargar, guardar } from '../compartido/almacenamiento.js';
import { generarId } from '../compartido/utilidades.js';

const CLAVE = 'contactos.lista';

function validar({ nombre, telefono }) {
  if (!nombre.trim()) throw new Error('El nombre es obligatorio');
  if (!/^[\d\s+()-]{7,}$/.test(telefono)) throw new Error('Teléfono no válido (mínimo 7 dígitos)');
}

export function obtenerContactos() {                       // READ
  return cargar(CLAVE);
}

export function buscarContactos(texto) {                   // READ filtrado
  const termino = texto.trim().toLowerCase();
  return obtenerContactos().filter((c) =>
    c.nombre.toLowerCase().includes(termino) || c.telefono.includes(termino));
}

export function crearContacto(datos) {                     // CREATE
  validar(datos);
  const contactos = obtenerContactos();
  contactos.push({ id: generarId(), nombre: datos.nombre.trim(), telefono: datos.telefono.trim(), correo: datos.correo.trim() });
  guardar(CLAVE, contactos);
}

export function editarContacto(id, datos) {                // UPDATE
  validar(datos);
  guardar(CLAVE, obtenerContactos().map((c) => (c.id === id ? { ...c, ...datos } : c)));
}

export function eliminarContacto(id) {                     // DELETE
  guardar(CLAVE, obtenerContactos().filter((c) => c.id !== id));
}
