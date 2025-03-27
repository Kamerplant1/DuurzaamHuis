console.log("JS is geladen");


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

// Dit stuk hierboven is voor de tijdbalk die heeft jasper gemaakt.
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
                weatherImage.src = "../img/cold.png";
            } else {
                weatherImage.src = "../img/warm.png";
            }
        });
}
setInterval(updateWeatherData, 3000);
updateWeatherData();

// dit hierboven is voor de weather api voor actuele buitentemperatuur (Van Tristan).

