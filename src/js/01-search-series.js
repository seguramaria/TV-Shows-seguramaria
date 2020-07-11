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
btn.addEventListener('click', getsearchSeries);

// Función para pintar en el HTML los datos

function paintSeries(series) {
  sectionSeries.innerHTML = '';

  console.log(sectionSeries);

  showSeriesResults(); //Llamamos a la función que muestra un texto cuando aparecen resultados nuevos.

  // serie es el item de nuestro array
  for (const serie of series) {
    let seriesList = document.createElement('article');
    sectionSeries.appendChild(seriesList);
    seriesList.setAttribute('class', 'serie');
    seriesList.setAttribute('id', `${serie.id}`);
    seriesList.addEventListener('click', selectFavoriteSerie); //Escuchamos el evento en el click sobre el artículo de la serie, para cnvertirla en favorita.

    let nameSerie = document.createElement('h3');
    nameSerie.appendChild(document.createTextNode(serie.name));
    nameSerie.setAttribute('class', 'serie-name');
    seriesList.appendChild(nameSerie);

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
    seriesList.appendChild(imgSerie);
  }
}

// // FUNCIÓN PARA MOSTRAR LOS RESULTADOS
function showSeriesResults() {
  const searchResult = document.querySelector('.search-results-text');
  searchResult.classList.remove('hidden');
}

// FUNCIÓN PARA GUARDAR TODAS LAS SERIES FAVORITAS
function selectFavoriteSerie(event) {
  const index = event.currentTarget.id;

  if (favSeries.indexOf(index) === -1) {
    //El método indexOf() busca un elemento dentro de un array y nos devuelve la posición (o índice que es lo mismo) si lo encuentra. Si no lo encuentra nos devuelve -1. Nos sirve para buscar elementos dentro de un array.

    event.currentTarget.classList.add('fav');
    favSeries.push(index); //Agregamos los elementos al array

    // setLocalStorage(favSeries); //Enviamos al localstorage el array con los ids de las series favoritas
    renderFavSeries(favSeries); //llamo a la función que pinta las series favoritas
  } else {
    alert('No necesitas marcarla como favorita, ya está en tu lista 😉');
  }
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
function getSerie(idSerie) {
  for (let serie of series) {
    if (serie.id === idSerie) {
      return serie;
    }
  }
}

// FUNCIÓN PINTAR FAVORITOS
// le paso como parámetro el array de favoritos, de partida vacío lo que contenga la sección

function renderFavSeries(favSeries) {
  sectionSeriesFav.innerHTML = '';
  // por cada id que contenga favoritos le paso el id a la función getSerie que me devolverá el objeto con ese id
  for (let favSerie of favSeries) {
    let serie = getSerie(favSerie);

    // ahora ya puedo ver que si existe ese objeto lo añado a mi ul
    if (serie) {
      console.log(serie);
      let seriesListFav = document.createElement('article');
      sectionSeriesFav.appendChild(seriesListFav);
      seriesListFav.setAttribute('class', 'serie-fav');
      seriesListFav.setAttribute('id', `${serie.id}`);
      seriesListFav.addEventListener('click', selectFavoriteSerie); //AQUÍ LLAMARÉ A LA FUNCIÓN DE RESET DE FAVS

      let nameSerieFav = document.createElement('h3');
      nameSerieFav.appendChild(document.createTextNode(serie.show.name));
      nameSerieFav.setAttribute('class', 'serie-name-fav');
      seriesListFav.appendChild(nameSerieFav);

      let imgSerieFav = document.createElement('img');
      const defaultImg = './assets/images/default-img.png';
      let serieImgFav = serie.show.image;
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

// getsearchSeries();
