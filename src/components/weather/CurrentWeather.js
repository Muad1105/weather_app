import React from "react";
import { Card } from "antd";

import "./styles.scss";

const { Meta } = Card;

const CurrentWeather = ({ data, unit, city }) => {
  const {
    cur,
    min,
    max,
    humidity,
    windSpeed,
    windDirection,
    weatherDescription,
    iconWeather,
  } = data;

  //   const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

  return (
    <div className="weather-forecast-container">
      <h2>{city} Weather forecast</h2>
      <div className="current-weather">
        <Card
          hoverable
          style={{ width: 400, background: "#EEF6FA" }}
          cover={
            <img
              style={{ width: "auto" }}
              src={`https://openweathermap.org/img/wn/${iconWeather}.png`}
              alt="Weather Icon"
            />
          }
        >
          <div className="weather-card">
            <Meta description={weatherDescription} />
            <p>
              Temperature: {cur} {unit === "celsius" ? "°C" : "°F"}
            </p>
            <p>
              Min Temperature: {min} {unit === "celsius" ? "°C" : "°F"}
            </p>
            <p>
              Max Temperature: {max} {unit === "celsius" ? "°C" : "°F"}
            </p>
            <p>Humidity: {humidity}%</p>
            <p>
              Wind: {windSpeed} m/s, {getWindDirection(windDirection)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

function getWindDirection(degrees) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degrees % 360) / 45);
  return directions[index % 8];
}

export default CurrentWeather;
