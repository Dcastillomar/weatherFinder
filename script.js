$(document).ready(function () {
    var searchButtonEL = document.querySelector('button');
    var userSearchEl = document.getElementById('form');
    var appid = 'cc8ae70c1ab94ea82093b1c93affc11a';
    var q;
    var url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;

    searchButtonEL.addEventListener('click', () => {

        q = document.getElementById("form").value;
        var geoCodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

        fetch(geoCodeUrl)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                var latitude;
                var longitude;

                latitude = data[0].lat;
                longitude = data[0].lon;
                var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${appid}`;

                var cardEl = document.querySelector('p');

                fetch(currentWeatherUrl)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        var highTempEl;
                        console.log(data);

                        highTempEl = data["main"].temp_max;
                        var pHighTemp = document.getElementById("main5");
                        pHighTemp.innerHTML = "High Temp: " + highTempEl;

                        var lowTempEl;
                        lowTempEl = data["main"].temp_min;
                        var pLowTemp = document.getElementById("main6");
                        pLowTemp.innerHTML = "Low Temp: " + lowTempEl;

                        var feelsLikeEl;
                        feelsLikeEl = document.getElementById("main0");
                        feelsLikeTemp = data["main"].feels_like;
                        feelsLikeEl.innerHTML = "Feels Like: " + feelsLikeTemp;

                        var pressureEl;
                        pressureEl = data["main"].pressure;
                        var pressureMeasurement = document.getElementById("main2");
                        pressureMeasurement.innerHTML = "Pressure: " + pressureEl;

                        var humidityEl;
                        humidityEl = document.getElementById("main1");
                        humidityPercent = data["main"].humidity;
                        humidityEl.innerHTML = "Humidity percent: " + humidityPercent;

                        var speedDegreesEl;
                        speedDegreesEl = document.getElementById("wind1");
                        windSpeed = data["wind"].speed;
                        speedDegreesEl.innerHTML = "Wind Speed: " + windSpeed;

                        var windDegEl;
                        windDegEl = document.getElementById("wind2");
                        windDeg = data["wind"].deg;
                        windDegEl.innerHTML = "Wind Degrees: " + windDeg;
                    })

                var fiveDayWeather = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${appid}`;

                fetch(fiveDayWeather)
                    .then((response) => {
                        return response.json();
                    
                        .then((data) => {
                            console.log(data);


                        });
                    });
            });

        })
    })

