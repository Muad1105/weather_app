import React from "react";
import {
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";
import "./styles.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="contact">
        <div className="title">WEATHER.APP</div>
        <div className="social">
          <FacebookOutlined className="icon" />
          <TwitterOutlined className="icon" />
          <InstagramOutlined className="icon" />
        </div>
        <div className="email">
          <a href="">weatherapp@weather.com</a>
        </div>
      </div>
      <div className="copywright">
        © 2023 Copyright WeatherApp World Inc. The weather forecast, all info
        about spots and content of the articles is provided for personal
        non-commercial use. WeatherApp World Inc. does not promise any specific
        results from the use of its service or its components. If you have any
        questions, drop us a message.
      </div>
    </div>
  );
};

export default Footer;
