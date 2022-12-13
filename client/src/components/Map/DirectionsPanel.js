import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import "../../styles/button-style.css";

export const DirectionsPanel = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="accordion">
        <div className="card p-2 mb-1">
          <div
            className="rounded directions-collapse"
            id="headingOne"
            style={{ backgroundColor: "#0E6DFD" }}
          >
            <h5 className="mb-0 text-center">
              <button
                className="btn btn-link pl-1"
                onClick={() => setOpen(!open)}
                aria-controls="collapse-text-directions"
                aria-expanded={open}
                style={{ color: "white" }}
              >
                Directions: Step-by-Step
              </button>
            </h5>
          </div>

          <Collapse in={open}>
            <div id="collapse-search-bar">
              <div id="panel" className="card-body pt-0"></div>
            </div>
          </Collapse>
        </div>
      </div>
    </>
  );
};
