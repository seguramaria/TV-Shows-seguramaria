'use strict';
let sectionSeries = document.querySelector('.series__list'),
  sectionSeriesFav = document.querySelector('.series__list-fav'),
  series = [],
  favSeries = readLocalStorage();
function getsearchSeries() {
  let e = document.querySelector('.js-search').value;
  (series = []),
    fetch('http://api.tvmaze.com/search/shows?q=' + e)
      .then((e) => e.json())
      .then((e) => {
        for (const t of e) series.push(t.show);
        paintSeries(series);
      });
}
const btn = document.querySelector('.btn__search');
function handlerClickSearch(e) {
  e.preventDefault(), getsearchSeries();
}
function paintSeries(e) {
  sectionSeries.innerHTML = '';
  const t = favSeries.map((e) => e.id);
  showSeriesResults();
  for (const s of e) {
    let e = document.createElement('article');
    sectionSeries.appendChild(e),
      e.setAttribute('class', 'serie'),
      e.setAttribute('id', '' + s.id),
      t.includes(s.id) && e.classList.add('fav'),
      e.addEventListener('click', selectFavoriteSerie);
    let i = document.createElement('h3');
    i.appendChild(document.createTextNode(s.name)),
      i.setAttribute('class', 'serie-name'),
      e.appendChild(i);
    let r = document.createElement('img');
    const a = './assets/images/default-img.png';
    let n = s.image;
    (r.src = null === n ? a : n.medium),
      (r.alt = 'Imagen de serie'),
      r.setAttribute('class', 'serie-img'),
      e.appendChild(r);
  }
}
function showSeriesResults() {
  document.querySelector('.search-results-text').classList.remove('hidden');
}
function addClickListeners() {
  const e = document.querySelectorAll('.serie');
  for (let t of e) t.addEventListener('click', selectFavoriteSerie);
}
function selectFavoriteSerie(e) {
  const t = parseInt(e.currentTarget.id);
  if (favSeries.map((e) => e.id).includes(t))
    alert(
      'No necesitas marcarla como favorita, ya está en tu lista 😉\n      Puedes borrarla en el apartado de favoritos'
    );
  else {
    e.currentTarget.classList.add('fav');
    let s = getSerie(t);
    favSeries.push(s), renderFavSeries(), setLocalStorage(favSeries);
  }
  addClickListeners();
}
function setLocalStorage(e) {
  localStorage.setItem('favSeries', JSON.stringify(e));
}
function readLocalStorage() {
  let e = JSON.parse(localStorage.getItem('favSeries'));
  return null !== e ? e : [];
}
function getSerie(e) {
  for (let t of series) if (t.id === e) return t;
}
function renderFavSeries() {
  sectionSeriesFav.innerHTML = '';
  document.querySelector('.no-series-container').classList.add('hidden');
  for (let e of favSeries)
    if (e) {
      console.log(e);
      let t = document.createElement('article');
      sectionSeriesFav.appendChild(t),
        t.setAttribute('class', 'serie-fav'),
        t.setAttribute('id', '' + e.id),
        t.addEventListener('click', selectFavoriteSerie);
      let s = document.createElement('button');
      s.appendChild(document.createTextNode('X')),
        s.setAttribute('class', 'btn-delete'),
        t.appendChild(s);
      let i = document.createElement('h3');
      i.appendChild(document.createTextNode(e.name)),
        i.setAttribute('class', 'serie-name-fav'),
        t.appendChild(i);
      let r = document.createElement('img');
      const a = './assets/images/default-img.png';
      let n = e.image;
      (r.src = null === n ? a : n.medium),
        (r.alt = 'Imagen de serie'),
        r.setAttribute('class', 'serie-img-fav'),
        t.appendChild(r);
    }
}
function showCollapsible(e) {
  const t = document.querySelector('.js-list-fav'),
    s = document.querySelector('.js-list-series'),
    i = document.querySelector('.favorite__series-title'),
    r = document.querySelector('.series-search-title'),
    a = document.querySelector('.header__title');
  e.target === i
    ? (t.classList.remove('hidden'), s.classList.add('hidden'))
    : e.target === r
    ? (t.classList.add('hidden'), s.classList.remove('hidden'))
    : e.target === a && (t.classList.add('hidden'), s.classList.add('hidden'));
}
btn.addEventListener('click', handlerClickSearch),
  renderFavSeries(),
  document.addEventListener('click', showCollapsible);
