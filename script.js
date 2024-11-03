import MOCK_DATA from "./data.js";

const API_KEY = "L65HRL2TSN56KX7HYS324LYP6";
const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

let country = "london";
let unit = "metric";

const WeatherData = function (description, currentConditions, days) {
  return { description, currentConditions, days };
};

const WeatherModule = (function () {
  function constructApiUrl(location, unit) {
    return `${API_URL}${location}?key=${API_KEY}&unitGroup=${unit}`;
  }

  function parseResponse(response) {
    return response.json();
  }

  function parseData(data) {
    const { description, currentConditions, days } = data;
    return new WeatherData(description, currentConditions, days);
  }

  function getWeatherData(location, unit) {
    return fetch(constructApiUrl(location, unit))
      .then(parseResponse)
      .then(parseData);
  }

  return { getWeatherData };
})();

const UI = (function () {
  function drawCurrentWeather(currentWeather, unit) {
    const currentWeatherContainer = document.querySelector("#current-weather");
    const weatherCard = createWeatherCard(
      currentWeather.currentConditions,
      unit,
    );

    currentWeatherContainer.appendChild(weatherCard);
  }

  function createWeatherCard(currentWeather, unit) {
    let symbol;
    if (unit === "metric") symbol = "°C";
    if (unit === "us") symbol = "°F";

    const card = document.createElement("div");
    const cardLeftContainer = document.createElement("div");
    const cardRightContainer = document.createElement("div");
    const h2 = document.createElement("h2");
    const small = document.createElement("small");
    const feelslike = document.createElement("small");
    const humidity = document.createElement("small");
    const uvindex = document.createElement("small");
    const dewPoint = document.createElement("small");

    card.classList.add("card");
    cardLeftContainer.classList.add("card-left-container");
    cardRightContainer.classList.add("card-right-container");

    h2.innerText = `${currentWeather.temp} ${symbol}`;
    small.innerText = currentWeather.conditions;
    feelslike.innerText = `Feelslike: ${currentWeather.feelslike} ${symbol}`;
    humidity.innerText = `Humidity: ${currentWeather.humidity}%`;
    dewPoint.innerText = `Dew Point: ${currentWeather.dew}`;
    uvindex.innerText = `UV: ${currentWeather.uvindex}`;

    cardLeftContainer.appendChild(h2);
    cardLeftContainer.appendChild(small);
    cardRightContainer.appendChild(feelslike);
    cardRightContainer.appendChild(humidity);
    cardRightContainer.appendChild(dewPoint);
    cardRightContainer.appendChild(uvindex);

    card.appendChild(cardLeftContainer);
    card.appendChild(cardRightContainer);

    return card;
  }

  return { drawCurrentWeather };
})();

// WeatherModule.getWeatherData(country, unit).then((weather) =>
//   UI.drawCurrentWeather(weather.currentConditions, unit),
// );
console.log(MOCK_DATA);

UI.drawCurrentWeather(MOCK_DATA, unit);
