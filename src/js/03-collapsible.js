'use strict';
// Función handler que muestra u oculta los collapsibles
function showCollapsible(event) {
  // Definición de variables
  const favSection = document.querySelector('.js-list-fav');
  const seriesSection = document.querySelector('.js-list-series');
  const favTitle = document.querySelector('.favorite__series-title');
  const seriesTitle = document.querySelector('.series-search-title');
  const mainDocument = document.querySelector('.page__main');
  const headerTitle = document.querySelector('.header');

  if (event.target === favTitle) {
    favSection.classList.remove('hidden');
    seriesSection.classList.add('hidden');
  } else if (event.target === seriesTitle) {
    favSection.classList.add('hidden');
    seriesSection.classList.remove('hidden');
  } else if (event.target === headerTitle) {
    favSection.classList.add('hidden');
    seriesSection.classList.add('hidden');
  }
}

document.addEventListener('click', showCollapsible);
