import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import moment from "moment";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_HOURS,
  QUERY_HOURS_BYEMPLOYEEID,
  QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE,
} from "../../utils/queries";
import {
  ADD_HOURS,
  UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE,
  DELETE_HOURS_BYEMPLOYEEID_BYJOBDATE,
} from "../../utils/mutations";

import { thisWeek, lastWeek, hours } from "../../utils/hoursDates";
import { format_date_no_hyphen } from "../../utils/dateFormat";
import { Form, Col, Row, Container, Collapse, Button } from "react-bootstrap";

import "../../styles/hours.css";

function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  //SECTION QUERIES
  //get all hours
  const {
    // eslint-disable-next-line
    loading: hourLoad,
    // eslint-disable-next-line
    data: hour,
    // eslint-disable-next-line
    error: hourError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_HOURS);
  // console.log("all hours = ", hour);

  //get hours by employee id
  const [currentEmployeeId, setCurrentEmployeeId] = useState(
    "6398fb54494aa98f85992da3"
  );
  const [currentJobDate, setCurrentJobDate] = useState(
    "January 29 2023 09:00:00 (MST)"
  );

  // eslint-disable-next-line
  const [
    getAnEmployeeHours,
    { loading: singleLazyLoad, data: singleEmployeeHours },
  ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID, {
    variables: { employee: currentEmployeeId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    // onCompleted: (singleEmployeeHours) => {
    //   // setCurrentClient(singleClient);
    // },
  });

  useEffect(() => {
    getAnEmployeeHours();
  }, []);

  if (!singleLazyLoad) {
    // console.log("single employee = ", singleEmployeeHours);
  }

  //get hours by employee id and job date
  // eslint-disable-next-line
  const [
    getAnEmployeeHoursByHour,
    { loading: byJobDateLazyLoad, data: singleEmployeeHoursJobDate },
  ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE, {
    variables: { employee: currentEmployeeId, jobDate: currentJobDate },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    // onCompleted: (singleEmployeeHours) => {
    //   console.log(singleEmployeeHours)
    // },
  });

  useEffect(() => {
    getAnEmployeeHoursByHour();
  }, []);

  // if (!byJobDateLazyLoad) {
  //   console.log("single employee by date = ", singleEmployeeHoursJobDate);
  // }

  // //add hours
  // const [addHours] = useMutation(ADD_HOURS);

  // useEffect(() => {
  //   handleSubmit();
  // }, [])

  // //pass in an "event" with data rather than as I do here
  // //replace the data with event variables wrapped in functions to convert dates and times to format shown
  // const handleSubmit = async () => {
  //   try {
  //     // eslint-disable-next-line
  //     const { data } = await addHours({
  //       variables: {
  //         jobDate: "January 20 2023 09:00:00 (MST)",
  //         startTime: "12:00:00 (MST)",
  //         endTime: "22:00:00 (MST)",
  //         hoursWorked: "10.0",
  //         employee: "6398fb54494aa98f85992da3"
  //       },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  //update hours by employee id and job date
  const [updateHours] = useMutation(UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE);

  // useEffect(() => {
  //   handleUpdate();
  // }, []);

  //   pass in an "event" with data rather than as I do here
  // replace the data with event variables wrapped in functions to convert dates and times to format shown
  const handleUpdate = async (event) => {
    event.preventDefault();

    const dateInput = moment(event.currentTarget.date.value).format(
      "MMMM DD YYYY"
    );

    const startTime = event.currentTarget.startTime.value + ":00 (MST)";
    const endTime = event.currentTarget.endTime.value + ":00 (MST)";
    const calcStart = moment(event.currentTarget.startTime.value, "HH:mm");
    const calcEnd = moment(event.currentTarget.endTime.value, "HH:mm");
    console.log(startTime);
    console.log(endTime);
    console.log(dateInput);

    const duration = moment.duration(calcEnd.diff(calcStart));
    const hours = parseInt(duration.asMinutes()) / 60;
    const hoursWorked = hours.toFixed(2);

    console.log(hoursWorked);
    try {
      // eslint-disable-next-line
      const { data } = await updateHours({
        variables: {
          jobDate: dateInput,
          startTime: startTime,
          endTime: endTime,
          hoursWorked: hoursWorked,
          // jobDate: "January 20 2023 09:00:00 (MST)",
          // startTime: "12:00:00 (MST)",
          // endTime: "13:00:00 (MST)",
          // hoursWorked: "3.0",
          // employee: "6398fb54494aa98f85992da3"
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    name === "startTime" ? setStartHours(value) : setEndHours(value);

    return name;
  };

  // const [updateEmployeeHours] = useMutation(UPDATE_EMPLOYEE_HOURS);

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

  return (
    <>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Current Week
          </span>
          {thisWeek.map((date, index) => (
            <div id="accordion" key={index} style={{ width: "98%" }}>
              <div className="card mb-1">
                <Row>
                  <button
                    className="btn btn-link pl-1"
                    style={{
                      color: "#007bff",
                      margin: "8px 0px 8px 25px",
                      minWidth: "150px",
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
                    <Form onSubmit={handleUpdate}>
                      <Row>
                        <Col sm={12} md={4}>
                          <Form.Group
                            controlId="formBasicEmail"
                            style={{
                              marginLeft: "10%",
                              marginRight: "10%",
                            }}
                          >
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
                            Clock in: {startHours}
                          </Form.Group>
                        </Col>

                        <Col md={4}>
                          <Form.Group
                            controlId="formBasicEmail"
                            style={{
                              marginLeft: "10%",
                              marginRight: "10%",
                            }}
                          >
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
                            Clock out {endHours}
                          </Form.Group>
                        </Col>

                        <Col
                          sm={12}
                          md={4}
                          style={{ marginTop: "31px" }}
                          className="hours-btn"
                        >
                          <Button
                            className=" button-custom submit-button-style mr-1 shadow rounded-lg border-secondary "
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
                    <Row className="mr-4 total">
                      <p
                        style={{
                          marginLeft: "auto",
                          marginRight: "auto",
                          paddingLeft: "25px",
                          fontWeight: "bolder",
                        }}
                      >
                        Day's Total Hours:{" "}
                      </p>
                    </Row>
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
          <Row
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "25px",
            }}
          >
            Weekly Total Hours: {}
          </Row>
        </Row>
      </Container>

      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <div id="accordion" style={{ width: "98%" }}>
            <div className="card mb-1">
              <Button
                className="btn btn-link pl-1"
                style={{ color: "white", fontSize: "20px" }}
                onClick={() => setOpen2(!open2)}
                aria-expanded={open}
              >
                Last Weeks Hours
              </Button>
              <Collapse in={open2} aria-expanded={open2}>
                <div id="example-collapse-text" style={{ width: "100%" }}>
                  <Row className=" mx-3 d-flex flex-column align-self-center align-items-center rounded-lg border-secondary ">
                    {lastWeek.map((date, index) => (
                      <div
                        id="accordion"
                        key={index}
                        style={{ width: "100%", marginTop: "9px" }}
                      >
                        {format_date_no_hyphen(date.date)} Hours:
                        {/* <Row style={{marginLeft:'2px'}}>Hours worked: {}</Row> */}
                      </div>
                    ))}
                    <Row style={{ fontWeight: "bolder", fontSize: "20px" }}>
                      Last Weeks Total: {}
                    </Row>
                  </Row>
                </div>
              </Collapse>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
}
export default EmployeeHours;
