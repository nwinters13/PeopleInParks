window.fbAsyncInit = function() {
    FB.init({
      appId      : '661502127295972',
      xfbml      : true,
      cookie     : true,  // enable cookies to allow the server to access 
                        // the session
      version    : 'v2.1'
    });

      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

        FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });

      };

      // Load the SDK asynchronously
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    FB.Event.subscribe('auth.login', function(){location.reload()});
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
        FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
        if (response && !response.error) {
          console.log(response.id);
        }
        var db_request = new XMLHttpRequest();
        db_request.open('POST', "http://gatherup.herokuapp.com/login", true);
        //set request header
        db_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //send the request with my geolocation information
        db_request.send("user=" + response.id);
        db_request.onreadystatechange = function() {
          if (db_request.readyState == 4 && db_request.status == 200) {
            window.location = "account.html";
          }
        }
        });
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    } 
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log('done pressing')
      statusChangeCallback(response);
    });
  }