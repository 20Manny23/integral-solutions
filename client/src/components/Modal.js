import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format_date_string, format_date_MMDDYYYY } from "../utils/dateFormat";

function GenericModal({
  currentSchedule: schedule,
  show,
  handleClose,
  handleShow,
}) {
  console.log(schedule, show, handleClose, handleShow);

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  console.log(format_date_MMDDYYYY(schedule.startDate));

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal 
        size="md"
        show={show} 
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{schedule.client.businessName}</Modal.Title>
        </Modal.Header>
        <Modal.Title className="px-3">
          {format_date_MMDDYYYY(schedule.startDate)}
        </Modal.Title>
        <Modal.Body className="py-2">
          {schedule.streetAddress}, {schedule.city} {schedule.state}{" "}
          {schedule.zip}
        </Modal.Body>
        <Modal.Body className="py-2">{schedule.client.email}</Modal.Body>
        <Modal.Body className="py-2">{schedule.client.phone}</Modal.Body>
        <Modal.Body className="py-2">{schedule.jobDetails}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal;
