// JavaScript code to initialize the map
const map = L.map('map').setView([48.894611, 18.056844], 13); // Default location (Trenčiansky Region)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);