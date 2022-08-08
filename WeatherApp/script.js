// Accessing the different divs I want to manipulate in the DOM
const cityNameDiv = document.getElementById("city-name")
const weatherTypeDiv = document.getElementById("weather-type")
const weatherDescriptionDiv = document.getElementById("weather-description")
const tempDiv = document.getElementById("temp")
const feelsLikeDiv = document.getElementById("feels-like")
const humidityDiv = document.getElementById("humidity")
const minTempDiv = document.getElementById("min-temp")
const maxTempDiv = document.getElementById("max-temp")
const lastUpdatedDiv = document.getElementById("last-updated")

// other variables: API_KEY and default city that I want to display on website load
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";
let cityDefault = "Copenhagen"

/**
 * API url
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
// Method to fetch data from the API
const getWeatherData = async (city) => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await fetch(URL)
    const data = await response.json()
    return data
}

// Retrieving the city/country input and using the promise from the getWeatherData function
const searchCity = async () => {
    const city = document.getElementById('city-input').value;
    const data = await getWeatherData(city) //.then(value => console.log(value))
    showWeatherData(data)
}

// Displaying the data on the DOM
const showWeatherData = (weatherData) => {
    console.log(weatherData, "✅")
    cityNameDiv.innerText = document.getElementById("city-input").value
    weatherTypeDiv.innerText = weatherData.weather[0].main
    weatherDescriptionDiv.innerText = weatherData.weather[0].description
    tempDiv.innerText = weatherData.main.temp
    feelsLikeDiv.innerText = weatherData.main.feels_like
    humidityDiv.innerText = weatherData.main.humidity
    minTempDiv.innerText = weatherData.main.temp_min
    maxTempDiv.innerText = weatherData.main.temp_max
    //The API does not give any data in regards to when the forecast was last updated, so I simply display the current time
    const currTime = new Date()
    lastUpdatedDiv.innerText = currTime.toLocaleTimeString()
}

// run on website load
// a little trick that waits for the website to be fully loaded
// then it fetches data for Copenhagen, which I've set to be the default city
document.addEventListener('DOMContentLoaded', async function () {
    const data = await getWeatherData(cityDefault)
    showWeatherData(data)
    cityNameDiv.innerText = cityDefault
});
