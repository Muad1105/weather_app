import React, { useEffect, useState } from "react";

import "./styles.scss";
const SearchForm = ({ onSubmit, removeErr }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(city);
    onSubmit(city);
    setCity("");
  };
  useEffect(() => {
    removeErr();
  }, [city]);

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
