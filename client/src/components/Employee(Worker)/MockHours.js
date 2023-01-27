import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../utils/queries";

import moment from "moment";
import { format_date_no_hyphen } from "../../utils/dateFormat";

import { Container, Accordion, Card } from "react-bootstrap";
import { thisWeek } from "../../utils/hoursDates";

function EmployeeHours() {
  const [thisWeekDays, setThisWeekDays] = useState([]); //used to render by employee with respective hours for the week
  const [weeklyTotalHours, setWeeklyTotalHours] = useState(0); //used to render total hours for the week

  //SECTION GET ALL EMPLOYEES with isDisplayable === true
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
      isDisplayable: true, //only retrieve employees with a displayable status = true
    },
    onCompleted: (data) => {
    },
  });

  //SECTION CREATE EMPLOYEE DATA TO RENDER ON PAGE - SORT, FILTER, CALCULATE
  useEffect(() => {
    let getThisWeekDays = [];

    getThisWeekDays = emp?.employees
      ?.map((element) => {
        return {
          firstName: element.firstName,
          lastName: element.lastName,
          hoursThisWeek: calcTimePeriodHours(element, "week").toFixed(2),
          hoursThisMonth: calcTimePeriodHours(element, "month").toFixed(2),
          hoursThisYear: calcTimePeriodHours(element, "year").toFixed(2),
          hour: element.hour
            .map((hour) => {
              return {
                jobDate: format_date_no_hyphen(hour.jobDate),
                weekNumber: moment(hour.jobDate).week(),
                jobDay: moment(hour.jobDate).day(),
                hoursWorked: hour.hoursWorked,
              };
            })
            .sort((a, b) => a.jobDay - b.jobDay)
            .filter(
              (element) =>
                moment(element.jobDate).week() === moment(new Date()).week()
            )
            .map((element) => element),
        };
      })
      .sort((a, b) => {
        const nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

    setThisWeekDays(getThisWeekDays);
  }, [emp]);

  //SECTION TO CALC TOTAL OVERALL HOURS FOR THE WEEK
  useEffect(() => {
    let currentWeekNumber = moment(new Date()).week();

    let calcTotalWeeklyHours = emp?.employees //get employee data
      .map((element) => element.hour) //map hours to an array
      .flatMap((num) => num) //combine/flatten arrays into a single array
      .filter((day) => moment(day.jobDate).week() === currentWeekNumber) //filter for dates this week
      .map((element) => parseFloat(element.hoursWorked, 2)) //map the hours worked this week to an array
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0); //total the hours for this week

    setWeeklyTotalHours(parseFloat(calcTotalWeeklyHours).toFixed(2));
  }, [emp]);

  //SECTION UTIILITY FUNCTION TO DETERMINE HOURS FOR WEEK, MONTH, YEAR
  const calcTimePeriodHours = (data, period) => {
    let totalHours = data.hour
      .filter(
        (thisWeek) =>
          moment(thisWeek.jobDate)[period]() === moment(new Date())[period]()
      )
      .map((hours) => parseFloat(hours.hoursWorked))
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    return totalHours;
  };

  return (
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
          Current Week - Hours by Employee
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
        This Week: {weeklyTotalHours}
      </p>

      <Accordion style={{ marginBottom: "15px" }}>
        {/* {emp?.employees?.map( */}
        {thisWeekDays?.map((employee, index) => (
          <Card key={index}>
            <div>
              <div>
                <Accordion.Toggle
                  style={{ backgroundColor: "white", color: "#007bff" }}
                  as={Card.Header}
                  eventKey={index + 1}
                  className="acc"
                >
                  {`${employee.lastName}, ${employee.firstName}`}
                  <p>Hours This Week: {employee.hoursThisWeek}</p>
                  <span
                    className="m-0 hourInput"
                    id={`hours${thisWeek.day}`}
                  ></span>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index + 1}>
                  <Card.Body>
                    <div className="d-flex justify-content-around">
                      <div>
                        {employee.hour.map((element, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-around"
                          >
                            <p>{format_date_no_hyphen(element.jobDate)}</p>
                            <p>
                              Hours:{" "}
                              {parseFloat(element.hoursWorked).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p>This Week: {employee.hoursThisWeek}</p>
                        <p>This Month: {employee.hoursThisMonth}</p>
                        <p>This Year: {employee.hoursThisYear}</p>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </div>
            </div>
          </Card>
        ))}
      </Accordion>
    </Container>
  );
}
export default EmployeeHours;
