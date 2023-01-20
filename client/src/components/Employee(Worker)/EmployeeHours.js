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

// import Time, { sum } from 'time-value';

// const time1 = new Time(1, 'h');
// const time2 = new Time(30, 'm');
// const time3 = new Time(1, 'h');

// sum([time1, time2, time3]); // 2h 30m
// console.log(sum)

function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(event)

    name === "startHours" ? setStartHours(value) : setEndHours(value);

    return name;
  };

  const handleHoursSubmit = async (event) => {
    event.preventDefault();
    
    // console.log(event.currentTarget.date.value); -- This will get the date 
    const startingTime = moment(event.currentTarget.startTime.value, 'HH:mm')
    const endingTime = moment(event.currentTarget.endTime.value, 'HH:mm')
    if (startingTime < endingTime){
    const duration = moment.duration(endingTime.diff(startingTime))
    const hours = parseInt(duration.asMinutes()) / 60
    const roundedHours = hours.toFixed(2)
    await setStartHours(roundedHours)
    }
    else{
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

    // resetForm();
  };

  // const resetForm = () => {
  //   setStartHours("");
  //   setEndHours("");
  // };

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
console.log(startHours)
  return (
    <>
      <Container>
        <Row className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary ">
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Current Week
          </span>
          {thisWeek.map((date, index) => (
            <div
              id="accordion"
              key={index}
              style={{ width: "25%", margin: "auto" }}
            >
              <Row>
                <Button
                  className="btn btn-link pl-1"
                  style={{
                    color: "white",
                    margin: "auto",
                    minWidth: "200px",
                    padding: "2px 0 2px 0",
                  }}
                  onClick={(event) => getElement(event)}
                  aria-expanded={open}
                  aria-controls="example-fade-text"
                  data-target={`#collapseTarget-${index}`}
                >
                  {format_date_no_hyphen(date.date)}
                </Button>
              </Row>
              <Collapse>
                <div id={`#collapseTarget-${index}`}>
                  <Form onSubmit={handleHoursSubmit}>
                    {/* <Form.Label className="form-label">Start Time </Form.Label>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Ex. 9:15am"
                      name="start"
                      onChange={handleChange}
                    // NEEDS FORMAT VALIDATOR (HH:MM)
                    /> */}
                    {/* <Form.Label className="form-label">End Time </Form.Label>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Ex. 5:45pm"
                      name="end"
                      onChange={handleChange}
                    // NEEDS FORMAT VALIDATOR (HH:MM)
                    /> */}
                    <Form.Group controlId="formBasicEmail">
                      <div className="form-label">
                        <Form.Label style={{ fontWeight: "bolder" }}>
                          Start Time
                        </Form.Label>
                      </div>
                      <Form.Control
                        className="custom-border"
                        type="time"
                        name="startTime"
                        // value={startHours}
                        defaultValue={"form-select"}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <div className="form-label">
                        <Form.Label style={{ fontWeight: "bolder" }}>
                          End Time
                        </Form.Label>
                      </div>
                      <Form.Control
                        className="custom-border"
                        type="time"
                        name="endTime"
                        // value={endTime}
                        defaultValue={"form-select"}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  
                    
                    <br></br>
                    <Button
                      className="button-custom submit-button-style"
                      type="submit"
                      name="date"
                      value={date.date}
                    >
                      Submit Hours
                    </Button>
                  </Form>
                  <br></br>
                  <Row className="total">Day's Total: {startHours}</Row>
                </div>
              </Collapse>
              <hr></hr>
            </div>
          ))}
          <Row>Weekly Total: {}</Row>
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
                    <Row>Hours worked: {}</Row>
                  </div>
                ))}
                <Row>Weekly Total: {}</Row>
              </Row>
            </div>
          </Collapse>
        </Row>
      </Container>
    </>
  );
}
export default EmployeeHours;
