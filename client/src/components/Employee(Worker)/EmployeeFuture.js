import React, { useState } from "react";
import Auth from "../../utils/auth";

import { getUserId } from "../../utils/getUserId";
import { useQuery } from "@apollo/client";
import { QUERY_EMPLOYEE_BYID } from "../../utils/queries";
import format_phone from "../../utils/helpers";
import { format_date_MMDDYYYY } from "../../utils/dateFormat";

import { Row, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Employees() {
  const [open, setOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);

  // get id for logged in employee
  const userId = getUserId();

  // get schedule useQuery for the specific id
  // eslint-disable-next-line
  const { loading, data, error, refetch } = useQuery(QUERY_EMPLOYEE_BYID, {
    variables: { id: userId },

    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts

    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      const todayDate = Date.now();
      const upcoming = [];

      for (let i = 0; i < data?.employeeById?.schedule.length; i++) {
        const date = new Date(data?.employeeById?.schedule[i].startDate);
        const jobDate = date.getTime();

        if (jobDate >= todayDate || jobDate === "") {
          upcoming.push(data?.employeeById?.schedule[i]);
        }

        setSchedule(upcoming);
      }
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
            {schedule?.map((job, index) => (
              <div id="accordion" key={index} style={{ width: "100%" }}>
                <div className="card p-2 mb-1">
                  <div
                    className="rounded directions-collapse"
                    id="headingOne"
                    style={{ color: "black" }}
                  >
                    <h5 className="d-flex flex-column mb-0 text-left">
                      <button
                        className="btn btn-link pl-1"
                        onClick={() => setOpen(!open)}
                        aria-controls={`collapse-text-directions-${index}`}
                        aria-expanded={open}
                        style={{ textDecoration: "none" }}
                      >
                        <p className="mb-0 text-left">
                          {job?.client?.businessName}
                        </p>
                        <p className="mb-0 text-left">
                          {format_date_MMDDYYYY(job?.startDate)} at{" "}
                          {job?.startTime}
                        </p>
                      </button>
                    </h5>
                  </div>

                  <Collapse in={open}>
                    <div id={`collapse-text-directions-${index}`}>
                      <div id="panel" className="card-body py-1 text-left">
                        <Row>
                          <span
                            style={{ fontWeight: "bold", marginRight: "3px" }}
                          >
                            Contact:{" "}
                          </span>{" "}
                          {job?.client?.contact}
                        </Row>

                        <Row>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${job?.streetAddress}+${job?.city}+${job?.state}+${job?.zip}&travelmode=driving`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon
                              icon="fa-solid fa-location-dot"
                              style={{ marginTop: "4px", marginRight: "5px" }}
                            />
                            {job?.streetAddress}, {job?.city} {job?.state}
                            {job?.zip}
                          </a>
                        </Row>
                        <Row>
                          <a href={`tel:+${job?.client?.phone}`}>
                            <FontAwesomeIcon icon="fa-solid fa-phone"></FontAwesomeIcon>
                            {format_phone(job?.client?.phone)}
                          </a>
                        </Row>
                      </div>
                      <div id="panel" className="card-body py-1 text-left">
                        <span
                          style={{ fontWeight: "bold", marginLeft: "-14px" }}
                        >
                          Job Details:
                        </span>
                        {job?.jobDetails}
                      </div>
                      <div id="panel" className="card-body py-1 text-left">
                        <span
                          style={{ fontWeight: "bold", marginLeft: "-14px" }}
                        >
                          Client Employees:
                        </span>{" "}
                        {job?.numberOfClientEmployees}
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
