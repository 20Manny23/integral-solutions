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
import { Row, Col, Container, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

import EmployeeHours from "../../Employee(Worker)/EmployeeHours";

import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function EmployeeAdminHours() {
  const [openDetails, setOpenDetails] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [newHoursArr, setNewHoursArr] = useState([]);
  const [thisWeekHours, setThisWeekHours] = useState();

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

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
    },
  });
  //turn this week dates into an array
  const thisWeekDates = [];
  for (let i = 0; i < thisWeek.length; i++) {
    let eachDate = moment(thisWeek[i].date).format("MMMM DD YYYY");
    thisWeekDates.push(eachDate);
  }

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
      } 
    }
  }
  const newHours = [];
  const lastHours = (singleHours) => {
    for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
      let jobb = singleHours.hoursByEmployeeId[i].jobDate;
      console.log(jobb);
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
  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let employeeId = event.currentTarget.getAttribute("data-clientid");
    setEmployeeId(employeeId);

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
    getAnEmployeeHoursById();
  };

  // const thisWeeksHours = hours(thisWeek);
  // // const lastWeeksHours = hours(lastWeek);

  // const thisHours =[];

  // for(let i = 0; i < thisWeeksHours.length; i++){
  //   console.log(thisWeeksHours[i].hours)
  //   const thisWeekHours = (data?.emp?.hours[i].hours)
  //   const thisWeekDate = (data?.emp?.hours[i].workDate)

  //   thisHours.push({hours: thisWeekHours, date: thisWeekDate})

  // }
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
    <Container>
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
    </Container>
  );
}
export default EmployeeAdminHours;
