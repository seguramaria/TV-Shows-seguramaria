'use strict';
// Función handler que muestra u oculta los collapsibles
function showCollapsible(event) {
  // Definición de variables
  const favSection = document.querySelector('.js-list-fav');
  const seriesSection = document.querySelector('.js-list-series');
  const favTitle = document.querySelector('.favorite__series-title');
  const seriesTitle = document.querySelector('.series-search-title');
  const mainDocument = document.querySelector('.page__main');

  if (event.target === favTitle) {
    favSection.classList.remove('hidden');
    seriesSection.classList.add('hidden');
  } else if (event.target === seriesTitle) {
    favSection.classList.add('hidden');
    seriesSection.classList.remove('hidden');
  } else if (event.target === mainDocument) {
    favSection.classList.add('hidden');
    seriesSection.classList.add('hidden');
  }
}

document.addEventListener('click', showCollapsible);
