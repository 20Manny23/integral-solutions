import React, { useState } from "react";
import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES, QUERY_ALL_CLIENTS, QUERY_SCHEDULE } from "../../utils/queries";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminMock() {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  // const [open2, setOpen2] = useState(false);

  // eslint-disable-next-line
  const { loading: empLoad, data: emp, error: empError, refetch: empRefectch} = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  // eslint-disable-next-line
  const { loading: clientLoad, data: clients, error: clientError, refetch: clientRefetch } = useQuery(QUERY_ALL_CLIENTS);
  console.log(clients);

  // eslint-disable-next-line
  const { loading: scheduleLoad, data: schedule, error: scheduleError, refetch: scheduleRefetch } = useQuery(QUERY_SCHEDULE);
  console.log(schedule);

  // collapse show / not show detail
  const getElement = (event) => {
    let currentCollapseTarget = event.currentTarget.getAttribute("data-target");
    let currentCollapseTable = document.getElementById(currentCollapseTarget);
    // console.log(currentAvailTarget);

    if (currentCollapseTable.classList.contains("show")) {
      currentCollapseTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentCollapseTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  // toggle
  const [adminToggle, setAdminToggle] = useState(true);
  const [lockedToggle, setLockedToggle] = useState(false);
  // const [showHidePassword, setShowHidePassword] = useState("password");

  const handleToggle = (toggle) => {
    toggle === "admin" ? setAdminToggle(!adminToggle): setLockedToggle(!lockedToggle);

    // if (showHidePassword === "password") {
    //   setShowHidePassword("test");
    // } else {
    //   setShowHidePassword("password");
    // }
  };

  return (
    <>
      <Container style={{ border: "1px solid black" }}>
        <h3>Employee List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {emp?.employees?.map((emp, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black", display: "flex", justifyContent: "space-between" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-employee-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-employee-${index}`}
                    >
                      {emp?.firstName} {emp?.lastName}
                    </button>
                  </h5>
                  <div className="mr-2" style={{ display: "flex"}}>
                    <FontAwesomeIcon
                      icon="fa-pencil"
                      className="p-2"
                      onClick={() => console.log("pencil")}
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    />
                    {/* ADMIN TOGGLE */}
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("admin")}
                      style={adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("admin")}
                      style={!adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    {/* LOCKED TOGGLE */}
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("locked")}
                      style={lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("locked")}
                      style={!lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2"
                      // onClick={() => console.log("trash")}
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    />
                  </div>
                </div>

                <Collapse>
                  <div id={`#collapse-employee-${index}`}>
                    <div>Email: {emp?.email}</div>
                    <div>username: {emp?.username}</div>
                    <div>Phone: {emp?.phone}</div>
                    <div>isAdmin: {emp?.isAdmin ? "True" : "False"}</div>
                    <div>isLocked: {emp?.isLocked ? "True" : "False"}</div>
                    {emp?.schedule.map((job, index) => (
                      <div key={index}>
                        <div>Client: {job?.client.businessName}</div>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>

      <Container style={{ border: "1px solid black" }}>
        <h3>Client List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {clients?.clients?.map((client, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                    //section
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-client-${index}`}
                      //section
                    >
                      {client?.businessName}
                    </button>
                  </h5>
                </div>

                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <div>Contact Name: {client?.contact}</div>
                    <div>Phone: {client?.phone}</div>
                    <div>Email: {client?.email}</div>
                    <div>Address: {client?.streetAddress}</div>
                    <div>Suite: {client?.suite}</div>
                    <div>City: {client?.city}</div>
                    <div>State: {client?.state}</div>
                    <div>Zip: {client?.zip}</div>
                    {client?.schedule.map((job, index) => (
                      <div key={index}>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>

      <Container style={{ border: "1px solid black" }}>
        <h3>Schedule</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {schedule?.schedules?.map((job, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                    // //section
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-schedule-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-schedule-${index}`}
                      //section
                    >
                      {job?.client.businessName}
                    </button>
                  </h5>
                </div>

                <Collapse in={open}>
                  <div id={`#collapse-schedule-${index}`}>
                    <div>Contact Name: {job?.client.contact}</div>
                    <div>Phone: {job?.client.phone}</div>
                    <div>Email: {job?.client.email}</div>
                    <div>Address: {job?.client.streetAddress}</div>
                    <div>Suite: {job?.client.suite}</div>
                    <div>City: {job?.client.city}</div>
                    <div>State: {job?.client.state}</div>
                    <div>Zip: {job?.client.zip}</div>
                    <div>Start Date: {job?.startDate}</div>
                    <div>Start Time: {job?.startTime}</div>
                    <div>End Date: {job?.endDate}</div>
                    <div>Job Details: {job?.jobDetails}</div>
                    <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                    {job?.employees.map((employee, index) => (
                      <div key={index}>
                        <div>First Name: {employee?.firstName}</div>
                        <div>Last Name: {employee?.lastName}</div>
                        <div>Email: {employee?.email}</div>
                        <div>Phone: {employee?.phone}</div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>

    </>
  );
}

export default AdminMock;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
