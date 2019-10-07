function createMap(WorldAirports) {

  // Create the tile layer that will be the background of our map
  var baseMap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Satellite Map": baseMap
  };

  // Create an overlayMaps object to hold the bikeStations layer
  var overlayMaps = {
    "World Airports": WorldAirports
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [baseMap, WorldAirports]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {

    var airportMarkers = [];
    
    // Loop through the stations array
     for (var index = 0; index < response.length; index++) {
    var airport = response[index];
    // For each station, create a marker and bind a popup with the station's name
    var airportMarker = L.circle([airport.lat_decimal, airport.lon_decimal])
      .bindPopup("<h3>Country: " + airport.country + "<h3><h3>City: " + airport.city + "<h3>");

    // Add the marker to the bikeMarkers array
    airportMarkers.push(airportMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(airportMarkers));
}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("airports.json", createMarkers);

// console.log(destiny_lat);
// var line = [
//   [origin_lat, origin_lon],
//   [destiny_lat, destiny_lon]
//   // [51.507222, -0.1275],
//   // [16.86287, -99.887009],
// ];

// // Create a polyline using the line coordinates and pass in some initial options
// L.polyline(line, {
//   color: "red"
// }).addTo(map);
