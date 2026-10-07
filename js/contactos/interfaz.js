import { obtenerContactos, buscarContactos, crearContacto, editarContacto, eliminarContacto } from './contactos.js';
import { escapar } from '../compartido/utilidades.js';

export function iniciarContactos(raiz) {
  raiz.innerHTML = `
    <h2>Agenda de contactos</h2>
    <form>
      <input name="nombre" placeholder="Nombre" required>
      <input name="telefono" placeholder="Teléfono" required>
      <input name="correo" type="email" placeholder="Correo (opcional)">
      <button>Guardar</button>
      <button type="button" id="cancelar" hidden>Cancelar edición</button>
    </form>
    <p class="error"></p>
    <input id="buscador" placeholder="🔎 Buscar por nombre o teléfono">
    <ul></ul>`;

  const formulario = raiz.querySelector('form');
  const error = raiz.querySelector('.error');
  const lista = raiz.querySelector('ul');
  const buscador = raiz.querySelector('#buscador');
  const cancelar = raiz.querySelector('#cancelar');
  let idEnEdicion = null; // null = estamos creando; con valor = estamos editando

  function pintar() {
    const contactos = buscador.value ? buscarContactos(buscador.value) : obtenerContactos();
    lista.innerHTML = contactos.map((c) => `
      <li>
        <span><strong>${escapar(c.nombre)}</strong> · ${escapar(c.telefono)} ${c.correo ? '· ' + escapar(c.correo) : ''}</span>
        <span>
          <button data-accion="editar" data-id="${c.id}">✏️</button>
          <button data-accion="eliminar" data-id="${c.id}">🗑</button>
        </span>
      </li>`).join('') || '<li>Sin contactos</li>';
  }

  function salirDeEdicion() {
    idEnEdicion = null;
    formulario.reset();
    cancelar.hidden = true;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(formulario)); // {nombre, telefono, correo}
    try {
      if (idEnEdicion) editarContacto(idEnEdicion, datos);
      else crearContacto(datos);
      salirDeEdicion();
      error.textContent = '';
      pintar();
    } catch (e) {
      error.textContent = e.message;
    }
  });

  lista.addEventListener('click', (evento) => {
    const { accion, id } = evento.target.dataset;
    if (accion === 'eliminar') { eliminarContacto(id); pintar(); }
    if (accion === 'editar') {
      const c = obtenerContactos().find((x) => x.id === id);
      formulario.nombre.value = c.nombre;
      formulario.telefono.value = c.telefono;
      formulario.correo.value = c.correo;
      idEnEdicion = id;
      cancelar.hidden = false;
    }
  });

  buscador.addEventListener('input', pintar);
  cancelar.addEventListener('click', salirDeEdicion);

  pintar();
}
