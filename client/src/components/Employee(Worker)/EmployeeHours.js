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
  console.log("all hours = ", hour);

  //get hours by employee id
  const [currentEmployeeId, setCurrentEmployeeId] = useState("6398fb54494aa98f85992da3");
  const [currentJobDate, setCurrentJobDate] = useState("January 29 2023 09:00:00 (MST)");

  // eslint-disable-next-line
  const [
    getAnEmployeeHours,
    { loading: singleLazyLoad, data: singleEmployeeHours },
  ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID, {
    variables: { employee: currentEmployeeId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn()
    // onCompleted: (singleEmployeeHours) => {
    //   // setCurrentClient(singleClient);
    // },
  });

  useEffect(() => {
    getAnEmployeeHours();
  }, [])
  
  if (!singleLazyLoad) {
    console.log("single employee = ", singleEmployeeHours);
  }

  //get hours by employee id and job date
    // eslint-disable-next-line
    const [
      getAnEmployeeHoursByHour,
      { loading: byJobDateLazyLoad, data: singleEmployeeHoursJobDate },
    ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE, {
      variables: { employee: currentEmployeeId, jobDate: currentJobDate },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn()
      // onCompleted: (singleEmployeeHours) => {
      //   // setCurrentClient(singleClient);
      // },
    });
  
    useEffect(() => {
      getAnEmployeeHoursByHour();
    }, [])
    
    if (!byJobDateLazyLoad) {
      console.log("single employee by date = ", singleEmployeeHoursJobDate);
    }

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

  useEffect(() => {
    handleUpdate();
  }, []);

  //   pass in an "event" with data rather than as I do here
  // replace the data with event variables wrapped in functions to convert dates and times to format shown
  const handleUpdate = async () => {
    try {
      // eslint-disable-next-line
      const { data } = await updateHours({
        variables: {
          jobDate: "January 20 2023 09:00:00 (MST)",
          startTime: "12:00:00 (MST)",
          endTime: "13:00:00 (MST)",
          hoursWorked: "3.0",
          employee: "6398fb54494aa98f85992da3"
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    name === "startTime" ? setStartHours(value) : setEndHours(value);

    return name;
  };

  // const [updateEmployeeHours] = useMutation(UPDATE_EMPLOYEE_HOURS);

  const handleHoursSubmit = async (event) => {
    event.preventDefault();

    // console.log(event.currentTarget.date.value); -- This will get the date
    const startingTime = moment(event.currentTarget.startTime.value, "HH:mm");
    const endingTime = moment(event.currentTarget.endTime.value, "HH:mm");
    if (startingTime < endingTime) {
      const duration = moment.duration(endingTime.diff(startingTime));
      const hours = parseInt(duration.asMinutes()) / 60;
      const roundedHours = hours.toFixed(2);
      await setDayTotal(roundedHours);
    } else {
      alert("Please make sure your start time is before your end time. ");
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

  console.log(dayTotal);
  return (
    <>
      <Container>
        <Row className="pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary ">
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Current Week
          </span>
          {thisWeek.map((date, index) => (
            <div id="accordion" key={index} style={{ width: "25%" }}>
              <Row>
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
                  <Form style={{ width: "40vw" }} onSubmit={handleHoursSubmit}>
                    <Row>
                      <Col sm={12} md={5} style={{ marginBottom: "-15px" }}>
                        <Form.Group
                          controlId="formBasicEmail"
                          style={{
                            padding: "10px",
                            marginLeft: "-40px",
                            marginRight: "20px",
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

                      <Col sm={12} md={5} style={{ marginBottom: "-10px" }}>
                        <Form.Group
                          controlId="formBasicEmail"
                          style={{
                            padding: "10px",
                            marginLeft: "-40px",
                            marginRight: "20px",
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
                    </Row>
                    {/* <br></br> */}
                    <Row>
                      <Col
                        sm={12}
                        md={4}
                        style={{ marginBottom: "5px", maginLeft: "-10%" }}
                      >
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
                  <Row className="mr-4 total">Day's Total: {dayTotal} </Row>
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
