"use strict";let series=[""];function searchTVSeries(){const e="http://api.tvmaze.com/singlesearch/shows?q="+document.querySelector(".js-search").value;console.log(e),fetch(e).then(e=>e.json()).then(e=>{series=e,console.log(series)}),printSeries()}const btn=document.querySelector(".btn__search");function printSeries(){let e="";for(const s of series){console.log(s.name);e+=`<li class="serie"><h3 class="serie-name">${s.name}</h3><div class="serie-img-container"><img class="serie-img" href="${s.image}" alt="imagen de serie" /></div></li>`;document.querySelector(".series__list").innerHTML=ulContent}}btn.addEventListener("click",searchTVSeries);