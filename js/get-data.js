function init() {
	Tabletop.init( { 	key: googleDocURL,
						callback: callback,
						simpleSheet: false } )
}

function callback(data, tabletop) {
	addBadlands(data["Badlands Markers"].elements, tabletop);
	addByaza(data["Byaza Markers"].elements, tabletop);
	addPassages(data["Passages Markers"].elements, tabletop);
	addMeridiem(data["Meridiem Markers"].elements, tabletop);
	addBadlandsRoutes(data["Badlands Routes"].elements, tabletop);
	addPassagesRoutes(data["Passages Routes"].elements, tabletop);
	addMorra(data["Morra Markers"].elements, tabletop);
}

function convertToIntPairArray(dict) {
	var intPairs = [];
	for (var key in dict) {
		if (key.startsWith("Waypoint") && dict[key]) {
			intPairs.push(dict[key].split(",").map(Number));
		}
	}
	intPairs.forEach( function(element) {
		var temp = element[0];
		element[0] = -element[1];
		element[1] = temp;
	});
	return intPairs;
}

function addByaza(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[iconColor]}).addTo(byazaMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addBadlands(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		if (data[i].Group) { group = window[data[i].Group.toLowerCase()]; } else { group = map; }
		L.marker([-data[i].Y,data[i].X], {icon: window[iconColor]}).addTo(group).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addPassages(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[iconColor]}).addTo(passagesMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addMeridiem(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], { icon: window[iconColor] }).addTo(meridiemMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addBadlandsRoutes(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].MarkerX || !data[i].Name || !data[i].MarkerY) { continue; }
		
		if (data[i].Color) { lineColor = data[i].Color.toLowerCase(); } else { lineColor = 'blue'; }
		if (data[i].Group) { group = window[data[i].Group.toLowerCase()]; } else { group = map; }
		var waypointLine = convertToIntPairArray(data[i]);
		L.polyline(waypointLine, { color: lineColor }).addTo(group);
		L.marker([-data[i].MarkerY,data[i].MarkerX], { icon: window[ lineColor + 'Icon' ] }).addTo(group).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addPassagesRoutes(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].MarkerX || !data[i].Name || !data[i].MarkerY) { continue; }
		
		if (data[i].Color) { lineColor = data[i].Color.toLowerCase(); } else { lineColor = 'blue'; }
		if (data[i].Group) { group = window[data[i].Group.toLowerCase()]; } else { group = map; }
		var waypointLine = convertToIntPairArray(data[i]);
		L.polyline(waypointLine, { color: lineColor }).addTo(group);
		L.marker([-data[i].MarkerY,data[i].MarkerX], { icon: window[ lineColor + 'Icon' ] }).addTo(group).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}

function addMorra(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[iconColor]}).addTo(morraMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}