document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("search");
  const stopsList = document.getElementById("stops-list");

  async function fetchStops() {
    const response = await fetch("https://overpass-api.de/api/interpreter?data=[out:json];(node[highway=bus_stop](48.9145,17.8539,49.1068,18.1626);node[public_transport=station](48.9145,17.8539,49.1068,18.1626););out;");
    const data = await response.json();
    return data.elements;
  }

  function filterStops(stops, searchText) {
    return stops.filter(stop => stop.tags.name.toLowerCase().includes(searchText.toLowerCase()));
  }

  function renderStops(stops) {
    stopsList.innerHTML = "";
    stops.forEach(stop => {
      const li = document.createElement("li");
      li.textContent = stop.tags.name;
      stopsList.appendChild(li);
      li.addEventListener("click", () => {
        window.location.href = `map.html?lat=${stop.lat}&lon=${stop.lon}&name=${stop.tags.name}`;
      });
    });
  }

  fetchStops().then(stops => renderStops(stops));

  searchInput.addEventListener("input", async () => {
    const searchText = searchInput.value.trim();
    const stops = await fetchStops();
    const filteredStops = filterStops(stops, searchText);
    renderStops(filteredStops);
  });
});