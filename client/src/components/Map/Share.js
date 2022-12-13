import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Share = ({ origin, destination }) => {
  const [show, setShow] = useState(false);
  const [tinyURI, setTinyURI] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  origin = origin || "Longmont, CO, USA"; //origin
  destination = destination || "Denver, CO, USA"; //destination

  let encodedURI = "";

  const webShareAPI = () => {
    // create map URL
    const uri = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    encodedURI = encodeURI(uri);

    // fetch tinyURL
    const tinyUrlApiPath = `https://api.tinyurl.com/create?api_token=${process.env.REACT_APP_TINY_URL_KEY}`; // set tinyurl api call path

    postData(tinyUrlApiPath).then((data) => {
      setTinyURI(data.data.tiny_url);
    });

    shareNavigator();
  };

  async function shareNavigator() {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Successful share");
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      // Launch modal to send email if navigator share feature doesn't exist
      handleShow();
    }
  }

  const shareData = {
    title: `Pristine Clean Job Directions: ${destination}`,
    text: `Pristine Clean Directions\n\nJob Location: ${destination}\n\nMap Link: ${tinyURI}\n\nCleaning at it's finest!!`,
    url: tinyURI,
  };

  let emailShareData = `mailto:?subject=Pristine Clean Directions: ${destination}&body=Starting Point: ${origin}%0D%0A%0D%0AEnding Point: ${destination}.%0D%0A%0D%0AMap Link: ${tinyURI}`;

  // URL would not post properly in email with "&". Use tiny URL to get around the issue.
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        url: encodedURI,
        domain: "tiny.one",
      }),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <>
      <FontAwesomeIcon
        icon="fa-share-nodes"
        className=""
        style={shareStyle}
        onClick={() => webShareAPI()}
        title="Share"
        alt="Share my profile"
        transform="grow-4"
      />

      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="">Directions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Button
            className="btn btn-primary"
            variant="primary"
            title="Email share"
            onClick={() => window.open(emailShareData)}
          >
            Click to Email the Directions
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

const shareStyle = {
  top: "95px",
  left: "100px",
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
