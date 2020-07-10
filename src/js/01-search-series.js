'use strict';

// Declaramos la función para la búsqueda de series
function searchTVSeries() {
  let search = document.querySelector('.js-search').value;

  // Hacemos la interpolación de cadenas en la url de la api. Hay que tener cuidado con la búsqueda. Es search, no singlesearch.

  const URL = `http://api.tvmaze.com/search/shows?q=${search}`;

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
  for (const serie of series) {
    let ul = document.querySelector('.series__list');

    let seriesList = document.createElement('li');
    ul.appendChild(seriesList);
    seriesList.setAttribute('class', 'serie');
    seriesList.addEventListener('click', selectFavoriteSerie);

    let nameSerie = document.createElement('h3');
    nameSerie.appendChild(document.createTextNode(serie.show.name));
    nameSerie.setAttribute('class', 'serie-name');
    seriesList.appendChild(nameSerie);

    let imgSerie = document.createElement('img');
    imgSerie.src = serie.show.image.medium;
    imgSerie.alt = 'Imagen de serie';
    imgSerie.setAttribute('class', 'serie-img');
    seriesList.appendChild(imgSerie);
  }
}

// FUNCIÓN PARA AÑADIR LA CLASE FAV A TODAS LAS SERIES FAVORITAS

function selectFavoriteSerie(event) {
  event.currentTarget.classList.toggle('fav');
}

// if (serie.show.image.medium === null) {
//   let ul = document.querySelector('.series__list');

//   let seriesList = document.createElement('li');
//   ul.appendChild(seriesList);
//   seriesList.setAttribute('class', 'serie');
//   seriesList.addEventListener('click', selectFavoriteSerie);

//   let nameSerie = document.createElement('h3');
//   nameSerie.appendChild(document.createTextNode(serie.show.name));
//   nameSerie.setAttribute('class', 'serie-name');
//   seriesList.appendChild(nameSerie);

//   let imgSerie = document.createElement('img');
//   imgSerie.src =
//     'https://static.vecteezy.com/system/resources/previews/000/225/950/original/retro-television-set-vector.jpg';
//   imgSerie.alt = 'Imagen de serie';
//   imgSerie.setAttribute('class', 'serie-img');
//   seriesList.appendChild(imgSerie);
// }

// function toggleSeriesResults() {
//   const searchResult = document.querySelector('.search-result');
//   console.log(searchResult);
//   searchResult.classList.remove('hidden');
// }
