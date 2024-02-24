const inputText = document.getElementById("inputText");
const searchBar = document.getElementById("searchBar");
const temp = document.getElementById("temp");
const locationName = document.getElementById("location");
const APIKey = "96ae4f0ff15d3b006deaf259d7638b26";
const APIUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

inputText.addEventListener("focusin", function inputTextClick(e) {
	e.target.placeholder = "";
});

inputText.addEventListener("focusout", function inputTextClick(e) {
	e.target.placeholder = "Search Country/City Here";
});

function getWeather(data) {
  const locationWeather = data.weather[0].main;
  const locationTemp = Math.round(data.main.temp);
  const locationRegion = data.name;
  const locationHumidity = data.main.humidity + "%";
  const locationWindSpeed = data.wind.speed + " M/Ps";
  temp.innerHTML = locationTemp + ` &deg;C`;
  locationName.innerHTML = locationRegion;
}

searchBar.addEventListener("submit", function (e) {
	e.preventDefault();
	const locationValue = inputText.value;
	const fullAPIUrl =
		APIUrl + locationValue + "&appid=" + APIKey + "&units=metric";

	console.log("fullAPIUrl", fullAPIUrl);

	fetch(fullAPIUrl)
		.then(function convertToJson(response) {
			return response.json();
		})
		.then(getWeather);
});
