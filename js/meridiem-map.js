//Creates the map, tells it to display in the element with id of 'mapid' and sets a flat projection, as we are projecting an image. 
var map = L.map('mapid', { 
    crs: L.CRS.Simple, //Set a flat CRS (Coordinate Reference System) projection as we are projecting an image.
	zoomDelta: 0.25,
	minZoom: 2,
	maxZoom: 4
});

//Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var layer = L.tileLayer.zoomify('./meridiem-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,    // MUST be defined.
    height: 1536,   // MUST be defined.
}).addTo(map);

//Setting the view to our layer bounds, set by our Zoomify plugin.
map.fitBounds(layer.getBounds());

//Creates the switchable map layers. Change the URL to reflect where you are hosting your map tiles. Width and Height of original image MUST be defined.
var meridiem = L.tileLayer.zoomify('./meridiem-map/{g}/{z}-{x}-{y}.jpg', {
    width: 2048,                                                                                        // MUST be defined.
    height: 1536,                                                                                       // MUST be defined.
    tolerance: 0.9, 
//    attribution: 'Map by <a href="https://hreikin.co.uk" target="_blank" alt="hreikin">@hreikin</a>'    // Attribution which appears in the bottom left corner, change this value to whatever you like.
    }).addTo(map);

// Creates baseMaps layer and passes which maps to include in the layers control.
var baseMaps = {
    "Meridiem": meridiem,        // The value within quotation marks is the name of the switchable control as it appears on the map. The second value is the layer name.
};

var meridiemMaps = {
	};


/*
function addGroups(data, tabletop) {
	console.log(data);
	for(i = 0; i < data.length; i++) {
		window[data[i].Name] = L.layerGroup();
		console.log(window[data[i].Name]);
		console.log(data[i].Name);
		overlayMaps[data[i].Description] = this[data[i].Name];
	}
	console.log(overlayMaps);
}
*/
// Creates a switchable layers control from baseMaps and overlayMaps and adds them to map.
L.control.layers(baseMaps, meridiemMaps).addTo(map);