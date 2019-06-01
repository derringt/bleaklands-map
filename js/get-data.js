function init() {
	Tabletop.init( { 	key: googleDocURL,
						callback: callback,
						simpleSheet: false } )
}

function callback(data, tabletop) {
	//addGroups(data["Group Names"].elements, tabletop);
	addMarkers(data["Markers"].elements, tabletop);
}