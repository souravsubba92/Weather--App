const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "a2b8d85b3dmsh862e10accc7928ep1c6f41jsn8045a37af58e",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

const cities = [
  { id: 1, name: "Delhi" },
  { id: 2, name: "Mumbai" },
  { id: 3, name: "Bangalore" },
  { id: 4, name: "Kolkata" },
];

const fetchWeather = async (city, cardUpdate = false) => {
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city.name}`;
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    if (cardUpdate) {
      //updated data after fetching from the api in the card components
      document.getElementById("cityname").innerText = city.name;
      document.getElementById("cloud_pct").innerText = result.cloud_pct;
      document.getElementById("feels_like").innerText = result.feels_like;
      document.getElementById("humidity").innerText = result.humidity;
      document.getElementById("max_temp").innerText = result.max_temp;
      document.getElementById("min_temp").innerText = result.min_temp;
      document.getElementById("sunrise").innerText = result.sunrise;
      document.getElementById("sunset").innerText = result.sunset;
      document.getElementById("temp").innerText = result.temp;
      document.getElementById("wind_speed").innerText = result.wind_speed;
    }

    //update data for the table content
    document.getElementById(`temp-${city.id}`).innerText = result.temp;
    document.getElementById(`feels-like-${city.id}`).innerText =
      result.feels_like;
    document.getElementById(`humidity-${city.id}`).innerText = result.humidity;
    document.getElementById(`max-temp-${city.id}`).innerText = result.max_temp;
    document.getElementById(`min-temp-${city.id}`).innerText = result.min_temp;
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  fetchWeather(cities[0], true);
});

document.addEventListener("DOMContentLoaded", () => {
  cities.forEach((city) => {
    fetchWeather(city);
  });
});

const submitButton = document.getElementById("submit");
const city = document.getElementById("city");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const cityInput = city.value.toLowerCase();
  const capitalisedCity =
    cityInput.charAt(0).toUpperCase() + cityInput.slice(1);

  const searchedCity = { name: capitalisedCity };
  fetchWeather(searchedCity, true);
});
