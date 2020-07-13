'use strict';

let sectionSeries = document.querySelector('.series__list');
let sectionSeriesFav = document.querySelector('.series__list-fav');

let series = [];
let favSeries = readLocalStorage();

// FUNCIÓN PARA OBTENER LOS DATOS DEL API
function getsearchSeries() {
  let inputSearch = document.querySelector('.js-search');
  let search = inputSearch.value;
  const URL = `http://api.tvmaze.com/search/shows?q=${search}`;
  series = [];
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      for (const serie of data) {
        series.push(serie.show);
      }
      paintSeries(series); //Pintar resultados de la búsqueda en HTML
    });
}

// Elemento donde vamos a escuchar el evento de la búsqueda
function handlerClickSearch(event) {
  event.preventDefault();
  getsearchSeries();
}
const btn = document.querySelector('.btn__search');
btn.addEventListener('click', handlerClickSearch);

// FUNCIÓN PARA PINTAR LOS RESULTADOS EN HTML

function paintSeries(series) {
  sectionSeries.innerHTML = '';
  const favSeriesId = favSeries.map((serie) => serie.id);

  const searchResult = document.querySelector('.search-results-text');
  searchResult.classList.remove('hidden'); //Mostramos un texto cuando aparecen resultados nuevos.

  for (const serie of series) {
    let seriesElement = document.createElement('article');
    sectionSeries.appendChild(seriesElement);
    seriesElement.setAttribute('class', 'serie');
    seriesElement.setAttribute('id', `${serie.id}`);

    if (favSeriesId.includes(serie.id)) {
      seriesElement.classList.add('fav'); //Si el id de la serie se encuentra dentro de nuestro array de series fav, al pintarse la búsqueda se incluye la clase fav, para que aparezcan con el background-color de favoritas.
    }
    seriesElement.addEventListener('click', selectFavoriteSerie); //Escuchamos el evento en seriesElement con un click para pintarla en favorita.

    let nameSerie = document.createElement('h3');
    nameSerie.appendChild(document.createTextNode(serie.name));
    nameSerie.setAttribute('class', 'serie-name');
    seriesElement.appendChild(nameSerie);

    let imgSerie = document.createElement('img');
    const defaultImg = './assets/images/default-img.png';
    let serieImg = serie.image;
    if (serieImg === null) {
      imgSerie.src = defaultImg;
    } else {
      imgSerie.src = serieImg.medium;
    }
    imgSerie.alt = 'Imagen de serie';
    imgSerie.setAttribute('class', 'serie-img');
    seriesElement.appendChild(imgSerie);
  }
}

// Añado los listeners a las series. Esta función la llamaré en la que selecciona las series favoritas.
function addClickListeners() {
  const seriesItems = document.querySelectorAll('.serie');
  for (let serieItem of seriesItems) {
    serieItem.addEventListener('click', selectFavoriteSerie);
  }
}

//Función que recibe el id de favorito, recorre el array series y si el id que le paso coincide con alguno de los ids de mi array de series devuelvo el objeto para poder pintarlo
function getSerie(serieId) {
  for (let serie of series) {
    if (serie.id === serieId) {
      return serie;
    }
  }
}

// FUNCIÓN PARA GUARDAR LAS SERIES FAVORITAS
function selectFavoriteSerie(event) {
  const serieId = parseInt(event.currentTarget.id);
  const btnId = parseInt(event.target.id);
  const favSeriesId = favSeries.map((serie) => serie.id);

  if (!favSeriesId.includes(serieId)) {
    event.currentTarget.classList.add('fav');
    let serie = getSerie(serieId);
    favSeries.push(serie);
    renderFavSeries(); //Pintamos series favoritas
    setLocalStorage(favSeries); //Enviamos al localstorage el array con los ids de las series favoritas
  } else if (favSeriesId.includes(btnId)) {
    //CONDICIÓN QUE NOS BORRA LAS SERIES QUE YA NO QUEREMOS EN FAVORITOS
    favSeries = favSeries.filter((serie) => serie.id !== btnId);
    paintSeries(series);
    renderFavSeries(); //Pintamos series favoritas
    setLocalStorage(favSeries); //Actualizamos el localstorage
  } else if (favSeriesId.includes(serieId)) {
    event.currentTarget.classList.remove('fav');
    favSeries = favSeries.filter((serie) => serie.id !== serieId);
  }

  addClickListeners();
}

// FUNCIÓN PARA GUARDAR DATOS EN MI LOCALSTORAGE
function setLocalStorage(favSeries) {
  localStorage.setItem('favSeries', JSON.stringify(favSeries));
}

//FUNCIÓN PARA OBTENER LA INFO DEL LOCALSTORAGE, LEERLA Y PARSEARLA
function readLocalStorage() {
  let favSeries = JSON.parse(localStorage.getItem('favSeries'));
  if (favSeries !== null) {
    return favSeries;
  }
  return (favSeries = []);
}

// FUNCIÓN PINTAR FAVORITOS

function renderFavSeries() {
  sectionSeriesFav.innerHTML = '';

  for (let favSerie of favSeries) {
    if (favSerie) {
      let seriesListFav = document.createElement('article');
      sectionSeriesFav.appendChild(seriesListFav);
      seriesListFav.setAttribute('class', 'serie-fav');
      seriesListFav.setAttribute('id', `${favSerie.id}`);
      seriesListFav.addEventListener('click', selectFavoriteSerie);

      let btnDeleteFav = document.createElement('button');
      btnDeleteFav.appendChild(document.createTextNode('X'));
      btnDeleteFav.setAttribute('class', 'btn-delete');
      btnDeleteFav.setAttribute('id', `${favSerie.id}`);
      seriesListFav.appendChild(btnDeleteFav);

      let nameSerieFav = document.createElement('h3');
      nameSerieFav.appendChild(document.createTextNode(favSerie.name));
      nameSerieFav.setAttribute('class', 'serie-name-fav');
      seriesListFav.appendChild(nameSerieFav);

      let imgSerieFav = document.createElement('img');
      const defaultImg = './assets/images/default-img.png';
      let serieImgFav = favSerie.image;
      if (serieImgFav === null) {
        imgSerieFav.src = defaultImg;
      } else {
        imgSerieFav.src = serieImgFav.medium;
      }
      imgSerieFav.alt = 'Imagen de serie';
      imgSerieFav.setAttribute('class', 'serie-img-fav');
      seriesListFav.appendChild(imgSerieFav);
    }
  }
}

// RESET ALL

const btnResetAll = document.querySelector('.btn-reset-all');
function clearLocalstorage() {
  localStorage.clear('favSeries');
  favSeries = [];
  renderFavSeries();
  paintSeries(series);
}
btnResetAll.addEventListener('click', clearLocalstorage);

renderFavSeries(); //llamo a la función que pinta las series favoritas al arrancar la página
