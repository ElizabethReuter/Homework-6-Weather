function searchWeather(name) {

    var APIKey = "7ae0d4bfac0084041cd8bf9db1bdec61"; 
    var userInput = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput+"&appid=" + APIKey;


    $.ajax({ 
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#city-input").empty();
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
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        // FIRST VARIABLES AND DATA APPENDING FOR 1/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[1].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[1].weather[0].icon;
        console.log(forecastWeatherIcon);
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        console.log(forecastIconURL);
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[1].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[1].main.humidity;

        $("#forecast-day-1").append(forecastDate);
        $("#forecast-day-1").append(forecastIconEl);
        $("#forecast-day-1").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-1").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 2/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[2].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[2].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[2].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[2].main.humidity;

        $("#forecast-day-2").append(forecastDate);
        $("#forecast-day-2").append(forecastIconEl);
        $("#forecast-day-2").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-2").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 3/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[3].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[3].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[3].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[3].main.humidity;

        $("#forecast-day-3").append(forecastDate);
        $("#forecast-day-3").append(forecastIconEl);
        $("#forecast-day-3").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-3").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 4/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[4].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[4].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[4].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[4].main.humidity;

        $("#forecast-day-4").append(forecastDate);
        $("#forecast-day-4").append(forecastIconEl);
        $("#forecast-day-4").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-4").append("<p>" + "Humidity: " + forecastHum + "%");

        // VARIABLES AND APPENDS FOR 5/5 DAY FORECAST
        var rawDate = JSON.stringify(response.list[5].dt_txt);
        var splitForecastDate = rawDate.split(" ");
        var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");

        var forecastWeatherIcon = response.list[5].weather[0].icon;
        var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
        forecastIconEl = $("<img>").attr("src", forecastIconURL);

        var forecastTempK = response.list[5].main.temp;
        var forecastTempC = (forecastTempK - 273.15)*1.80+32;
        var forecastHum = response.list[5].main.humidity;

        $("#forecast-day-5").append(forecastDate);
        $("#forecast-day-5").append(forecastIconEl);
        $("#forecast-day-5").append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
        $("#forecast-day-5").append("<p>" + "Humidity: " + forecastHum + "%");

    })
}

$("#select-city").on("click", function(event) { 
    event.preventDefault();

    var inputCity = $("#city-input").val().trim();
    // localStorage.setItem("LastSearch", LastSearch);

    //       function displayLastSearch(){
    //           var displaySearch = localStorage.getItem("LastSearch");
    //           $("#userInput").val(displaySearch);
    //       }
    //       displayLastSearch();

    searchWeather(inputCity);
});


