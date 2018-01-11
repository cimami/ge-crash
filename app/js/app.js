$(document).ready(function () {
  var nbMarkerClusterMax = 0;

  // Create the map
  var options = {
    attributionControl: false,
    zoomControl: false,
    maxZoom : 18,
    "scaleRadius": true,
  };
  var map = L.map('mapCrash', options);
  
  // Add mask in other canton than Geneva
  let polygons = [];
  // Foreach "Polygons"
  for(var i = 0; i < boundaries.geometry.coordinates.length; i++){
    let polygon = geoJsonCoordinateToLatLng(boundaries.geometry.coordinates[i][0]);
    polygons.push(polygon);
  }
  // Mask
  L.mask(polygons).addTo(map);
  map.fitBounds([[46.2980, 6.2975],[46.1329, 6.0091]]);

  //var markers = L.markerClusterGroup(); // For clustering marker
  var markers = L.markerClusterGroup({
    iconCreateFunction: function (cluster) {
      var nbAccident = cluster.getChildCount();
      var className ='mycluster1';
      var size = 40;
      
      if(nbAccident>nbMarkerClusterMax)
        nbMarkerClusterMax=nbAccident

      if(nbAccident <(0.33*nbMarkerClusterMax)){
        className ='clusterGreen';
        size=40;
      }else if(nbAccident >=(0.33*nbMarkerClusterMax) && nbAccident< (0.66*nbMarkerClusterMax)){
        className ='clusterYellow';
        size=50;
      }else{
        className ='clusterRed';
        size=60;
      }
      
      return L.divIcon({ html: "<span>"+nbAccident+"</span>", className: className, iconSize: L.point(size, size) });
    }
  });

  map.on('zoomend',function(){
    nbMarkerClusterMax = 0;
    markers.refreshClusters();
  })


  map.addLayer(markers);

  var heat = L.heatLayer([], {radius: 20}).addTo(map);

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
  var rightInfoPanel = document.getElementById("right-info-panel");
  var rowIcons = $("#rowIcons");
  var accidents = [];
  var causes = [];
  var causesPosition = {}; // Dictionnary of position of array causes for "cause string"

  var timer;
  var currentTime = 0; // Current time in ms
  var TIME_BEGIN_TO_END = 10000; // Milliseconds
  var TIME_FRAME = 10; // Millisecond
  var TIME_CALCULATION = 10; // Millisecond, time to calculate
  var TIME_UDPATE_CHARTS = 100;
  var SLIDER_MAX_RANGE = slider.attr("max"); // 1000000
  var ICONS_PERSON_FONT_SIZE = parseInt(rowIcons.css("font-size"));
  var playStatus = false;
  var currentPosAccident = 0;
  var myChart = undefined;

  // Use for updateInfoByDateInputs()
  var dateBegin;
  var dateEnd;
  var timeExtend;
  var accidentsBetweenTime;
  
  myChart = Highcharts.chart('histogram', {
    title: {
      text: ''
    },
    series: [{
      name: "Nombre d'accident",
      type: 'histogram',
      data: [] 
    }],
    credits: {
      enabled: false
    },
    chart: {
      spacingBottom: 0,
      spacingRight: 3,
      spacingLeft: 3,
      marginBottom : 40
    },
    yAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      }
    },
    xAxis: {
      type: 'datetime'
    }
  });

  var causePieChart = Highcharts.chart('causePieChart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor:'rgba(255, 255, 255, 0.0)'
    },
    title: {
        text: ''
    },
    credits: {
      enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '{point.percentage:.1f} %',
                style: {
                    color: 'white'
                }
            },
            showInLegend: true
        }
    },
    legend: {
      itemStyle: {
        color:"white"
      }
    },
    series: [{
        name: 'Causes',
        colorByPoint: true,
        data: []
    }]
});

  // Modify offset of position of current date
  function modifyOffset() {
    var el, newPoint, newPlace, offset, siblings, k;
    width    = this.offsetWidth;
    newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
    offset   = -1;
    if (newPoint < 0) { newPlace = 0;  }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint;}
    siblings = this.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
      sibling = siblings[i];
      if (sibling.id == this.id) { k = true; }
      if ((k == true) && (sibling.nodeName == "OUTPUT")) {
        outputTag = sibling;
      }
    }
    outputTag.style.left       = newPlace + "px";
    outputTag.style.marginLeft = offset + "%";
    //outputTag.innerHTML        = this.value;
  }
  var sliderDOM = document.getElementById("slider");
  var barDOM = document.getElementById("barSlider");
  sliderDOM.oninput = modifyOffset;

  // Set status play (hide and show button)
  var setPlayStatus = function (status) {
    playStatus = status;
    if (playStatus) {
      btnPlay.hide();
      btnPause.show();
    } else {
      btnPlay.show();
      btnPause.hide();
    }
  };

  // Save bound to restore when mouse leave
  var bounds = undefined;
  var checkOverflow = true;

  // Add nb icon to divContainer
  var addIconsTo = function (divContainer, classIcon, nb, group, marker) {
    // Keep open or not when click
    var keepOpen = false;

    var spanAccident = $("<span class='" + group + "' style='margin-right:6px;'></i>");

    // On mouse enter : open popup
    spanAccident.on("mouseenter", function () {
      if (!bounds)
        bounds = map.getBounds();

      // Open popup
      //
      //map.panTo(marker.getLatLng(), {animate: true, duration: 5.0});
      map.once('moveend', function () {
        // Timeout to zoomToShowLayer else : recursive infinte call of event...
        setTimeout(function () {
          markers.zoomToShowLayer(marker, function () {
            marker.openPopup();
          });
        }, 0);
      });
      map.flyTo(marker.getLatLng(), 18,
        { animate: true, duration: 1.0 }
      );

      // Color each calss
      $("." + group).each(function (el) {
        $(this).css('color', 'red');
      });
    });

    // On mouse leave : close popup
    spanAccident.on("mouseleave", function () {
      if (!keepOpen) {
        marker.closePopup();
        if (bounds) {
          map.fitBounds(bounds);
        }
      }

      // Color each class
      $("." + group).each(function (el) {
        $(this).css('color', 'white');
      });
    });

    // Click : keep open
    spanAccident.on("click", function () {
      keepOpen = true;
    });

    for (let i = 0; i < nb; i++) {
      // Append div
      newDiv = $("<i class='fa fa-" + classIcon + "'></i>");
      spanAccident.append(newDiv);
    }
    divContainer.append(spanAccident);

    // Check overlow    
    if (checkOverflow && (rightInfoPanel.offsetHeight < rightInfoPanel.scrollHeight ||
      divContainer.offsetWidth < divContainer.scrollWidth)) {
      checkOverflow = false;
      var fontSize = parseFloat(rowIcons.css("font-size"));
      fontSize = (fontSize - 2) + "px";

      // Animate font size
      $(rowIcons).animate({
        fontSize: fontSize
      }, 2000, function () {
        checkOverflow = true;
      });
    }
  }

  // On stop click
  btnStop.click(function () {
    markers.clearLayers(); // reset markers layer
    heat.setLatLngs([]) // reset heat map

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

    // Icons person font-size
    rowIcons.css({ 'font-size': ICONS_PERSON_FONT_SIZE + 'px' });

    // Clear date
    currentDateElement.html("");
  });

  // On pause click
  btnPause.click(function () {
    setPlayStatus(false);
    clearInterval(timer);
  });

  function resetCausesChart(){
    causes = [];
    causesPosition = {};
    causePieChart.series[0].setData([]);
  }

  function updateInfoByDateInputs(){
    resetCausesChart();

    dateBegin = new Date(inputDateBegin.val());
    dateEnd = new Date(inputDateEnd.val());
    timeExtend = dateEnd.getTime() - dateBegin.getTime();

    accidentsBetweenTime = accidents.filter(a => (a.DATE_ > dateBegin && a.DATE_ < dateEnd));

    // Calculate data for histogram
    var nbBar = 12;
    var timeSizeBar = timeExtend / nbBar;

    var nbAccidentCurrentBar = 0;
    var histogramBars = [];
    var currentBar = 1;

    for(i = 0; i < accidentsBetweenTime.length; i++){
      if(accidentsBetweenTime[i].DATE_ < new Date(dateBegin.getTime()+(currentBar)*timeSizeBar)){
        nbAccidentCurrentBar++;
      }
      else{
        while(accidentsBetweenTime[i].DATE_ >= new Date(dateBegin.getTime()+(currentBar)*timeSizeBar)){
          currentBar++;
          histogramBars.push(nbAccidentCurrentBar);
          nbAccidentCurrentBar = 0;
        }
        nbAccidentCurrentBar++;
      }
    }
    histogramBars.push(nbAccidentCurrentBar);
    while(currentBar < nbBar){
      histogramBars.push(0);
      currentBar++;
    }
    myChart.series[0].update( {
      data : histogramBars,
      pointStart: Date.UTC(dateBegin.getFullYear(), dateBegin.getMonth(), dateBegin.getDate()),
      pointInterval: timeSizeBar
    }, true);
  }
  inputDateBegin.on("change", updateInfoByDateInputs);
  inputDateEnd.on("change", updateInfoByDateInputs);

  // On play click
  btnPlay.click(function () {
    updateInfoByDateInputs();

    //Play
    setPlayStatus(true);

    // Clear interval
    clearInterval(timer);

    // Each time frame
    timer = setInterval(function () {
      currentTime += TIME_FRAME;
      var currentSliderValue = currentTime * SLIDER_MAX_RANGE / TIME_BEGIN_TO_END;
      slider.val(currentSliderValue);
      modifyOffset.call(sliderDOM);

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
        for (currentPosAccident; currentPosAccident < accidentsBetweenTime.length; currentPosAccident++) {
          var accident = accidentsBetweenTime[currentPosAccident];

          // If we need to draw accident
          if (accident.DATE_ < currentDate) {
            // Draw Marker
            var latLng = L.latLng(accident.LAT, accident.LNG);


            var marker = L.marker(latLng, {
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
              .addTo(markers);

            let group = "id_" + accident.ID_ACCIDENT;
            if (accident.NB_BLESSES_LEGERS > 0) {
              injuredsCount.text(function (i, current) { return +current + accident.NB_BLESSES_LEGERS });
              addIconsTo(injuredIcons, "male", accident.NB_BLESSES_LEGERS, group, marker);
            }

            if (accident.NB_BLESSES_GRAVES > 0) {
              heavyInjuredCount.text(function (i, current) { return +current + accident.NB_BLESSES_GRAVES });
              addIconsTo(heavyInjuredIcons, "male", accident.NB_BLESSES_GRAVES, group, marker);
            }

            if (accident.NB_TUES > 0) {
              deathsCount.text(function (i, current) { return +current + accident.NB_TUES });
              addIconsTo(deathsIcons, "male", accident.NB_TUES, group, marker);
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

            heat.addLatLng(latLng);

            // Increment causes 
            var cause = accident.CAUSE.split(" - ")[0];
            if(causes[causesPosition[cause]] !== undefined)
              causes[causesPosition[cause]].y++;
            else{
              var pos = causes.push({name:cause,y : 1}) - 1;
              causesPosition[cause] = pos;
            }
          }
          // Exit loop
          else {
            break;
          }
        }
      }

      // Update piechart less often than calculation/animation
      if (currentTime % TIME_UDPATE_CHARTS == 0 || currentTime == TIME_BEGIN_TO_END /*end*/) {
        causePieChart.series[0].update({
            data: causes.sort(function(a, b) {
                return  b.y - a.y;
            })
        });
        console.log("update pie chart");
      }
    }, TIME_FRAME);
  });

  // Set tile layer, on future we could create own
  L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
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
    });

    accidents = data;

    // We get accidents : add histogram
    updateInfoByDateInputs();
  });
});
