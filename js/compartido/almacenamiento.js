// Guarda y lee datos del navegador (localStorage) como JSON.
// Todos los módulos lo usan, así el código no se repite.

export function cargar(clave, valorPorDefecto = []) {
  try {
    const texto = localStorage.getItem(clave);
    return texto ? JSON.parse(texto) : valorPorDefecto;
  } catch {
    return valorPorDefecto; // si el JSON está dañado, empezamos limpio
  }
}

export function guardar(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}
