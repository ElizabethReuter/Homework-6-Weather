function searchWeather(name) {

    var APIKey = "7ae0d4bfac0084041cd8bf9db1bdec61"; 
    var userInput = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput+"&appid=" + APIKey;


    $.ajax({ 
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#city-name").empty();
        $("#uv-index-results").empty();
        $(".forecast").empty();


        var cityName = $("<div>").text(response.name)
            $("#city-name").empty(); 
            $("#city-name").append(cityName);; 
            $(cityName).addClass("city-name-style");

        var mainDate = moment().format('L');
            $(cityName).append(" " + mainDate);

        var weatherIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
        iconEl = $("<img>").attr("src", iconURL);
            $(cityName).append(iconEl);

        var tempK = response.main.temp;
        var tempC = (tempK - 273.15)*1.80+32;
            $("#city-name").append("<p>" + "Temperature: " + tempC.toFixed(2) + " °F");

        var humidity = response.main.humidity;
            $("#city-name").append("<p>" + "Humidity: " + humidity + " %");

        var windSpeed = response.wind.speed;
            $("#city-name").append("<p>" + "Wind Speed: " + windSpeed + " MPH");

        
        // Referenced this project to troubleshoot UV index pulling issues: https://github.com/cmelby/WeatherDashboard

        lat = response.coord.lat;
        lon = response.coord.lon;
        console.log(lat);

        var queryURLUVIndex = "https://api.openweathermap.org/data/2.5/uvi?&appid=e79e860f1526eb9cc2572046fff7a30c&lat=" + lat  + "&lon=" + lon;


            $.ajax({
                url:queryURLUVIndex,
                method: "GET"
            }).then(function (response) {
    
                $("#uv-index").empty();

                var uvresults = response.value;
                    $("#uv-index").append("UV Index: " + uvresults);
            });

    });
    // START OF THE SECOND QUERY URL USED FOR THE 5 DAY FORECAST
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLforcast,
        method: 'GET'
    }).then(function (response) {
        // Storing an array of results in the results variable
        var results = response.list;
        //empty 5day div--------
        $("#5day").empty();
        //create HTML for 5day forcast................
        for (var i = 0; i < results.length; i += 8) {
            // Creating a div
            var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
            
            //Storing the responses date temp and humidity.......
            var date = results[i].dt_txt;
            var setD = date.substr(0,10)
            var temp = results[i].main.temp;
            var hum = results[i].main.humidity;
   
            //creating tags with the result items information.....
            var h5date = $("<h5 class='card-title'>").text(setD);
            var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
            var pHum = $("<p class='card-text'>").text("Humidity " + hum);;
            //append items to.......
            fiveDayDiv.append(h5date);
            fiveDayDiv.append(icon);
            fiveDayDiv.append(pTemp);
            fiveDayDiv.append(pHum);
            $("#5day").append(fiveDayDiv);
        }

    })
}

$("#select-city").on("click", function(event) { 
    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});


