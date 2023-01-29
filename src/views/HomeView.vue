<script setup lang="ts">
import { ref, onMounted } from 'vue';
import leaflet from 'leaflet'
import { wcList } from '@/data/wcData'
import type { WC } from '@/models/wc.interface'

let map: leaflet.Map
const allWcs = wcList
let allWcsRef = ref<WC[]>(wcList)

onMounted(() => {
  // create Leaflet map object
  map = leaflet.map('map').setView([52.37542927840819, 4.895685038789402], 15)
  createMarkers(map)

  // add tile layer to map
  leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
})

const createMarkers = (map: leaflet.Map) => {
  allWcs.forEach(wc => {
    leaflet.marker([wc.lat!, wc.lng!])
      .addTo(map)
      .bindPopup(createPopupText(wc))
  })
}

const createPopupText = (wc: WC): string => {
  let res = `${wc.name} <br>`

  if (wc.isPublic!) {
    res += 'Dit is een openbaar wc<br>'
  } else {
    res += 'Deze wc is binnen een restaurant/ cafe <br>'
  }

  if (wc.price! > 0) {
    res += `Prijs:  €${wc.price}`
  } else {
    res += 'Prijs: gratis!'
  }

  return res ?? 'Iets is fout gegaan bij het ophalen van wc data'
}
</script>

<template>
  <div class="container">
    <header>
      <h1>
        WC<span id="hyphen">-</span>
        <span id="radar">Radar</span>
      </h1>
    </header>

    <main>
      <div class="description-container">
        <div class="description-title">
          <div id="xxx">
            XXX
          </div>
          <p class="mobile-description-head">Op deze kaart zijn <span class="accent">wc's</span> in <span id="red">Amsterdam</span> te zien.</p>
          <p class="desktop-description-head">Op de kaart hiernaast zijn <span class="accent">wc's</span> in <span id="red">Amsterdam</span> te zien.</p>
        </div>
        <p class="description-sub">Click op een <span class="accent">wc</span> voor meer info!</p>
        <div class="img-container">
          <img src="@/assets/images/arrow.png" alt="image of a drawn arrow">
        </div>
        <p class="desktop-description-text">
          <span class="big">H</span>et komt wel voor dat je in de stad loopt en opeens dringend naar de wc moet, maar waar? In die moment heb je 
          haast en is het moeilijk te focussen, waar was er een wc alweer? Misschien is een openbare wc ver weg, dan maar 
          naar een café of restaurant dat in dezelfde straat zit, maar kan ik zomaar de wc gebruiken of moet ik eerst iets 
          kopen? Of moet ik voor de wc betalen? Worden de wc’s regelmatig gereinigd? Al de bovengenoemde informatie wil ik 
          verzamelen en overzichtelijk weergeven aan iedereen.
        </p>
      </div>
      <div id="map"></div>
      <p class="mobile-description-text">
          <span class="big">H</span>et komt wel voor dat je in de stad loopt en opeens dringend naar de wc moet, maar waar? In die moment heb je 
          haast en is het moeilijk te focussen, waar was er een wc alweer? Misschien is een openbare wc ver weg, dan maar 
          naar een café of restaurant dat in dezelfde straat zit, maar kan ik zomaar de wc gebruiken of moet ik eerst iets 
          kopen? Of moet ik voor de wc betalen? Worden de wc’s regelmatig gereinigd? Al de bovengenoemde informatie wil ik 
          verzamelen en overzichtelijk weergeven aan iedereen.
        </p>
    </main>
    <div class="license-container">
      <a id="license" rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
        <img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/>
      </a>
      <br />
      Dit werk is gelicenseerd onder een 
      <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
    </div>
  </div>
</template>

<style scoped>

.container {
  background: rgb(51,1,70);
  background: linear-gradient(0deg, rgba(51,1,70,1) 0%, rgba(43,0,131,1) 100%);
  min-width: 385px;
}

header h1 {
  font-family: Aladin;
  font-size: 3rem;
  color: var(--title-color);
  font-weight: bolder;
  margin: 0 1.6rem;
  padding-top: 1rem;
  transition: 0.3s;
}

header h1:hover {
  filter: invert(100%)
}

Header h1:hover #hyphen {
  rotate: 360deg;
}

#radar {
  color: var(--title-color-2);
}

