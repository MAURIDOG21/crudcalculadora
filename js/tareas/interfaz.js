import { obtenerTareas, crearTarea, alternarTarea, editarTarea, eliminarTarea, vaciarTareas } from './tareas.js';
import { escapar } from '../compartido/utilidades.js';

export function iniciarTareas(raiz) {
  raiz.innerHTML = `
    <h2>Lista de tareas</h2>
    <form novalidate>
      <input name="titulo" placeholder="Nueva tarea" required>
      <button>Subir</button>
      <button type="button" id="vaciar">Vaciar</button>
    </form>
    <p class="error"></p>
    <ul></ul>`;

  const formulario = raiz.querySelector('form');
  const error = raiz.querySelector('.error');
  const lista = raiz.querySelector('ul');

  function pintar() {
    lista.innerHTML = obtenerTareas().map((t) => `
      <li class="${t.hecha ? 'hecha' : ''}">
        <span>
          <input type="checkbox" data-accion="alternar" data-id="${t.id}" ${t.hecha ? 'checked' : ''}>
          ${escapar(t.titulo)}
        </span>
        <span>
          <button data-accion="editar" data-id="${t.id}">✏️</button>
          <button data-accion="eliminar" data-id="${t.id}">🗑</button>
        </span>
      </li>`).join('');
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    try {
      crearTarea(formulario.elements.titulo.value);
      formulario.reset();
      error.textContent = '';
      pintar();
    } catch (e) {
      error.textContent = e.message;
    }
  });

  raiz.querySelector('#vaciar').addEventListener('click', () => {
    if (obtenerTareas().length === 0) return;
    if (confirm('¿Eliminar todas las tareas?')) {
      vaciarTareas();
      error.textContent = '';
      pintar();
    }
  });

  // Un solo listener para toda la lista ("delegación de eventos").
  lista.addEventListener('click', (evento) => {
    const { accion, id } = evento.target.dataset;
    if (!accion) return;
    if (accion === 'alternar') alternarTarea(id);
    if (accion === 'eliminar') eliminarTarea(id);
    if (accion === 'editar') {
      const actual = obtenerTareas().find((t) => t.id === id);
      const nuevo = prompt('Editar tarea:', actual.titulo);
      if (nuevo !== null) {
        try {
          editarTarea(id, nuevo);
          error.textContent = '';
        } catch (e) {
          error.textContent = e.message;
        }
      }
    }
    pintar();
  });

  pintar();
}
