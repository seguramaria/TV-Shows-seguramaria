<img src="https://raw.githubusercontent.com/seguramaria/TV-shows-seguramaria/master/src/images/2.png" width="150"/>

# Sherlock TV, buscador de series 🔍🧐
### Desarrollo de una página web con JavaScript Vanilla.
El proyecto consiste en desarrollar una aplicación web de búsqueda de series de TV, que nos permite
des/marcar las series como favoritas y guardarlas en local storage.
También tiene una parte de maquetación con HTML y Sass.

Pasos

1. **Estructura**

   La aplicación de búsqueda de series consta de dos partes:

- Un campo de texto y un botón para buscar series por su título.
- Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.

2. **Búsqueda**

   - Al hacer clic sobre el botón de Buscar, la aplicación se conecta al API abierto de TVMaze para búsqueda de series. Vemos qué datos necesitamos del JSON que devuelve una petición de búsqueda.
   - Para construir la URL de búsqueda hay que recoger el texto que ha introducido el usuario en el campo de búsqueda.
   - Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.
   - Algunas de las series que devuelve el API no tienen imagen. En ese caso hay que mostrar una imagen de relleno.
   - Para pintar la información en la página he elegido manipularde forma avanzada el DOM.

3. **Favoritos**

   Una vez aparecen los resultados de búsqueda, el usuario puede indicar cuáles son nuestras series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:

   - El color de fondo y el de fuente cambian, indicando que es una serie favorita.
   - Se muestra un listado en la parte izquierda de la pantalla con las series favoritas. Creamos una variable de tipo array en JS para almacenar las series favoritas.
   - Las series favoritas siguen apareciendo a la izquierda aunque la usuaria realice otra búsqueda, puede verlas al pinchar en el apartado favoritos.

4. **Almacenamiento local**

   - El listado de favoritos se almacena en el localStorage. De esta forma, al recargar la página el listado de favoritos se muestra.

5. **Borrar favoritos**

   - Al hacer clic sobre el icono de una 'x' al lado de cada favorito, se borra el favorito clicado de la lista y del localStorage.
   - Se puede añadir/quitar como favorito al hacer clic sobre una serie del lado de la derecha. Si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparece ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).
   - Al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.
   
   Enlace a GitHub Pages para ver el resultado: https://seguramaria.github.io/TV-Shows-seguramaria/
