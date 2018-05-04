routeplanner= {

    placesToPlanRoute: [],
    wayPointsInOrder: [],

    addToRoute: function () {
        $(".addToMyRoute").each( function () {
            $(this).on("click", function (event) {
                let id = event.target.id;
                $.get("/api/attraction/" + id, function (data) {
                    let toAdd = JSON.parse(data);
                    console.log(toAdd);
                    routeplanner.placesToPlanRoute.push(toAdd);

                })
            })
        })
    },


    createRoute: function () {
        $("#createRoute").on("click", function (event) {
            //calculateAndDisplayRoute(directionsService, directionsDisplay);
            routeplanner.getDistance(routeplanner.placesToPlanRoute);
        })
    },


    initMap: function () {
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: {lat: 41.85, lng: -87.65}
        });
        // directionsDisplay.setMap(map);
    },


    calculateAndDisplayRoute: function(directionsService, directionsDisplay) {
        let geocoder = new google.maps.Geocoder();
        let routPoints = routeplanner.placesToPlanRoute;
        for (var i = 0; i < routPoints.length; i++) {
            geocoder.geocode({
                "address": routPoints[i].location
            }, function(results) {
                let marker;
                let myLatlng = results[0].geometry.location;
                marker = new google.maps.Marker({
                    position: myLatlng,
                    title: name
                });
            if (checkboxArray.options[i].selected) {
                waypts.push({
                location: geocoder.geocode.checkboxArray[i].value,
                stopover: true
    });
    }
    });

    directionsService.route({
    origin: "Budapest",
    destination: document.getElementById('end').value,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
}, function(response, status) {
    if (status === 'OK') {
    directionsDisplay.setDirections(response);
    var route = response.routes[0];
    var summaryPanel = document.getElementById('directions-panel');
    summaryPanel.innerHTML = '';
    // For each route, display summary information.
    for (var i = 0; i < route.legs.length; i++) {
    var routeSegment = i + 1;
    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
    '</b><br>';
    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
}
} else {
    window.alert('Directions request failed due to ' + status);
}
});
}

    },

    getDistance: function (placesToFindDistance) {
        var origin = "Budapest, Hungary";
        var service = new google.maps.DistanceMatrixService();
        console.log(placesToFindDistance);
        for (let i = 0; i< placesToFindDistance.length; i++) {
            console.log("in the for loop");
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [placesToFindDistance[i].location]

                }, function (results) {
                    console.log(results);
                    routeplanner.wayPointsInOrder.push(results)
                });
        }


    }

    }