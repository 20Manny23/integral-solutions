import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_ALL_EMPLOYEES,
} from "../../../utils/queries";
import { DELETE_EMPLOYEE } from "../../../utils/mutations";

import { Row, Col, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ScheduleList() {
  const [openDetails, setOpenDetails] = useState(false);

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  console.log(emp);

  // SECTION DELETE
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDeleteEmployee = async (event) => {
    let clientId = event.currentTarget.getAttribute("data-clientid");
    try {
      // eslint-disable-next-line
      await deleteEmployee({
        variables: {
          id: clientId,
        },
      });

      // RELOAD CLIENT
      empRefetch();
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
          {emp?.employees?.map((emp, index) => (
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
                      {emp?.firstName} {emp?.lastName}
                    </button>
                  </h5>
                  <div className="d-flex mr-2">
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-clientid={emp?._id}
                      onClick={(event) => {
                        handleDeleteEmployee(event);
                      }}
                    />
                  </div>
                </div>
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Container fluid="md">
                      <Row>
                      <Col>Admin: {emp?.isAdmin ? "True" : "False"}</Col>
                      <Col><a href= {`mailto:${emp?.email}`}> {emp?.email}</a></Col>
                      </Row>
                      <Row>
                      <Col>Locked: {emp?.isLocked ? "True" : "False"}</Col>
                        <Col><a href= {`tel:+${emp?.phone}`}> {emp?.phone}</a></Col>
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
export default ScheduleList;
