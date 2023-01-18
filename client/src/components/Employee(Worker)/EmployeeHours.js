import React, { useState } from "react";
// import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEE_BYID } from "../../utils/queries";

import { Form, Col, Row, Container } from "react-bootstrap";
// import Collapse from "react-bootstrap/Collapse";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { getClippingParents } from "@fullcalendar/react";

// import { useMutation } from "@apollo/client";
// import { ADD_HOURS } from "../../utils/mutations";
// import { UPDATE_HOURS } from "../../utils/mutations";

import "../../styles/hours.css"

const dayjs = require("dayjs");

const hours = [
  {
    id: "1",
    startHours: "8:00",
    endHours: "5:00",
  },
  {
    id: "2",
    startHours: "9:00",
    endHours: "6:00",
  },
  {
    id: "3",
    startHours: "7:00",
    endHours: "7:00",
  },
  {
    id: "4",
    startHours: "9:00",
    endHours: "4:00",
  },
  {
    id: "5",
    startHours: "8:00",
    endHours: "6:00",
  },
  {
    id: "6",
    startHours: "11:00",
    endHours: "9:00",
  },
  {
    id: "7",
    startHours: "12:00",
    endHours: "8:00",
  },

]

const thisWeek = [
  {
    id: "1",
    date: dayjs().startOf('week').format("MMM-DD-YYYY"),
    day: "Sunday"
  },
  {
    id: "2",
    date: dayjs().startOf('week').add(1, "day").format("MMM-DD-YYYY"),
    day: "Monday"
  },
  { 
    id: "3", 
    date: dayjs().startOf('week').add(2, "day").format("MMM-DD-YYYY"),
    day: "Tuesday"
   },
  { 
    id: "4", 
    date: dayjs().startOf('week').add(3, "day").format("MMM-DD-YYYY"),
    day: "Wednesday"
   },
  { 
    id: "5", 
    date: dayjs().startOf('week').add(4, "day").format("MMM-DD-YYYY"),
    day: "Thursday"
   },
  { 
    id: "6", 
    date: dayjs().startOf('week').add(5, "day").format("MMM-DD-YYYY"),
    day: "Friday" },
  { 
    id: "7", 
    date: dayjs().startOf('week').add(6, "day").format("MMM-DD-YYYY"),
    day: "Saturday"},
]

const lastWeek = [
  {
    id: "1",
    date: dayjs().startOf('week').subtract(7, "day").format("MMM-DD-YYYY"),
    day: "Sunday"
  },
  {
    id: "2",
    date: dayjs().startOf('week').subtract(6, "day").format("MMM-DD-YYYY"),
    day: "Monday"
  },
  { 
    id: "3", 
    date: dayjs().startOf('week').subtract(5, "day").format("MMM-DD-YYYY"),
    day: "Tuesday"
   },
  { 
    id: "4", 
    date: dayjs().startOf('week').subtract(4, "day").format("MMM-DD-YYYY"),
    day: "Wednesday"
   },
  { 
    id: "5", 
    date: dayjs().startOf('week').subtract(3, "day").format("MMM-DD-YYYY"),
    day: "Thursday"
   },
  { 
    id: "6", 
    date: dayjs().startOf('week').subtract(2, "day").format("MMM-DD-YYYY"),
    day: "Friday" },
  { 
    id: "7", 
    date: dayjs().startOf('week').subtract(1, "day").format("MMM-DD-YYYY"),
    day: "Saturday"},
]



function EmployeeHours() {
  // set up state for form data
  const [startHours, setStartHours] = useState("");
  const [endHours, setEndHours] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event)

    name === "startHours"
      ? setStartHours(value)
      : setEndHours(value)

    return name;
  };

  const handleHoursSubmit = async (event) => {
    event.preventDefalt();

    //   try {
    //     const { data } = await addHours({
    //       variables: { startHours, endHours },
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
  }

  return (
    <>
      <Container>
      <Col style={{ fontWeight: "bold" }}> Week
          {thisWeek.map(date => (
            <Row key={date.id}>{date.day} {date.date}</Row>
          ))}
          <Row> </Row>
            <Form>
              
            </Form>
          
        </Col>
        <Row >Start Time {hours.map(hour => (
          <Col key={hour.id}>{hour.startHours}</Col>
        ))}
        </Row>
        <Row >End Time {hours.map(hour => (
          <Col key={hour.id}>{hour.endHours}</Col>
        ))}
        </Row>
        <Row >Total {hours.map(hour => (
          <Col key={hour.id}>{hour.endHours}</Col>
        ))}
        </Row> 
        <Col > Last week {lastWeek.map(date => (
          <Row key={date.id}>{date.day} {date.date}</Row>
        ))}
        </Col>
      </Container>

    </>
  )

}

export default EmployeeHours;
