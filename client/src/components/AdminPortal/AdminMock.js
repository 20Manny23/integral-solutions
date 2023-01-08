import React, { useState } from "react";
import Auth from "../../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../utils/queries";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

function AdminMock() {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line
  const { loading, data: emp, error, refetch } = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);


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


    </>
  );
}

export default AdminMock;
