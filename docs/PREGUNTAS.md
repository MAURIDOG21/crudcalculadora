# Preguntas para comprobar que entiendes

Respóndeme en el chat (con tus palabras, aunque no sean perfectas) y te corrijo.

## A. Conceptos generales
1. ¿Qué significan las siglas CRUD? Da un ejemplo de cada letra en la app de tareas.
2. ¿Por qué separamos `tareas.js` de `interfaz.js`? ¿Qué ventaja tiene?
3. ¿Qué hace `export` y qué hace `import`? ¿Por qué `index.html` usa `type="module"`?
4. ¿Para qué sirve `localStorage` y qué pasa con los datos si cierras el navegador? ¿Y si lo abres en otro navegador?
5. ¿Por qué `localStorage` solo guarda texto y qué hacen `JSON.stringify` y `JSON.parse`?

## B. Código
6. En `eliminarTarea`, ¿por qué se usa `filter` y no `splice`? ¿Qué devuelve `filter`?
7. En `alternarTarea`, ¿qué hace `{ ...t, hecha: !t.hecha }`?
8. ¿Para qué sirve `evento.preventDefault()` en un formulario?
9. ¿Qué es la "delegación de eventos"? ¿Por qué en `tareas/interfaz.js` hay un solo listener en el `<ul>` y no uno por botón?
10. En `calculadora.js`, ¿qué ventaja tiene el objeto `operaciones` frente a un `switch`?
11. En `gastos.js`, explica paso a paso qué hace `totalPorCategoria` con `reduce`.
12. ¿Por qué se convierte `datos.monto = Number(...)` antes de guardar?
13. ¿Para qué sirve `generarId()`? ¿Qué pasaría si usáramos el índice del arreglo como identificador?
14. ¿Para qué sirve `escapar()`? ¿Qué podría pasar si un contacto se llama `<img src=x onerror=alert(1)>` y no la usáramos?

## C. Git y ramas
15. ¿Qué diferencia hay entre `git add`, `git commit` y `git merge`?
16. ¿Por qué trabajar en `feature/tareas` y no directamente en `main`?
17. ¿Qué es un conflicto de merge y cómo lo reconoces en un archivo?
18. ¿Qué te muestra `git log --oneline --graph --all`?

## D. Predice el resultado
19. Si `b` vale `0` y el operador es `/`, ¿qué ocurre desde que haces clic en *Calcular* hasta que ves el mensaje? (nombra los archivos por los que pasa)
20. Si agrego el campo `prioridad` a las tareas, ¿qué archivos tendría que tocar y cuáles no?
