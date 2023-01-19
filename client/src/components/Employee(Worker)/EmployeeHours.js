import React, { useState } from "react";
// import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEE_BYID } from "../../utils/queries";


import { thisWeek, lastWeek, hours } from "../../utils/hoursDates";

import { Form, Col, Row, Container, Collapse, Button } from "react-bootstrap";
// import Collapse from "react-bootstrap/Collapse";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getClippingParents } from "@fullcalendar/react";

// import { useMutation } from "@apollo/client";
// import { ADD_HOURS } from "../../utils/mutations";
// import { UPDATE_HOURS } from "../../utils/mutations";

import "../../styles/hours.css"

function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [open, setOpen] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event)

    name === "startHours"
      ? setStartHours(value)
      : setEndHours(value)

    return name;
  };

  const handleHoursSubmit = async (event) => {
    event.preventDefalt();

    //   try {
    //     const { data } = await addHours({
    //       variables: { startHours, endHours },
    //     });
    //     console.log(data)
    //   } catch (err) {
    //     console.error(err);
    //   }

    resetForm();
  };

  const resetForm = () => {
    setStartHours("");
    setEndHours("");
  }

  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    let currentAvailTable = document.getElementById(currentAvailTarget);
    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpen(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpen(true);
    }
  };


  return (
    <>
      <Container >
        <Row className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
        >Current Week
          {thisWeek.map((date, index) => (
            <div id="accordion" key={index} style={{ width: "25%" }}>{date.day} {date.date}
            <Row>
              <Button className="btn btn-link pl-1"
                style={{ color: "white" }}
                onClick={(event) => getElement(event)}
                aria-expanded={open}
                aria-controls="example-fade-text"
                data-target={`#collapseTarget-${index}`}
              >
                Expand
              </Button>
              </Row>
              <Collapse >
                <div id={`#collapseTarget-${index}`}>
                  <Form onSubmit={handleHoursSubmit}>
                    <Form.Label className="form-label">Start Time </Form.Label>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Ex. 9:15am"
                      name="start"
                      onChange={handleChange}
                    // NEEDS FORMAT VALIDATOR (HH:MM)
                    />
                    <Form.Label className="form-label">End Time </Form.Label>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Ex. 5:45pm"
                      name="end"
                      onChange={handleChange}
                    // NEEDS FORMAT VALIDATOR (HH:MM)
                    />
                  </Form>
                  <br></br>
                  <Button
                    className="button-custom submit-button-style"
                    type="submit"
                    onClick={handleHoursSubmit}
                  >
                    Submit Hours
                  </Button>
                  <br></br>
                  <Row classname="total">Day's Total: { }</Row>
                </div>
              </Collapse>
              <hr></hr>
            </div>
          ))}
          <Row>Weekly Total: { }</Row>
        </Row>
      </Container>
      <hr></hr>
      <Container >
        <Row className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
        >
          <Button className="btn btn-link pl-1"
            style={{ color: "white" }}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            Last Week
          </Button>
          <Collapse in={open}
            aria-expanded={open}
          >
            <div id="example-collapse-text">
              <Row className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "> {lastWeek.map((date, index) => (
                <div id="accordion" key={index} style={{ width: "50%" }}>{date.day} {date.date}
                  <Row>Hours worked: { }</Row>
                </div>
              ))}
                <Row>Weekly Total: { }</Row>
              </Row>
            </div>

          </Collapse>
        </Row>
      </Container>
    </>
  )
}
export default EmployeeHours;
