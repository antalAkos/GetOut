$( document ).ready(function() {
    $("#attractionInfo").hide();
});

/*
function Map() {
    this.geocoder = new google.maps.Geocoder();

    this.mapProp = {
        center:new google.maps.LatLng(47,23),
        zoom: 5
    };
    this.map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    this.placeMarkers = function () {
        $.get( "/api/attractions", function( data ) {
            let parsedData = $.parseJSON(data);
            for (var i=0; i<5; i++) {
                let name = parsedData[i].name;
                let id = parsedData[i].ID;
                geocoder.geocode({
                    "address": parsedData[i].location
                }, function(results) {
                    let marker;
                    let myLatlng = results[0].geometry.location;
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        title: name
                    });
                    google.maps.event.addListener(marker, 'click', function (e) {
                        clickonAttraction.call(this, e, id, map, geocoder)
                    });
                    marker.setMap(map);

                });

            }
        });
    }

}*/



/*$(".attractionFigure").last().hover(function () {
        $.get()
*/