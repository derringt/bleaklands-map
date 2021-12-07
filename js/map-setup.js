//Creates the map, tells it to display in the element with id of 'mapid' and sets a flat projection, as we are projecting an image. 
var map = L.map('mapid', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
	zoomDelta: 0.25,
	minZoom: 2,
	maxZoom: 5
	});
	
//Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var layer = L.tileLayer.zoomify('./nevrisea-map/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,    // MUST be defined.
    height: 1800,   // MUST be defined.
	}).addTo(map);

//Setting the view to our layer bounds, set by our Zoomify plugin.
map.fitBounds(layer.getBounds());

//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var nevrisea = L.tileLayer.zoomify('./nevrisea-map/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,                                                                                        // MUST be defined.
    height: 1800,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	}).addTo(map);
	
var nevriseanoterrain = L.tileLayer.zoomify('./nevrisea-no-terrain/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,                                                                                        // MUST be defined.
    height: 1800,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	});

var bleaklandsSW = L.tileLayer.zoomify('./bleak-lands-map/{g}/{z}-{x}-{y}.jpg', {
    width: 3200,                                                                                        // MUST be defined.
    height: 2400,                                                                                       // MUST be defined.
    tolerance: 0.9, 
	});
	
// Creates baseMaps layer and passes which maps to include in the layers control.
var baseMaps = {
    "Nevrisea": nevrisea,
	"Nevrisea Without Terrain": nevriseanoterrain,
	"Bleak Lands": bleaklandsSW
	};

var nevriseapoi = L.layerGroup();
var nevriseatowns = L.layerGroup();
var bleaklandsSWpoi = L.layerGroup();
var bleaklandsSWtowns = L.layerGroup();

map.addLayer(nevriseapoi);
map.addLayer(nevriseatowns);

var allLayers = { nevriseapoi, nevriseatowns, bleaklandsSWtowns, bleaklandsSWpoi };

var nevriseaMarkers = {
	"Towns" : nevriseatowns,
	"Points of Interest": nevriseapoi,
	};
	
var bleaklandsSWMarkers = {
	"Towns" : bleaklandsSWtowns,
	"Points of Interest": bleaklandsSWpoi,
	};

var control = L.control.activeLayers(baseMaps, nevriseaMarkers, {collapsed: false});
control.addTo(map);

map.on('baselayerchange', function(e) {	
	for (var layerGroup in allLayers) {
		map.removeLayer(allLayers[layerGroup]);
		control.removeLayer(allLayers[layerGroup]);
	}
	switch(e.name) {
		case 'Nevrisea':
		case 'Nevrisea Without Terrain':
			nevriseapoi.addTo(map);
			nevriseatowns.addTo(map);
			control.addOverlay(nevriseatowns, "Towns");
			control.addOverlay(nevriseapoi, "Points of Interest");
			break;
		case 'Bleak Lands':
			bleaklandsSWpoi.addTo(map);
			bleaklandsSWtowns.addTo(map);
			control.addOverlay(bleaklandsSWtowns, "Towns");
			control.addOverlay(bleaklandsSWpoi, "Points of Interest");
		default:
	}
});

function swapMap(name) {
	var layerControlElement = document.getElementsByClassName('leaflet-control-layers')[0];
	switch(name) {
		case 'Nevrisea':
			layerControlElement.getElementsByTagName('input')[0].click();
			return false;
			break;
		case 'Nevrisea Without Terrain':
			layerControlElement.getElementsByTagName('input')[1].click();
			return false;
			break;
		case 'Bleak Lands':
			layerControlElement.getElementsByTagName('input')[2].click();
			return false;
			break;
		default:
			return true;
	}
}