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
}

knop.addEventListener("click", buttonClick);

const toggleButton = document.getElementById('toggle-button');
const statusText = document.getElementById('status');
const lamp = document.getElementById('lamp--js');

toggleButton.addEventListener('click', () => {
  toggleButton.classList.toggle('on');

  if (toggleButton.classList.contains('on')) {
    lamp.src = "img/lampAan.png";
    lamp.style.filter = "drop-shadow(0 0 7rem rgb(255, 208, 0))";
} else {
    lamp.src = "img/lampUit.png";
    lamp.style.filter = "none"; // Zorg dat het licht-effect verdwijnt als de lamp uit is
}

});
//charts
const ctx = document.getElementById('JaydenGrafiek').getContext('2d');
const luchtChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [{
      label: 'Luchtvochtigheid (%)',
      data: [85, 86, 87, 88, 89, 90, 88, 84, 80, 78, 75, 73, 70, 68, 66, 65, 67, 70, 74, 78, 81, 83, 84, 85],
      borderColor: 'rgb(153, 102, 255)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Zodat het goed schaalt in je card
    plugins: {
      title: {
        display: true,
        text: 'Luchtvochtigheid over de dag'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: '%'
        },
        min: 50,
        max: 100
      }
    }
  }
});


const ctx2 = document.getElementById('TristanGrafiek').getContext('2d');
const tempChart = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',],
    datasets: [
      {
        label: 'Binnentemperatuur (°C)',
        data: [20, 20, 19.8, 19.5, 19.3, 19, 18.8, 19, 20.5, 21.2, 21.8, 22, 22.3, 22.5, 22.2, 21.9, 21.5, 21, 20.8, 20.6, 20.4, 20.2, 20, 19.9],
        borderColor: 'rgb(255, 99, 132)',
        fill: false
      },
      {
        label: 'Buitentemperatuur (°C)',
        data: [10, 9.5, 9, 8.8, 8.5, 8.2, 8.1, 8.4, 9, 10, 12, 14, 15.5, 17, 18, 18.2, 17.5, 16, 14, 13, 12, 11.5, 11, 10.5],
        borderColor: 'rgb(54, 162, 235)',
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Binnen- en Buitentemperatuur'
      }
    }
  }
});

const ctx3 = document.getElementById('JasperGrafiek').getContext('2d');
const zonneChart = new Chart(ctx3, {
  type: 'line',
  data: {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    datasets: [{
      label: 'Zonnepanelen Opbrengst (kWh)',
      data: [0, 0, 0, 0, 0, 0, 0.1, 0.5, 1.2, 2.5, 3.8, 4.5, 5.2, 5.3, 5.1, 4.6, 3.9, 2.8, 1.4, 0.5, 0.1, 0, 0, 0],
      borderColor: 'rgb(255, 206, 86)',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Zonnepanelen Energie-opbrengst'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'kWh'
        }
      },
    }
  }
});


