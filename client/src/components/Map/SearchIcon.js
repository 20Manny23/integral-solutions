import React, { useState, memo } from "react";
import { Autocomplete } from "@react-google-maps/api";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function SearchIcon({
  calculateRoute,
  clearRoute,
  destination,
  distance,
  duration,
  origin,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon="fa-search"
        className=""
        style={searchStyle}
        onClick={() => setOpen(!open)}
        title="Search"
        alt="Share my profile"
        transform="grow-3"
      />

      <div style={formStyle} className="">
        <Collapse in={open}>
          <div id="collapse-search-bar">
            <Form>
              <Autocomplete>
                <Form.Control
                  className=""
                  type="search"
                  required
                  id="origin"
                  name="origin"
                  placeholder="Origin"
                  ref={origin}
                  size="sm"
                />
              </Autocomplete>
              <Autocomplete>
                <Form.Control
                  className="mb-1"
                  type="search"
                  required
                  id="destination"
                  name="destination"
                  placeholder="Destination"
                  ref={destination}
                  size="sm"
                />
              </Autocomplete>
            </Form>

            <Autocomplete>
              <Form.Control
                className="mb-0"
                type="text"
                id="distance"
                name="distance"
                placeholder="Distance"
                value={distance && `Distance: ${distance}`}
                disabled
                size="sm"
              />
            </Autocomplete>
            <Autocomplete>
              <Form.Control
                className=""
                type="text"
                id="duration"
                name="duration"
                placeholder="Duration"
                value={distance && `Duration: ${duration}`}
                disabled
                size="sm"
              />
            </Autocomplete>

            <div className="d-flex justify-content-between pt-1">
              <Button
                type="submit"
                className="mb-1 ml-2"
                style={{ marginLeft: "5px" }}
                onClick={calculateRoute}
                aria-controls="collapse-search-bar"
                aria-expanded={open}
                size="sm"
              >
                Submit
              </Button>

              <FontAwesomeIcon
                icon="fa-xmark-circle"
                className="pt-1 px-2 fa-xl"
                title="Delete"
                alt="Delete input"
                style={{ color: "grey" }}
                onClick={() => {
                  // clearRoute();
                  setOpen(false);
                }}
                aria-controls="collapse-search-bar"
                aria-expanded={open}
              />
            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
}

export default memo(SearchIcon);

const formStyle = {
  width: "165px",
  top: "140px",
  left: "10px",
  position: "absolute",
  zIndex: "1",
  backgroundColor: "white",
  cursor: "grab",
  boxShadow: "rgb(0 0 0 / 30%) 4px 4px 4px -1px",
};

const searchStyle = {
  top: "95px",
  left: "10px",
  height: "20px",
  width: "18px",
  padding: "10px 10px 10px 12px",
  color: "#666666",
  backgroundColor: "white",
  cursor: "grab",
  position: "absolute",
  zIndex: "10",
  borderRadius: "2px",
  boxShadow: "rgb(0 0 0 / 30%) 0px 1px 4px -1px",
};
