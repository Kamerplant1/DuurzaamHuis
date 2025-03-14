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
