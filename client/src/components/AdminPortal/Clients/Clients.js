import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CLIENTS } from "../../../utils/queries";
import {
  // DELETE_CLIENT,
  SOFT_DELETE_CLIENT,
} from "../../../utils/mutations";

import format_phone from "../../../utils/helpers";
import googleMap from "../../../utils/googleMap";

import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Clients() {
  const [openDetails, setOpenDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteThis, setDeleteThis] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
    // } = useQuery(QUERY_ALL_CLIENTS);
  } = useQuery(QUERY_ALL_CLIENTS, {
    variables: {
      isDisplayable: true, //only retrieve clients with a displayable status
    },
  });

  // SECTION DELETE
  const [softDeleteClient] = useMutation(SOFT_DELETE_CLIENT);
  // const [deleteClient] = useMutation(DELETE_CLIENT);
  const saveIdFunction = (event) => {
    let clientId = event.currentTarget.getAttribute("data-clientid"); //identify selected client

    setDeleteThis(clientId);
    handleShow();
  };
  const handleSoftClient = async (event) => {
    //if delete trash is clicked change isDisplayble status to isDisplayabled = false

    try {
      await softDeleteClient({
        variables: {
          id: deleteThis,
          isDisplayable: false,
        },
      });

      // RELOAD clients
      clientsRefetch();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  // const handleDeleteClient = async (event) => {
  //   let clientId = event.currentTarget.getAttribute("data-clientid");
  //   try {
  //     // eslint-disable-next-line
  //     await deleteClient({
  //       variables: {
  //         id: clientId,
  //       },
  //     });

  //     // RELOAD CLIENT
  //     clientsRefetch();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  let arrayForSort = [];

  if (clients) {
    arrayForSort = [...clients.clients];
    arrayForSort.sort(function (a, b) {
      if (a.businessName.toLowerCase() < b.businessName.toLowerCase())
        return -1;
      if (a.businessName.toLowerCase() > b.businessName.toLowerCase()) return 1;
      return 0;
    });
  }

  return (
    <>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {arrayForSort?.map((client, index) => (
            <div id="accordion" key={index} style={{ width: "98%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 className="d-flex flex-column mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-client-${index}`}
                    >
                      <p className="mb-0 text-left">{client?.businessName}</p>
                      <p className="mb-0 text-left">
                        {format_phone(client?.phone)}
                      </p>
                    </button>
                  </h5>
                  <div className="mr-2" style={{ display: "flex" }}>
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-clientid={client?._id}
                      // onClick={(event) => {
                      //   handleDeleteClient(event);
                      // }}
                      onClick={saveIdFunction}
                    />
                  </div>
                </div>
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Container fluid="md" className="center-screen">
                      <Row>
                        <Col md={6} style={{ marginTop: "10px" }}>
                          <span
                            style={{ fontWeight: "bold", marginRight: "4px" }}
                          >
                            Contact:
                          </span>{" "}
                          {client?.contact}
                          <br></br>
                          <a href={`tel:+${client?.phone}`}>
                            <FontAwesomeIcon icon="fa-solid fa-phone" />{" "}
                            {format_phone(client?.phone)}
                          </a>
                          <br></br>
                          <a href={`mailto:${client?.email}`}>
                            <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" />{" "}
                            {client?.email}
                          </a>
                        </Col>

                        <Col className="margin-break">
                          <a
                            href={googleMap(
                              client?.streetAddress,
                              client?.city,
                              client?.state,
                              client?.zip
                            )}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-location-dot"
                              style={{ marginTop: "4px", marginRight: "5px" }}
                            />
                            {client?.streetAddress} <br></br>
                            {client?.city} {client?.state} {client?.zip}
                          </a>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure that you want to delete this client record?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "red" }}
            onClick={handleSoftClient}
          >
            Yes, Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No,Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Clients;