main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  cursor: default;
}

.description-container {
  margin: 1rem 1rem 0 1rem;
}

.description-title {
  display: flex;
  flex-direction: row;
  font-family: Acme-Regular;
  font-weight: bolder;
  color: var(--text-color);
}

#xxx {
  font-size: 2rem;
  font-weight: bolder;
  color: red;
  writing-mode: vertical-rl;
  text-orientation: upright;
  letter-spacing: -1rem;
}

.mobile-description-head{
  font-size: 2.1rem;
}

.desktop-description-head {
  display: none;
}

.description-sub {
  font-family: Acme-Regular;
  font-size: 1.8rem;
  color: var(--text-color);
  margin: 1rem 0;
  text-align: center;
}

.img-container img {
  display: none;
  filter: invert(100%);
  rotate: 146deg;
  transform: scaleX(-1);
  width: 10rem;
  height: 13rem;
  margin-left: 28rem;
  margin-top: -2rem;
}

.mobile-description-text {
  font-family: Acme-Regular;
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 1rem;
  padding: 0 1rem;
  text-align: justify;
  border-top: solid 1px rgba(76, 201, 240, 0.6);
}

.desktop-description-text {
  display: none;
}

.accent {
  color: var(--title-color)
}

#red {
  color: red;
}

#hyphen {
  color: red;
  transition: 0.3s;
}

.big {
  font-size: 2.25rem;
}

#map {
  height: 40rem;
  border-top: solid 2px var(--title-color);
  border-bottom: solid 2px var(--title-color);
}

.license-container {
  color: var(--text-color);
  padding: 1rem;
  font-family: Acme-Regular;
}

.license-container a {
  color: var(--title-color);
}

.license-container a:visited {
  color: #3086a0;
}

@media only screen and (min-width: 666px) {
  .description-title {
    align-items: center;
  }
}

@media only screen and (min-width: 768px) {
  .mobile-description-head{
    font-size: 3rem;
    margin-top: 0.6rem;
  }

  .description-title{
    align-items: center;
  }

  #xxx {
    font-size: 3rem;
    margin-left: 8rem;
  }

  .description-sub {
    padding: 0.5rem 0;
  }
}

@media only screen and (min-width: 992px) {
  .mobile-description-head{
    display: none;
  }
  
  .mobile-description-text {
    display: none;
  }
  
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 100vh;
    max-height: 100%;
  }

  .description-container {
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: 0;
  }
  
  .description-title {
    display: flex;
    flex-direction: row;
  }

  .desktop-description-head{
    display: block;
    font-size: 3rem;
  }
  
  #xxx {
    font-size: 4rem;
    letter-spacing: -1.5rem;
    margin-left: 0;
  }

  .description-sub {
    text-align: start;
    padding: 0;
    margin: 1rem 0 0 3rem;

  }

  .desktop-description-text{
    display: block;
    font-family: Acme-Regular;
    font-size: 1.5rem;
    color: var(--text-color);
    padding: 0 0 0 1rem;
    text-align: justify;
    border-left: solid 3px rgba(76, 201, 240, 0.6);
  }

  .img-container img {
    display: block;
    margin-left: 17rem;
    margin-top: -3rem;
    width: 9rem;
    height: 10rem;
  }

  #map {
    height: 46.5rem;
    width: 30rem;
    border-radius: 3px;
    border: solid 3px var(--title-color);     
  }
}

@media only screen and (min-width: 1200px) {
  #map {
    width: 40rem;
  }

  .description-container {
    margin-top: 1rem;
  }

  .desktop-description-head {
    font-size: 3rem;
  }

  .img-container img {
    margin-left: 22rem;
  }
}

@media only screen and (min-width: 1440px) {
  #map {
    width: 50rem;
  }

  .desktop-description-head {
    font-size: 3.5rem;
  }

  .description-sub {
    margin: 1rem 0 0 5rem;
  }

  .desktop-description-text {
    margin-top: 3.5rem;
    padding-right: 1rem;
  }

  .img-container img {
    width: 11rem;
    margin-left: 26rem;
  }
}

@media only screen and (min-width: 1500px) {
  
  .description-title {
    margin-top: 1rem;
  }

  .desktop-description-text {
    margin-top: 7rem;
  }
}
</style>