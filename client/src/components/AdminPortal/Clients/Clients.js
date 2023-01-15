import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CLIENTS } from "../../../utils/queries";
import { DELETE_CLIENT } from "../../../utils/mutations";

import { Row, Col, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Clients() {
  const [openDetails, setOpenDetails] = useState(false);

  // eslint-disable-next-line
  const {
    loading: clientsLoad,
    data: clients,
    error: clientError,
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS);

  // SECTION DELETE
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleDeleteClient = async (event) => {
    let clientId = event.currentTarget.getAttribute("data-clientid");
    try {
      // eslint-disable-next-line
      await deleteClient({
        variables: {
          id: clientId,
        },
      });

      // RELOAD CLIENT
      clientsRefetch();
    } catch (err) {
      console.log(err);
    }
  };

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    console.log(currentAvailTarget);
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  return (
    <>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {clients?.clients?.map((client, index) => (
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
                  <h5 className="mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-client-${index}`}
                    >
                      {client?.businessName}
                    </button>
                  </h5>
                  <div className="mr-2" style={{ display: "flex" }}>
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-clientid={client?._id}
                      onClick={(event) => {
                        handleDeleteClient(event);
                      }}
                    />
                    
                  </div>
                </div>
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Container fluid="md">
                      <Row>
                        <Col>Contact: {client?.contact}</Col>
                      </Row>
                      <Row>
                        <Col>{client?.streetAddress}</Col>
                        <Col> <a href= {`tel:+${client?.phone}`}>{client?.phone}</a></Col>
                      </Row>
                      <Row>
                        <Col>
                          {client?.city} {client?.state} {client?.zip}
                        </Col>
                        <Col><FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon> <a href= {`mailto:${client?.email}`}><i class="fa-solid fa-phone"></i> {client?.email}</a></Col>
                      </Row>
                    </Container>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default Clients;
