import React, { useState } from "react";
import Auth from "../../utils/auth";

import { getUserId } from "../../utils/getUserId";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../utils/queries";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";


function AdminMock() {
  const [open, setOpen] = useState(false);
  // const [employees, setEmployees] = useState([]);
  // console.log('schedule = ', schedule);

  // get id for logged in employee
  const userId = getUserId();
  // console.log(userId);

  // get schedule useQuery for the specific id
  // eslint-disable-next-line
  const { loading, data: emp, error, refetch } = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  // const { loading, data, error, refetch } = useQuery(QUERY_ALL_EMPLOYEES, {
  //   variables: { id: userId },
  //   // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
  //   skip: !Auth.loggedIn(),
  //   onCompleted: (data) => {
  //     let schedule = data?.employeeById?.schedule;
  //     setSchedule(schedule);
  //     console.log(schedule);
  //   },
  // });

  return (
    <>
      <Container style={{ border: "1px solid black" }}>
        <h3>Employee List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
        {emp?.employees?.map((job, index) => (
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
                    {emp?.employees.firstName} {emp?.employees.lastName} 
                  </button>
                </h5>
              </div>

              <Collapse in={open}>
                Hello
                <div id={`collapse-${index}`}>
                  {emp?.employees?.email}
                  {emp?.employees?.isAdmin}
                  {emp?.employees?.isLocked}
                  {emp?.employees?.lastName}
                  {emp?.employees?.firstName}
                  {emp?.employees?.password}
                  {emp?.employees?.phone}
                  {emp?.employees?.username}
                  {emp?.employees?.schedule}
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
