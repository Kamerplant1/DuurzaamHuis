
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

//Actuale Buiten-temperatuur (Tristan)
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
// einde van actuele buitenTemperatuur (Tristan)


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
