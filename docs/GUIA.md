# Guía: cómo se construyó y cómo practicar

## 1. Cómo ejecutarlo
Los módulos ES (`import`/`export`) **no funcionan abriendo el .html con doble clic**. Necesitas un servidor local:
- VS Code → extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*, o
- En terminal, dentro de `proyecto-crud/`: `python -m http.server 5500` y abre `http://localhost:5500`.

## 2. Estructura y por qué

```
proyecto-crud/
├─ index.html              ← una sola página, 4 secciones
├─ css/estilos.css
├─ docs/                   ← esta guía y las preguntas
└─ js/
   ├─ main.js              ← arranca los módulos + menú
   ├─ compartido/          ← código que usan todos
   │   ├─ almacenamiento.js   (localStorage: cargar/guardar)
   │   └─ utilidades.js       (generarId, escapar, formatearMoneda)
   ├─ calculadora/
   │   ├─ calculadora.js      (lógica: calcular)
   │   ├─ historial.js        (datos: CRUD del historial)
   │   └─ interfaz.js         (HTML + eventos)
   ├─ tareas/      tareas.js + interfaz.js
   ├─ contactos/   contactos.js + interfaz.js
   └─ gastos/      gastos.js + interfaz.js
```

**Idea clave: separar responsabilidades.**
- `lógica/datos` (ej. `tareas.js`): no sabe que existe el HTML. Se podría probar en consola.
- `interfaz.js`: dibuja y escucha clics; llama a la lógica. No guarda datos directamente.
- `compartido/`: lo que se repetiría en los 4 módulos.

**CRUD** = Create, Read, Update, Delete. Mira los comentarios `// CREATE`, `// READ`... en cada archivo de lógica. Todos siguen el mismo patrón:
1. `obtener…()` lee el arreglo de localStorage.
2. Se transforma con `push`, `map` o `filter` (sin mutar a lo loco).
3. `guardar()` lo escribe de vuelta.
4. La interfaz llama `pintar()` para refrescar la pantalla.

## 3. Pasos pequeños (cada uno = una rama de Git)

Regla: **una rama por paso, un commit por idea, merge a `main` al terminar.**

| Paso | Rama | Qué haces |
|---|---|---|
| 0 | `feature/estructura-base` | Estudia `index.html`, `main.js`, `compartido/`. Arráncalo con Live Server. |
| 1 | `feature/calculadora` | Lee `calculadora.js` → `historial.js` → `interfaz.js` (en ese orden). |
| 2 | `feature/tareas` | Igual: `tareas.js` y luego `interfaz.js`. Identifica C-R-U-D. |
| 3 | `feature/contactos` | Observa cómo se reutiliza el modo "edición" (`idEnEdicion`). |
| 4 | `feature/gastos` | Observa `reduce` en `totalGeneral` y `totalPorCategoria`. |
| 5 | `feature/ejercicios-...` | Tus cambios (sección 5). |

> Nota: el código base ya está escrito. Para practicar ramas, sube cada módulo en su rama:
> haz commit del módulo correspondiente en su propia rama (te dejo el flujo abajo).

## 4. Flujo de Git para practicar

```bash
# estás en main, con el proyecto-crud/ aún sin commitear
git checkout -b feature/estructura-base
git add proyecto-crud/index.html proyecto-crud/css proyecto-crud/js/main.js proyecto-crud/js/compartido proyecto-crud/docs
git commit -m "feat: estructura base del proyecto CRUD"
git checkout main
git merge feature/estructura-base

# repite por módulo, por ejemplo:
git checkout -b feature/calculadora
git add proyecto-crud/js/calculadora
git commit -m "feat: calculadora con historial"
git checkout main && git merge feature/calculadora
```

Comandos para observar: `git status`, `git log --oneline --graph --all`, `git branch`, `git diff`.

Práctica extra: provoca un **conflicto** a propósito: edita la misma línea de `estilos.css` en dos ramas distintas, haz merge de ambas y resuélvelo.

## 5. Ejercicios (cambios que puedes hacer tú)

**Calculadora** (fácil → difícil)
1. Agrega el operador `%` (módulo) en `operaciones`.
2. Agrega potencia `**`.
3. Muestra el último resultado grande sobre el historial.
4. Limita el historial a los últimos 10 cálculos (`slice`).

**Tareas**
1. Agrega un campo `prioridad` (alta/media/baja) y píntala con color.
2. Agrega botones de filtro: todas / pendientes / hechas (`filter`).
3. Muestra un contador "3 de 7 completadas".
4. Reemplaza `prompt()` por edición dentro de la misma lista.

**Contactos**
1. Evita teléfonos duplicados (lanza `Error`).
2. Ordena alfabéticamente (`sort` + `localeCompare`).
3. Agrega campo `favorito` y muéstralos primero.

**Gastos**
1. Agrega filtro por categoría y por mes.
2. Muestra el porcentaje de cada categoría sobre el total.
3. Agrega un presupuesto mensual y avisa si lo superas.
4. Agrega categorías nuevas editando `CATEGORIAS`.

**Reto final:** exporta los datos de cualquier módulo a un archivo JSON descargable.

## 6. Cómo depurar
- F12 → pestaña **Application** → *Local Storage*: ves tus datos reales.
- F12 → **Console**: errores en rojo con archivo y línea.
- Pon `console.log(variable)` dentro de las funciones de lógica.
- Para reiniciar los datos: `localStorage.clear()` en la consola.
