import React, { useRef, useState, memo, useEffect } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "../../styles/spinner.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SearchIcon from "./SearchIcon";
import { LoadMap } from "./LoadMap";
// eslint-disable-next-line
import seed from "./responseSeed"; // saved for seed if necesary
import { DirectionsPanel } from "./DirectionsPanel";
import { Share } from "./Share";
import { CenterIcon } from "./CenterIcon";
import { GoToGoogleMaps } from "./GoToGoogleMaps";

const center = { lat: 40.1672, lng: -105.1019 };
const libraries = ["places"];

function Map({ destinationDb }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let originSubmitted = ""; // origin submitted to google maps to get route
  let destinationSubmitted = ""; // destination submited to google maps to get route

  const [renderMap, setRenderMap] = useState(false); //section
  let origin = useRef();
  let destination = useRef();

  //section get user current coordinates
  const [coords, setCoords] = useState("");
  const [originDb, setOriginDb] = useState("");

  // get user location from navigator api
  useEffect(() => {
    function success(position) {
      setCoords(`${position.coords.latitude},${position.coords.longitude}`);
    }

    function error() {
      handleShow();
      setCoords(`40.1672, -105.1019`);
      // alert("Sorry, no position available. Using default of Longmont");
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  useEffect(() => {
    async function postData(url = "", data = {}) {
      let reverseGeoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords}&result_type=street_address&key=AIzaSyBGXIaFo3Dhmjo6RcGyEKYi3KqXN0sYt2I`;

      fetch(reverseGeoCodeURL)
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              setOriginDb(data.results[0].formatted_address);
            });
          } else {
            handleShow();
          }
        })
        .catch((error) => {
          handleShow();
          console.log(error);
        });
    }

    coords && postData();
  }, [coords, originDb]);

  //section end

  // eslint-disable-next-line
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  /** @type google.maps.Map */
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  if (originDb && destinationDb) {
    calculateRoute();
  }

  // section (a) use seed data
  // async function calculateRoute(event) {
  //   event.preventDefault();
  //   setDirectionsResponse(seed);
  //   setDistance(seed.routes[0].legs[0].distance.text);
  //   setDuration(seed.routes[0].legs[0].duration.text);
  // }
  // section seed data end

  // section (#2) to stop the db query comment out this function
  async function calculateRoute(event) {
    event && event.preventDefault();

    if (origin.current?.value && destination.current?.value) {
      originSubmitted = origin.current?.value;
      destinationSubmitted = destination.current?.value;
    } else if (originDb && destinationDb) {
      originSubmitted = originDb;
      destinationSubmitted = destinationDb;
    } else {
      originSubmitted = "Longmont, CO, USA";
      destinationSubmitted = "Denver, CO, USA";
    }

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();

    let results;
    let errorMessage;

    await directionsService
      .route({
        origin: originSubmitted,
        destination: destinationSubmitted,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        // origin: originDb || origin.current.value,
        // destination: destinationDb || destination.current.value,
        // optimizeWaypoints: true,
        // provideRouteAlternatives: true,
      })
      .then((data) => (results = data))
      .catch((err) => {
        console.log(err);
        errorMessage = err;
      });

    if (errorMessage) {
      console.log(errorMessage);
      // alert(errorMessage);
      // attempts to use either alert or a modal resulted in infinite loop; proceed with caution; alert was the least loopy
    }

    // section prevent multiple queries this code prevents multiple queries by forcing quit if responses are valid and result is equal to direct response
    if (
      (directionsResponse?.request?.destination &&
      previousValue.current?.request?.destination) &&
      (results?.request?.destination.query ===
        directionsResponse?.request?.destination.query)
    ) {
      return;
    }

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setRenderMap(true);
  }

  // section prevent multiple queries: this code prevents multiple queries by forcing quit if responses are valid and result is equal to direct response
  const previousValue = useRef(null);
  useEffect(() => {
    previousValue.current = directionsResponse;
  }, [directionsResponse]);

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    origin.current.value = "";
    destination.current.value = "";
  }

  // set modal if necessary
  // function testModal() {
  //   handleShow();
  // }

  //section spinner - wait for google map to return route
  if (!renderMap) {
    return (
      <div className="d-flex justify-content-center">
        <div className="lds-hourglass"></div>
      </div>
    );
  }
  // section comment out this section to avoid pulling map
  else {
    return (
      <div>
        {/* test modal if necessary */}
        {/* <Button onClick={() => testModal()}>SHOW MODAL</Button> */}

        <DirectionsPanel />

        <div style={containerStyle} className="d-flex align-items-center">
          <LoadMap
            center={center}
            directionsResponse={directionsResponse}
            setMap={setMap}
          />

          <Share origin={originSubmitted} destination={destinationSubmitted} />

          <GoToGoogleMaps
            origin={originSubmitted}
            destination={destinationSubmitted}
          />

          <CenterIcon center={center} map={map} />

          <div style={lineBreakStyle}></div>

          <SearchIcon
            calculateRoute={calculateRoute}
            center={center}
            clearRoute={clearRoute}
            destination={destination}
            distance={distance}
            duration={duration}
            map={map}
            origin={origin}
          />
        </div>

        <Modal
          show={show}
          size="sm"
          onHide={handleClose}
          // backdrop="static"
          keyboard={true}
        >
          <Modal.Header closeButton>
            <Modal.Title>Directions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Currently not available.</p>
            <p>Try again later.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default memo(Map);

const containerStyle = {
  flexDirection: "column",
  width: "100vw",
  height: "93vh",
  position: "relative",
};

const lineBreakStyle = {
  heigth: ".25px",
  width: "33px",
  bottom: "28px",
  left: "64px",
  padding: "1px",
  color: "#E6E6E6",
  backgroundColor: "#E6E6E6",
  position: "absolute",
  zIndex: "2",
  borderRadius: "3px",
};
