'use strict';

// Declaramos la función para la búsqueda de series
function searchTVSeries() {
  let inputSearch = document.querySelector('.js-search');
  let search = inputSearch.value; // Para poder buscar series con espacios
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
  let sectionSeries = document.querySelector('.series__list');
  sectionSeries.style.flex = 'flex-wrap';
  sectionSeries.innerHTML = '';
  showSeriesResults();

  for (const serie of series) {
    let seriesList = document.createElement('article');
    sectionSeries.appendChild(seriesList);
    seriesList.setAttribute('class', 'serie');
    seriesList.addEventListener('click', selectFavoriteSerie);

    let nameSerie = document.createElement('h3');
    nameSerie.appendChild(document.createTextNode(serie.show.name));
    nameSerie.setAttribute('class', 'serie-name');
    seriesList.appendChild(nameSerie);

    let imgSerie = document.createElement('img');
    const defaultImg = './assets/images/default-img.png';
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

// // FUNCIÓN PARA MOSTRAR LOS RESULTADOS
function showSeriesResults() {
  const searchResult = document.querySelector('.search-results-text');
  searchResult.classList.remove('hidden');
}

// // SERIES FAVORITAS

// // FUNCIÓN PARA AÑADIR LA CLASE FAV A TODAS LAS SERIES FAVORITAS
function selectFavoriteSerie(event) {
  event.currentTarget.classList.add('fav');
}

// const clickedId = parseInt(event.currentTarget.id);
// let listSerie = series.find((serieFav) => serieFav.show.id === clickedId);
// let sectionSeriesFav = document.querySelector('.series__list-fav');
// sectionSeriesFav.innerHTML = '';

// let seriesListFav = document.createElement('article');
// sectionSeriesFav.appendChild(seriesListFav);
// seriesListFav.setAttribute('class', 'serie-fav');
// seriesList.addEventListener('click', selectFavoriteSerie); AQUÍ LLAMARÉ A LA FUNCIÓN DE RESET DE FAVS

// let nameSerieFav = document.createElement('h3');
// nameSerieFav.appendChild(document.createTextNode(serie.show.name));
// nameSerieFav.setAttribute('class', 'serie-name-fav');
// seriesListFav.appendChild(nameSerieFav);

// let imgSerieFav = document.createElement('img');
// const defaultImg = './assets/images/default-img.png';
// let serieImgFav = serie.show.image;
// if (serieImgFav === null) {
//   imgSerieFav.src = defaultImg;
// } else {
//   imgSerieFav.src = serieImgFav.medium;
// }
// imgSerieFav.alt = 'Imagen de serie';
// imgSerieFav.setAttribute('class', 'serie-img-fav');
// seriesListFav.appendChild(imgSerieFav);
