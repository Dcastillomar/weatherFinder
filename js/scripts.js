var searchFormEl = document.querySelector('form');
var userSearchEl = document.getElementById('form');
var appid = 'cc8ae70c1ab94ea82093b1c93affc11a';
var q;
var url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
const weatherIcon = document.querySelector('weather-icon');

const geoUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd5fc7231e1msh77541d2485d4f5ep1024cejsnc720f28bbfbe',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
};

var debounceTimer;

// Function to debounce input and fetch suggestions
async function fetchSuggestions(input) {
    try {
        const response = await fetch(`${geoUrl}?namePrefix=${input}`, options);
        const data = await response.json();
        displaySuggestions(data);
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
    }
}

// Add a single event listener to the search bar input with debouncing
userSearchEl.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        var userInput = userSearchEl.value;
        fetchSuggestions(userInput);
    }, 1000); // Adjust the debounce delay as needed
});

async function fetchData() {
    try {
        const response = await fetch(geoUrl, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Function to display city suggestions
var latitude, longitude;

function displaySuggestions(data) {
    var suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    data.data.forEach(function (city) {
        var suggestionButton = document.createElement('button');
        suggestionButton.innerHTML = `${city.city}, ${city.region}`;

        suggestionButton.addEventListener('click', function () {
            userSearchEl.value = `${city.city}, ${city.region}`;
            latitude = city.latitude; // Use global latitude
            longitude = city.longitude; // Use global longitude
            searchWeather(city.city);
        });
        suggestionsContainer.appendChild(suggestionButton);
    });
}

// Call the async function
fetchData();


var searchHistory = localStorage.getItem('searchHistory');
//searchbar input and button pressed or enter hit will start the event
searchFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    // creating an array that will hold search history
    var userInput = userSearchEl.value;
    var key = 'searchHistory';
    var searchHistoryArr;
    if (!localStorage.getItem(key)) {
        searchHistoryArr = [];
        searchHistoryArr.push(userInput);
        localStorage.setItem(key, JSON.stringify(searchHistoryArr));

    } else if (localStorage.getItem(key)) {
        searchHistoryArr = JSON.parse(localStorage.getItem(key));
        searchHistoryArr.push(userInput);
        localStorage.setItem(key, JSON.stringify(searchHistoryArr));
        renderSearchHistory();
        searchWeather(userInput);
    }

    //makes a each index in the array a button which calls the search weather function
    //takes the name out of the button for q
    function renderSearchHistory() {
        var container = document.getElementById('history');
        container.innerHTML = '';

        var maxResults = Math.min(searchHistoryArr.length, 12);

        var startIndex = searchHistoryArr.length - maxResults;

        for (var i = startIndex; i < searchHistoryArr.length; i++) {
            var value = searchHistoryArr[i];
            const button = document.createElement('button')
            button.innerHTML = value;
            button.addEventListener('click', function (event) {
                var clickedButtonValue = event.target.innerHTML;
                searchWeather(clickedButtonValue);
            });

            container.appendChild(button);
        }

        if (searchHistoryArr.length > 12) {
            searchHistoryArr.splice(0, searchHistoryArr.length - 12); // Remove the oldest items from the search history
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr)); // Update the search history in localStorage
        }
    }
    renderSearchHistory();
});
    

