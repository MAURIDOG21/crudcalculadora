import { CATEGORIAS, obtenerGastos, crearGasto, editarGasto, eliminarGasto, totalGeneral, totalPorCategoria } from './gastos.js';
import { escapar, formatearMoneda } from '../compartido/utilidades.js';

export function iniciarGastos(raiz) {
  raiz.innerHTML = `
    <h2>Control de gastos</h2>
    <form>
      <input name="descripcion" placeholder="Descripción" required>
      <input name="monto" type="number" step="0.01" min="0" placeholder="Monto" required>
      <select name="categoria">${CATEGORIAS.map((c) => `<option>${c}</option>`).join('')}</select>
      <input name="fecha" type="date" required>
      <button>Guardar</button>
      <button type="button" id="cancelar" hidden>Cancelar edición</button>
    </form>
    <p class="error"></p>
    <p class="total"></p>
    <div id="resumen"></div>
    <ul></ul>`;

  const formulario = raiz.querySelector('form');
  const error = raiz.querySelector('.error');
  const lista = raiz.querySelector('ul');
  const total = raiz.querySelector('.total');
  const resumen = raiz.querySelector('#resumen');
  const cancelar = raiz.querySelector('#cancelar');
  let idEnEdicion = null;

  function pintar() {
    const gastos = obtenerGastos();
    total.textContent = `Total: ${formatearMoneda(totalGeneral(gastos))}`;
    resumen.innerHTML = Object.entries(totalPorCategoria(gastos))
      .map(([cat, suma]) => `<span>${cat}: ${formatearMoneda(suma)}</span>`).join(' · ');
    lista.innerHTML = gastos.map((g) => `
      <li>
        <span>${escapar(g.fecha)} · ${escapar(g.descripcion)} (${g.categoria}) — <strong>${formatearMoneda(g.monto)}</strong></span>
        <span>
          <button data-accion="editar" data-id="${g.id}">✏️</button>
          <button data-accion="eliminar" data-id="${g.id}">🗑</button>
        </span>
      </li>`).join('') || '<li>Sin gastos</li>';
  }

  function salirDeEdicion() {
    idEnEdicion = null;
    formulario.reset();
    cancelar.hidden = true;
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const datos = Object.fromEntries(new FormData(formulario));
    datos.monto = Number(datos.monto); // los inputs siempre devuelven texto
    try {
      if (idEnEdicion) editarGasto(idEnEdicion, datos);
      else crearGasto(datos);
      salirDeEdicion();
      error.textContent = '';
      pintar();
    } catch (e) {
      error.textContent = e.message;
    }
  });

  lista.addEventListener('click', (evento) => {
    const { accion, id } = evento.target.dataset;
    if (accion === 'eliminar') { eliminarGasto(id); pintar(); }
    if (accion === 'editar') {
      const g = obtenerGastos().find((x) => x.id === id);
      Object.keys(g).forEach((campo) => { if (formulario.elements[campo]) formulario.elements[campo].value = g[campo]; });
      idEnEdicion = id;
      cancelar.hidden = false;
    }
  });

  cancelar.addEventListener('click', salirDeEdicion);

  pintar();
}
