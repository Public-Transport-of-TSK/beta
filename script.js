// JavaScript code to fetch and display stops/stations
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search");
  const stopsList = document.getElementById("stops-list");

  // Function to fetch stops from OSM
  async function fetchStops() {
    try {
      const response = await fetch("https://overpass-api.de/api/interpreter?data=[out:json];(node[highway=bus_stop](48.9145,17.8539,49.1068,18.1626);node[public_transport=station](48.9145,17.8539,49.1068,18.1626););out;");
      const data = await response.json();
      return data.elements;
    } catch (error) {
      console.error("Error fetching stops:", error);
      return [];
    }
  }

  // Function to filter stops based on search input
  function filterStops(stops, searchText) {
    return stops.filter(stop => stop.tags && stop.tags.name && stop.tags.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  // Function to render stops list
  function renderStops(stops) {
    stopsList.innerHTML = "";
    stops.sort((a, b) => a.tags.name.localeCompare(b.tags.name)); // Sort stops alphabetically
    stops.forEach(stop => {
      const li = document.createElement("li");
      li.textContent = stop.tags.name;
      stopsList.appendChild(li);
    });
  }

  // Initial fetch and render
  fetchStops().then(stops => renderStops(stops));

  // Event listener for search input
  searchInput.addEventListener("input", async () => {
    const searchText = searchInput.value.trim();
    const stops = await fetchStops();
    const filteredStops = filterStops(stops, searchText);
    renderStops(filteredStops);
  });
});