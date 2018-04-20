$( document ).ready(function() {
    $("#attractionInfo").hide();
    viewAttraction();
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

function myMap() {
    let geocoder = new google.maps.Geocoder();
    let mapProp= {
        center:new google.maps.LatLng(47,23),
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    let map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    $.get( "/api/attractions", function( data ) {
        let parsedData = $.parseJSON(data);
        for (var i=0; i<5; i++) {
            console.log(parsedData);
            let name = parsedData[i].name;
            let id = parsedData[i].id;
            console.log(id);
            geocoder.geocode({
                "address": parsedData[i].location
            }, function(results) {
                let marker;
                let myLatlng = results[0].geometry.location;
                marker = new google.maps.Marker({
                    position: myLatlng,
                    title: name
                });
                google.maps.event.addListener(marker, 'click', function () {
                    console.log(id);
                    clickonAttraction.call(this, id)
                });
                marker.setMap(map);

            });

        }
    });

}



function clickonAttraction(id) {
    console.log(id);
    let geocoder = new google.maps.Geocoder();
    $.get("/api/attraction/" + id, function (data) {
        let parsedData = $.parseJSON(data);
        console.log(data);
        $("#attractionInfo").show();
        $("#title").text(parsedData.name);
        $("#description").text(parsedData.description);
        //Array.isArray(parsedData.categories) && array.length?$("#description").text($.each(c.name)):
        //$("#categories").text(parsedData.categories[0].name);
        geocoder.geocode({
            "address": parsedData.location
        }, function (results) {
            let marker;
            let myLatlng = results[0].geometry.location;

            marker = new google.maps.Marker({
                position: myLatlng,
                title: name
            });
            let mapProp = {
                center: myLatlng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };
            let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            marker.setMap(map);
        });
    });
}

function viewAttraction() {
    $(".attractionLink").each(function () {
        $(".attractionLink").click(function (event) {
            let id = event.target.id;
            console.log(id);
            clickonAttraction.call(this, id)
        });
    });
}














