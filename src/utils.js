/**
 *
 * @param {number} time - Unix time in seconds returns it in miliseconds
 */
import {createWeatherElement, errorMessageElement} from './app.js';
const geoAPI = 'https://se-weather-api.herokuapp.com/api/v1/geo';
const forecastAPI = 'https://se-weather-api.herokuapp.com/api/v1/forecast';

export function convertDate(time) {
  return time * 1000;
}

export function getDate() {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();
  return month + day + year;
}

export function getDay (idx) {
  const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date();
  let day = date.getDay();
  if ((day + idx) > 6) day = day - 7;

  return days[day + idx];
}

async function fetchGeolocationAPI (input) {
  try {
    const response = await fetch(`${geoAPI}?zip_code=${input}`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}

async function fetchForecastAPI(lat, long) {
  const date = getDate();
  try {
    const forecast = await fetch(`${forecastAPI}?latitude=${lat}&longitude=${long}&date=${date}`);
    return forecast.json();

  } catch (err) {
    console.error(err);
  }
}

export async function getGeolocationEndpoint() {
  const input = document.getElementById('zipcode-input').value;
  const {
    city,
    latitude,
    longitude,
    regionCode
  } = await fetchGeolocationAPI(input);  
  if (city && latitude && longitude && regionCode) {
    const { daily } = await fetchForecastAPI(latitude, longitude);
    if (daily) {
      createWeatherElement(daily, city, regionCode);
    }
  } else {
    errorMessageElement();
  }
}

async function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const {daily}  = await fetchForecastAPI(latitude, longitude);
    if (daily) {
      createWeatherElement(daily);
    }
  }

export function getMyWeather() {
  if (!navigator.geolocation) {
    alert('Unfortunately, we cannot find you with this browser.');
  } else {
    navigator.geolocation.getCurrentPosition(success);
  }
}
