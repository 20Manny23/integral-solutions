import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { getUserId } from "../utils/getUserId";
// import AllEmployeesCont from "../components/AllEmployeesCont";
import Employees from "./Employees";
import ClientList from "./ClientList";
import FullCalendarApp from "../components/Calendar/FullCalendarApp";
import Location from "../pages/Location";
import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";
import WorkOrder from "./WorkOrder";

const Dashboard = ({
  renderPanel,
  calendarButtonIsActive,
  workorderButtonIsActive,
  addemployeeButtonIsActive,
  clientlistButtonIsActive
}) => {
  // get user info to render to page
  const userId = getUserId();
  const { loading, data } = useQuery(QUERY_ME, {
    variables: { id: userId },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
  });

  let navigate = useNavigate();

  if (loading) {
    return (
      <div
        style={{ minHeight: "80vh", width: "100vw" }}
        className="d-flex justify-content-center align-items-center align-content-center mt-5"
      >
        <div className="lds-hourglass"></div>
      </div>
    );
  } else {
    return (
      <>
        <Container style={{ marginTop: "25px" }}>
          <Row className="justify-content-center">
            <p style={{ fontSize: "30px" }}>
              <b>
              Administrator Panel
              </b>
            </p>
          </Row>
        </Container>

        <Container className="mb-1">
          <Row>
            <Col>
              <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
                <Button
                  variant="outline-primary"
                  style={calendarButtonIsActive ? isActive : notActive}
                  active={calendarButtonIsActive}
                  onClick={() => {
                    navigate("/calendar");
                  }}
                >
                  Calendar
                </Button>
                <Button
                  variant="outline-primary"
                  style={workorderButtonIsActive ? isActive : notActive}
                  active={workorderButtonIsActive}
                  onClick={() => {
                    navigate("/workorder");
                  }}
                >
                  Work Order
                </Button>
                
                <Button
                  variant="outline-primary"
                  style={addemployeeButtonIsActive ? isActive : notActive}
                  active={addemployeeButtonIsActive}
                  onClick={() => {
                    navigate("/employees");
                  }}
                >
                  Employees
                </Button>
                <Button
                  variant="outline-primary"
                  style={clientlistButtonIsActive ? isActive : notActive}
                  active={clientlistButtonIsActive}
                  onClick={() => {
                    navigate("/clientlist");
                  }}
                >
                  Client List 
                </Button>
              </div>

              {renderPanel === "calendar" ? (
                <FullCalendarApp />
              ) : renderPanel === "workorder" ? (
                <WorkOrder />
              ) : renderPanel === "employees" ? (
                <Employees />
              ) : renderPanel === "clientlist" ? (
                  <ClientList />
              ) : (
                <Location />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
};

export default Dashboard;

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
