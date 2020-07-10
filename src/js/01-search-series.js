'use strict';

// Declaramos la función para la búsqueda de series
function searchTVSeries() {
  let inputSearch = document.querySelector('.js-search');
  let search = inputSearch.value.split(' ').join('+'); // Para poder buscar series con espacios

  // Hacemos la interpolación de cadenas en la url de la api. Hay que tener cuidado con la búsqueda. Es search, no singlesearch.
  const URL = `http://api.tvmaze.com/search/shows?q=${search}`;

  fetch(URL)
    .then((response) => response.json())
    .then((series) => {
      printSeries(series);
    });
}

// Elemento donde vamos a escuchar el evento
const btn = document.querySelector('.btn__search');
btn.addEventListener('click', searchTVSeries);

// Función para pintar en el HTML los datos
function printSeries(series) {
  let ulSeries = document.querySelector('.series__list');
  ulSeries.innerHTML = '';
  showSeriesResults();
  for (const serie of series) {
    let seriesList = document.createElement('li');
    ulSeries.appendChild(seriesList);
    seriesList.setAttribute('class', 'serie');
    seriesList.addEventListener('click', selectFavoriteSerie);

    let nameSerie = document.createElement('h3');
    nameSerie.appendChild(document.createTextNode(serie.show.name));
    nameSerie.setAttribute('class', 'serie-name');
    seriesList.appendChild(nameSerie);

    let imgSerie = document.createElement('img');
    const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?';
    let serieImg = serie.show.image;
    if (serieImg === null) {
      imgSerie.src = defaultImg;
    } else {
      imgSerie.src = serieImg.medium;
    }
    imgSerie.alt = 'Imagen de serie';
    imgSerie.setAttribute('class', 'serie-img');
    seriesList.appendChild(imgSerie);
  }
}

// FUNCIÓN PARA MOSTRAR LOS RESULTADOS
function showSeriesResults() {
  const searchResult = document.querySelector('.search-results-text');
  searchResult.classList.remove('hidden');
}

// FUNCIÓN PARA AÑADIR LA CLASE FAV A TODAS LAS SERIES FAVORITAS
function selectFavoriteSerie(event) {
  event.currentTarget.classList.add('fav');
}
