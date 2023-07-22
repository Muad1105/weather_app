import React from "react";
import { Card } from "antd";
import "./styles.scss";
import Footer from "../footer/Footer";

const { Meta } = Card;

const Forecast = ({ data, unit }) => {
  console.log(data);
  return (
    <div className="forecast-container">
      <h2 className="forecast-header">5-Day Forecast</h2>
      <div className="forecast-section">
        {data.map(
          (day, i) =>
            i != 0 && (
              <div key={day.dt} className="forecasted-data">
                <Card
                  hoverable
                  style={{ width: 400, background: "#EEF6FA" }}
                  cover={
                    <img
                      style={{ width: "auto" }}
                      src={`https://openweathermap.org/img/wn/${day.items[0].iconWeather}.png`}
                      alt="Weather Icon"
                    />
                  }
                >
                  <Meta
                    title={day.date}
                    description={day.items[0].descWeather}
                  />
                  <p>
                    Average Temperature: {day.items[0].avgTemp}{" "}
                    {unit === "celsius" ? "°C" : "°F"}
                  </p>
                </Card>
              </div>
            )
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Forecast;
