advancedsearch = {

    placesInRange: [],
    searchText: null,

    advancedSearch: function () {
        $("#advancedSearch").on('click', function () {
            advancedsearch.placesInRange = [];
            advancedsearch.searchText = null;
            search.hideForSearch();
            $(".container").show();
            $(".mb20").hide();
            $("#searchButtons").hide();
            $("#search-block").css('display', 'block');
            advancedsearch.advancedSearchResults.call(this);
        })
    },

    advancedSearchResults: function () {
        $("#advancedSearchSubmit").on('click', advancedsearch.displayAdvancedSearchResults )
    },

    displayAdvancedSearchResults: function () {

        $.when(advancedsearch.advancedSearchResultsClickHandler()).then(function () {
            console.log(advancedsearch.placesInRange);
            $(".container").show(function () {
                $("#results").show();
                $(".mb20").show();
                $("#googleMap").hide();
                $("#resultNr").text(advancedsearch.placesInRange.length);
                $("#searchText").text(advancedsearch.searchText);
                console.log("this should be 2")
                search.displaySearchresults.call(this, 10, advancedsearch.placesInRange);

            })


        })

    },

    advancedSearchResultsClickHandler: function () {

            var service = new google.maps.DistanceMatrixService();
            let start = $("#startLocation").val();
            let range = $("#range").val();
            advancedsearch.searchText = $("#searchPhrase").val();
            let apitoSearch = (advancedsearch.searchText === undefined || advancedsearch.searchText === null) ? "/api/search/" + 10 : "/api/search/" + advancedsearch.searchText.replace(" ", "+");
            console.log(apitoSearch);
            $.get(apitoSearch, function (data) {
                let parsedData = $.parseJSON(data);
                console.log(parsedData);
                for (let i = 0; i< parsedData.length; i++) {
                    service.getDistanceMatrix(
                        {
                            origins: [start],
                            destinations: [parsedData[i].location],
                            travelMode: 'DRIVING'
                        }, function (response, status) {
                            let distance = response.rows[0].elements[0].distance.value;
                            if(status === "OK") {
                                console.log(distance);
                                if (distance/1000  < range) {
                                    advancedsearch.placesInRange.push(parsedData[i]);
                                }
                            }
                        });
                    console.log("this should be the very first");
                }


            })
        console.log("this should be the 1");
        }
    }
