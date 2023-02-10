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













let weather = {
  apiKey: "df7b2984d9f3d7d9aae941faf591bc2e",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { feels_like } = (data.main);
    document.querySelector(".weather__city").innerText = "Weather in " + name;

    document.querySelector(".weather__icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".weather__status").innerText = description;

    document.querySelector(".weather__temp").innerText = "Current temperature:  " +  Math.round(temp) + "°C";

    document.querySelector(".weather__feels-like").innerText = "Fills like:  " +  Math.round(feels_like) + "°C";


    // document.querySelector(".humidity").innerText =
    //   "Humidity: " + humidity + "%";

    document.querySelector(".wind__speed").innerText =
      "Wind speed: " + speed + " km/h";

    // document.querySelector(".weather").classList.remove("loading");
    // document.body.style.backgroundImage =
    //   "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search_bar").value);
  },
};

document.querySelector(".search_btn").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search_bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kyiv");




