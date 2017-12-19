$(document).ready(function () {

  var circles = L.layerGroup();

  // Create the map
  var options = {
    attributionControl: false,
    zoomControl: false,
    layers: [circles]
  }
  var map = L.map('mapCrash', options).setView([46.2202289, 6.158851], 10);
  var access = "pk.eyJ1IjoibWF4aW1lYnVycmkiLCJhIjoiY2phZmUzeTBpMjRiNTJ3cTgxeWZkdGdydyJ9.m7Oycp5uo2-49hUmBVcXFg";

  var btnPlay = $("#btnPlay");
  var btnStop = $("#btnStop");
  var btnPause = $("#btnPause");
  var inputDateBegin = $("#inputDateBegin");
  var inputDateEnd = $("#inputDateEnd");
  var slider = $("#slider");
  var currentDateElement = $("#currentDateElement");
  var circlesContainer = $("#circlesContainer");
  var deathsCount = $("#deathsCount");
  var injuredsCount = $("#injuredsCount");
  var heavyInjuredCount = $("#heavyInjuredCount");
  var injuredIcons = $("#injuredsIcons");
  var heavyInjuredIcons = $("#heavyInjuredsIcons");
  var deathsIcons = $("#deathsIcons");
  var accidents = [];

  var timer;
  var currentTime = 0; // Current time in ms
  var TIME_BEGIN_TO_END = 10000; // Milliseconds
  var TIME_FRAME = 10; // Millisecond
  var TIME_CALCULATION = 10; // Millisecond, time to calculate
  var SLIDER_MAX_RANGE = slider.attr("max"); // 1000000
  var playStatus = false;
  var currentPosAccident = 0;

  // Set status play (hide and show button)
  var setPlayStatus = function(status){
    playStatus = status;
    if(playStatus){
      btnPlay.hide();
      btnPause.show();
    } else{
      btnPlay.show();
      btnPause.hide();
    }
  };

  // Add nb icon to divContainer
  var addIconsTo = function(divContainer, classIcon, nb, group){
 
    for(let i = 0; i<nb;i++){
      newDiv = $("<i class='fa fa-"+classIcon+" "+group+"'></i>");
      divContainer.append(newDiv);
      newDiv.on("mouseenter", function(){
        $("."+group).each(function(el) {
          $(this).css('color', 'red');
        });
      });
      newDiv.on("mouseleave", function(){
        $("."+group).each(function(el) {
          $(this).css('color', 'black');
        });
      });
    }
  }

  // On stop click
  btnStop.click(function () {
    circles.clearLayers(); // reset circles layer

    // Clear interval
    clearInterval(timer);
    currentTime = 0;
    slider.val(0);

    // Restart at position
    currentPosAccident = 0;

    setPlayStatus(false);

    // Reset count
    injuredsCount.text(0);
    heavyInjuredCount.text(0);
    deathsCount.text(0);

    // Reset icons
    injuredIcons.empty();
    heavyInjuredIcons.empty();
    deathsIcons.empty();
  });

  // On pause click
  btnPause.click(function(){
    setPlayStatus(false);
    clearInterval(timer);
  });
  
  // On play click
  // TODO: Animations, removes circle when replay
  btnPlay.click(function () {
    var dateBegin = new Date(inputDateBegin.val());
    var dateEnd = new Date(inputDateEnd.val());
    var timeExtend = dateEnd.getTime() - dateBegin.getTime();

    var accidentsBetweenTime = accidents.filter(a => (a.DATE_ > dateBegin && a.DATE_ < dateEnd));

    //Play
    setPlayStatus(true);

    // Clear interval
    clearInterval(timer);

    // Each time frame
    timer = setInterval(function () {
      currentTime += TIME_FRAME;
      var currentSliderValue = currentTime * SLIDER_MAX_RANGE / TIME_BEGIN_TO_END;
      slider.val(currentSliderValue);

      // Finish ?
      if (currentSliderValue > SLIDER_MAX_RANGE) {
        clearInterval(timer);
        return;
      }

      // Show some accidents when it's time to calculate
      if (currentTime % TIME_CALCULATION == 0) {
        var currentDate = new Date(dateBegin.getTime() +
          timeExtend * currentSliderValue / SLIDER_MAX_RANGE);

        currentDateElement.html(currentDate.toLocaleString());

        // Draw accidents who respect dates
        for (currentPosAccident; currentPosAccident < accidentsBetweenTime.length; currentPosAccident++){
          var accident = accidentsBetweenTime[currentPosAccident];

          // If we need to draw accident
          if (accident.DATE_ < currentDate) {
            // Draw Circle
            var latLng = L.latLng(accident.LAT, accident.LNG);

            var circle = L.circle(latLng, {
              fillColor: '#d10000',
              color: '#d10000',
              fillOpacity: 0.1,
              weight: 0.5,
              radius: 5
            }).bindPopup("ID accident:" + accident.ID_ACCIDENT + "<br>" +
                "Cause:" + accident.CAUSE + "<br>" +
                "Conséquences:" + accident.CONSEQUENCES + "<br>" +
                "Blessés légers:" + accident.NB_BLESSES_LEGERS + "<br>" +
                "Blessés graves:" + accident.NB_BLESSES_GRAVES + "<br>" + 
                "Morts:" + accident.NB_TUES)
              .addTo(circles);
            
            let group = "id_"+accident.ID_ACCIDENT;
            if(accident.NB_BLESSES_LEGERS > 0) {
              injuredsCount.text(function(i, current) {return +current+accident.NB_BLESSES_LEGERS});
              addIconsTo(injuredIcons, "male", accident.NB_BLESSES_LEGERS, group);
            }

            if(accident.NB_BLESSES_GRAVES > 0) {
              heavyInjuredCount.text(function(i, current) {return +current+accident.NB_BLESSES_GRAVES});
              addIconsTo(heavyInjuredIcons, "male", accident.NB_BLESSES_GRAVES, group);
            }

            if(accident.NB_TUES > 0) {
              deathsCount.text(function(i, current) {return +current+accident.NB_TUES});
              addIconsTo(deathsIcons, "male", accident.NB_TUES, group);
            }
            // Get position real of lattitude and longitude
            var posCircleAnimation = map.layerPointToContainerPoint(
              map.latLngToLayerPoint(L.latLng(latLng))
            );

            // Add circle at good place, and animate
            var circleAnimation = $("<span/>", {
              "class": "circle",
              "css": {
                "left": posCircleAnimation.x + "px",
                "top": posCircleAnimation.y + "px"
              }
            })
              .appendTo(circlesContainer)
              .animate({
                opacity: 0.0,
                height: "70px",
                width: "70px"
              }, 300, function () {
                $(this).remove();
              });
          }
          // Exit loop
          else{
            break;
          }
        }
      }
    }, TIME_FRAME);
  });

  // Set tile layer, on future we could create own
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + access, {
    attribution: "Les Sygnes", //'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets'
  }).addTo(map);


  // Load data
  $.get("data/accidents.json", function (data) {
    var items = [];

    // Foreach
    $.each(data, function (key, val) {
      val.DATE_ = new Date(val.DATE_);

      // Example : add to a list
      items.push("<li id='" + key + "'>" + val.ID_ACCIDENT + " " + val.CAUSE + "</li>");
    });

    accidents = data;

    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("body");
  });
});
