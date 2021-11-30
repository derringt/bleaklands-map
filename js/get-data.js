function init() {
          Papa.parse(nevriseaGoogleDocURL, {
          download: true,
          header: true,
          complete: function(results) {
            var nevriseadata = results.data
            console.log(nevriseadata)
			addNevrisea(nevriseadata);
          }
        })
}


//function nevriseaNodes(nevriseadata, tabletop) {
	
	//addNevriseaRoutes(data["Nevrisea Routes"].elements, tabletop);
//}


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


function addNevrisea(data) {
	for(const element of data) {
		console.log(element)
		if (!element.Y || !element.X || !element.Name) { continue; }
		
		if (element.Color) { iconColor = element.Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		if (element.Group) { group = window[element.Group.toLowerCase()]; } else { group = map; }
		L.marker([-element.Y,element.X], {icon: window[iconColor]}).addTo(group).bindPopup('<b>'+element.Name+'</b><br>'+element.Description);
	}
}



/*function addNevriseaRoutes(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].MarkerX || !data[i].Name || !data[i].MarkerY) { continue; }
		
		if (data[i].Color) { lineColor = data[i].Color.toLowerCase(); } else { lineColor = 'blue'; }
		if (data[i].Group) { group = window[data[i].Group.toLowerCase()]; } else { group = map; }
		var waypointLine = convertToIntPairArray(data[i]);
		L.polyline(waypointLine, { color: lineColor }).addTo(group);
		L.marker([-data[i].MarkerY,data[i].MarkerX], { icon: window[ lineColor + 'Icon' ] }).addTo(group).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}*/