//function which calls the api
function searchWeather(q) {
    forecastContainer.innerHTML = '';
    // Fetch the latitude and longitude
    var geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(geoCodeUrl)
        .then(response => response.json())
        .then(data => {
            latitude = data[0].lat; // Update global latitude
            longitude = data[0].lon; // Update global longitude
            console.log(latitude, longitude); // Log the values

            // Fetch current weather using latitude and longitude
            var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${appid}`;

            return fetch(currentWeatherUrl);
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.name)


            var currentTemp = data.main.temp;
            var tempEl = document.getElementById("currentTemp");
            tempEl.innerHTML = "Current Temp: " + currentTemp;

            var highTempEl = data.main.temp_max;
            var pHighTemp = document.getElementById("main5");
            pHighTemp.innerHTML = "High Temp: " + highTempEl;

            var lowTempEl = data.main.temp_min;
            var pLowTemp = document.getElementById("main6");
            pLowTemp.innerHTML = "Low Temp: " + lowTempEl;

            var feelsLikeEl = document.getElementById("main0");
            var feelsLikeTemp = data.main.feels_like;
            feelsLikeEl.innerHTML = "Feels Like: " + feelsLikeTemp;

            var pressureEl = data.main.pressure;
            var pressureMeasurement = document.getElementById("main2");
            pressureMeasurement.innerHTML = "Pressure: " + pressureEl;

            var humidityEl = document.getElementById("main1");
            var humidityPercent = data.main.humidity;
            humidityEl.innerHTML = "Humidity percent: " + humidityPercent;

            var speedDegreesEl = document.getElementById("wind1");
            var windSpeed = data.wind.speed;
            speedDegreesEl.innerHTML = "Wind Speed: " + windSpeed;

            var windDegEl = document.getElementById("wind2");
            var windDeg = data.wind.deg;
            windDegEl.innerHTML = "Wind Degrees: " + windDeg;

            city = data.name;
            var cityNameEl = document.getElementById('cityname');
            cityNameEl.innerHTML = city;
            return { data, latitude, longitude };
            
            // return data;
        }) 
        // .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.data.main.temp)
            console.log(data.data.name)
            var city = data.data.name;
            var cityNameEl = document.getElementById('cityname');
            cityNameEl.innerHTML = city;

            var currentTemp = data.data.main.temp;
            var tempEl = document.getElementById("currentTemp");
            tempEl.innerHTML = "Current Temp: " + currentTemp;


            // Display the current weather icon
            var iconCode = data.data.weather[0].icon;
            document.getElementById("current-weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
            
            // Assuming you want to return latitude and longitude
            var latitude = data.data.coord.lat;
            var longitude = data.data.coord.lon;
            
            return { latitude, longitude };
        })
        .then(({ latitude, longitude }) => {
            // Log the latitude and longitude
            console.log(latitude, longitude);
        
            // Continue with fetching the five-day forecast
            var fiveDayWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${appid}`;
            return fetch(fiveDayWeather);
        })
        .then(response => response.json())
        .then((data) => {

            const forecastList = data.list;
            console.log(forecastList);

            // Display the five-day forecast
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = '';

            for (let i = 0; i < forecastList.length; i += 8) {
                // Create a new column element
                const column = document.createElement('div');
                column.classList.add('col-md-2', 'mb-4'); // Adjust the class as needed
    
                // Extract data for the day
                const date = moment(forecastList[i].dt_txt).format('MM-DD-YYYY');
                const highTemp = forecastList[i].main.temp_max;
                const lowTemp = forecastList[i].main.temp_min;
                const feelsLike = forecastList[i].main.feels_like;
                const pressure = forecastList[i].main.pressure;
                const humidity = forecastList[i].main.humidity;
                const windSpeed = forecastList[i].wind.speed;
                const windDegrees = forecastList[i].wind.deg;
    
                // Create HTML content for the column
                const columnContent = `
                <h5 style="font-size: 1.5em;">${date}</h5>
                <p style="font-size: 1em;">High Temp: ${highTemp}</p>
                <p style="font-size: 1em;">Low Temp: ${lowTemp}</p>
                <p style="font-size: 1em;">Feels like: ${feelsLike}</p>
                <p style="font-size: 1em;">Pressure: ${pressure}</p>
                <p style="font-size: 1em;">Humidity: ${humidity}</p>
                <p style="font-size: 1em;">Wind Speed: ${windSpeed}</p>
                <p style="font-size: 1em;">Wind Degrees: ${windDegrees}</p>
            `;
    
                // Set the column content
                column.innerHTML = columnContent;
                column.style.color = 'white';
                column.style.border = '3px solid white';
                column.style.borderRadius= '10px';
                column.style.fontWeight= "700";
                
                
                // Append the column to the container
                forecastContainer.appendChild(column);
            }
        })
        // Fetch error handling
        .catch((error) => {
            console.error("Error fetching data:", error);
        })}
