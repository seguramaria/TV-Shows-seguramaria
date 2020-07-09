'use strict';

// const ENDPOINT =
//   'https://beta.adalab.es/ejercicios-extra/js-fetch-arrays-princesas-disney/data/users.json';

// let users = [
//   {
//     name: '',
//     email: '',
//     phone: '',
//     comment: '',
//     picture: '',
//   },
// ];

// // 1º Declaramos la constante donde pintaremos los datos de las princesas:

// let princessList = document.querySelector('.js-user-list');

// // 2º Hacemos fetch a una URL, después .then para pasar a JSON los datos del server operar con ellos. Devolvemos esos datos.

// function getInfoPrincess() {
//   fetch(ENDPOINT)
//     .then(function (response) {
//       return response.json();
//     })
//     .then((data) => {
//       users = data;
//       printPrincess(users); // Ésta es la función que me pinta los resultados en HTML.
//     });
// }
// getInfoPrincess();

// // 3º Pinto la información de las princesas en HTML.

// function printPrincess(princesses) {
//   for (const princess of princesses) {
//     princessList.innerHTML += `<li class="princess"><div class="container2"><h2 class="princess-name">${princess.name} </h2><div class="princess-img-container"><img src="${princess.picture}" class="princess-img"/></div></div><p class="princess-comment">${princess.comment}</p></li>`;
//   }
//   addClickListeners();
// }

// function addClickListeners() {
//   const princessesLi = document.querySelectorAll('li');
//   for (let princessLi of princessesLi) {
//     princessLi.addEventListener('click', selectFavoritePrincess);
//   }
// }

// function selectFavoritePrincess(event) {
//   let favorites = [];
//   event.currentTarget.classList.toggle('fav');

//   // if (princessLi.classList.contain('fav')) {
//   //   return favorites.push(princessLi);
//   //   console.log(favorites);
//   // }
// }

// // function addFavoritePrincess() {
// //   if (princessLi.classList.contain('fav')) {
// //     return favorites.push(princessLi);
// //     console.log(favorites);
// //   }
// // }

let series = [''];

function searchTVSeries() {
  let search = document.querySelector('.js-search').value;
  const URL = `http://api.tvmaze.com/singlesearch/shows?q=${search}`;
  console.log(URL);
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      console.log(series);
    });
  printSeries();
}

const btn = document.querySelector('.btn__search');
btn.addEventListener('click', searchTVSeries);

function printSeries() {
  let ulSeries = '';
  for (const serie of series) {
    console.log(serie.name);
    // console.log(serie.image.medium);
    const searchList = `<li class="serie"><h3 class="serie-name">${serie.name}</h3><div class="serie-img-container"><img class="serie-img" href="${serie.image}" alt="imagen de serie" /></div></li>`;
    ulSeries += searchList;
    const seriesList = document.querySelector('.series__list');
    seriesList.innerHTML = ulContent;
  }
}
