search = {
    search: function () {
        let searchResultsPerPage = 10;
        $("#search").keypress(function(e) {
            if(e.which == 13) {
                let searchText = $("#search").val();
                $.get("/api/search/" + searchText.replace(" ", "+"), function (data) {
                    let parsedData = $.parseJSON(data);
                    search.hideForSearch();
                    $(".container").show(function() {
                        $("#googleMap").hide();
                        $("#resultNr").text(parsedData.length);
                        $("#searchText").text(searchText);
                        search.displaySearchresults(searchResultsPerPage, parsedData);

                    });

                })
            }
        });
    },

    displaySearchresults: function (perPage, parsedData) {
        if (perPage > 0) {
            console.log("the perpage: " + perPage);
            let startIndex = parsedData.length < perPage? 0: perPage - 10;
            let endIndex = parsedData.length < perPage? parsedData.length: perPage - 1;
            console.log("startindex:" + startIndex);
            console.log("endindex: " + endIndex);
            $("#results").empty();
            for (let i = startIndex; i < endIndex;i++) {
                if (parsedData !== undefined) {
                    $("#results").append("<section class=\"col-xs-12 col-sm-6 col-md-12\">\n" +
                        "        <article class=\"search-result row\">\n" +
                        "            <div class=\"col-xs-12 col-sm-12 col-md-3\">\n" +
                        "                <a href=\"#\" title=\"Lorem ipsum\" class=\"thumbnail\"><img src="+ parsedData[i].pictures[0] +" alt=\"Lorem ipsum\" /></a>\n" +
                        "            </div>\n" +
                        "            <div class=\"col-xs-12 col-sm-12 col-md-7 excerpet\">\n" +
                        "                <h3><a href=\"#\" title=\"\">"+ parsedData[i].name +"</a></h3>\n" +
                        "                <h6>"+parsedData[i].location +"</h6>\n" +
                        "                <p>"+ parsedData[i].description +"</p>\n" +
                        "                <i id='" + parsedData[i].id + "' class='glyphicon glyphicon-plus addToMyRoute'></i>\n" +
                        "            </div>\n" +
                        "            <span class=\"clearfix borda\"></span>\n" +
                        "        </article>\n" +
                        "    </section>")
                }

            }
            routeplanner.addToRoute();
            $("#searchButtons").show();
            if (perPage < parsedData.length) {
                if (perPage > 10) {
                    console.log("time to see previous button");
                    $("#prevSearch").prop('disabled', false);
                    $("#prevSearch").on('click', function() {
                        console.log("perpage before previous call: " + perPage);
                        perPage = search.checkPerPage(perPage, parsedData);
                        search.displaySearchresults.call(this, perPage, parsedData);
                    });
                } else {
                    $("#prevSearch").prop('disabled', true);
                }
                $("#nextSearch").prop('disabled', false);
                $("#nextSearch").on('click', function() {
                    search.displaySearchresults.call(this, perPage + 10, parsedData);
                    console.log("listener for next");
                });
            } else {
                $("#nextSearch").prop('disabled', true);

            }
        }




    },
    
    checkPerPage: function (perPage, parsedData) {
        if (perPage >= parsedData.length) {
            return perPage ;
        } else {
            return perPage - 10;
        }
    },

    hideForSearch: function () {
        $("#slider").hide();
        $("#cta").hide();
        $(".latest").hide();
        $(".row3").hide();
    }


};