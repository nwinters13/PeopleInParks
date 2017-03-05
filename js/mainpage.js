window.fbAsyncInit = function() {
FB.init({
  appId      : '661502127295972',
  xfbml      : true,
  cookie     : true,  // enable cookies to allow the server to access 
                    // the session
  version    : 'v2.1'
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    //FB.Event.subscribe('auth.login', login_event);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      window.location = "index.html";
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
      window.location = "index.html";
    } 
  }

function inviteFriendsToGroup() {
//for friends that already use
FB.api("/me/friends",
  function (response) {
    if (response && !response.error) {
      var container = document.getElementById('myModal');
    }
    // Iterate through the array of friends object and create a checkbox for each one.
    for(var i = 0; i < Math.min(response.data.length, 10); i++) {
     var friendItem = document.createElement('div');
     friendItem.id = 'friend_' + response.data[i].id;
     friendItem.innerHTML = '<input type="checkbox" name="friends" value="'
       + response.data[i].id
       + '" />' + response.data[i].name;
       myModal.appendChild(friendItem);
     }
     container.appendChild(myModal);

     // Create a button to send the Request(s)
     var sendButton = document.createElement('input');
     sendButton.type = 'button';
     sendButton.value = 'Send Request';
     sendButton.onclick = sendRequest;
     myModal.appendChild(sendButton);

  });
}

function sendRequest() {
   // Get the list of selected friends
   var sendUIDs = '';
   var myModal = document.getElementById('myModal');
     for(var i = 0; i < myModal.friends.length; i++) {
       if(myModal.friends[i].checked) {
         sendUIDs += myModal.friends[i].value + ',';
       }
     }

   // Use FB.ui to send the Request(s)
   FB.ui({method: 'apprequests',
     to: sendUIDs,
     title: 'My Great Invite',
     message: 'Check out this Awesome App!',
   }, callback);
 }

 function callback(response) {
   console.log(response);
 }