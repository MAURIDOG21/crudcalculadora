// Punto de entrada: arranca cada módulo y maneja el menú de pestañas.
import { iniciarCalculadora } from './calculadora/interfaz.js';
import { iniciarTareas } from './tareas/interfaz.js';
import { iniciarContactos } from './contactos/interfaz.js';
import { iniciarGastos } from './gastos/interfaz.js';

iniciarCalculadora(document.getElementById('calculadora'));
iniciarTareas(document.getElementById('tareas'));
iniciarContactos(document.getElementById('contactos'));
iniciarGastos(document.getElementById('gastos'));

const botones = document.querySelectorAll('#menu button');
const secciones = document.querySelectorAll('main section');

botones.forEach((boton) => {
  boton.addEventListener('click', () => {
    botones.forEach((b) => b.classList.toggle('activo', b === boton));
    secciones.forEach((s) => { s.hidden = s.id !== boton.dataset.seccion; });
  });
});
