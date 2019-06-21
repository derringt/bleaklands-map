# How to add a new map
1. Create a zoomified map using an original map file and Zoomify Free (<http://www.zoomify.com/free.htm>)
2. Put that entire folder that's created in the top-level of this project.
3. You will need to edit the following files: `js/get-data.js` and `js/map-setup.js`.
  1. In `js/get-data.js`, you will need to copy an existing function, rename it, and edit it slightly.

     ```function addByaza(data, tabletop) {
	for(i = 0; i < data.length; i++) {
		if (!data[i].Y || !data[i].X || !data[i].Name) { continue; }
		
		if (data[i].Color) { iconColor = data[i].Color.toLowerCase() + 'Icon'; } else { iconColor = 'blackIcon'; }
		L.marker([-data[i].Y,data[i].X], {icon: window[iconColor]}).addTo(byazaMarkers).bindPopup('<b>'+data[i].Name+'</b><br>'+data[i].Description);
	}
}```
  2. You need to give it a new name, relating to the map you're adding, and change `byazaMarkers` to a relevantly named variable. Take note of this variable.
  3. Repeat for routes if you'd like.
  4. Add those functions to the callback function, following the convention established. The text in the square brackets is the sheet name on the Google Sheet.