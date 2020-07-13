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
      paintSeries(series); //Pintar resultados de la búsqueda
    });
}

// Elemento donde vamos a escuchar el evento de la búsqueda
const btn = document.querySelector('.btn__search');
btn.addEventListener('click', handlerClickSearch);

function handlerClickSearch(event) {
  event.preventDefault();
  getsearchSeries();
}

// Función para pintar en el HTML los datos

function paintSeries(series) {
  sectionSeries.innerHTML = '';
  const favSeriesId = favSeries.map((serie) => serie.id);

  showSeriesResults(); //Llamamos a la función que muestra un texto cuando aparecen resultados nuevos.

  // serie es el item de nuestro array
  for (const serie of series) {
    let seriesElement = document.createElement('article');
    sectionSeries.appendChild(seriesElement);
    seriesElement.setAttribute('class', 'serie');
    seriesElement.setAttribute('id', `${serie.id}`);

    if (favSeriesId.includes(serie.id)) {
      seriesElement.classList.add('fav'); //incluye la clase fav, para que aquellas series que estén en el array de favSeries aparezcan con background-color
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

// // FUNCIÓN PARA MOSTRAR LOS RESULTADOS
function showSeriesResults() {
  const searchResult = document.querySelector('.search-results-text');
  searchResult.classList.remove('hidden');
}

// Añado los listeners a mis botones llamaré esta función en la que pinta las recetas, ya que es ella la que la usa al crear los botones
function addClickListeners() {
  const seriesItems = document.querySelectorAll('.serie');
  for (let serieItem of seriesItems) {
    serieItem.addEventListener('click', selectFavoriteSerie);
  }
}

// FUNCIÓN PARA GUARDAR TODAS LAS SERIES FAVORITAS
function selectFavoriteSerie(event) {
  const indexSerie = parseInt(event.currentTarget.id);
  const indexBtn = parseInt(event.target.id);
  const favSeriesId = favSeries.map((serie) => serie.id);

  if (!favSeriesId.includes(indexSerie)) {
    event.currentTarget.classList.add('fav');

    let serie = getSerie(indexSerie);
    favSeries.push(serie);
    renderFavSeries(); //Pintamos series favoritas
    setLocalStorage(favSeries); //Enviamos al localstorage el array con los ids de las series favoritas
  } else if (favSeriesId.includes(indexBtn)) {
    //CONDICIÓN QUE NOS BORRA LAS SERIES QUE YA NO QUEREMOS EN FAVORITOS
    favSeries = favSeries.filter((serie) => serie.id !== indexBtn); // favseries es un array de objetos que contiene nuestras series marcadas como favoritas, con el filter hemos recorrido el array, comparamos los IDs con el del botón, filtramos un nuevo array sin dicho objeto y se actualizaría favSeries
    paintSeries(series);
    renderFavSeries(); //Pintamos series favoritas
    setLocalStorage(favSeries); //Enviamos al localstorage el array con los ids de las series favoritas
  } else {
    alert(`No necesitas marcarla como favorita, ya está en tu lista 😉
      Puedes borrarla en el apartado de favoritos`);
  }

  addClickListeners();
}

// // FUNCIÓN PARA GUARDAR DATOS EN MI LOCALSTORAGE (El parámetro que recibe es el array de ids de series favoritas, lo pasa por el método stringify para almacenarlas)
function setLocalStorage(favSeries) {
  localStorage.setItem('favSeries', JSON.stringify(favSeries));
}

//FUNCIÓN PARA OBTENER LA INFO DEL LOCALSTORAGE, LEERLA Y PARSEARLA
function readLocalStorage() {
  let favSeries = JSON.parse(localStorage.getItem('favSeries'));
  // si local es distinto de null es que tiene contenido así que devuelvo su contenido
  if (favSeries !== null) {
    return favSeries;
  }
  // si no tiene contenido devolverá null así que para que no me de error devuelvo un array vacío para poder a guardar ids;
  return (favSeries = []);
}

// // como los favoritos los estoy guardando por id, necesito relacionar mi array de ids de favoritos con el objeto al que hace referencia en el array de objetos series. Para ello creo una función que recibe el id de favorito, recorre el array series y si el id que le paso coincide con alguno de los ids de mi array de series devuelvo el objeto para poder pintarlo
function getSerie(serieId) {
  for (let serie of series) {
    if (serie.id === serieId) {
      return serie;
    }
  }
}

// FUNCIÓN PINTAR FAVORITOS
// le paso como parámetro el array de favoritos, de partida vacío lo que contenga la sección

function renderFavSeries() {
  sectionSeriesFav.innerHTML = '';

  // por cada id que contenga favoritos le paso el id a la función getSerie que me devolverá el objeto con ese id
  for (let favSerie of favSeries) {
    // ahora ya puedo ver que si existe ese objeto lo añado a mi sección
    if (favSerie) {
      let seriesListFav = document.createElement('article');
      sectionSeriesFav.appendChild(seriesListFav);
      seriesListFav.setAttribute('class', 'serie-fav');
      seriesListFav.setAttribute('id', `${favSerie.id}`);
      seriesListFav.addEventListener('click', selectFavoriteSerie); //AQUÍ LLAMARÉ A LA FUNCIÓN DE RESET DE FAVS

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
