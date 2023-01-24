import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format_date_MMDDYYYY } from "../utils/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import googleMap from "../utils/googleMap";

function GenericModal({
  currentSchedule: schedule,
  show,
  handleClose,
  handleShow,
}) {
  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{schedule.client.businessName}</Modal.Title>
      </Modal.Header>
      <Modal.Title className="px-3">
        {format_date_MMDDYYYY(schedule.startDate)}
      </Modal.Title>
      <Modal.Body className="py-2">
        <a
          href={googleMap(
            schedule?.streetAddress,
            schedule?.city,
            schedule?.state,
            schedule?.zip
          )}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-location-dot"
            style={{ marginTop: "4px", marginRight: "5px" }}
          />
          {schedule.streetAddress}, {schedule.city} {schedule.state}{" "}
          {schedule.zip}
        </a>
      </Modal.Body>
      <Modal.Body className="py-2">
        {" "}
        <a href={`mailto:${schedule.client.email}`}>
          {" "}
          <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" />{" "}
          {schedule.client.email}
        </a>
      </Modal.Body>

      <Modal.Body className="py-2">
        {" "}
        <a href={`tel:+${schedule.client.phone}`}>
          <FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon>{" "}
          {schedule.client.phone}
        </a>
      </Modal.Body>
      <Modal.Body className="py-2">{schedule.jobDetails}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
