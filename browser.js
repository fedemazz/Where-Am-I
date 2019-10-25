var map;
var location;
var lat;
var lng;
var olc_reg;
var olc_city;
var olc_precise;
var olc_scelto
var marker;
var radius;
var routingControl;

function init() {
  console.log("init()")
  document.getElementById("myIframe").style.display = "none";
  map = new L.Map('map');
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(map);

  L.control.scale().addTo(map);
  var searchControl = new L.esri.Controls.Geosearch().addTo(map);
  results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    console.log("ricerca");
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
     results.addLayer(L.marker(data.results[i].latlng));
     console.log(data.results[i].latlng.lat);
     lat = data.results[i].latlng.lat;
     lng = data.results[i].latlng.lng;
     getOLC(lat,lng);
     addCurrentDistance();
   }
 });
  setTimeout(function(){$('.pointer').fadeOut('slow');},3400);


      	map.attributionControl.setPrefix(''); 

      getLocationLeaflet();
      creaPlayer();
    }

    var results;
    var latInit;
    var latLng;

    function onLocationFound(e) {
     console.log("onLocationFound()");
     document.getElementById("myIframe").style.display = "none";
     var radius = e.accuracy / 2;
     var location = e.latlng
     lat=e.latlng.lat;
     lng=e.latlng.lng;
     latInit=lat;
     lngInit=lng;

     results.clearLayers();
     results = new L.LayerGroup().addTo(map);






     var greenIcon = new L.Icon({
      iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

     marker=L.marker(location,{draggable:'true',icon: greenIcon});
     marker.bindPopup("Ti trovi qui!");

     results.addLayer(marker);
     // .bindPopup("You are within " + radius + " meters from this point"+lat).openPopup();

     marker.openPopup();
     //inserisco opzione marker draggable
     marker.on('dragend', function(event) {
     	//results.clearLayers();
       var marker = event.target;  
       location=marker.getLatLng();
       lat = marker.getLatLng().lat;
       lng = marker.getLatLng().lng;
       console.log("drag");
     addCurrentDistance(); //calcola nuove distanze se il marker viene spostato
     getOLC(lat,lng);
   });

     addCurrentDistance();
     getOLC(lat,lng);
     marker.on('click', L.DomEvent.stopPropagation);
     //marker.addTo(map);
   }

   function getOLC(lat,lng){
     console.log("getOLC()");
     $.getJSON('https://plus.codes/api?address='+lat+','+lng, function(data) {
       olc_precise = `${data.plus_code.global_code}`; 
       olc_city = olc_precise.substring(0,6)+"00+";
       olc_reg = olc_precise.substring(0,4)+"0000+";  

      if (document.getElementById("reg").checked){
          olc_scelto = olc_reg;
          console.log("si reg")
       }
       else { 
            if (document.getElementById("citta").checked) {
                olc_scelto = olc_city;
                console.log("si city")
            }
            else { 
              olc_scelto = olc_precise;
              console.log("si prec") } 

   }

     });
     
   }

   function choicedOLC(){
 if (document.getElementById("reg").checked){
          olc_scelto = olc_reg;
          console.log("si reg")
       }
       else { 
            if (document.getElementById("citta").checked) {
                olc_scelto = olc_city;
                console.log("si city")
            }
            else { 
              olc_scelto = olc_precise;
              console.log("si prec") } 

   }
   //layerMarkers.clearLayers();
   searchYT();
 }

   function onLocationError(e) {
     alert(e.message);
   }

   function getLocationLeaflet() {
     map.on('locationfound', onLocationFound);
     map.on('locationerror', onLocationError);
     map.locate({setView: true, maxZoom: 16});
   }


   var i=0;
   var layerGroup
   var route;
   var vettore=[];
   var result=[];

   function searchYT() {


      if(typeof layerMarkers !== 'undefined'){
        // this statement will not execute
         layerMarkers.clearLayers();
      }

      console.log("searchYT()");
      //esegue ricerca su YT alla ricerca dei video che corrispondono agli olc
      var i=0;
      var url_searchYT;
      var metadata;

      var fields;
      var olc_gen;
      var olc;
      var videoID;
      var pourpose;
      var language;
      var content;
      var audience;
      var detail;
      var title;

      url_searchYT='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+olc_scelto+'&maxResults=25&key=AIzaSyDnAzOHmO6Tu_Bh31CIrxaJv_JOTZG_36Q';
      //url_searchYT='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+olc_scelto+'&maxResults=25&key=AIzaSyBXUuqi8y8hmunj8pd5Fj3lxZcYAzzO9DI';
      //url_searchYT='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+olc_scelto+'&maxResults=25&key=AIzaSyBS6jZfzrZ7bARv-RnBTkCUUOm1NfP0F3M';
      //url_searchYT='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+olc_scelto+'&maxResults=25&key=AIzaSyCAoJ_6_MQK-KjFWa_l1J13nisDxCA89b0';
      //url_searchYT='https://www.googleapis.com/youtube/v3/search?part=snippet&q='+olc_scelto+'&maxResults=25&key=AIzaSyDnAzOHmO6Tu_Bh31CIrxaJv_JOTZG_36Q';
      
      
      console.log(url_searchYT);
      vettore = [];
      result=[];

      $.getJSON(url_searchYT, function(data) {
        var totalResult = `${data.pageInfo.totalResults}`;
        while(i<totalResult){

         metadata=`${data.items[i].snippet.description}`;
         videoID=`${data.items[i].id.videoId}`;
         title=`${data.items[i].snippet.title}`;
         if(metadata!=""){
	    			//metadata=metadataAppoggio;

	    			fields = metadata.split(':');
            olc_abs=fields[0];
            olc_gen = fields[1];
            olc=fields[2];
            pourpose= fields[3];
            language=fields[4];
            content=fields[5];
            audience=fields[6];
            detail=fields[7];
	     	//aggiungo ad un vettore i dettagli dei video nelle vicinanze (mancano coordinate)
        vettore.push({metadata,olc_abs,olc_gen,olc,videoID,pourpose,language,content,audience,detail,title});


        //recupero coordinate e le aggiungo ai dati raccolti prima
        //il tutto è contenuto nel vettore finale result
        result.push(insertCoordinate(vettore[i]));
        //metodo beta, in questo metodo potrebbe andarci la lettura dei filtri impostati dall'utente e anche il calcolo del marker più vicino
        creaMarker(olc,videoID,title);
      }
      i=i+1;
      console.log(result);

      layerMarkers= new L.LayerGroup().addTo(map);
    } 
  });    
    }





    var layerMarkers;
    var clickedMarker={clicked: false, id:"",title:""};

    function creaMarker(olc,videoID,title){
     console.log("creaMarker()");
      var url1= 'https://plus.codes/api?address='+olc;
      var url = url1.replace("+", "%2B");
      var latitudine;
      var longitudine;
      $.getJSON(url, function(data){ 

        latitudine = `${data.plus_code.geometry.location.lat}`;  
        longitudine = `${data.plus_code.geometry.location.lng}`;  

        var markerLocation2 = new L.LatLng(latitudine, longitudine);
        var id = videoID;
        var marker2 = new L.Marker(markerLocation2,{title: id}).on('click', function(e) {
            clickedMarker={clicked: true, id:videoID,title:title};
            console.log("Marker cliccato"+clickedMarker);
        });
        marker2.bindPopup(title);

        layerMarkers.addLayer(marker2);
        addCurrentDistance();
      });
    }

    function insertCoordinate(vettore){
      var olcTemp=vettore.olc
      var url1= 'https://plus.codes/api?address='+olcTemp;
      var url = url1.replace("+", "%2B");
      
      $.getJSON(url, function(data){ 

        var latitudine = `${data.plus_code.geometry.location.lat}`;  
        var longitudine = `${data.plus_code.geometry.location.lng}`;
        vettore.latitudine=latitudine;
        vettore.longitudine=longitudine; 
      });
      return vettore;
    }


    function addRoutingControl(waypoints){
      console.log("funzione: addRoutingControl");

      
      if (routingControl != null)
        removeRoutingControl();
      routingControl = L.Routing.control({
        waypoints: waypoints
      }).addTo(map);

      var greenIcon = new L.Icon({
       iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
       shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
       iconSize: [25, 41],
       iconAnchor: [12, 41],
       popupAnchor: [1, -34],
       shadowSize: [41, 41]
     });

      routingControl.on('routesfound', function(e) {
        var routes = e.routes;
        var summary = routes[0].summary;
  // alert time and distance in km and minutes
      console.log('Total distance is ' + summary.totalDistance / 1000 + ' km and total time is ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
      });
    }


    function removeRoutingControl(){
     console.log("removeRoutingControl()");
      if (routingControl != null) {
        map.removeControl(routingControl);
        routingControl = null;
      }
    }



var nearestResult;

//aggiunge la distanza corrente del vettore result (quello con la ricerca di yotube) a tutti i punti di interesse vicini trovati
//è dinamico, basta spostare il marker e le nuove distanze saranno calcolate
function addCurrentDistance() {
  currentPosition=L.latLng(lat,lng );
  var n=0;
  while (n<result.length){
    distanceTemp=getDistance([currentPosition.lat, currentPosition.lng], [result[n].latitudine, result[n].longitudine]);

    result[n].distance=distanceTemp;
    n=n+1;
  }
  ordinaResult();
  console.log("nuove distanze trovate");
}

function ordinaResult(){
 for (var  i=1; i <result.length; i++){
  for (var j=i; j>0 && result[j].distance<result[j-1].distance; j--){
   if(result[j].distance < result[j-1].distance){
    var temp = result[j];
    result[j] = result[j-1];
    result[j-1] = temp;
  }
}
}
}



var lastResult=[];
var contaClick=-1;
var resultSingle=[];
var olcSingle;

function filtraDuplicati(){

  console.log("filtraDuplicati()");
  if(contaClick==-1){
    olcSingle=[...new Set(result.map(x=>x.olc))];
    

    for(var i=0;i<olcSingle.length;i++){
     for(var j=0;j<result.length;j++){

      if(olcSingle[i]==result[j].olc){
        resultSingle.push(result[j]);
        break;
      }
    }
  }
}
}

function goToNextMarker(){
contatore=0;
console.log("goToNextMarker()");
filtraDuplicati();
if(contaClick>=resultSingle.length-1){
   contaClick=resultSingle.length-1;
 }else{ contaClick++; 
      }

addRoutingControl([L.latLng(lat,lng),
     L.latLng(resultSingle[contaClick].latitudine,resultSingle[contaClick].longitudine)
     ]);

document.getElementById("arrived").value = resultSingle[contaClick].videoID+":"+resultSingle[contaClick].latitudine+":"+resultSingle[contaClick].longitudine+":"+resultSingle[contaClick].olc+":"+resultSingle[contaClick].title;




}



function goToPreviousMarker(){
contatore=0;
     console.log("goToPreviousMarker()");


 if(contaClick==resultSingle.length){
  contaClick=resultSingle.length-1;
}

addRoutingControl([L.latLng(lat,lng),
   L.latLng(resultSingle[contaClick-1].latitudine,resultSingle[contaClick-1].longitudine)
   ]);

document.getElementById("arrived").value = resultSingle[contaClick-1].videoID+":"+resultSingle[contaClick-1].latitudine+":"+resultSingle[contaClick-1].longitudine+":"+resultSingle[contaClick-1].olc+":"+resultSingle[contaClick-1].title;


if(contaClick<=0){
 contaClick=0;
}else{ contaClick--;}



}



var contatore=0;
function getMoreVideo(){ 

     console.log("getMoreVideo()");

  var id = document.getElementById("arrived").value;

  console.log("getMoreVideo()"+id);
  var idButton = id.split(':');
  var idVideo=idButton[0];
  var currentOlc=idButton[3];
  var currentTitle=idButton[4];

  for(var i=contatore;i<result.length;i++){
    if(result[i].olc==currentOlc && result[i].videoID!=idVideo){
      contatore++;
      player.loadVideoById(result[i].videoID);
      idVideo=result[i].videoID;
      document.getElementById("p").innerHTML = result[i].title;

      break;
    }

    contatore++;

  }
}


var player;
function creaPlayer(){
 console.log("creaPlayer()");
 player = new YT.Player('myIframe', {
  width: 100,
  height: 100,
  playerVars: {
    color: 'white',
    autoplay:1
  }
});
}


function playVideo(){
  console.log("playVideo()");
  removeRoutingControl();
  document.getElementById("myIframe").style.display = "block";

  var id = document.getElementById("arrived").value;

  var idButton = id.split(':');
  var idVideo=idButton[0];
  var currentLat = idButton[1];
  var currentLng=idButton[2];
  var  currentTitle=idButton[4];


  document.getElementById("p").innerHTML = currentTitle;

  player.loadVideoById(idVideo);

  var visitedlat=currentLat;
  var visitedlng=currentLng;
  results.clearLayers();



  lat=currentLat;
  lng=currentLng;

  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  marker=L.marker([lat,lng],{draggable:'true',icon: greenIcon});
  marker.bindPopup("Ti trovi qui!");



  marker.on('dragend', function(event) {
     	//results.clearLayers();
       var marker = event.target;  
       lat=currentLat;
       lng=currentLng;
       console.log("drag");
     addCurrentDistance(); //calcola nuove distanze se il marker viene spostato
     getOLC(lat,lng);
   });

  addCurrentDistance();
  getOLC(lat,lng);
  marker.on('click', L.DomEvent.stopPropagation);
     //marker.addTo(map);
     results.addLayer(marker);
     marker.openPopup();

   }


   function getDistance(origin, destination) {
    // return distance in meters
    var lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0]);

    var deltaLat = lat2 - lat1;
    var deltaLon = lon2 - lon1;

    var a = Math.pow(Math.sin(deltaLat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon/2), 2);
    var c = 2 * Math.asin(Math.sqrt(a));
    var EARTH_RADIUS = 6371;
    return c * EARTH_RADIUS * 1000;
  }

  function toRadian(degree) {
    return degree*Math.PI/180;
  }

  var vettoreFilter=[];
  var resultFiltrato=[];


  function getFilter(){
  console.log("getFilter");
   resultSingle=[];

   removeRoutingControl();
   contaClick=-1;
   layerMarkers.clearLayers();

   var pourpose = document.getElementById("purpose").value;
   var audience = document.getElementById("audience").value;
   var lenguage = document.getElementById("lenguage").value;
   var content = document.getElementById("content").value;
   var detail = document.getElementById("detail").value;

   vettoreFilter=[];
   vettoreFilter.push(pourpose,audience,lenguage,content,detail);
   console.log("getFilter()"+vettoreFilter); 
   resultFiltrato=[];
   for(var i=0;i<result.length;i++){
    var conta=0;
    for(var j=0;j<vettoreFilter.length;j++){
     if(((result[i].pourpose==vettoreFilter[j] || vettoreFilter[j]=="0") || (result[i].audience==vettoreFilter[j] || vettoreFilter[j]=="0") || (result[i].content==vettoreFilter[j] || vettoreFilter[j]=="0")|| (result[i].language==vettoreFilter[j] || vettoreFilter[j]=="0") || (result[i].detail==vettoreFilter[j] || vettoreFilter[j]=="0"))){
       conta++;
     }

   }
   if(conta==5){
    var olc=result[i].olc;
    var idVideo=result[i].videoID;
    var title=result[i].title;

    creaMarker(olc,idVideo,title);
    
    resultFiltrato.push(result[i]);
  }
}

$('#buttonSave').click(function() {
  $('#exampleModalCenter').modal('hide');
});


result=resultFiltrato;
console.log("result dopo i filtri:"+result);
}


$('#play').on('click', function () {
  player.playVideo();

});

$('#pause').on('click', function () {
  player.pauseVideo();
});

function pause(){
 player.pauseVideo();
}

function play(){
  console.log("play()");
  //funzione richiamata quando viene premuto il tasto play
  //se un marker è cliccato riproduce quel video altrimenti fa solo play del video gia caricato
  if (clickedMarker.clicked) {
    document.getElementById("p").innerHTML = clickedMarker.title;
    document.getElementById("myIframe").style.display = "block";
    player.loadVideoById(clickedMarker.id);
    clickedMarker={clicked:false,id:"",title:""};
  }
  else {
   player.playVideo();
 }
}