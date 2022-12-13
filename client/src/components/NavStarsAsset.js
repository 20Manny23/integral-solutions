import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import navStar from "../assets/navbar_stars.json";
import starNav from "../assets/navbar_stars.png";

export const NavStarsAsset = () => {
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisplay(false);
    }, 5000);
  }, []);

  return (
    <>
      <img
        className="imgStyle"
        src={starNav}
        alt="Pristine clean"
        style={display ? isDisplayed : isNotDisplayed}
      ></img>

      <Lottie
        animationData={navStar}
        play
        loop
        speed={1}
        alt="Pristine clean"
        style={display ? isNotDisplayed : isDisplayed}
      />
    </>
  );
};

const isDisplayed = {
  width: "2.75rem",
  height: "2.75rem",
  display: "none",
  zIndex: "3",
};

const isNotDisplayed = {
  height: "2.75rem",
  display: "block",
  position: "fixed",
  top: 7,
  left:0,
  zIndex: "3",
};
