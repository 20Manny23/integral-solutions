import React from "react";

import { useNavigate } from "react-router-dom";

import EmployeePast from "../components/Employee(Worker)/EmpJobList";
import EmployeeHours from "../components/Employee(Worker)/EmployeeHours";

import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

const EmployeePortal = ({
  renderPanel,
  pastOrFuture,
  upcomingJobsButtonIsActive,
  pastJobsButtonIsActive,
  hoursButtonIsActive,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <Container style={{ marginTop: "25px" }}>
        <Row className="justify-content-center">
          <p style={{ fontSize: "30px" }}>
            <b>Employees Panel</b>
          </p>
        </Row>
      </Container>

      <Container className="mb-1">
        <Row>
          <Col>
            <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
              <Button
                variant="outline-primary"
                style={upcomingJobsButtonIsActive ? isActive : notActive}
                active={upcomingJobsButtonIsActive}
                onClick={() => {
                  navigate("/upcoming-jobs");
                }}
              >
                Upcoming Jobs
              </Button>

              <Button
                variant="outline-primary"
                style={pastJobsButtonIsActive ? isActive : notActive}
                active={pastJobsButtonIsActive}
                onClick={() => {
                  navigate("/past-jobs");
                }}
              >
                Past Jobs
              </Button>

              <Button
                variant="outline-primary"
                style={hoursButtonIsActive ? isActive : notActive}
                active={hoursButtonIsActive}
                onClick={() => {
                  navigate("/employee-hours");
                }}
              >
                Hours
              </Button>
            </div>

            {renderPanel === "employee" ? (
              <EmployeePast pastOrFuture="future" />
            ) : renderPanel === "past" ? (
              <EmployeePast pastOrFuture="past" />
            ) : renderPanel === "hours" ? (
              <EmployeeHours />
            ) : (
              <EmployeePortal />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
  // }
};

export default EmployeePortal;

const isActive = {
  flex: "auto",
  border: "solid 3px black",
  borderRadius: "3px",
  backgroundColor: "#007AFF",
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
