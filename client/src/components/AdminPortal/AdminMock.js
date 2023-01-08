import React, { useState } from "react";
import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES, QUERY_ALL_CLIENTS, QUERY_SCHEDULE } from "../../utils/queries";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

function AdminMock() {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line
  const { loading: empLoad, data: emp, error: empError, refetch: empRefectch} = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  // eslint-disable-next-line
  const { loading: clientLoad, data: clients, error: clientError, refetch: clientRefetch } = useQuery(QUERY_ALL_CLIENTS);
  console.log(clients);

  // eslint-disable-next-line
  const { loading: scheduleLoad, data: schedule, error: scheduleError, refetch: scheduleRefetch } = useQuery(QUERY_SCHEDULE);
  console.log(schedule);
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
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      className="btn btn-link pl-1"
                      onClick={() => setOpen(!open)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={open}
                    >
                      {emp?.firstName} {emp?.lastName}
                    </button>
                  </h5>
                </div>

                <Collapse in={open}>
                  <div id={`collapse-text-directions-${index}`}>
                    <div>Email: {emp?.email}</div>
                    <div>username: {emp?.username}</div>
                    <div>Phone: {emp?.phone}</div>
                    <div>isAdmin: {emp?.isAdmin ? "True" : "False"}</div>
                    <div>isLocked: {emp?.isLocked ? "True" : "False"}</div>
                    {emp?.schedule.map((job, index) => (
                      <>
                        <div>Client: {job?.client.businessName}</div>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                      </>
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
                      className="btn btn-link pl-1"
                      onClick={() => setOpen(!open)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={open}
                    >
                      {client?.businessName}
                    </button>
                  </h5>
                </div>

                <Collapse in={open}>
                  <div id={`collapse-text-directions-${index}`}>
                    <div>Contact Name: {client?.contact}</div>
                    <div>Phone: {client?.phone}</div>
                    <div>Email: {client?.email}</div>
                    <div>Address: {client?.streetAddress}</div>
                    <div>Suite: {client?.suite}</div>
                    <div>City: {client?.city}</div>
                    <div>State: {client?.state}</div>
                    <div>Zip: {client?.zip}</div>
                    {client?.schedule.map((job, index) => (
                      <>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                      </>
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
                      className="btn btn-link pl-1"
                      onClick={() => setOpen(!open)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={open}
                    >
                      {job?.client.businessName}
                    </button>
                  </h5>
                </div>

                <Collapse in={open}>
                  <div id={`collapse-text-directions-${index}`}>
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
                      <>
                        <div>First Name: {employee?.firstName}</div>
                        <div>Last Name: {employee?.lastName}</div>
                        <div>Email: {employee?.email}</div>
                        <div>Phone: {employee?.phone}</div>
                      </>
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
