function init() {
	Tabletop.init( { 	key: googleDocURL,
						callback: callback,
						simpleSheet: false } )
}
function callback(data, tabletop) {
	addBadlands(data["Markers"].elements, tabletop);
	addByaza(data["Byaza Markers"].elements, tabletop);
	addSolitude(data["Solitude Markers"].elements, tabletop);
	addMeridiem(data["Meridiem Markers"].elements, tabletop);
}


function addByaza(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (data[i].Color) { color = data[i].Color.toLowerCase() + 'Icon'; } else { color = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[color]}).addTo(byazaMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addBadlands(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { color = data[i].Color.toLowerCase() + 'Icon'; } else { color = 'blackIcon'; }
		if (data[i].Group) { group = window[data[i].Group.toLowerCase()]; } else { group = map; }
		L.marker([-data[i].Y,data[i].X], {icon: window[color]}).addTo(group).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addSolitude(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (data[i].Color) { color = data[i].Color.toLowerCase() + 'Icon'; } else { color = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[color]}).addTo(solitudeMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addMeridiem(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (data[i].Color) { color = data[i].Color.toLowerCase() + 'Icon'; } else { color = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[color]}).addTo(meridiemMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}