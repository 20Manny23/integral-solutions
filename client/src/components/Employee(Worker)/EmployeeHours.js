import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { getUserId } from "../../utils/getUserId";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_HOURS_BYEMPLOYEEID } from "../../utils/queries";
import { UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE } from "../../utils/mutations";
import { format_date_no_hyphen } from "../../utils/dateFormat";
import moment from "moment";
import { thisWeek, lastWeek } from "../../utils/hoursDates";
import {
  // format_date_string,
  // format_date_MMDDYYYY,
  format_time_HHmmss,
  format_date_YYYYDDMM,
} from "../../utils/dateFormat";

import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Accordion,
  Card,
  Collapse,
} from "react-bootstrap";
import "../../styles/hours.css";

function EmployeeHours() {
  const userId = getUserId();
  const [weekInfo] = useState(thisWeek);
  const [weeklyHours, setWeeklyHours] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [oldHoursArr, setOldHoursArr] = useState([]);
  const [lastWeekHours, setLastWeekHours] = useState();

  const [sunday, setSunday] = useState({
    date: weekInfo[0].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [monday, setMonday] = useState({
    date: weekInfo[1].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [tuesday, setTuesday] = useState({
    date: weekInfo[2].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [wednesday, setWednesday] = useState({
    date: weekInfo[3].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [thursday, setThursday] = useState({
    date: weekInfo[4].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [friday, setFriday] = useState({
    date: weekInfo[5].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });
  const [saturday, setSaturday] = useState({
    date: weekInfo[6].date,
    startTime: "",
    endTime: "",
    hours: 0,
  });

  //section querys & mutations
  const {
    // eslint-disable-next-line
    loading: singleLazyLoad,
    // eslint-disable-next-line
    data: singleHours,
    // eslint-disable-next-line
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

  //update hours by employee id and job date
  const [updateHours] = useMutation(UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE);

  //section handle input
  const handleInput = async (event) => {
    event.preventDefault();
    // console.log("input = ", event.target.value);
    // console.log("string = ", event.target.name.substring(0, 3));

    const { name, value } = event.target;

    //get hours worked
    let hoursWorked = "";
    if (event.target.name.substring(0, 3) === "end") {
      hoursWorked = calcHours(value, name);
      console.log("2 = ", hoursWorked);
    }

    //set state for start time
    if (name === "startTimeSunday") {
      setSunday({ ...sunday, startTime: value });
    } else if (name === "startTimeMonday") {
      setMonday({ ...monday, startTime: value });
    } else if (name === "startTimeTuesday") {
      setTuesday({ ...tuesday, startTime: value });
    } else if (name === "startTimeWednesday") {
      setWednesday({ ...wednesday, startTime: value });
    } else if (name === "startTimeThursday") {
      setThursday({ ...thursday, startTime: value });
    } else if (name === "startTimeFriday") {
      setFriday({ ...friday, startTime: value });
    } else if (name === "startTimeSaturday") {
      setSaturday({ ...saturday, startTime: value });
    }

    //set state for end time & hours calc
    if (name === "endTimeSunday") {
      setSunday({ ...sunday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeMonday") {
      setMonday({ ...monday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeTuesday") {
      setTuesday({ ...tuesday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeWednesday") {
      setWednesday({ ...wednesday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeThursday") {
      setThursday({ ...thursday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeFriday") {
      setFriday({ ...friday, endTime: value, hours: hoursWorked });
    } else if (name === "endTimeSaturday") {
      setSaturday({ ...saturday, endTime: value, hours: hoursWorked });
    }
  };

  //section handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // let daySubmitted = event.currentTarget.id.substring()
    let hoursInput = document.querySelectorAll(".hourInput"); //get array of hoursInput elements
    let daySubmitted = event.currentTarget.id.substring(5, 15).trim(); //get the day of the week for submit button
    let hours = "";

    //set hours to the state of the button clicked
    if (daySubmitted === "Sunday") {
      hours = sunday.hours;
    } else if (daySubmitted === "Monday") {
      hours = monday.hours;
    } else if (daySubmitted === "Tuesday") {
      hours = tuesday.hours;
    } else if (daySubmitted === "Wednesday") {
      hours = wednesday.hours;
    } else if (daySubmitted === "Thursday") {
      hours = thursday.hours;
    } else if (daySubmitted === "Friday") {
      hours = friday.hours;
    } else if (daySubmitted === "Saturday") {
      hours = saturday.hours;
    }

    //assign hours to innertext for element submitted/selected
    for (let i = 0; i < hoursInput.length; i++) {
      if (hoursInput[i].id === event.currentTarget.id) {
        hoursInput[i].innerText = `Hours: ${hours}`;
      }
    }

    //push data to db
    if (daySubmitted === "Sunday") {
      handleUpdateDatabase(sunday);
    } else if (daySubmitted === "Monday") {
      //call function to update the database
      handleUpdateDatabase(monday);
    } else if (daySubmitted === "Tuesday") {
      //call function to update the database
      handleUpdateDatabase(tuesday);
    } else if (daySubmitted === "Wednesday") {
      //call function to update the database
      handleUpdateDatabase(wednesday);
    } else if (daySubmitted === "Thursday") {
      //call function to update the database
      handleUpdateDatabase(thursday);
    } else if (daySubmitted === "Friday") {
      //call function to update the database
      handleUpdateDatabase(friday);
    } else if (daySubmitted === "Saturday") {
      //call function to update the database
      handleUpdateDatabase(saturday);
    }
  };

  //section update database - this mutation is an upsert...it either updates or creates a record
  const handleUpdateDatabase = async (data) => {
    console.log("database update = ", data.date);
    // let date = data.date;

    // console.log(
    //   'jobDate: ', moment(data.date).format("MMMM DD YYYY"),
    //   'startTime: ', `${data.startTime}:00 (MST)`,
    //   'endTime: ', `${data.endTime}:00 (MST)`,
    //   'hoursWorked: ', data.hours,
    //   'employee: ', userId,
    // )

    try {
      // eslint-disable-next-line
      await updateHours({
        variables: {
          jobDate: moment(data.date).format("MMMM DD YYYY"), //"January 20 2023"
          startTime: `${data.startTime}:00 (MST)`, //"12:00:00 (MST)"
          endTime: `${data.endTime}:00 (MST)`, //"13:00:00 (MST)"
          hoursWorked: data.hours.toString(), //"3.0"
          employee: userId, //"6398fb54494aa98f85992da3"
        },
      });
    } catch (err) {
      console.error(err);
    }

    singleHoursRefetch();
    // getWeeklyHours();
  };

  //section utility functions
  //calc hours for each day during the input process
  const calcHours = (value, name) => {
    console.log("hours worked", value, name);

    let startTime = "";
    const endTime = moment(value, "HH:mm");
    // console.log(endTime);

    //get start time
    if (name === "endTimeSunday") {
      startTime = moment(sunday.startTime, "HH:mm");
    } else if (name === "endTimeMonday") {
      startTime = moment(monday.startTime, "HH:mm");
    } else if (name === "endTimeTuesday") {
      startTime = moment(tuesday.startTime, "HH:mm");
    } else if (name === "endTimeWednesday") {
      startTime = moment(wednesday.startTime, "HH:mm");
    } else if (name === "endTimeThursday") {
      startTime = moment(thursday.startTime, "HH:mm");
    } else if (name === "endTimeFriday") {
      startTime = moment(friday.startTime, "HH:mm");
    } else if (name === "endTimeSaturday") {
      startTime = moment(saturday.startTime, "HH:mm");
    }

    const calcStart = moment(startTime, "HH:mm");
    const calcEnd = moment(endTime, "HH:mm");

    const duration = moment.duration(calcEnd.diff(calcStart));
    const hours = parseInt(duration.asMinutes()) / 60;
    const hoursWorked = hours.toFixed(2);

    return hoursWorked;
  };

  //calc current weekly total hours upon state update for singleHours array
  useEffect(() => {
    let currentWeekNumber = moment(new Date()).year();
    // let currentWeekNumber = moment(new Date()).month();
    // let currentWeekNumber = moment(new Date()).year();
    let currentEmployee = singleHours?.hoursByEmployeeId;

    let hoursForWeek = currentEmployee
      ?.filter(
        (element) => moment(element.jobDate).year() === currentWeekNumber
      )
      .map((element) => parseFloat(element.hoursWorked));

    console.log(hoursForWeek);

    let calcWeeklyHours = hoursForWeek?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    console.log(calcWeeklyHours);

    setWeeklyHours(calcWeeklyHours);
  }, [singleHours]);

  //get and format data for current week to render on page
  const [renderData, setRenderData] = useState([]);

  //convert data from DB into renderable object
  useEffect(() => {
    //get singleHours, filter for this week, sort by date
    console.log(singleHours);
    let currentWeekNumber = moment(new Date()).week();
    let currentEmployee = singleHours?.hoursByEmployeeId;

    let hoursByDayOfWeek = currentEmployee
      ?.filter(
        (element) => moment(element.jobDate).week() === currentWeekNumber
      )
      .map((element) => element);
    let reformattedHours = hoursByDayOfWeek?.map((element) => {
      return {
        weekDay: moment(element.jobDate).day(),
        jobDate: format_date_YYYYDDMM(element.jobDate),
        startTime: format_time_HHmmss(element.startTime),
        endTime: format_time_HHmmss(element.endTime),
        hours: parseFloat(element.hoursWorked, 2),
      };
    });

    console.log(hoursByDayOfWeek, "reformatted data = ", reformattedHours);

    if (reformattedHours?.length > 0) {
      setRenderData(reformattedHours);
    }

    console.log(renderData);

    // eslint-disable-next-line
  }, [singleHours]);

  //update the state of each day based on data from DB
  useEffect(() => {
    if (renderData?.length > 0) {
      for (let i = 0; i < renderData.length; i++) {
        if (renderData[i].weekDay === 0) {
          // console.log(renderData[i])
          setSunday({
            ...sunday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 1) {
          // console.log(renderData[i])
          setMonday({
            ...monday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 2) {
          // console.log(renderData[i])
          setTuesday({
            ...tuesday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 3) {
          // console.log(renderData[i])
          setWednesday({
            ...wednesday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 4) {
          // console.log(renderData[i])
          setThursday({
            ...thursday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 5) {
          // console.log(renderData[i])
          setFriday({
            ...friday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        } else if (renderData[i].weekDay === 6) {
          // console.log(renderData[i])
          setSaturday({
            ...saturday,
            startTime: renderData[i].startTime,
            endTime: renderData[i].endTime,
            hours: renderData[i].hours,
          });
        }
      }
    }
    // eslint-disable-next-line
  }, [renderData]);

  //update each start / time based on state
  useEffect(() => {
    //set start date based on state
    let startTimeElements = document.querySelectorAll(".startTime");
    for (let i = 0; i < startTimeElements.length; i++) {
      if (startTimeElements[i].name === "startTimeSunday") {
        startTimeElements[i].value = sunday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeMonday") {
        startTimeElements[i].value = monday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeTuesday") {
        startTimeElements[i].value = tuesday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeWednesday") {
        startTimeElements[i].value = wednesday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeThursday") {
        startTimeElements[i].value = thursday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeFriday") {
        startTimeElements[i].value = friday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      } else if (startTimeElements[i].name === "startTimeSaturday") {
        startTimeElements[i].value = saturday.startTime;
        // console.log('sunday = ', sunday, sunday.startTime)
      }
    }

    //set end date based on state
    let endTimeElements = document.querySelectorAll(".endTime");
    for (let i = 0; i < endTimeElements.length; i++) {
      if (endTimeElements[i].name === "endTimeSunday") {
        endTimeElements[i].value = sunday.endTime;
      } else if (endTimeElements[i].name === "endTimeMonday") {
        endTimeElements[i].value = monday.endTime;
      } else if (endTimeElements[i].name === "endTimeTuesday") {
        endTimeElements[i].value = tuesday.endTime;
      } else if (endTimeElements[i].name === "endTimeWednesday") {
        endTimeElements[i].value = wednesday.endTime;
      } else if (endTimeElements[i].name === "endTimeThursday") {
        endTimeElements[i].value = thursday.endTime;
      } else if (endTimeElements[i].name === "endTimeFriday") {
        endTimeElements[i].value = friday.endTime;
      } else if (endTimeElements[i].name === "endTimeSaturday") {
        endTimeElements[i].value = saturday.endTime;
      }
    }

    //set hours based on state
    let hoursInput = document.querySelectorAll(".hourInput"); //get array of hoursInput elements
    for (let i = 0; i < hoursInput.length; i++) {
      if (endTimeElements[i].name === "endTimeSunday") {
        hoursInput[i].innerText = `Hours: ${sunday.hours}`;
      } else if (endTimeElements[i].name === "endTimeMonday") {
        hoursInput[i].innerText = `Hours: ${monday.hours}`;
      } else if (endTimeElements[i].name === "endTimeTuesday") {
        hoursInput[i].innerText = `Hours: ${tuesday.hours}`;
      } else if (endTimeElements[i].name === "endTimeWednesday") {
        hoursInput[i].innerText = `Hours: ${wednesday.hours}`;
      } else if (endTimeElements[i].name === "endTimeThursday") {
        hoursInput[i].innerText = `Hours: ${thursday.hours}`;
      } else if (endTimeElements[i].name === "endTimeFriday") {
        hoursInput[i].innerText = `Hours: ${friday.hours}`;
      } else if (endTimeElements[i].name === "endTimeSaturday") {
        hoursInput[i].innerText = `Hours: ${saturday.hours}`;
      }
    }

    // eslint-disable-next-line
  }, [sunday, monday, tuesday, wednesday, thursday, friday, saturday]);
  const lastWeekDates = [];
  for (let i = 0; i < thisWeek.length; i++) {
    let eachDate = moment(lastWeek[i].date).format("MMMM DD YYYY");
    lastWeekDates.push(eachDate);
  }

  const weeklyTotal = async (singleHours) => {
    let lastWeeklyHours = 0;
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let jobb = singleHours.hoursByEmployeeId[i].jobDate;
      console.log(jobb);
      if (
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

  return (
    <>
      <Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{
              fontSize: "22px",
              backgroundColor: "#007bff",
              width: "100%",
              textAlign: "center",
              color: "white",
              borderRadius: "5px",
              margin: " 15px 0px 15px 0px",
              paddingTop: "7px",
              paddingBottom: "7px",
            }}
          >
            Current Week
          </span>
        </div>
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: "22px",
            marginTop: "-10px",
            marginBottom: "5px",
          }}
        >
          {" "}
          Total Hours: {weeklyHours}
        </p>

        <Accordion style={{marginBottom:'15px'}}>
          {weekInfo?.map((thisWeek, index) => (
            <Card>
              <div key={index}>
                <div>
                  <Accordion.Toggle
                    style={{ backgroundColor: "white", color: "#007bff" }}
                    as={Card.Header}
                    eventKey={index + 1}
                    className = "acc"
                  >
                    {format_date_no_hyphen(thisWeek.date)}
                    <span
                            className="m-0 hourInput"
                            id={`hours${thisWeek.day}`}
                            // style={{marginRight:'-15px'}}
                          >
                            
                          </span>
                  </Accordion.Toggle>
                  <Form
                    // className="hours-container" //fix
                    onSubmit={handleSubmit}
                    onChange={handleInput}
                    id={`hours${thisWeek.day}`}
                  >
                    <Accordion.Collapse eventKey={index + 1}>
                      <Card.Body>
                        <Row>
                      <Col sm={12} md={4}>
                        <Form.Group controlId="formBasicEmail">
                          <div className="form-label">
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              Start Time
                            </Form.Label>
                          </div>
                          <Form.Control
                            className="startTime"
                            type="time"
                            name={`startTime${thisWeek.day}`}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={12} md={4}>
                        <Form.Group controlId="formBasicEmail">
                          <div className="form-label">
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              End Time
                            </Form.Label>
                          </div>
                          <Form.Control
                            className="endTime"
                            type="time"
                            name={`endTime${thisWeek.day}`}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Button
                          className="primary"
                          variant="primary"
                          type="submit"
                          style={{marginTop:'25px'}}
                          title="Submit to schedule job."
                          // disabled={areAllFieldsFilled}
                        >
                          Submit
                        </Button>
                        </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Form>
                </div>
              </div>
            </Card>
          ))}
        </Accordion>
      </Container>
      <Container>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <div id="accordion" style={{ width: "98%" }}>
            <div className="card mb-1">
              <Button
                className="btn btn-link pl-1"
                style={{ color: "white", fontSize: "22px" }}
                onClick={() => setOpen2(!open2)}
                aria-expanded={open2}
              >
                Last Weeks Hours
              </Button>
              <Collapse in={open2} aria-expanded={open2}>
                
                <div id="example-collapse-text" style={{ width: "100%" }}>
                  <Row className=" mx-3 d-flex flex-column align-self-center align-items-center rounded-lg border-secondary ">
                  <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "22px",
                    textAlign: "center",
                  }}
                >
                  Last Weeks Total: {lastWeekHours}
                </div>
                    {oldHoursArr.map((hr, index) => (
                      <div
                        id="accordion"
                        key={index}
                        style={{ width: "99%", marginTop: "9px" }}
                      >
                        {hr}
                      </div>
                    ))}
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
