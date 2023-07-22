import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";

import { MenuOutlined } from "@ant-design/icons";

{
  /* <MenuOutlined /> */
}

const Nav = () => {
  const [displayNav, setDisplayNav] = useState(false);

  const refToExclude1 = useRef();
  const refToExclude2 = useRef();

  const handleNav = () => {
    console.log("nav click", displayNav);
    setDisplayNav(!displayNav);
  };
  return (
    <div className="nav-container">
      <div className="title">WEATHER.APP</div>
      <div className="hamburger" onClick={() => handleNav()}>
        <MenuOutlined />
      </div>

      <nav className={displayNav ? "navigation show-nav" : "navigation"}>
        <p>Live</p>
        <p>Options</p>
        <p>About</p>
        <div className="sign-in">Sign in</div>
      </nav>
    </div>
  );
};

export default Nav;
