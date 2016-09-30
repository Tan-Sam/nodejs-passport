
var map = null;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
  		center: {lat: 0, lng: 0},
  		zoom: 2
	});
}

document.addEventListener("DOMContentLoaded", function(event) { 

  var socket = io.connect('http://localhost:3000'); // Connect

  socket.on('tweet', function (tweet) {
 // 	console.log(tweet);

 	console.log( tweet.place.bounding_box.coordinates[0][0][1], tweet.place.bounding_box.coordinates[0][0][0] );


  	if(!map){
  		return;
  	}



  	// Create position object from the lat/long of the tweet
 	var posistion = {
        lat: tweet.place.bounding_box.coordinates[0][0][1],
        lng: tweet.place.bounding_box.coordinates[0][0][0]
    };

    // Create new marker
	var marker = new google.maps.Marker({
  		position: posistion,
  		map: map,
  		title: tweet.text
	});
  });
});