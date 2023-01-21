import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../../utils/queries";
import { thisWeek, lastWeek, hours } from "../../../utils/hoursDates";
import { format_date_MMDDYYYY, format_date_MMDD } from "../../../utils/dateFormat"
import { Row, Col, Container, Form } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

import EmployeeHours from "../../Employee(Worker)/EmployeeHours";

import "../../../styles/Contact.css";
import "../../../styles/button-style.css";


function EmployeeAdminHours() {
  const [openDetails, setOpenDetails] = useState(false);

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);


  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
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
  };


  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {emp?.employees?.map((emp, index) => (
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
                    className="btn btn-link pl-1"
                    data-target={`#collapse-client-${index}`}
                  >
                     {emp?.lastName}, {emp?.firstName}
                  </button>
                </h5>
                <div className="d-flex mr-2">
                   <p style={{fontWeight:'bold'}}>Hours This Week: {}</p>
                </div>
              </div>
              <Collapse>
                <div id={`#collapse-client-${index}`}>
                  <Container fluid="true">
                    <Row>
                      <Col sm={12} md={6} lg={6}>
                      {thisWeek.map((date, index) => (
            <div id="accordion" key={index} style={{marginLeft:'20px'}}>{format_date_MMDD (date.date)}{": "}
            </div>
                  ))}
                      </Col>

                      <Col>
                      <p style={{fontWeight:'bold', marginTop:'12px', marginLeft:'20px'}}>Month to Date Hours:</p>
                      <p style={{fontWeight:'bold', marginTop:'-8px', marginLeft:'20px'}}>Year to Date Hours:</p>

                       
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