const searchBar = document.getElementById("searchBar");
const inputText = document.getElementById("inputText");
const responseErrorMsg = document.querySelector(".responseErrorMsg")
const weatherDisplay = document.querySelector(".weatherDisplay");
const weatherIcon = document.getElementById("weatherIcon");
const temp = document.getElementById("temp");
const locationName = document.getElementById("location");
const humidity = document.getElementById("humidity");
const humidityIcon = document.getElementById("humidityIcon");
const windSpeed = document.getElementById("windSpeed");
const windSpeedIcon = document.getElementById("windSpeedIcon");

const APIKey = "96ae4f0ff15d3b006deaf259d7638b26";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

inputText.addEventListener("focusin", (e) => {
	e.target.placeholder = "";
});

inputText.addEventListener("focusout", (e) => {
	e.target.placeholder = "Search Country/City Here";
});

function getWeather(data) {
	const locationWeather = data.weather[0].main;
	const locationTemp = Math.round(data.main.temp);
	const locationRegion = data.name;
	const locationHumidity = data.main.humidity;
	const locationWindSpeed = data.wind.speed + " M/Ps";

	console.log("locationHumidity", locationHumidity);

	temp.innerHTML = locationTemp + ` &deg;C`;
	locationName.innerHTML = locationRegion;
	humidity.innerHTML = locationHumidity + "%";
	windSpeed.innerHTML = locationWindSpeed;

	if (locationWeather == "Clouds") {
		weatherIcon.src = "assets/weather_icons/cloud/cloudy.png";
	} else if (locationWeather == "Clear") {
		weatherIcon.src = "assets/weather_icons/sun/sunny&cloudy.png";
	} else if (locationWeather == "Rain") {
		weatherIcon.src = "assets/weather_icons/rain/39.png";
	} else if (locationWeather == "Drizzle") {
		weatherIcon.src = "assets/weather_icons/sun/sunny&raining.png";
	} else if (locationWeather == "Mist") {
		weatherIcon.src = "assets/weather_icons/sun/sunny.png";
	}

	weatherDisplay.style.display = "block";

	humidityIcon.src = "assets/Humidity.webp";
	windSpeedIcon.src = "assets/WindSpeed.png";
}

searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	const locationValue = inputText.value.trim();
	const fullAPIUrl =
		APIUrl + locationValue + "&appid=" + APIKey + "&units=metric";

	console.log("fullAPIUrl", fullAPIUrl);

	fetch(fullAPIUrl)
		.then(function convertToJson(response) {
			if (response.status == "404") {
        responseErrorMsg.style.display = "block"
				console.log("response.status code", response.status);
			} else {
        if (responseErrorMsg.style.display = "block") {
          responseErrorMsg.style.display = "None"
        }
        return response.json();
			}
		})
		.then(getWeather);
});
