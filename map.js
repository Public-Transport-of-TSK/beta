const urlParams = new URLSearchParams(window.location.search);
const lat = parseFloat(urlParams.get('lat'));
const lon = parseFloat(urlParams.get('lon'));
const name = urlParams.get('name');

const map = L.map('map').setView([lat, lon], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

const marker = L.marker([lat, lon]).addTo(map);
marker.bindPopup(name).openPopup();