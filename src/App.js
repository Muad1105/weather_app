import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchForm from "./components/search/SearchForm";
import CurrentWeather from "./components/weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { notification } from "antd";

import "./app.scss";
import Nav from "./components/navigation/Nav";
import Footer from "./components/footer/Footer";

const App = () => {
  const [inputCity, setInputCity] = useState("");
  const [latitudeAndLongitude, setLatitudeAndLongitude] = useState({
    lat: "",
    lon: "",
  });
  const [weatherData, setWeatherData] = useState({
    cur: null,
    min: null,
    max: null,
    humidity: null,
    windSpeed: null,
    windDirection: null,
    weatherDescription: "",
    iconWeather: "",
  });
  const [forecastData, setForecastData] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(true);
  const [unit, setUnit] = useState("fahrenheit");

  // Function to convert temperature from Fahrenheit to Celsius
  const returnCelcius = (fahrenheitTemp) => {
    return ((5 / 9) * (Number(fahrenheitTemp) - 32)).toFixed(2);
  };

  // Function to fetch weather data and forecast data from the API
  const weatherAndForecastData = () => {
    const currentWeatherForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeAndLongitude.lat}&lon=${latitudeAndLongitude.lon}&exclude={part}&appid=ae07d43fb3ec4022d478e086669f218d`;
    const fiveDaysForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudeAndLongitude.lat}&lon=${latitudeAndLongitude.lon}&appid=ae07d43fb3ec4022d478e086669f218d`;

    axios
      .all([axios.get(currentWeatherForecast), axios.get(fiveDaysForecast)])
      .then(
        axios.spread((currentRes, forecastRes) => {
          // Extract data from the API responses
          console.log("currentRes", currentRes);
          const currentTemp =
            unit === "fahrenheit"
              ? currentRes.data.current.temp
              : returnCelcius(currentRes.data.current.temp);

          // Set weather data
          setWeatherData((prev) => ({
            ...weatherData,
            cur: currentTemp,
            min:
              unit === "fahrenheit"
                ? currentRes.data.daily[0].temp.min
                : returnCelcius(currentRes.data.current.temp),
            max:
              unit === "fahrenheit"
                ? currentRes.data.daily[0].temp.max
                : returnCelcius(currentRes.data.current.temp),
            humidity: currentRes.data.current.humidity,
            windSpeed: currentRes.data.daily[0].wind_speed,
            windDirection: currentRes.data.daily[0].wind_deg,
            weatherDescription: currentRes.data.current.weather[0].description,
            iconWeather: currentRes.data.current.weather[0].icon,
          }));

          // Process forecast data to get unique dates and associated weather information
          const forecastWeather = forecastRes.data.list.map((e, i) => {
            const date = new Date(e.dt * 1000).toLocaleDateString();
            const avgTemp =
              unit === "fahrenheit"
                ? ((e.main.temp_max + e.main.temp_min) / 2).toFixed(2)
                : returnCelcius(e.main.temp_max + e.main.temp_min) / 2;
            const descWeather = e.weather[0].description;
            const iconWeather = e.weather[0].icon;
            return { date, avgTemp, descWeather, iconWeather };
          });

          // Function to filter unique dates from forecast data with multiple timestamp data available
          function filterUniqueDates(array) {
            const uniqueDatesMap = new Map();
            array.forEach((item) => {
              const { date, avgTemp, descWeather, iconWeather } = item;
              if (!uniqueDatesMap.has(date)) {
                uniqueDatesMap.set(date, []);
              }
              uniqueDatesMap
                .get(date)
                .push({ avgTemp, descWeather, iconWeather });
            });

            const uniqueDatesArray = [];
            uniqueDatesMap.forEach((items, date) => {
              uniqueDatesArray.push({ date, items });
            });

            return uniqueDatesArray;
          }

          const uniqueDates = filterUniqueDates(forecastWeather);
          setForecastData(uniqueDates);
        })
      )
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };
  //Function to capitalise incoming city
  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Function to handle the city search and fetch weather data
  const handleSearch = (city) => {
    const currentCity = capitalizeString(city);
    setInputCity(currentCity);
    const geoLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=ae07d43fb3ec4022d478e086669f218d`;

    axios
      .get(geoLocation)
      .then((currentRes) => {
        if (!currentRes.data[0]) {
          // City not found, reset the weather and forecast data
          setWeatherData({
            cur: null,
            min: null,
            max: null,
            humidity: null,
            windSpeed: null,
            windDirection: null,
            weatherDescription: "",
            iconWeather: "",
          });
          setForecastData([]);
          setCityNotFound(true);
          notification.error({
            message: `Request Error: City not found!`,
          });
          return;
        }

        // City found, update the latitude and longitude state and fetch weather data
        setLatitudeAndLongitude((prev) => ({
          ...latitudeAndLongitude,
          lat: currentRes.data[0].lat,
          lon: currentRes.data[0].lon,
        }));
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  useEffect(() => {
    weatherAndForecastData();
    console.log("unit", unit);
  }, [unit]);

  useEffect(() => {
    weatherAndForecastData();
  }, [latitudeAndLongitude.lat]);

  return (
    <div className="app-section">
      <div className="app-container">
        <Nav />
        <div className="app">
          <SearchForm
            onSubmit={handleSearch}
            removeErr={() => setCityNotFound(false)}
          />
          <button
            className="toggle-btn"
            onClick={() =>
              setUnit(unit === "celsius" ? "fahrenheit" : "celsius")
            }
          >
            Toggle Unit ({unit === "celsius" ? "°C" : "°F"})
          </button>
          {weatherData.cur && (
            <CurrentWeather city={inputCity} data={weatherData} unit={unit} />
          )}
          {forecastData[0] && <Forecast data={forecastData} unit={unit} />}
          {cityNotFound && <h2>Enter a valid city!</h2>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
