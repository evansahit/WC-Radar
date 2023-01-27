import type { WC, Marker } from "@/models/wc.interface";

let wcMarkers: Marker[] = [];

const wcList: WC[] = [
  {
    name: "Sanifair in Amsterdam Centraal Station",
    lat: 52.38041328760328,
    lng: 4.899741383320128,
    price: 0.7,
    isPublic: true,
  },
  {
    name: "Wc binnen Lovers Cafe",
    lat: 52.37885574952239,
    lng: 4.896731356050524,
    price: 0.7,
    isPublic: true,
  },
  {
    name: "Krul urinoir Brouwersgracht / Singel nabij Singelsluis",
    lat: 52.378983,
    lng: 4.894051,
    price: 0,
    isPublic: true,
  },
  {
    name: "WC in de Sexy loo",
    lat: 52.37299827726213,
    lng: 4.898203551376531,
    price: 2,
    isPublic: true,
  },
  {
    name: "Krul urinoir Herenmarkt / Brouwersgracht",
    lat: 52.379413,
    lng: 4.891667,
    price: 0,
    isPublic: true,
  },
  {
    name: "Wc binnen de Magna Plaza",
    lat: 52.37364134882097,
    lng: 4.890462003142741,
    price: 1,
    isPublic: true,
  },
  {
    name: "Wc binnen Loetje Centraal",
    lat: 52.377579595533895,
    lng: 4.900389661445332,
    price: 1,
    isPublic: true,
  },
  {
    name: "Wc binnen Buersplein, Fietsenstalling",
    lat: 52.374057,
    lng: 4.895078,
    price: 0.5,
    isPublic: true,
  },
  {
    name: "Wc de Kalverpassage",
    lat: 52.36743700329051,
    lng: 4.89223971519816,
    price: 1,
    isPublic: true,
  },
  {
    name: "Krul urinoir op de Singel",
    lat: 52.37314826774108,
    lng: 4.889107004432091,
    price: 1,
    isPublic: true,
  },
];

wcList.forEach((wc) => {
  wcMarkers.push({ lat: wc.lat, lng: wc.lng });
});

export { wcList, wcMarkers };
