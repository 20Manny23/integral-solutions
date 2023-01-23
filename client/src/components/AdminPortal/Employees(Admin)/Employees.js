import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../../utils/queries";
import {
  DELETE_EMPLOYEE,
  TOGGLE_ADMIN,
  TOGGLE_LOCKED,
} from "../../../utils/mutations";
import format_phone from "../../../utils/helpers";

import { Row, Col, Container, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/contact.css";
import "../../../styles/button-style.css";


function Employees() {
  const [openDetails, setOpenDetails] = useState(false);

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  // toggle isAmin mutation
  const [toggleAdmin] = useMutation(TOGGLE_ADMIN);
  const [toggleLocked] = useMutation(TOGGLE_LOCKED);

  // SECTION DELETE
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDeleteEmployee = async (event) => {
    let employeeId = event.currentTarget.getAttribute("data-clientid");

    try {
      // eslint-disable-next-line
      await deleteEmployee({
        variables: {
          id: employeeId,
        },
      });

      // RELOAD employee
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

  // SECTION HANDLE TOGGLE UPDATE
  const handleToggle = async (event) => {
    let employeeId = event.currentTarget.getAttribute("data-employeeid");
    let toggleTarget = event.currentTarget.name;

    let toggle;
    event.currentTarget.defaultValue === "true"
      ? (toggle = false)
      : (toggle = true);

    if (toggleTarget === "admin") {
      try {
        // eslint-disable-next-line
        await toggleAdmin({
          variables: {
            employeeId: employeeId,
            isAdmin: toggle, // NOT A NECESSARY VARIABLE SINCE THE SERVER CHANGES THE STATE
          },
        });

        // RELOAD EMPLOYEE
        empRefetch();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("not admin");
      try {
        // eslint-disable-next-line
        await toggleLocked({
          variables: {
            employeeId: employeeId,
            isLocked: toggle, // NOT A NECESSARY VARIABLE SINCE THE SERVER CHANGES THE STATE
          },
        });

        // RELOAD EMPLOYEE
        empRefetch();
      } catch (err) {
        console.log(err);
      }
    }
  };

  let arrayForSort =[]
  if(emp){
    
    arrayForSort = [...emp.employees]
  arrayForSort.sort(function(a, b){
    if(a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
    if(a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
    return 0;
  })
  }

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {arrayForSort?.map((emp, index) => (
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
                    <p className="mb-0 text-left">{emp?.lastName}, {emp?.firstName}</p>
                      <p className="mb-0 text-left">
                          {format_phone(emp?.phone)}
                      </p>
                  </button>
                </h5>
                <div className="d-flex mr-2">
                  <FontAwesomeIcon
                    icon="fa-trash"
                    className="p-2 fa-lg"
                    data-clientid={emp?._id}
                    data-target={`#collapse-client-${index}`}
                    onClick={(event) => {
                      handleDeleteEmployee(event);
                    }}
                  />
                </div>
              </div>
              <Collapse>
                <div id={`#collapse-client-${index}`}>
                  <Container fluid="true" className="center-screen">
                    <Row>
                      <Col md={6} lg={6}>
                        <a href={`tel:+${emp?.phone}`}>
                          <FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon>{" "}
                          {format_phone(emp?.phone)}
                        </a>
                        <br></br>
                        <a href={`mailto:${emp?.email}`}>
                          {" "}
                          <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" />{" "}
                          {emp?.email}
                        </a>
                      </Col>

                      <Col>
                        <Form.Check
                          type="switch"
                          name="admin"
                          label="Admin"
                          id={`custom-admin-${index}`}
                          data-employeeid={emp?._id}
                          defaultChecked={emp.isAdmin}
                          defaultValue={emp.isAdmin}
                          onClick={(event) => handleToggle(event)}
                          className="ml-4"
                          style={{ transform: "scale(1.1)" }}
                        ></Form.Check>

                        <Form.Check
                          type="switch"
                          name="locked"
                          label="Locked"
                          id={`custom-locked-${index}`}
                          data-employeeid={emp?._id}
                          defaultChecked={emp.isLocked}
                          defaultValue={emp.isLocked}
                          onClick={(event) => handleToggle(event)}
                          className="ml-4"
                          style={{ transform: "scale(1.1)" }}
                        ></Form.Check>
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
  );
}
export default Employees;
