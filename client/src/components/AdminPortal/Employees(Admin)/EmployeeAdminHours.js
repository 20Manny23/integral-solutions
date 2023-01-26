import React, { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Auth from "../../../utils/auth";
import {
  QUERY_ALL_EMPLOYEES,
  QUERY_HOURS_BYEMPLOYEEID,
} from "../../../utils/queries";
import { thisWeek, lastWeek, hours } from "../../../utils/hoursDates";
import {
  format_date_MMDDYYYY,
  format_date_MMDD,
} from "../../../utils/dateFormat";
import moment from "moment";
import { Row, Col, Container, Form, Accordion, Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

import EmployeeHours from "../../Employee(Worker)/EmployeeHours";

import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function EmployeeAdminHours() {
  const [openDetails, setOpenDetails] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [newHoursArr, setNewHoursArr] = useState([]);
  const [thisWeekHours, setThisWeekHours] = useState();
  const [thisYearHours, setThisYearHours] = useState();
  const [thisMonthHours, setThisMonthHours] = useState();

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
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
      isDisplayable: true, //only retrieve employees with a displayable status
    },
  });

  const [
    getAnEmployeeHoursById,
    {
      loading: singleLazyLoad,
      data: singleHours,
      error: singleHourError,
      refetch: singleHoursRefetch,
    },
  ] = useLazyQuery(QUERY_HOURS_BYEMPLOYEEID, {
    variables: { employee: employeeId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (singleHours) => {
      lastHours(singleHours);
      weeklyTotal(singleHours);
      yearlyHours(singleHours);
      monthlyHours(singleHours);
    },
  });
  //turn this week dates into an array
  const thisWeekDates = [];

  for (let i = 0; i < thisWeek.length; i++) {
    let eachDate = moment(thisWeek[i].date).format("MMMM DD YYYY");
    thisWeekDates.push(eachDate);
  }

  //SECTION sets Weekly Hour Total

  const weeklyTotal = async (singleHours) => {
    let totalWeeklyHours = 0;

    setThisWeekHours("0.00");
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
      }
    }
  };

  //SECTION Grabs Hours each day for rendering
  const newHours = [];
  const lastHours = (singleHours) => {
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let jobb = singleHours.hoursByEmployeeId[i].jobDate;

      if (jobb === thisWeekDates[0]) {
        newHours.push(
          thisWeekDates[0] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === thisWeekDates[1]) {
        newHours.push(
          thisWeekDates[1] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === thisWeekDates[2]) {
        newHours.push(
          thisWeekDates[2] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }

      if (jobb === thisWeekDates[3]) {
        newHours.push(
          thisWeekDates[3] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === thisWeekDates[4]) {
        newHours.push(
          thisWeekDates[4] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === thisWeekDates[5]) {
        newHours.push(
          thisWeekDates[5] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
      if (jobb === thisWeekDates[6]) {
        newHours.push(
          thisWeekDates[6] +
            " Hours: " +
            singleHours.hoursByEmployeeId[i].hoursWorked
        );
      }
    }
    const newHoursSort = newHours.sort();

    setNewHoursArr(newHoursSort);
  };

  // SECTION HANDLE SET ID
  const getElement = (event) => {
    let employeeId = event.currentTarget.getAttribute("data-clientid");
    setEmployeeId(employeeId);

    getAnEmployeeHoursById();
  };

  //SETCTION Finds year to Date Hours
  const yearlyHours = (singleHours) => {
    setThisYearHours("0.00");
    const todayYear = new Date().getFullYear().toString();
    let totalYearlyHours = 0;
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let dateWorked = singleHours.hoursByEmployeeId[i].jobDate;

      if (
        dateWorked.charAt(dateWorked.length - 1) ===
          todayYear.charAt(todayYear.length - 1) &&
        dateWorked.charAt(dateWorked.length - 2) ===
          todayYear.charAt(todayYear.length - 2)
      ) {
        let ytdHours = Number(singleHours.hoursByEmployeeId[i].hoursWorked);

        totalYearlyHours = ytdHours + totalYearlyHours;
      }
    }
    setThisYearHours(totalYearlyHours.toFixed(2));
  };

  //SECTION finds Month to Date Hours

  const monthlyHours = (singleHours) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const todayYear = new Date().getFullYear().toString();
    const d = new Date();
    let todayMonth = month[d.getMonth()];
    let totalMonthlyHours = 0;

    function firstWord(text) {
      let firstBlank = text.indexOf(" ");

      return text.slice(0, firstBlank);
    }
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let dateWorked = singleHours.hoursByEmployeeId[i].jobDate;
      if (
        firstWord(singleHours.hoursByEmployeeId[i].jobDate) === todayMonth &&
        dateWorked.charAt(dateWorked.length - 1) ===
          todayYear.charAt(todayYear.length - 1) &&
        dateWorked.charAt(dateWorked.length - 2) ===
          todayYear.charAt(todayYear.length - 2)
      ) {
        let monthHours = Number(singleHours.hoursByEmployeeId[i].hoursWorked);

        totalMonthlyHours = monthHours + totalMonthlyHours;
      }
    }
    setThisMonthHours(totalMonthlyHours.toFixed(2));
  };

  //Sorts Array By Last Name
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
      <Accordion style={{ marginTop: "25px" }}>
        {arrayForSort.map((emp, index) => (
          <Card key={index}>
            <Accordion.Toggle
              as={Card.Header}
              onClick={(event) => getElement(event)}
              eventKey={index + 1}
              data-clientid={emp?._id}
              style={{ backgroundColor: "white", color: "#527bff" }}
            >
              {emp?.lastName}, {emp?.firstName}
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                <Container fluid="true">
                  <Row>
                    <Col sm={12} md={6} lg={6}>
                      {newHoursArr.map((date, index) => (
                        <div
                          id="accordion"
                          key={index}
                          style={{ marginLeft: "20px" }}
                        >
                          {date}
                        </div>
                      ))}
                    </Col>

                    <Col>
                      <p
                        style={{
                          fontWeight: "bold",
                          marginLeft: "20px",
                        }}
                      >
                        Hours This Week: {thisWeekHours}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          marginLeft: "20px",
                          marginTop: "-20px",
                        }}
                      >
                        Month to Date Hours: {thisMonthHours}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          marginLeft: "20px",
                          marginTop: "-20px",
                        }}
                      >
                        Year to Date Hours: {thisYearHours}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
}
export default EmployeeAdminHours;
// previous code that was replaced

{
  /* <Container>
<Row style={{ display: "flex", justifyContent: "center" }}>
  {arrayForSort.map((emp, index) => (
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
              data-clientid={emp?._id}
              className="btn btn-link pl-1"
              data-target={`#collapse-client-${index}`}
            >
              {emp?.lastName}, {emp?.firstName}
            </button>
          </h5>
          <div style={{ fontWeight: "bold" }} className="d-flex mr-2">
            
          </div>
        </div>
        <Collapse>
          <div id={`#collapse-client-${index}`}>
            <Container fluid="true">
              <Row>
                <Col sm={12} md={6} lg={6}>
                  {newHoursArr.map((date, index) => (
                    <div
                      id="accordion"
                      key={index}
                      style={{ marginLeft: "20px" }}
                    >
                      {date}
                    </div>
                  ))}
                </Col>
                <Col>
                <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "20px",
                    }}
                  >
                    Hours This Week: {thisWeekHours}
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "20px",
                      marginTop: "-20px"
                    }}
                  >
                    Month to Date Hours:
                  </p>
                  <p
                    style={{
                      fontWeight: "bold",
                      marginLeft: "20px",
                      marginTop: "-20px"
                    }}
                  >
                    Year to Date Hours:
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
        </Collapse>
      </div>
    </div>
  ))}
</Row>
</Container> */
}
