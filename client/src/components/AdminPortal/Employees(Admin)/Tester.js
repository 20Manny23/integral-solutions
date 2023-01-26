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

function EmployeeAdminHours2() {
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
      console.log(singleHours);
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

    setThisWeekHours("");
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
        console.log("hits here", hoursInt);
        setThisWeekHours(totalWeeklyHours.toFixed(2));
      }
    }
  };
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
  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    console.log(event)
    let employeeId = event.currentTarget.getAttribute("data-clientid");
    setEmployeeId(employeeId);
console.log(employeeId)
    // let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    // console.log(currentAvailTarget);
    // let currentAvailTable = document.getElementById(currentAvailTarget);
    // for (let i = 0; i < arrayForSort.length; i++) {
    //   if (currentAvailTable.contains("show")) {
    //     currentAvailTable.remove("show");
    //     setOpenDetails(false);
    //   } else {
    //     currentAvailTable.add("show");
    //     setOpenDetails(true);
    //   }

    //   setOpenDetails(false);
    // }

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
  console.log(emp)
  let arrayForSort = [];
  if (emp) {
    arrayForSort = [...emp.employees];
    arrayForSort.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }
   // const yearlyHours = (singleHours) => {
  // const todayYear = new Date().getFullYear().toString()

  //   for (let i = 0; i < singleHours.hoursByEmployeeId.length; i++) {
  //     let dateWorked = singleHours.hoursByEmployeeId[i].jobDate
  //     console.log(dateWorked)
//       if(dateWorked.charAt(dateWorked.length-1) === todayYear.charAt(todayYear.length-1) && dateWorked.charAt(dateWorked.length-2) === todayYear.charAt(todayYear.length-2)){
// console.log('this Worked')
//       }
//       else{
//         console.log("this one didnt work")
//       }
      

 
  //   }
    
  // }
  return (
    <>
    
     <Accordion>
     {arrayForSort.map((emp, index) => (
        <Card>
   
    <Accordion.Toggle as={Card.Header} onClick={(event) => getElement(event)} eventKey= {index + 1}  data-clientid={emp?._id}>
    {emp?.lastName}, {emp?.firstName}
    </Accordion.Toggle>
    <Accordion.Collapse eventKey= {index +1}>
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
      </Card.Body>
    </Accordion.Collapse>
  </Card>

  ))} 
</Accordion>
   
    </>
  );
}
export default EmployeeAdminHours2;
