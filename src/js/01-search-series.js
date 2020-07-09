'use strict';
// Creamos una variable con un array vacío

let series = [];

// Declaramos la función para la búsqueda de series
function searchTVSeries() {
  let search = document.querySelector('.js-search').value;

  // Hacemos la interpolación de cadenas en la url de la api. Hay que tener cuidado con la búsqueda. Es search, no singlesearch.

  const URL = `http://api.tvmaze.com/search/shows?q=${search}`;
  console.log(URL);

  fetch(URL)
    .then((response) => response.json())
    .then((series) => {
      printSeries(series);
      // toggleSeriesResults();
    });
}

// Elemento donde vamos a escuchar el evento
const btn = document.querySelector('.btn__search');
btn.addEventListener('click', searchTVSeries);

// Función para pintar en el HTML los datos
function printSeries(series) {
  let ulSeries = '';
  for (const serie of series) {
    if (serie.show.image.medium === null) {
      const searchList = `<li class="serie"><h3 class="serie-name">${serie.show.name}</h3><div class="serie-img-container"><img class="serie-img" src="./assets/images/retro-tv.webp" alt="serie sin imagen" /></div></li>`;
      ulSeries += searchList;
      const seriesList = document.querySelector('.series__list');
      seriesList.innerHTML = ulSeries;
    } else {
      const searchList = `<li class="serie"><h3 class="serie-name">${serie.show.name}</h3><div class="serie-img-container"><img class="serie-img" src="${serie.show.image.medium}" alt="imagen de serie" /></div></li>`;
      ulSeries += searchList;
      const seriesList = document.querySelector('.series__list');
      seriesList.innerHTML = ulSeries;
    }
  }
}

// function toggleSeriesResults() {
//   const searchResult = document.querySelector('.search-result');
//   console.log(searchResult);
//   searchResult.classList.remove('hidden');
// }
