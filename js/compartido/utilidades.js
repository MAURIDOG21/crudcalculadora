// Funciones pequeñas que usan varios módulos.

// Identificador único para cada registro (necesario para editar/eliminar).
export function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Evita que texto escrito por el usuario se interprete como HTML (seguridad básica).
export function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Formatea un número como moneda mexicana.
export function formatearMoneda(numero) {
  return numero.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
}
