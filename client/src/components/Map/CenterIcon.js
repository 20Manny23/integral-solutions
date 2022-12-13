import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CenterIcon = ({ center, map }) => {
  return (
    <>
      <FontAwesomeIcon
        icon="fa-location"
        className=""
        title="Center"
        alt="Center Map"
        style={centerStyle}
        transform="grow-6"
        onClick={() => {
          map.panTo(center);
          map.setZoom(15);
        }}
      />
    </>
  );
};

const centerStyle = {
  top: "95px",
  left: "55px",
  height: "19px",
  width: "18px",
  padding: "10px 10px 10px 12px",
  color: "#666666",
  backgroundColor: "white",
  cursor: "grab",
  position: "absolute",
  zIndex: "10",
  borderRadius: "2px",
  boxShadow: "rgb(0 0 0 / 30%) 0px 1px 0px -1px",
};
