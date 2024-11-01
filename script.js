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
    let symbol;
    if (unit === "metric") symbol = "°C";
    if (unit === "us") symbol = "°F";
    const currentWeatherContainer = document.querySelector("#current-weather");
    const card = document.createElement("div");
    const h2 = document.createElement("h2");
    const small = document.createElement("small");
    const feelslike = document.createElement("small");
    const humidity = document.createElement("small");
    const uvindex = document.createElement("small");
    const dewPoint = document.createElement("small");

    h2.innerText = `${currentWeather.temp} ${symbol}`;
    small.innerText = currentWeather.conditions;
    feelslike.innerText = `Feelslike: ${currentWeather.feelslike} ${symbol}`;
    humidity.innerText = `Humidity: ${currentWeather.humidity}%`;
    dewPoint.innerText = `Dew Point: ${currentWeather.dew}`;
    uvindex.innerText = `UV: ${currentWeather.uvindex}`;

    card.appendChild(h2);
    card.appendChild(small);
    card.appendChild(feelslike);
    card.appendChild(humidity);
    card.appendChild(dewPoint);
    card.appendChild(uvindex);

    currentWeatherContainer.appendChild(card);
  }

  return { drawCurrentWeather };
})();

WeatherModule.getWeatherData(country, unit).then((weather) =>
  UI.drawCurrentWeather(weather.currentConditions, unit),
);
