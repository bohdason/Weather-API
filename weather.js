"use strict"


/***BTN click ******/

function weatherModal() {
    const openBtn = document.querySelector(".show__btn");
    const widget = document.querySelector(".weather");

    openBtn.addEventListener("click", function(){
        widget.classList.toggle("show");
    });


}
weatherModal();











const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
    weatherBlock.innerHTML = `<div class="weather__loading">
    <img src="img/74H8.gif" alt="Loading....">
</div>`;

    const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Chernihiv&appid=df7b2984d9f3d7d9aae941faf591bc2e'
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {

    console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;
    const windspeed = data.wind.speed;

    const template = `<div class="weather__header">

    <div class="weather__main">
        <div class="weather__city">${location}</div>
        <div class="weather__status">${weatherStatus}</div>
    </div>

    <div class="weather__icon">
        <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Clouds">
    </div>
</div>
<div class="weather__info">
<div class="weather__temp">Current temperature: ${temp} ℃</div>
<div class="weather__feels-like">Feels like: ${feelsLike}</div>
<div class="wind-speed"> Wind speed: ${windspeed} м/s</div>
</div>`;

    weatherBlock.innerHTML = template;


}

if (weatherBlock) {
    loadWeather();
}