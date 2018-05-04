map = {
    limit: 0,

    incrementLimit: function() {
        this.limit += 5;
    },

    myMap: function () {
        let geocoder = new google.maps.Geocoder();
        let mapProp= {
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        let myGMap=new google.maps.Map(document.getElementById("googleMap"), mapProp);
        $.get( "/api/attractions/" + this.limit, function( data ) {
            let parsedData = $.parseJSON(data);
            if (parsedData == "") {
                map.removeArrowFromLastFigure();
            }
            let markers = [];
            map.insertNewData(parsedData);
            for (var i=0; i<5; i++) {
                let name = parsedData[i].name;
                let id = parsedData[i].id;
                geocoder.geocode({
                    "address": parsedData[i].location
                }, function(results) {
                    let marker;
                    let myLatlng = results[0].geometry.location;
                    marker = new google.maps.Marker({
                        position: myLatlng,
                        title: name
                    });
                    markers.push(marker);
                    google.maps.event.addListener(marker, 'click', function () {
                        map.clickonAttraction.call(this, id)
                    });
                    marker.setMap(myGMap);
                    map.setBounds(markers, myGMap);


                });

            }
        });

    },


displayTags: function (array, id) {
        $("#categories").empty();
        for (let i = 0; i<array.length; i++) {
            $("#categories").append('<span class="tag"> ' + array[i].name + ', </span></br>');
            //$("tag").addEventListener("click");
        }

    },


clickonAttraction: function (id) {
        $("#categories").empty();
        let geocoder = new google.maps.Geocoder();
    $.get("/api/attraction/" + id, function (data) {
            let parsedData = $.parseJSON(data);
            $("#attractionInfo").show();
            $("#title").text(parsedData.name);
            $("#description").text(parsedData.description);
            $(".button").attr("id", parsedData.id)
            map.displayTags(parsedData.categories, id);
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
                let myGMap = new google.maps.Map(document.getElementById("googleMap"), mapProp);
                marker.setMap(myGMap);
            });
        });
    },

viewAttraction: function () {
        $("#categories").empty();
        $(".attractionLink").on('click', function (event) {
            console.log("event fired");
                let id = event.target.id;
                map.clickonAttraction.call(this, id)
            });

    },

addArrowToLastFigure: function () {
        if (this.limit > 0) {
            $(".attractionFigure").first().find("img").wrap("<a class='overlay' id='previous'></a>");
        }
        $(".attractionFigure").last().find("img").wrap("<a class='overlay'id='next'></a>");

    },

removeArrowFromLastFigure: function(){
     $("#next").remove();
 },



    nextPage: function () {
        $("#next").click(function () {
            $("#attractionInfo").hide();
            map.incrementLimit();
            map.myMap();
        });
    },

    setBounds: function (markers, myGMap) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            bounds.extend(markers[i].getPosition());
        }

        myGMap.fitBounds(bounds);
    },
    
    insertNewData: function (attractionData) {
       let attractionFigure = $(".attractionGroup");
       attractionFigure.empty();
        for (let i = 0; i < attractionData.length; i++) {
            attractionFigure.append("<li class=\"attractionFigure\"  style=\"position: relative\">\n" +
                "<figure><img id=\"attraction\" src="+ attractionData[i].pictures[0] + " alt=\"\"/>\n" +
                "                    <figcaption class=\"inspace-30 center\">\n" +
                "                        <p class=\"bold uppercase \" id=\"attractionName\" >" + attractionData[i].name +"</p>\n" +
                "                        <p class=\"attractionLink\" id=" + attractionData[i].id +">View Here &raquo;</p>\n" +
                "                    </figcaption>\n" +
                "                </figure>\n" +
                "</li>\n")
        }
        map.viewAttraction();
        map.addArrowToLastFigure();
        map.nextPage();
    }

};