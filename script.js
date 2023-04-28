$(document).ready(function () {
    var searchButtonEL = document.querySelector('button');
    var userSearchEl = document.getElementById('form');
    var appid = 'cc8ae70c1ab94ea82093b1c93affc11a';
    var q;
    var url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;

    searchButtonEL.addEventListener('click', () => {
        var userInput = document.getElementById('form').value;
        var key = document.getElementById('key');
        var searchBar = document.getElementById('history');
        
        localStorage.setItem(key, JSON.stringify(userInput));
       
        searchBar.innerHTML= "Recent Search: " + userInput;



        q = document.getElementById("form").value;
        var geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

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



                var fiveDayWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${appid}`;
                fetch(fiveDayWeather)
                    .then((response) => {
                        return response.json();
                    })

                    .then((data) => {
                        console.log(data);



                        const array1 = data;
                        const map1 = array1.list[0].main.temp_max;
                        console.log(map1);
                        var highTemp1_5day;
                        highTemp1_5day = document.getElementById("fiveday0");
                        highTemp1_5day.innerHTML = "High Temp: " + map1;

                        const map2 = array1.list[0].dt_txt;
                        console.log(map2);
                        var heading;
                        heading = document.getElementById("heading");
                        heading.innerHTML = map2;

                        const map3 = array1.list[8].dt_txt;
                        console.log(map3);
                        var heading2;
                        heading2 = document.getElementById("heading2");
                        heading2.innerHTML = map3;

                        const map4 = array1.list[16].dt_txt;
                        console.log(map4);
                        var heading3;
                        heading3 = document.getElementById("heading3");
                        heading3.innerHTML = map4;

                        const map5 = array1.list[24].dt_txt;
                        console.log(map5);
                        var heading4;
                        heading4 = document.getElementById("heading4");
                        heading4.innerHTML = map5;

                        const map6 = array1.list[32].dt_txt;
                        console.log(map6);
                        var heading5;
                        heading5 = document.getElementById("heading5");
                        heading5.innerHTML = map6;

                        const map7 = array1.list[8].main.temp_max;
                        console.log(map7);
                        var highTemp2_5day;
                        highTemp2_5day = document.getElementById("fiveday2");
                        highTemp2_5day.innerHTML = "High Temp: " + map1;

                        const map8 = array1.list[16].main.temp_max;
                        console.log(map8);
                        var highTemp3_5day;
                        highTemp3_5day = document.getElementById("fiveday3");
                        highTemp3_5day.innerHTML = "High Temp: " + map8;
                        const map9 = array1.list[24].main.temp_max;
                        console.log(map9);
                        var highTemp4_5day;
                        highTemp4_5day = document.getElementById("fiveday4");
                        highTemp4_5day.innerHTML = "High Temp: " + map9;

                        const map10 = array1.list[32].main.temp_max;
                        console.log(map10);
                        var highTemp5_5day;
                        highTemp5_5day = document.getElementById("fiveday5");
                        highTemp5_5day.innerHTML = "High Temp: " + map10;



                        const map11 = array1.list[0].main.temp_min;
                        console.log(map11);
                        
                        highTemp5_5day = document.getElementById("lowTemp0");
                        highTemp5_5day.innerHTML = "Low Temp: " + map11;

                        const map12 = array1.list[8].main.temp_min;
                        highTemp5_5day = document.getElementById("lowTemp1");
                        highTemp5_5day.innerHTML = "Low Temp: " + map12;

                        const map13 = array1.list[16].main.temp_min;
                        highTemp5_5day = document.getElementById("lowTemp2");
                        highTemp5_5day.innerHTML = "Low Temp: " + map13;

                        const map14 = array1.list[24].main.temp_min;
                        highTemp5_5day = document.getElementById("lowTemp3");
                        highTemp5_5day.innerHTML = "Low Temp: " + map14;

                        const map15 = array1.list[32].main.temp_min;
                        highTemp5_5day = document.getElementById("lowTemp4");
                        highTemp5_5day.innerHTML = "Low Temp: " + map15;

                        const map17 = array1.list[0].main.feels_like;
                        feelsLikeByDay = document.getElementById("feelsLike0");
                        feelsLikeByDay.innerHTML = "Feels Like: " + map17;

                        const map16 = array1.list[0].main.pressure;
                        pressureByDay = document.getElementById("pressure0");
                        pressureByDay.innerHTML = "Pressure: " + map16;

                        const map18 = array1.list[8].main.feels_like;
                        feelsLikeByDay = document.getElementById("feelsLike1");
                        feelsLikeByDay.innerHTML = "Feels Like: " + map18;

                        const map19 = array1.list[16].main.feels_like;
                        feelsLikeByDay = document.getElementById("feelsLike2");
                        feelsLikeByDay.innerHTML = "Feels Like: " + map19;

                        const map20 = array1.list[24].main.feels_like;
                        feelsLikeByDay = document.getElementById("feelsLike3");
                        feelsLikeByDay.innerHTML = "Feels Like: " + map20;

                        const map21 = array1.list[32].main.feels_like;
                        feelsLikeByDay = document.getElementById("feelsLike4");
                        feelsLikeByDay.innerHTML = "Feels Like: " + map21;

                        const map22 = array1.list[8].main.pressure;
                        pressureByDay = document.getElementById("pressure1");
                        pressureByDay.innerHTML = "Pressure: " + map22;

                        const map23 = array1.list[16].main.pressure;
                        pressureByDay = document.getElementById("pressure2");
                        pressureByDay.innerHTML = "Pressure: " + map23;

                        const map24 = array1.list[24].main.pressure;
                        pressureByDay = document.getElementById("pressure3");
                        pressureByDay.innerHTML = "Pressure: " + map24;

                        const map25 = array1.list[32].main.pressure;
                        pressureByDay = document.getElementById("pressure4");
                        pressureByDay.innerHTML = "Pressure: " + map25;

                        const map26 = array1.list[0].main.humidity;
                        humidityByDay = document.getElementById("humidity0");
                        humidityByDay.innerHTML = "Humidity: " + map26;

                        const map27 = array1.list[8].main.humidity;
                        humidityByDay = document.getElementById("humidity1");
                        humidityByDay.innerHTML = "Humidity: " + map27;

                        const map28 = array1.list[16].main.humidity;
                        humidityByDay = document.getElementById("humidity2");
                        humidityByDay.innerHTML = "Humidity: " + map28;

                        const map29 = array1.list[24].main.humidity;
                        humidityByDay = document.getElementById("humidity3");
                        humidityByDay.innerHTML = "Humidity: " + map29;

                        const map30 = array1.list[32].main.humidity;
                        humidityByDay = document.getElementById("humidity4");
                        humidityByDay.innerHTML = "Humidity: " + map30;

                        const map31 = array1.list[0].wind.speed;
                        humidityByDay = document.getElementById("speed0");
                        humidityByDay.innerHTML = "Speed: " + map31;

                        const map32 = array1.list[8].wind.speed;
                        humidityByDay = document.getElementById("speed1");
                        humidityByDay.innerHTML = "Speed: " + map32;

                        const map33 = array1.list[16].wind.speed;
                        humidityByDay = document.getElementById("speed2");
                        humidityByDay.innerHTML = "Speed: " + map33;

                        const map34 = array1.list[24].wind.speed;
                        humidityByDay = document.getElementById("speed3");
                        humidityByDay.innerHTML = "Speed: " + map34;

                        const map35 = array1.list[32].wind.speed;
                        humidityByDay = document.getElementById("speed4");
                        humidityByDay.innerHTML = "Speed: " + map35;

                        const map36 = array1.list[0].wind.deg;
                        windDegreesByDay = document.getElementById("wind0");
                        windDegreesByDay.innerHTML = "Wind Degrees: " + map36;

                        const map37 = array1.list[8].wind.deg;
                        windDegreesByDay = document.getElementById("wind1");
                        windDegreesByDay.innerHTML = "Wind Degrees: " + map37;

                        const map38 = array1.list[16].wind.deg;
                        windDegreesByDay = document.getElementById("wind2");
                        windDegreesByDay.innerHTML = "Wind Degrees: " + map38;

                        const map39 = array1.list[24].wind.deg;
                        windDegreesByDay = document.getElementById("wind3");
                        windDegreesByDay.innerHTML = "Wind Degrees: " + map39;

                        const map40 = array1.list[32].wind.deg;
                        windDegreesByDay = document.getElementById("wind4");
                        windDegreesByDay.innerHTML = "Wind Degrees: " + map40;
                    })
            });

    })
})

