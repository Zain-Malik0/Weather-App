const apiKey = '91170ee49af4084f39cded2b0dc20bc0';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const url = 'https://ipinfo.io/json?token=7a3d5b596fd882';
async function cuurentLocation () {
  const response = await fetch(url);
  var data = await response.json();
  checkWeather(data.city);
  document.querySelector('.js-current-location-text').innerHTML = data.city;
};

cuurentLocation();

document.querySelector('.js-search-button').addEventListener('click', () => {
  const city = document.querySelector('.js-search-input').value;
  checkWeather(city);
});



function updateWeatherIcon(weather) {
  const weatherIcon = document.querySelector('.weather-icon');
  const background = document.body.style;
  if (weather === 'Clear') {
    weatherIcon.src = 'images/clear.png';
    background.backgroundImage = "url('backgrounds/clear.jpeg')";
  } else if (weather === 'Clouds') {
    weatherIcon.src = 'images/clouds.png';
    background.backgroundImage = "url('backgrounds/clouds.jpg')";
  } else if (weather === 'Drizzle') {
    weatherIcon.src = 'images/drizzle.png';
    background.backgroundImage = "url('backgrounds/drizzle.jpg')";
  } else if (weather === 'Mist') {
    weatherIcon.src = 'images/mist.png';
    background.backgroundImage = "url('backgrounds/mist.jpeg')";
  } else if (weather === 'Rain') {
    weatherIcon.src = 'images/rain.png';
    background.backgroundImage = "url('backgrounds/rain.jpg')";
  } else if (weather === 'Snow') {
    weatherIcon.src = 'images/snow.png';
    background.backgroundImage = "url('backgrounds/snow.jpeg')";
  }
}

async function checkWeather (city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  document.querySelector('.js-temperature-div').innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector('.js-city-div').innerHTML = data.name;
  document.querySelector('.humidity-per').innerHTML = data.main.humidity + '%';
  document.querySelector('.wind-speed').innerHTML = (data.wind.speed).toFixed(1) + " Km/h";
  updateWeatherIcon(data.weather[0].main);
  document.querySelector('.js-search-input').value = '';
};

document.querySelector('.js-search-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const city = document.querySelector('.js-search-input').value;
    checkWeather(city);
  };
});

document.querySelector('.js-current-location').addEventListener('click', () => {
  const currentCity = document.querySelector('.js-current-location-text').innerHTML;
  checkWeather(currentCity);
});