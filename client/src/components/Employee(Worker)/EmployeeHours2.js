import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import moment from "moment";
import { getUserId } from "../../utils/getUserId";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_HOURS,
  QUERY_HOURS_BYEMPLOYEEID,
  QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE,
} from "../../utils/queries";
import {
  UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE,
} from "../../utils/mutations";

import { thisWeek, lastWeek } from "../../utils/hoursDates";
import { format_date_no_hyphen } from "../../utils/dateFormat";
import { Form, Col, Row, Container, Collapse, Button, Accordion, Card } from "react-bootstrap";

import "../../styles/hours.css";

function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");
  const [dayTotal, setDayTotal] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [thisWeekHours, setThisWeekHours] = useState();
  const [lastWeekHours, setLastWeekHours] = useState();
  const [oldHoursArr, setOldHoursArr] = useState([]);

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
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  const [currentJobDate, setCurrentJobDate] = useState("");

  const userId = getUserId();

  const {
    loading: singleLazyLoad,
    data: singleHours,
    error: singleHourError,
    refetch: singleHoursRefetch,
  } = useQuery(QUERY_HOURS_BYEMPLOYEEID, {
    variables: { employee: userId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (singleHours) => {
      weeklyTotal(singleHours);
      lastHours(singleHours);
    },
  });

  //Pulls dates from Hours Util and makes array
  const thisWeekDates = [];
  for (let i = 0; i < thisWeek.length; i++) {
    let eachDate = moment(thisWeek[i].date).format("MMMM DD YYYY");
    thisWeekDates.push(eachDate);
  }
  const lastWeekDates = [];
  for (let i = 0; i < thisWeek.length; i++) {
    let eachDate = moment(lastWeek[i].date).format("MMMM DD YYYY");
    lastWeekDates.push(eachDate);
  }

  // Get Weekly Total of hours on load
  const weeklyTotal = async (singleHours) => {
    let totalWeeklyHours = 0;
    let lastWeeklyHours = 0;
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let jobb = singleHours.hoursByEmployeeId[i].jobDate;

      if (
        jobb === thisWeekDates[0] ||
        jobb === thisWeekDates[1] ||
        jobb === thisWeekDates[2] ||
        jobb === thisWeekDates[3] ||
        jobb === thisWeekDates[4] ||
        jobb === thisWeekDates[5] ||
        jobb === thisWeekDates[6]
      ) {
        let hoursInt = Number(singleHours.hoursByEmployeeId[i].hoursWorked);
        totalWeeklyHours = hoursInt + totalWeeklyHours;

        setThisWeekHours(totalWeeklyHours.toFixed(2));

        //Sets Weekly Total for previous Week 
      } else if (
        jobb === lastWeekDates[0] ||
        jobb === lastWeekDates[1] ||
        jobb === lastWeekDates[2] ||
        jobb === lastWeekDates[3] ||
        jobb === lastWeekDates[4] ||
        jobb === lastWeekDates[5] ||
        jobb === lastWeekDates[6]
      ) {
        let hoursInt = Number(singleHours.hoursByEmployeeId[i].hoursWorked);
        lastWeeklyHours = hoursInt + lastWeeklyHours;

        setLastWeekHours(lastWeeklyHours.toFixed(2));
      }
    }
  };

  //Puts dates together with hours into a string and renders as one string
  const oldHours = [];
  const lastHours = (singleHours) => {
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let jobb = singleHours.hoursByEmployeeId[i].jobDate;
      console.log(jobb);
      if (jobb === lastWeekDates[0]) {
        oldHours.push(
          lastWeekDates[0] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[1]) {
        oldHours.push(
          lastWeekDates[1] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[2]) {
        oldHours.push(
          lastWeekDates[2] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[3]) {
        oldHours.push(
          lastWeekDates[3] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[4]) {
        oldHours.push(
          lastWeekDates[4] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[5]) {
        oldHours.push(
          lastWeekDates[5] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === lastWeekDates[6]) {
        oldHours.push(
          lastWeekDates[6] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
    }
    const oldHoursSort = oldHours.sort();

    setOldHoursArr(oldHoursSort);
  };

  //get hours by employee id and job date
  // eslint-disable-next-line
  const [
    getAnEmployeeHoursByHour,
    { loading: byJobDateLazyLoad, data: singleEmployeeHoursJobDate },
  ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE, {
    variables: { employee: userId, jobDate: currentJobDate },

    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      // let nextDay = moment(currentJobDate).add(1, 'days');
      // console.log(moment({nextDay}.nextDay._d).format('MMM DD YYYY'))

      setDayTotal(data.hoursByEmployeeIdByJobDate[0]?.hoursWorked);
    },
  });
  // console.log(thisWeek)
  useEffect(() => {
    getAnEmployeeHoursByHour();
  }, [currentJobDate, dayTotal, getAnEmployeeHoursByHour]);

  if (!byJobDateLazyLoad) {
    // console.log("single employee by date = ", singleEmployeeHoursJobDate);
  }

  //update hours by employee id and job date
  const [updateHours] = useMutation(UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE);

  // useEffect(() => {
  //   handleUpdate();
  // }, []);

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
    const hoursWorked = hours.toFixed(3);

    try {
      // eslint-disable-next-line
      const { data } = await updateHours({
        variables: {
          jobDate: dateInput,
          startTime: startTime,
          endTime: endTime,
          hoursWorked: hoursWorked,
          employee: userId,
          // jobDate: "January 20 2023",
          // startTime: "12:00:00 (MST)",
          // endTime: "13:00:00 (MST)",
          // hoursWorked: "3.0",
          // employee: "6398fb54494aa98f85992da3"
        },
      });
    } catch (err) {
      console.error(err);
    }
    setDayTotal(hoursWorked);
    singleHoursRefetch();
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
    let dateClick = moment(event.currentTarget.value).format("MMMM DD YYYY");

    setCurrentJobDate(dateClick);
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span style={{ fontWeight: "bold",
           fontSize: "20px", 
           backgroundColor:'#007bff',
            width:'100%',
             textAlign:'center',
             color:'white',
             borderRadius:'5px',
             margin:' 15px 0px 15px 0px',
             paddingTop:"7px",
             paddingBottom:"7px"
              }}>
            Current Week
          </span>
          </div>
          <Accordion>
          {thisWeek.map((date, index) => (
            <Card>
   
            <Accordion.Toggle style={{backgroundColor:'white', color:'#007bff'}}as={Card.Header} onClick={(event) => getElement(event)} eventKey= {index + 1}  >
            {format_date_no_hyphen(date.date)}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey= {index +1}>
              <Card.Body>
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
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          ))}
          </Accordion>
          <Row
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "25px",
              display:'flex',
              justifyContent:"center"
            }}
          >
            <div   style={{
              fontWeight: "bold",
              fontSize: "20px",
              marginBottom: "25px",
              textAlign:'center'
            }}>
            Weekly Total Hours: {thisWeekHours}
            </div>
          </Row>
      
      </Container>

      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <div id="accordion" style={{ width: "98%" }}>
            <div className="card mb-1">
              <Button
                className="btn btn-link pl-1"
                style={{ color: "white", fontSize: "20px", fontWeight:'bold' }}
                onClick={() => setOpen2(!open2)}
                aria-expanded={open}
              >
                Last Weeks Hours
              </Button>
              <Collapse in={open2} aria-expanded={open2}>
                <div id="example-collapse-text" style={{ width: "100%" }}>
                  <Row className=" mx-3 d-flex flex-column align-self-center align-items-center rounded-lg border-secondary ">
                    {oldHoursArr.map((hr, index) => (
                      <div
                        id="accordion"
                        key={index}
                        style={{ width: "99%", marginTop: "9px" }}
                      >
                        {hr}
                      </div>
                    ))}
                    <Row style={{ fontWeight: "bolder", fontSize: "20px" }}>
                      Last Weeks Total: {lastWeekHours}
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
