import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const GoToGoogleMaps = ({ origin, destination }) => {
  origin = origin || "Longmont, CO, USA"; // origin
  destination = destination || "Denver, CO, USA"; // destination

  let encodedURI = encodeURI(
    `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
  );

  return (
    <>
      <a href={encodedURI} target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon="fa-map"
          className=""
          style={shareStyle}
          title="Go To Google Maps"
          alt="Link to google maps"
          transform="grow-5"
        />
      </a>
    </>
  );
};

const shareStyle = {
  top: "95px",
  left: "145px",
  height: "19px",
  width: "18px",
  padding: "10px 10px 10px 12px",
  color: "#0E6DFD",
  backgroundColor: "white",
  cursor: "grab",
  position: "absolute",
  zIndex: "10",
  borderRadius: "2px",
  boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
};
