var historyList = JSON.parse(localStorage.getItem("weather-history"))||[];
function showHistory(){
    $("#history").html("")
    for (var i=0; i<historyList.length; i++){
        var item=$("<li>")
        var button=$("<button>").text(historyList[i])
        button.on("click", function(event){
            console.log(event.target)
            var name = event.target.innerText
            searchWeather(name)
        })
        item.append(button)
        $("#history").append(item)
    }
}
showHistory()
function searchWeather(name) {

    var APIKey = "7ae0d4bfac0084041cd8bf9db1bdec61"; 
    var userInput = $("#city-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ userInput+"&appid=" + APIKey;
console.log(historyList)
  if (historyList.indexOf(name)===-1){
      historyList.push(name)
      localStorage.setItem("weather-history",JSON.stringify(historyList))
      showHistory()
  }  

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
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+userInput+"&appid=" + APIKey;

    $.ajax({
        url: queryURLForecast,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        for (var day=1;day<6;day++){

            var data=response.list[day]
    
            var rawDate = JSON.stringify(data.dt_txt);
            var splitForecastDate = rawDate.split(" ");
            var forecastDate = moment(splitForecastDate[0]).format("MM/DD/YYYY");
    
            var forecastWeatherIcon = data.weather[0].icon;
            console.log(forecastWeatherIcon);
            var forecastIconURL = "http://openweathermap.org/img/w/" + forecastWeatherIcon + ".png";
            console.log(forecastIconURL);
            forecastIconEl = $("<img>").attr("src", forecastIconURL);
    
            var forecastTempK = data.main.temp;
            var forecastTempC = (forecastTempK - 273.15)*1.80+32;
            var forecastHum = data.main.humidity;
    
            $("#forecast-day-"+day).append(forecastDate);
            $("#forecast-day-"+day).append(forecastIconEl);
            $("#forecast-day-"+day).append("<p>" + "Temp: " + forecastTempC.toFixed(2) + " °F");
            $("#forecast-day-"+day).append("<p>" + "Humidity: " + forecastHum + "%");
        }

    })
}

$("#select-city").on("click", function(event) { 
    event.preventDefault();

    var inputCity = $("#city-input").val().trim();

    searchWeather(inputCity);
});


