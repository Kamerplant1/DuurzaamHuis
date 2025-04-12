console.log("JS is loaded");

function updateTime() {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateImage() {
    const img = document.getElementById("dynamicImage");
    if (!img) return;

    const now = new Date();
    const hours = now.getHours();

    img.src = (hours >= 19 || hours < 7) ? "img/moon.png" : "img/sun.webp";
}

updateTime();
updateImage();
setInterval(updateTime, 1000);
setInterval(updateImage, 60000);

// Weather API for current temperature (Tristan)
const buitentemperatuur = document.getElementById("js--actuelebuitentemp");
const weatherImage = document.getElementById("js--weatherImg");
const weatherType = document.getElementById("js--weatherType");

function updateWeatherData() {
    fetch("https://weerlive.nl/api/weerlive_api_v2.php?key=demo&locatie=Amsterdam")
        .then(function (response) {
            return response.json();
        })
        .then(function (realTempData) {
            const tempData = realTempData.liveweer[0];
            const temperature = tempData.temp;

            buitentemperatuur.innerText = temperature + "°C";
            weatherType.innerText = tempData.samenv;

            if (temperature < 10) {
                weatherImage.src = "./img/cold.png";
            } else {
                weatherImage.src = "./img/warm.png";
            }
        });
}

setInterval(updateWeatherData, 3000);
updateWeatherData();
// einde current temperature (Tristan)


// Weather forecast API (Jasper)
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.374&longitude=4.8897&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Amsterdam";

async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function getFormattedDate(daysToAdd = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
    const days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];

    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()];
    const day = date.getDate();

    return `${dayName} ${day} ${monthName}`;
}

function getWeatherIcon(weatherCode) {
    const weatherIcons = {
        0: 'clear.png',
        1: 'slightly-cloudy.png',
        2: 'cloudy.png',
        3: 'cloudy.png',
        45: 'fog.png',
        51: 'rain.png',
        53: 'rain.png',
        55: 'rain.png',
        61: 'rain.png',
        71: 'rain.png',
        73: 'rain.png',
        80: 'light-storm.png',
        95: 'storm.png'
    };

    return weatherIcons[weatherCode] || 'default.png';
}

function updateWeatherUI(data) {
    const dailyTempsMax = data.daily.temperature_2m_max;
    const dailyTempsMin = data.daily.temperature_2m_min;
    const dailyWeatherCodes = data.daily.weathercode;

    document.getElementById("forecast-day1-date").textContent = getFormattedDate(0);
    document.getElementById("forecast-day2-date").textContent = getFormattedDate(1);
    document.getElementById("forecast-day3-date").textContent = getFormattedDate(2);

    document.getElementById("forecast-day1-temp-max").textContent = `${dailyTempsMax[0]}°C`;
    document.getElementById("forecast-day1-temp-min").textContent = `${dailyTempsMin[0]}°C`;
    document.getElementById("forecast-day1-img").src = `img/${getWeatherIcon(dailyWeatherCodes[0])}`;

    document.getElementById("forecast-day2-temp-max").textContent = `${dailyTempsMax[1]}°C`;
    document.getElementById("forecast-day2-temp-min").textContent = `${dailyTempsMin[1]}°C`;
    document.getElementById("forecast-day2-img").src = `img/${getWeatherIcon(dailyWeatherCodes[1])}`;

    document.getElementById("forecast-day3-temp-max").textContent = `${dailyTempsMax[2]}°C`;
    document.getElementById("forecast-day3-temp-min").textContent = `${dailyTempsMin[2]}°C`;
    document.getElementById("forecast-day3-img").src = `img/${getWeatherIcon(dailyWeatherCodes[2])}`;
}

fetchWeatherData();

//zonsondergang jayden
const sunSet = document.getElementById("sunSet");
const sunRise = document.getElementById("sunRise");

function zonOpkomstAPI() {
fetch("https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&formatted=0")
.then(response => response.json())
.then(RealData => {
const options = { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
const localSunrise = new Date(RealData.results.sunrise).toLocaleTimeString("nl-NL", options);
const localSunset = new Date(RealData.results.sunset).toLocaleTimeString("nl-NL", options);

sunRise.innerHTML = `<bold>Zonsopkomst: </bold> <br> ${localSunrise}`;
sunSet.innerHTML = `<bold>Zonsondergang: </bold> <br> ${localSunset}`;
});
}

zonOpkomstAPI();

//einde zonsondergang jayden
//start licht knop Tristan

const knop = document.getElementById("lampknop--js");

function buttonClick() {
  knop.innerHTML = "UIT";
  knop.style.backgroundColor = "rgb(255, 0, 0)";
}

knop.addEventListener("click", buttonClick);

const toggleButton = document.getElementById('toggle-button');
const statusText = document.getElementById('status');
const lamp = document.getElementById('lamp--js');

toggleButton.addEventListener('click', () => {
  toggleButton.classList.toggle('on');

  if (toggleButton.classList.contains('on')) {
    statusText.textContent = 'On';
    statusText.style.color = 'green';
    lamp.src="img/lampAan.png";
  } else {
    statusText.textContent = 'Off';
    statusText.style.color = 'red';
    lamp.src="img/lampUit.png"
  }
});
//charts
const ctx = document.getElementById('JaydenGrafiek').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [{
      label: 'Kwh',
      data: [0.5, 1.2, 1.4, 1.5, 3.6, 5.3, 4.2, 6.1,8.1,3.5,0.1,4.6,5.3,0.0,0,8,1.2,1.5,1.8,2.5,8.1,2.3,10.2],
      borderColor: 'rgb(75, 192, 192)',
      fill: false
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Energie Verbruik'
      }
    }
  }
});
