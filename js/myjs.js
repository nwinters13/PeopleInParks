var map;
var places;
var myPlaces;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(42.4055470, -71.1238240)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    setupMap();
}

google.maps.event.addDomListener(window, 'load', initialize);


function setupMap()
{
	if (navigator.geolocation) { 
				navigator.geolocation.getCurrentPosition(function(position) {
					myLat = position.coords.latitude;
					myLng = position.coords.longitude;
				});
				
	}
	var latlng = new google.maps.LatLng(myLat, myLng);
	var request = {
			location: latlng,
			radius: '500',
			types: ['food']
			};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
}
// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
function callback(results, status)
{
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		alert("Got places back!");
		places = results;
		console.log("testing status");
		for (var i = 0; i < 6; i++) {
			console.log(results[i]);
			createMarker(results[i]);
			console.log("created an marker");

		}
	}
	loadData();
}
function createMarker(place)
{
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
				
}


function loadData() 
{
	myPlaces = document.getElementById("places").getElementsByClassName("list-group-item");
	for(var i =0; i < 6; i++) {
			myPlaces[i].innerHTML = places[i].name;
	}
	var myFriends = document.getElementById("people").getElementsByClassName("list-group-item");

	for(var i =0; i < myFriends.length; i++) {
		// do something with myFriends[
	}

}

