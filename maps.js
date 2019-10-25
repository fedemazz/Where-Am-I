        

function initAutocomplete() {
        var latlng = new google.maps.LatLng(39.305, -76.617);
        var map = new google.maps.Map(document.getElementById('map'), {
          center: latlng,
          zoom: 13,
          mapTypeId: 'roadmap',
          mapTypeControl: false
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          console.log(places[0].geometry.location.lat());
          console.log(places[0].geometry.location.lng());
          getOLC(places[0].geometry.location.lat(),places[0].geometry.location.lng());
          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));



            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }


        var olc;
        function getOLC(lat,lng){
        var olc_precise;
        var olc_city;
        var olc_reg;
    
    //Get JSON data using an AJAX request, and output the result -> req, resp
     $.getJSON('https://plus.codes/api?address='+lat+','+lng, function(data) {
           olc_precise = data.plus_code.global_code;
           olc_city = olc_precise.substring(0,6)+"00+";
           olc_reg = olc_precise.substring(0,4)+"0000+";  
           document.getElementById("plus code").innerHTML =olc_reg+":"+olc_city+":"+olc_precise;
           olc=olc_reg+":"+olc_city+":"+olc_precise;
        });
  }



    function creaMetadata(){
    var pourpose=document.getElementById("pourpose").value;
    var language=document.getElementById("language").value;
    var content=document.getElementById("content").value;
    var detail=document.getElementById("detail").value;
    var audience=document.getElementById("audience").value;
    var metadata=olc+":"+pourpose+":"+language+":"+content+":"+audience+":"+detail;
    console.log(metadata);
    return metadata;
 }