// Global Variables
var rowData = document.querySelector(".rowData");
var Day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var btn = document.querySelector('#findbtn');
var input = document.querySelector("#search");

// Get Current Weather Data
async function getData(city) {
    var result = await fetch(`https://api.weatherapi.com/v1/current.json?key=592cb8c0ff3540afa96142847240207&q=${city}`);
    var finalResult = await result.json();
   
    display(finalResult);
} 
getData("cairo")
// Display Current Weather Data
function display(finalResult) {
    var lastUpdatedDate = new Date(finalResult.current.last_updated);
    
    var data =
    `
    <div class="item col-4 rounded">
        <div class="weatherItem">
            <header class="headerWeather d-flex justify-content-between w-100">
                <p>${lastUpdatedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                <p> ${lastUpdatedDate.toLocaleDateString('en-US', { day: 'numeric' })} ${lastUpdatedDate.toLocaleDateString('en-US', { month: 'long' })}</p>
            </header>
            <p class="city my-3">${finalResult.location.name}</p>
            <h1 class="degree my-4">${finalResult.current.temp_c}</h1>
            <img id="weatherImg" class="img-fluid" src="http:${finalResult.current.condition.icon}" alt="">
            <p class="weatherStatus">${finalResult.current.condition.text}</p>
            <section class="data d-flex justify-content-between py-2">
                <span> <img src="image/icon-umberella.png" alt=""> ${finalResult.current.pressure_in}%</span>
                <span>  <img src="image/icon-wind.png" alt="">  ${finalResult.current.wind_kph}km/h</span>
                <span> <img src="image/icon-compass.png" alt="">  ${finalResult.current.wind_dir}</span>
            </section>
        </div>
    </div>
    `;
    
    rowData.innerHTML = data; // Replace innerHTML with current weather data
}

// Get Forecast Data
async function getForecastData(forecastCity) {
    var result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=592cb8c0ff3540afa96142847240207&q=${forecastCity}&days=3`); // fetch forecast for 3 days
    var finalResult = await result.json();
   
    displayForecastData(finalResult);
}
getForecastData("cairo")
// Display Forecast Data
function displayForecastData(finalResult) {
    var forecastDays = finalResult.forecast.forecastday; // Array of forecast days
    
    // Iterate through the forecast days (tomorrow and the day after tomorrow)
    for (let i = 1; i <= 2; i++) {
        var forecast = forecastDays[i];
        var forecastDate = new Date(forecast.date);
        
        var data =
        `
        <div class="item col-4 rounded">
            <div class="weatherItem">
                <header class="headerWeather d-flex justify-content-between w-100">
                    <p>${forecastDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p> ${forecastDate.toLocaleDateString('en-US', { day: 'numeric' })} ${forecastDate.toLocaleDateString('en-US', { month: 'long' })}</p>
                </header>
                <p class="city my-3">${finalResult.location.name}</p>
                <h1 class="degree my-4">${forecast.day.avgtemp_c}</h1>
                <img id="weatherImg" class="img-fluid" src="http:${forecast.day.condition.icon}" alt="">
                <p class="weatherStatus">${forecast.day.condition.text}</p>
                <section class="data d-flex justify-content-between py-2">
                    <span> <img src="image/icon-umberella.png" alt=""> ${forecast.day.daily_chance_of_rain}%</span>
                    <span>  <img src="image/icon-wind.png" alt="">  ${forecast.day.maxwind_kph}km/h</span>
                    <span> <img src="image/icon-compass.png" alt="">  ${forecast.day.wind_dir}</span>
                </section>
            </div>
        </div>
        `;
        
        rowData.innerHTML += data;
    }
}

// Event Listener for Button Click
btn.addEventListener("click", function() {
    var currentCity = input.value.trim(); // Get value from input and trim any leading/trailing whitespace
    if (currentCity !== "") {
        getData(currentCity);
        getForecastData(currentCity);
    } else {
        getData("cairo");
        getForecastData("cairo");
    }
});


// Event Listener for Button Click
btn.addEventListener("keydown", function() {
  console.log("hello");
});
