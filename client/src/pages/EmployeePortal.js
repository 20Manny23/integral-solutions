import React, { useState } from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { getUserId } from "../utils/getUserId";
import EmployeePast from "../components/Employee(Worker)/EmployeePast";
import EmployeeFuture from "../components/Employee(Worker)/EmployeeFuture";
import EmployeeHours from "../components/Employee(Worker)/EmployeeHours";
import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

// import AllEmployeesCont from "../components/AllEmployeesCont";
// import ClientList from "./ClientList";
// import FullCalendarApp from "../components/Calendar/FullCalendarApp";
// import Location from "./Location";
// import WorkOrder from "./WorkOrder";

const EmployeePortal = ({
  renderPanel,
  // calendarButtonIsActive,
  // workorderButtonIsActive,
  addemployeeButtonIsActive,
  clientlistButtonIsActive,
  hoursButtonIsActive,
}) => {
  // const [upcomingPanel, setUpcomingPanel] = useState(isActive)
  // const [pastPanel, setPastPanel] = useState(notActive)
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
              <b>Employee Panel</b>
            </p>
          </Row>
        </Container>

        <Container className="mb-1">
          <Row>
            <Col>
              <div className="d-flex flex-row mb-1 p-0 border border-secondary rounded-lg">
                <Button
                  variant="outline-primary"
                  style={addemployeeButtonIsActive ? isActive : notActive}
                  active={addemployeeButtonIsActive}
                  onClick={() => {
                    navigate("/employee");
                  }}
                >
                  Upcoming Jobs
                </Button>
                <Button
                  variant="outline-primary"
                  style={clientlistButtonIsActive ? isActive : notActive}
                  active={clientlistButtonIsActive}
                  onClick={() => {
                    navigate("/past");
                  }}
                >
                  Past Jobs
                </Button>
                <Button
                  variant="outline-primary"
                  style={hoursButtonIsActive ? isActive : notActive}
                  active={hoursButtonIsActive}
                  onClick={() => {
                    navigate("/hours");
                  }}
                >
                  Enter Hours
                </Button>
              </div>

              {renderPanel === "employee" ? (
                <EmployeeFuture />
              ) : renderPanel === "past" ? (
                <EmployeePast />
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
  }
};

export default EmployeePortal;

const isActive = {
  flex: "auto",
  border: "solid 3px black",
  borderRadius: "3px",
  backgroundColor: '#007AFF'
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
