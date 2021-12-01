//Creates the map, tells it to display in the element with id of 'mapid' and sets a flat projection, as we are projecting an image. 
var map = L.map('mapid', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
	zoomDelta: 0.25,
	minZoom: 2.5,
	maxZoom: 5
	});
	
//Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var layer = L.tileLayer.zoomify('./the-bleak-lands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,    // MUST be defined.
    height: 1800,   // MUST be defined.
	}).addTo(map);

//Setting the view to our layer bounds, set by our Zoomify plugin.
map.fitBounds(layer.getBounds());

//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var bleaklands = L.tileLayer.zoomify('./the-bleak-lands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,                                                                                        // MUST be defined.
    height: 1800,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	}).addTo(map);

// Creates baseMaps layer and passes which maps to include in the layers control.
var baseMaps = {
    "The Bleak Lands": bleaklands
	};

var poi = L.layerGroup();
var towns = L.layerGroup();

map.addLayer(poi);
map.addLayer(towns);

var allLayers = { poi, towns };

var bleaklandsMarkers = {
	"Towns" : towns,
	"Points of Interest": poi,
	};

var control = L.control.activeLayers(baseMaps, nevriseaMarkers, {collapsed: false});
control.addTo(map);

map.on('baselayerchange', function(e) {	
	for (var layerGroup in allLayers) {
		map.removeLayer(allLayers[layerGroup]);
		control.removeLayer(allLayers[layerGroup]);
	}
	switch(e.name) {
		case 'The Bleak Lands':
			poi.addTo(map);
			towns.addTo(map);
			control.addOverlay(towns, "Towns");
			control.addOverlay(poi, "Points of Interest");
			break;
		default:
	}
});

function swapMap(name) {
	var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
	switch(name) {
		case 'The Bleak Lands':
			layerControlElement.getElementsByTagName('input')[0].click();
			return false;
			break;	
		default:
			return true;
	}
}