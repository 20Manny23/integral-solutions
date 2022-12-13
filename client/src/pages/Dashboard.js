import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { getUserId } from "../utils/getUserId";
import AllEmployeesCont from "../components/AllEmployeesCont";
import AllLocationsCont from "../components/AllLocationsCont";
import FullCalendarApp from "../components/Calendar/FullCalendarApp";
import Location from "../pages/Location";
import { Button, Container, Col, Row } from "react-bootstrap/";
import "../styles/spinner.css";

const Dashboard = ({
  renderPanel,
  calendarButtonIsActive,
  employeesButtonIsActive,
  locationsButtonIsActive,
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
        <Container style={{ marginTop: "85px" }}>
          <Row className="justify-content-center">
            <p style={{ fontSize: "16px" }}>
              <b>
                Welcome {data.me?.firstName} {data.me?.lastName}!
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
                  style={employeesButtonIsActive ? isActive : notActive}
                  active={employeesButtonIsActive}
                  onClick={() => {
                    navigate("/employees");
                  }}
                >
                  Employees
                </Button>
                <Button
                  variant="outline-primary"
                  style={locationsButtonIsActive ? isActive : notActive}
                  active={locationsButtonIsActive}
                  onClick={() => {
                    navigate("/locations");
                  }}
                >
                  Locations
                </Button>
              </div>

              {renderPanel === "calendar" ? (
                <FullCalendarApp />
              ) : renderPanel === "employees" ? (
                <AllEmployeesCont />
              ) : renderPanel === "locations" ? (
                <AllLocationsCont />
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
  border: "none",
  borderRadius: "0",
};

const notActive = {
  flex: "auto",
  border: "none",
  borderRadius: "0",
  outline: "none",
  boxShadow: "none",
};
