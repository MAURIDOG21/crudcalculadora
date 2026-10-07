// INTERFAZ: conecta el HTML con la lógica. No hace cálculos por sí misma.
import { calcular } from './calculadora.js';
import { obtenerHistorial, agregarAlHistorial, eliminarDelHistorial, limpiarHistorial } from './historial.js';
import { escapar } from '../compartido/utilidades.js';

export function iniciarCalculadora(raiz) {
  raiz.innerHTML = `
    <h2>Calculadora</h2>
    <form>
      <input type="number" step="any" name="a" placeholder="Número 1" required>
      <select name="operador">
        <option>+</option><option>-</option><option>*</option><option>/</option>
      </select>
      <input type="number" step="any" name="b" placeholder="Número 2" required>
      <button>Calcular</button>
    </form>
    <p class="error"></p>
    <h3>Historial <button type="button" id="limpiar">Limpiar</button></h3>
    <ul></ul>`;

  const formulario = raiz.querySelector('form');
  const error = raiz.querySelector('.error');
  const lista = raiz.querySelector('ul');

  function pintar() {
    lista.innerHTML = obtenerHistorial().map((item) => `
      <li>
        <span>${escapar(item.expresion)} = <strong>${item.resultado}</strong></span>
        <button data-id="${item.id}">🗑</button>
      </li>`).join('');
  }

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evita que la página se recargue
    const { a, operador, b } = formulario.elements;
    try {
      const resultado = calcular(Number(a.value), operador.value, Number(b.value));
      agregarAlHistorial(`${a.value} ${operador.value} ${b.value}`, resultado);
      error.textContent = '';
      pintar();
    } catch (e) {
      error.textContent = e.message;
    }
  });

  lista.addEventListener('click', (evento) => {
    const id = evento.target.dataset.id;
    if (id) { eliminarDelHistorial(id); pintar(); }
  });

  raiz.querySelector('#limpiar').addEventListener('click', () => { limpiarHistorial(); pintar(); });

  pintar();
}
