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





