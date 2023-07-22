import React from "react";

const Toggle = ({ setUnit, unit }) => {
  return (
    <div>
      <button
        className="toggle-btn"
        onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
      >
        Toggle Unit ({unit === "celsius" ? "°C" : "°F"})
      </button>
    </div>
  );
};

export default Toggle;
