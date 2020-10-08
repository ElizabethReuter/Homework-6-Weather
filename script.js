function searchWeather (city){

    var APIKey = "5fe12b37fb3b93e2db23eaa909fb9af2";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            console.log(response);

            //creates the div to hold the cities searched
            // var cityDiv = $("<div class='city'>").text(response.name);
            //stores the temp
            //var temp = response.Temp;

    });
}