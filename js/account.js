  window.fbAsyncInit = function() {
    FB.init({
      appId      : '661502127295972',
      xfbml      : true,
      cookie     : true,  // enable cookies to allow the server to access 
                        // the session
      version    : 'v2.1'
    });

var form = document.getElementsByClassName("form-control");
var button = document.getElementsByClassName("input-group-btn");
button.onClick = sendRequest();

function sendRequest() {
	var request = new XMLHttpRequest();
	var id;
	var myLat;
	var my Lng;

	FB.api('/me', function(response) {
		if (response && !response.error) {
	          		id = response.id;
	        }
	});
	if (navigator.geolocation) { 
				navigator.geolocation.getCurrentPosition(function(position) {
					myLat = position.coords.latitude;
					myLng = position.coords.longitude;
				});
				
		}


	request.open('POST', 'http://gatherup.herokuapp.com/createEvent', true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("eventID=" + form + "&user=" + id);
	myEvents = document.getElementById("events").getElementsByClassName("list-group-item");
	if(myEvents.length == 1) {
		myEvents[0] = form;
	}
	else {
		getElementById("events").getElementsByClassName("list-group").innerHTML += "<li class='list-group-item'>" + form + "</li>";
	}


}