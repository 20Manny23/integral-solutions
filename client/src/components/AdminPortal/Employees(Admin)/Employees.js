import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../../utils/queries";
import {
  // DELETE_EMPLOYEE,
  SOFT_DELETE_EMPLOYEE,
  TOGGLE_ADMIN,
  TOGGLE_LOCKED,
} from "../../../utils/mutations";
import format_phone from "../../../utils/helpers";

import { Row, Col, Container, Form, Modal, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function Employees() {
  const [openDetails, setOpenDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [deleteThis, setDeleteThis] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //SECTION GET ALL EMPLOYEES with isDisplayable === true
  const {
    // eslint-disable-next-line
    loading: empLoad,
    // eslint-disable-next-line
    data: emp,
    // eslint-disable-next-line
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES, {
    variables: {
      isDisplayable: true, //only retrieve employees with a displayable status = true
    },
    onCompleted: (data) => {},
  });

  // toggle isAdmin mutation
  const [toggleAdmin] = useMutation(TOGGLE_ADMIN);
  const [toggleLocked] = useMutation(TOGGLE_LOCKED);

  // SECTION DELETE
  const [softDeleteEmployee] = useMutation(SOFT_DELETE_EMPLOYEE);
  // const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const saveIdFunction = (event) => {
    let employeeId = event.currentTarget.getAttribute("data-clientid");

    setDeleteThis(employeeId);
    handleShow();
  };

  const handleSoftDelete = async (event) => {
    //if delete trash is clicked change isDisplayble status to isDisplayabled = false

    try {
      await softDeleteEmployee({
        variables: {
          // id: employeeId,
          id: deleteThis,
          isDisplayable: false,
        },
      });
      // RELOAD employee
      empRefetch();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  //hard delete is not currently being used rather a soft delete is being used to ensure the employee is retained in the DB but does not render in the app
  // const handleDeleteEmployee = async (event) => {
  //   let employeeId = event.currentTarget.getAttribute("data-clientid");

  //   try {
  //     // eslint-disable-next-line
  //     await deleteEmployee({
  //       variables: {
  //         id: employeeId,
  //       },
  //     });

  //     // RELOAD employee
  //     empRefetch();
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

  let arrayForSort = [];
  if (emp) {
    arrayForSort = [...emp.employees];
    arrayForSort.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }

  return (
    <>
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
                      <p className="mb-0 text-left">
                        {emp?.lastName}, {emp?.firstName}
                      </p>
                    </button>
                  </h5>
                  <div className="d-flex mr-2">
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-clientid={emp?._id}
                      data-target={`#collapse-client-${index}`}
                      // onClick={(event) => { //swap out for soft delete below
                      //   handleDeleteEmployee(event);
                      // }}
                      onClick={saveIdFunction}
                    />
                  </div>
                </div>
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Container fluid="true" className="center-screen">
                      <Row>
                        <Col md={6} lg={6}>
                          <a href={`tel:+${emp?.phone}`}>
                            <FontAwesomeIcon
                              className="px-2"
                              icon="fa-solid fa-phone"
                            ></FontAwesomeIcon>{" "}
                            {format_phone(emp?.phone)}
                          </a>
                          <br></br>
                          <a href={`mailto:${emp?.email}`}>
                            {" "}
                            <FontAwesomeIcon
                              className="px-2"
                              icon="fa-solid fa-envelope-open-text"
                            />{" "}
                            {emp?.email}
                          </a>
                          <div>
                            <FontAwesomeIcon
                              className="px-2"
                              style={{ color: "#007BFE" }}
                              icon="fa-solid fa-drivers-license"
                            />
                            {`Driver's License: ${emp?.hasDriversLicense}`}
                          </div>
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
          Are you sure that you want to delete this employee?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{ backgroundColor: "red" }}
            onClick={handleSoftDelete}
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

export default Employees;
