//Creates the map, tells it to display in the element with id of 'mapid' and sets a flat projection, as we are projecting an image. 
var map = L.map('mapid', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
	zoomDelta: 0.25,
	minZoom: 2,
	maxZoom: 5
});

//Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var layer = L.tileLayer.zoomify('./badlands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 4096,    // MUST be defined.
    height: 3072,   // MUST be defined.
}).addTo(map);

//Setting the view to our layer bounds, set by our Zoomify plugin.
map.fitBounds(layer.getBounds());

//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var badlands = L.tileLayer.zoomify('./badlands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 4096,                                                                                        // MUST be defined.
    height: 3072,                                                                                       // MUST be defined.
    tolerance: 0.9, 
    }).addTo(map);
	
//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var byaza = L.tileLayer.zoomify('./byaza-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
    });

// Creates baseMaps layer and passes which maps to include in the layers control.
var baseMaps = {
    "Map of the Badlands": badlands,
	"Map of Byaza": byaza,
};

var poi = L.layerGroup();
var towns = L.layerGroup();
var byazaMarkers = L.layerGroup();

map.addLayer(poi);
map.addLayer(towns);

var allLayers = { poi, towns, byazaMarkers };

var badlandsMarkers = {
	"Towns" : towns,
	"Points of Interest": poi
	};

var control = L.control.activeLayers(baseMaps, badlandsMarkers, {collapsed: false});
control.addTo(map);

map.on('baselayerchange', function(e) {	
	for (var layerGroup in allLayers) {
		map.removeLayer(allLayers[layerGroup]);
		control.removeLayer(allLayers[layerGroup]);
	}
	switch(e.name) {
		case 'Map of Byaza':
			byazaMarkers.addTo(map);
			console.log('Byaza');
			break;
		case 'Map of the Badlands':
			poi.addTo(map);
			towns.addTo(map);
			control.addOverlay(towns, "Towns");
			control.addOverlay(poi, "Points of Interest");
			break;
		default:
	}
});