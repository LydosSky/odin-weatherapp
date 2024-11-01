const API_KEY = "L65HRL2TSN56KX7HYS324LYP6";
const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
let weatherData;

let country = "london";
let unit = "metric";

const WeatherData = function (description, currentCondition, days) {
  return { description, currentCondition, days };
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

const UI = (function () {})();

WeatherModule.getWeatherData(country, unit).then((weather) =>
  console.log(weather),
);
