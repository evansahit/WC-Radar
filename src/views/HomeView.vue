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
  <body>
    <header>
      <h1>
        WC<span id="red">-</span>
        <span id="radar">Radar</span> 
      </h1>
    </header>

    <main>
      <div class="description-container">
        <div class="description-title">
          <div class="xxx">
            XXX
          </div>
          <p>Op de kaart hiernaast zijn <span class="accent">wc's</span> in <span id="red">Amsterdam</span> te zien.</p>
        </div>
        <p class="description-sub">Click op een <span class="accent">wc</span> voor meer info!</p>
        <div class="img-container">
          <img src="@/assets/images/arrow.png" alt="image of a drawn arrow">
        </div>
        <p class="description-text">
          <span class="big">H</span>et komt wel voor dat je in de stad loopt en opeens dringend naar de wc moet, maar waar? In die moment heb je 
          haast en is het moeilijk te focussen, waar was er een wc alweer? Misschien is een openbare wc ver weg, dan maar 
          naar een café of restaurant dat in dezelfde straat zit, maar kan ik zomaar de wc gebruiken of moet ik eerst iets 
          kopen? Of moet ik voor de wc betalen? Worden de wc’s regelmatig gereinigd? Al de bovengenoemde informatie wil ik 
          verzamelen en overzichtelijk weergeven aan iedereen.
        </p>
      </div>
      <div id="map"></div>
    </main>
  </body>
</template>

<style scoped>
body {
  background: rgb(51,1,70);
  background: linear-gradient(0deg, rgba(51,1,70,1) 0%, rgba(43,0,131,1) 100%);
  padding: 0 2rem;
}

header h1 {
  font-family: Aladin;
  font-size: 3rem;
  color: var(--title-color);
  font-weight: bolder;
  margin: 0;
  padding-top: 1rem;
  transition: 0.3s;
}

header h1:hover {
  filter: invert(100%)
}

#radar {
  color: var(--title-color-2);
}

main {
  height: 90.1vh;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  cursor: default;
}

.description-container {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-top: 5rem;
  margin-right: 1rem;
}

.xxx {
  font-family: Acme-Regular;
  font-size: 2.5rem;
  font-weight: bolder;
  color: red;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.description-title {
  display: flex;
  flex-direction: row;
  font-family: Acme-Regular;
  font-size: 3.5rem;
  font-weight: bolder;
  color: var(--text-color);
}

.description-title p {
  padding: 0;
  margin: 0;
}

.description-sub {
  font-family: Acme-Regular;
  font-size: 1.8rem;
  color: var(--text-color);
  padding: 0;
  margin: 0 0 0 3.2rem;
}

.description-text {
  font-family: Acme-Regular;
  font-size: 1.5rem;
  color: var(--text-color);
  margin: 0;
  padding-left: 8px;
  text-align: justify;
  border-left: solid 3px var(--title-color);
}

img {
  filter: invert(100%);
  rotate: 146deg;
  transform: scaleX(-1);
  width: 10rem;
  height: 13rem;
  margin-left: 28rem;
  margin-top: -2rem;
}

.accent {
  color: var(--title-color)
}

#red {
  color: red;
}

.big {
  font-size: 2.25rem;
}

#map {
  height: 50rem;
  width: 60rem;
  border-radius: 3px;
  border: solid 3px var(--title-color);
}
</style>