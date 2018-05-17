routeplanner= {

    placesToPlanRoute: [],
    wayPointsInOrder: [],
    routeMap: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRebc8NWRCr540yhh_Sn5ucUyG4x7ib64&amp;callback=routeplanner.calculateAndDisplayRoute",


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
            $("#script").attr("src", routeplanner.routeMap);
            $("#attractionInfo").hide();
            $(".container").first().empty();
            $(".row3").show();
            $("#googleMap").show();
            routeplanner.calculateAndDisplayRoute();

        })
    },


    calculateAndDisplayRoute: function() {
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
        var prepare = routeplanner.prepareForRoute(directionsService, directionsDisplay);
        console.log(prepare);
        $.when(prepare).done( function (prepare) {
            console.log("prepare:  " + prepare);
                directionsService.route({
                    origin: "Budapest",
                    destination: "Eger",//routPoints[-1],
                    waypoints: prepare,//routPoints.slice(0, -1),
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING'
                }, function(response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                        // For each route, display summary information.

                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            })

    },
    prepareForRoute: function (directionsService, directionsDisplay) {

        let mapProp= {
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        let myGMap=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        directionsDisplay.setMap(myGMap);
        let geocoder = new google.maps.Geocoder();
        let waypts=[];

            let markers = [];
            let routPoints = routeplanner.placesToPlanRoute;
            console.log("Routpoints:   " + routPoints);
            for (var i = 0; i < routPoints.length; i++) {
                console.log("le rootpoint:  " + routPoints[i]);
                let name = routPoints[i].name;
                geocoder.geocode({
                    "address": routPoints[i].location
                }, function (results) {
                    let marker;
                    let myLatlng = results[0].geometry.location;
                    console.log("coordinate:  "+ myLatlng);
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        title: name
                    });
                    waypts.push({
                        location: myLatlng,
                        stopover: true
                    });
                    console.log("marker: " + marker);
                    markers.push(marker);
                    marker.setMap(myGMap);
                    map.setBounds(markers, myGMap);
                });
            }
            console.log(waypts);
            return waypts;

    },


    getDistance: function (placesToFindDistance) {
        var origin = "Budapest, Hungary";
        var service = new google.maps.DistanceMatrixService();
        for (let i = 0; i< placesToFindDistance.length; i++) {
            console.log("in the for loop");
            service.getDistanceMatrix(
                {
                    origins: [origin],
                    destinations: [placesToFindDistance[i].location],
                    travelMode: 'DRIVING'

                }, function (results) {
                    console.log("reulktsL: " + results);
                    routeplanner.wayPointsInOrder.push(results)
                });
        }


        return routeplanner.wayPointsInOrder;
    }

    };