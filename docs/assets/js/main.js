"use strict";let sectionSeries=document.querySelector(".series__list"),sectionSeriesFav=document.querySelector(".series__list-fav"),series=[],favSeries=readLocalStorage();function getsearchSeries(){let e=document.querySelector(".js-search").value;series=[],fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{for(const t of e)series.push(t.show);paintSeries(series)})}function handlerClickSearch(e){e.preventDefault(),getsearchSeries()}const btn=document.querySelector(".btn__search");function paintSeries(e){sectionSeries.innerHTML="";const t=favSeries.map(e=>e.id);document.querySelector(".search-results-text").classList.remove("hidden");for(const s of e){let e=document.createElement("article");sectionSeries.appendChild(e),e.setAttribute("class","serie"),e.setAttribute("id",""+s.id),t.includes(s.id)&&e.classList.add("fav"),e.addEventListener("click",selectFavoriteSerie);let r=document.createElement("h3");r.appendChild(document.createTextNode(s.name)),r.setAttribute("class","serie-name"),e.appendChild(r);let i=document.createElement("img");const a="./assets/images/default-img.png";let n=s.image;i.src=null===n?a:n.medium,i.alt="Imagen de serie",i.setAttribute("class","serie-img"),e.appendChild(i)}}function addClickListeners(){const e=document.querySelectorAll(".serie");for(let t of e)t.addEventListener("click",selectFavoriteSerie)}function getSerie(e){for(let t of series)if(t.id===e)return t}function selectFavoriteSerie(e){const t=parseInt(e.currentTarget.id),s=parseInt(e.target.id),r=favSeries.map(e=>e.id);if(r.includes(t))r.includes(t)?(favSeries=favSeries.filter(e=>e.id!==t),paintSeries(series),renderFavSeries(),setLocalStorage(favSeries)):r.includes(s)&&(favSeries=favSeries.filter(e=>e.id!==s),paintSeries(series),renderFavSeries(),setLocalStorage(favSeries));else{e.currentTarget.classList.add("fav");let s=getSerie(t);favSeries.push(s),renderFavSeries(),setLocalStorage(favSeries)}addClickListeners()}function setLocalStorage(e){localStorage.setItem("favSeries",JSON.stringify(e))}function readLocalStorage(){let e=JSON.parse(localStorage.getItem("favSeries"));return null!==e?e:[]}function renderFavSeries(){sectionSeriesFav.innerHTML="";for(let e of favSeries)if(e){let t=document.createElement("article");sectionSeriesFav.appendChild(t),t.setAttribute("class","serie-fav"),t.setAttribute("id",""+e.id),t.addEventListener("click",selectFavoriteSerie);let s=document.createElement("button");s.appendChild(document.createTextNode("X")),s.setAttribute("class","btn-delete"),s.setAttribute("id",""+e.id),t.appendChild(s);let r=document.createElement("h3");r.appendChild(document.createTextNode(e.name)),r.setAttribute("class","serie-name-fav"),t.appendChild(r);let i=document.createElement("img");const a="./assets/images/default-img.png";let n=e.image;i.src=null===n?a:n.medium,i.alt="Imagen de serie",i.setAttribute("class","serie-img-fav"),t.appendChild(i)}}btn.addEventListener("click",handlerClickSearch);const btnResetAll=document.querySelector(".btn-reset-all");function clearLocalstorage(){localStorage.clear("favSeries"),favSeries=[],renderFavSeries(),paintSeries(series)}function showCollapsible(e){const t=document.querySelector(".js-list-fav"),s=document.querySelector(".js-list-series"),r=document.querySelector(".favorite__series-title"),i=document.querySelector(".series-search-title"),a=document.querySelector(".header__title");e.target===r?(t.classList.remove("hidden"),s.classList.add("hidden")):e.target===i?(t.classList.add("hidden"),s.classList.remove("hidden")):e.target===a&&(t.classList.add("hidden"),s.classList.add("hidden"))}btnResetAll.addEventListener("click",clearLocalstorage),renderFavSeries(),document.addEventListener("click",showCollapsible);