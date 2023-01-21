import React, { useState } from "react";
// import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEE_BYID } from "../../utils/queries";

import { thisWeek, lastWeek, hours } from "../../utils/hoursDates";
import { format_date_no_hyphen } from "../../utils/dateFormat";
import { Form, Col, Row, Container, Collapse, Button } from "react-bootstrap";
// import Collapse from "react-bootstrap/Collapse";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getClippingParents } from "@fullcalendar/react";

// import { useMutation } from "@apollo/client";
// import { ADD_HOURS } from "../../utils/mutations";
// import { UPDATE_HOURS } from "../../utils/mutations";

import "../../styles/hours.css";
import moment from "moment";

function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [open, setOpen] = useState(false);

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(event)

    name === "startTime" ? setStartHours(value) : setEndHours(value);

    return name;
  };

  const handleHoursSubmit = async (event) => {
    event.preventDefault();

    // console.log(event.currentTarget.date.value); -- This will get the date 
    const startingTime = moment(event.currentTarget.startTime.value, 'HH:mm');
    const endingTime = moment(event.currentTarget.endTime.value, 'HH:mm');
    if (startingTime < endingTime) {
      const duration = moment.duration(endingTime.diff(startingTime))
      const hours = parseInt(duration.asMinutes()) / 60
      const roundedHours = hours.toFixed(2)
      await setDayTotal(roundedHours)
    }
    else {
      alert("Please make sure your start time is before your end time. ")
    }
    // console.log(hours);

    //   try {
    //     const { data } = await addHours({
    //       variables: { startHours, workDate },
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
  };

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

  console.log(dayTotal)
  return (
    <>
      <Container>
        <Row className="pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary ">
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Current Week
          </span>
          {thisWeek.map((date, index) => (
            <div
              id="accordion"
              key={index}
              style={{ width: "25%"}}
            >
              <Row >
                <button
                  className="btn btn-link pl-1"
                  style={{
                    color: "blue",
                    marginLeft: "20px",
                    minWidth: "200px",
                    padding: "0px 0 0px 0",
                  }}
                  onClick={(event) => getElement(event)}
                  aria-expanded={open}
                  aria-controls="example-fade-text"
                  data-target={`#collapseTarget-${index}`}
                >
                  {format_date_no_hyphen(date.date)}
                </button>
              </Row>
              <Collapse>
                <div id={`#collapseTarget-${index}`}>
                  <Form style={{ width: "40vw" }}
                    onSubmit={handleHoursSubmit}>
                    <Row>
                      <Col sm={12} md={5} style={{ marginBottom: "-15px"}}>
                        <Form.Group controlId="formBasicEmail" style={{ padding: "10px",marginLeft: "-40px", marginRight: "20px"}}>
                          {/* <div className="form-label"> */}
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              Start Time
                            </Form.Label>
                          {/* </div> */}

                          <Form.Control
                            className="custom-border"
                            type="time"
                            name="startTime"
                            // value={startHours}
                            defaultValue={"form-select"}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={12} md={5} style={{ marginBottom: "-10px"}}>
                        <Form.Group controlId="formBasicEmail" style={{ padding: "10px", marginLeft: "-40px", marginRight: "20px"}}>
                          {/* <div className="form-label"> */}
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              End Time
                            </Form.Label>
                          {/* </div> */}
                          <Form.Control
                            className="custom-border"
                            type="time"
                            name="endTime"
                            // value={endTime}
                            defaultValue={"form-select"}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* <br></br> */}
                    <Row>
                    <Col sm={12} md={4} style={{ marginBottom: "5px", maginLeft: "-10%"}}>
                    <Button
                      className="button-custom submit-button-style mr-1 shadow rounded-lg border-secondary"
                      type="submit"
                      name="date"
                      value={date.date}
                      
                    >
                      Submit Hours
                    </Button>
                    </Col>
                    </Row>
                  </Form>
                  <br></br>
                  <Row className="mr-4 total">Day's Total: {dayTotal}</Row>
                </div>
              </Collapse>
          
              <hr></hr>
            </div>
          ))}
          <Row>Weekly Total: { }</Row>
        </Row>
      </Container>
      <hr></hr>
      <Container>
        <Row
          className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
          style={{ width: "97%" }}
        >
          <Button
            className="btn btn-link pl-1"
            style={{ color: "white" }}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            Last Week
          </Button>
          <Collapse in={open} aria-expanded={open}>
            <div id="example-collapse-text" style={{ width: "100%" }}>
              <Row
                style={{ width: "97%", margin: "auto" }}
                className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
              >
                {" "}
                {lastWeek.map((date, index) => (
                  <div id="accordion" key={index} style={{ width: "70%" }}>
                    {date.day} {date.date}
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
  );
}
export default EmployeeHours;
