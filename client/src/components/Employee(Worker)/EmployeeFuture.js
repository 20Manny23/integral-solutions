import React, { useState } from "react";
import Auth from "../../utils/auth";

import { getUserId } from "../../utils/getUserId";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEE_BYID } from "../../utils/queries";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

function Employees() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  // console.log('schedule = ', schedule);

  // get id for logged in employee
  const userId = getUserId();
  // console.log(userId);

  // get schedule useQuery for the specific id
  // eslint-disable-next-line
  const { loading, data, error, refetch } = useQuery(QUERY_EMPLOYEE_BYID, {
    variables: { id: userId },

    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      console.log("EMPLOYEE DATA = ", data);
      const todayDate = Date.now();
      const upcoming = [];
      for (let i = 0; i < data.employeeById.schedule.length; i++) {
        console.log(data.employeeById.schedule.length);

        const date = new Date(data.employeeById.schedule[i].startDate);
        const jobDate = date.getTime();

        if (jobDate >= todayDate || jobDate === "") {
          upcoming.push(data.employeeById.schedule[i]);
        }
      }

      setSchedule(upcoming);
    },
  });

  // render data
  // use

  if (loading) {
    // console.log(loading); // need to add a spinner here
  } else {
    return (
      <>
        <Container>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {schedule.map((job, index) => (
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
                        aria-controls={`collapse-text-directions-${index}`}
                        aria-expanded={open}
                      >
                        {job?.client?.businessName}: {job?.startDate} at{" "}
                        {job?.startTime}
                      </button>
                    </h5>
                  </div>

                  <Collapse in={open}>
                    <div id={`collapse-text-directions-${index}`}>
                      <div id="panel" className="card-body py-1 text-left">
                        Address: {job?.client?.streetAddress},{" "}
                        {job?.client?.city} {job?.client?.state}{" "}
                        {job?.client?.zip}
                      </div>
                      <div id="panel" className="card-body py-1 text-left">
                        Job Details: {job?.jobDetails}
                      </div>
                      <div id="panel" className="card-body py-1 text-left">
                        # of Client Employees: {job?.numberOfClientEmployees}
                      </div>
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
}

export default Employees;
