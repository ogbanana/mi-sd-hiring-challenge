import { getGeolocationEndpoint, getDay } from './utils';

const form = document.getElementById('zipcode-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  getGeolocationEndpoint();
});

const app = document.getElementById('app');

export function createWeatherElement (daily, city, regionCode) {
  const weatherContainer = document.createElement('div');
  weatherContainer.className = 'weather-container';
  app.appendChild(weatherContainer);

  const weatherHeader = document.createElement('h2');
  weatherHeader.className = 'weather-header';
  weatherHeader.innerText = `WEATHER FORECAST FOR ${city.toUpperCase()}, ${regionCode}`;
  weatherContainer.appendChild(weatherHeader);

  const forecastContainer = document.createElement('div');
  forecastContainer.className = 'forecast-container';
  weatherContainer.appendChild(forecastContainer);

  daily.data.forEach((day, index) => {
    const dayContainer = document.createElement('div');
    dayContainer.className = 'day-container';
    forecastContainer.appendChild(dayContainer);

    const weekDay = document.createElement('h3');
    weekDay.className = 'weekday';
    weekDay.innerText = index === 0 ? 'Today' : getDay(index);
    dayContainer.appendChild(weekDay);

    const tempContainer = document.createElement('div');
    tempContainer.className = 'temp-container';
    dayContainer.appendChild(tempContainer);

    const forecastIcon = document.createElement('img');
    forecastIcon.className = 'forecast-icon';
    forecastIcon.src = `/img/${day.icon}.png`;

    const highTemp = document.createElement('p');
    highTemp.className = 'high-temp';
    highTemp.innerText = `${Math.floor(day.temperatureHigh)} F`;

    const lowTemp = document.createElement('p');
    lowTemp.className = 'low-temp';
    lowTemp.innerText = `${Math.floor(day.temperatureMin)} F`;

    const weatherDescription = document.createElement('p');
    weatherDescription.className = 'weather-description';
    weatherDescription.innerText = day.summary;

    tempContainer.innerHTML = forecastIcon.outerHTML + weatherDescription.outerHTML + highTemp.outerHTML + lowTemp.outerHTML;
  });
}
