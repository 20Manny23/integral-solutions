import React from "react";
import { useNavigate } from "react-router-dom";

import FullCalendarApp from "../components/Calendar/FullCalendarApp";
import WorkOrder from "../components/AdminPortal/Schedule";
import ClientList from "../components/AdminPortal/Clients";
import Employees from "../components/AdminPortal/Employees(Admin)";

import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

const AdminPortal = ({
  renderPanel,
  workOrderButtonIsActive,
  employeeListButtonIsActive,
  clientListButtonIsActive,
}) => {
  let navigate = useNavigate();

  return (
    <>
      <Container style={{ marginTop: "25px" }}>
        <Row className="justify-content-center">
          <p style={{ fontSize: "30px", marginTop: "20px" }}>
            <b>Administrator Panel</b>
          </p>
        </Row>
      </Container>

      <Container className="mb-1">
        <Row>
          <Col>
            <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
              <Button
                variant="outline-primary"
                style={workOrderButtonIsActive ? isActive : notActive}
                active={workOrderButtonIsActive}
                onClick={() => {
                  navigate("/jobs-panel");
                }}
              >
                Jobs
              </Button>

              <Button
                variant="outline-primary"
                style={employeeListButtonIsActive ? isActive : notActive}
                active={employeeListButtonIsActive}
                onClick={() => {
                  navigate("/employees-panel");
                }}
              >
                Employees
              </Button>
              <Button
                variant="outline-primary"
                style={clientListButtonIsActive ? isActive : notActive}
                active={clientListButtonIsActive}
                onClick={() => {
                  navigate("/client-panel");
                }}
              >
                Clients
              </Button>
            </div>

            {renderPanel === "calendar" ? (
              <FullCalendarApp />
            ) : renderPanel === "workorder" ? (
              <WorkOrder />
            ) : renderPanel === "employees" ? (
              <Employees />
            ) : (
              <ClientList />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPortal;

const isActive = {
  flex: "auto",
  border: "solid 3px black",
  borderRadius: "3px",
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
