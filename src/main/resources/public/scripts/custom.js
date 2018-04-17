function myMap() {
    var geocoder = new google.maps.Geocoder();
    var mapProp= {
        center:new google.maps.LatLng(47,23),
        zoom: 5
    };
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    $.get( "/api/attractions", function( data ) {
        let rawData = $.parseJSON(data);
        console.log(rawData);
        for (var i=0; i<5; i++) {
            let name = rawData[i].name;
            let id = rawData[i].ID;
            console.log(name + id);
            geocoder.geocode({
                "address": rawData[i].location
            }, function(results) {
                console.log(name + id);
                let marker;
                console.log(results[0].geometry.location);
                let myLatlng = results[0].geometry.location;
                marker = new google.maps.Marker({
                    position: myLatlng,
                    title: name
                });
                marker.addListener('click', clickonAttraction(id));
                marker.setMap(map);

            });

        }
    });

}

function setMarker(marker, name, id) {
    marker.title = name;
    marker.addListener('click', clickonAttraction(id));

}

function clickonAttraction(id) {
    $.ajax("/attraction/" + id, function () {

    })
}

function initMap() {


        var uluru = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('map'), {

            zoom: 4,
            center: uluru
        });
        google.maps.event.addListener(map, 'click', function(event) {
            var marker = new google.maps.Marker({
                position: event.latLng,
                map: map
            });
        });



}







