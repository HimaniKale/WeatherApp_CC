function updateWeatherUI(weather) {
    const effectsContainer = document.querySelector("#weather-effects");
    effectsContainer.innerHTML = ''; // Clear previous effects

    console.log("Weather Condition:", weather);

    if (weather.includes("rain")) {
        for (let i = 0; i < 50; i++) {
            let drop = document.createElement("div");
            drop.classList.add("raindrop");
            drop.style.left = Math.random() * window.innerWidth + "px";
            drop.style.animationDuration = Math.random() * 1.5 + "s"; 
            effectsContainer.appendChild(drop);
        }
    } else if (weather.includes("snow")) {
        for (let i = 0; i < 30; i++) {
            let snow = document.createElement("div");
            snow.classList.add("snowflake");
            snow.style.left = Math.random() * window.innerWidth + "px";
            snow.style.animationDuration = Math.random() * 4 + "s";
            effectsContainer.appendChild(snow);
        }
    } else if (weather.includes("clear")) {
        let sun = document.createElement("div");
        sun.classList.add("sun-rays");
        effectsContainer.appendChild(sun);
    }
}
