import React, { useState, useEffect } from "react";
import Lottie from "react-lottie-player";
import cleanMop from "../../assets/cleanMop.json";
import mopClean from "../../assets/mopClean.png";

export const CleanAsset = () => {
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
        src={mopClean}
        alt="Pristine clean"
        style={display ? isDisplayed : isNotDisplayed}
      ></img>

      <Lottie
        animationData={cleanMop}
        play
        loop
        speed={2}
        alt="Pristine clean"
        style={display ? isNotDisplayed : isDisplayed}
      />
    </>
  );
};

const isDisplayed = {
  width: "150px",
  height: "150px",
  display: "none",
  zIndex: "5",
};

const isNotDisplayed = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  display: "block",
  zIndex: "5",
};
