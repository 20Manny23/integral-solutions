import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SCHEDULE } from "../../../utils/queries";
import { DELETE_SCHEDULE } from "../../../utils/mutations";

import {
  format_date_string,
  format_date_MMDDYYYY,
} from "../../../utils/dateFormat";
import { format_date_YYYYDDMM } from "../../../utils/dateFormat";

import { Row, Col, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ScheduleList() {
  const [openDetails, setOpenDetails] = useState(false);

  //SECTION GET SCHEDULE
  // eslint-disable-next-line
  const {
    // eslint-disable-next-line
    loading: scheduleLoad,
    // eslint-disable-next-line
    data: schedule,
    // eslint-disable-next-line
    error: scheduleError,
    // eslint-disable-next-line
    refetch: scheduleRefetch,
  } = useQuery(QUERY_SCHEDULE);
  console.log(schedule);

  // SECTION DELETE
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);

  const handleDeleteSchedule = async (event) => {
    let scheduleId = event.currentTarget.getAttribute("data-scheduleid");
    console.log(scheduleId);
    try {
      // eslint-disable-next-line
      await deleteSchedule({
        variables: {
          id: scheduleId,
        },
      });

      // RELOAD SCHEDULE
      scheduleRefetch();
    } catch (err) {
      console.log(err);
    }
  };

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    console.log(currentAvailTarget);
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {schedule?.schedules?.map((job, index) => (
          <div id="accordion" key={index} style={{ width: "98%" }}>
            <div className="card p-2 mb-1">
              <div
                className="rounded directions-collapse"
                id="headingOne"
                style={{
                  color: "black",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h5 className="d-flex flex-column mb-0 text-left">
                  <button
                    onClick={(event) => getElement(event)}
                    aria-controls={`#collapse-client-${index}`}
                    aria-expanded={openDetails}
                    className="btn btn-link pl-1"
                    data-target={`#collapse-client-${index}`}
                  >
                    <p className="mb-0 text-left">

                    {job?.client?.businessName} ( {job?._id} )
                    </p>
                    <p className="mb-0 text-left">

                    {format_date_MMDDYYYY(job?.startDate)}
                    </p>
                  </button>
                </h5>
                <div className="d-flex mr-2">
                  <FontAwesomeIcon
                    icon="fa-trash"
                    className="p-2 fa-lg"
                    data-scheduleid={job?._id}
                    onClick={(event) => {
                      handleDeleteSchedule(event);
                    }}
                  />
                </div>
              </div>
              <Collapse>
                <div id={`#collapse-client-${index}`}>
                  <Container fluid="md">
                    <Row>
                      <Col>Contact: {job?.client?.contact}</Col>
                      <Col> <a href={`mailto:${job?.client?.email}`}> {job?.client?.email}</a> </Col>
                    </Row>
                    <Row>
                      <Col>{job?.streetAddress}{job?.suite && `, ${job?.suite}`}</Col>
                      <Col> <a href={`tel:+${job?.client?.phone}`}> {job?.client?.phone}</a> </Col>
                    </Row>
                    <Row>
                      <Col>{job?.city}, {job?.state} {job?.zip}</Col>
                      <Col>Start: {format_date_MMDDYYYY(job?.startDate)}</Col>
                    </Row>
                    <Row>
                      <Col>
                        Client Size: {job?.numberOfClientEmployees}
                      </Col>
                      <Col>End: {format_date_MMDDYYYY(job?.endDate)}</Col>
                    </Row>
                    <Row>
                      <Col>Job Details: {job?.jobDetails}</Col>
                    </Row>
                    <Row>
                      {/* <hr></hr> */}
                      <h6 className="mx-3 mt-2" style={{ textDecoration: "underline" }}>EMPLOYEES</h6>
                      <section className="d-flex flex-row" style={{ width: "100%" }}>
                        {job?.employees?.map((employee, index) => (
                          <article key={index} className="">
                            <p className="ml-3 mb-0"> {employee?.firstName} {employee?.lastName}</p>
                            <p className="ml-3 mb-0"> <a href={`mailto:${employee?.email}`}> {employee?.email}</a></p>
                            <p className="ml-3 mb-0"> <a href={`tel:+${employee?.phone}`}> {employee?.phone}</a></p>
                          </article>
                        ))}
                      </section>
                    </Row>
                  </Container>
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
}
export default ScheduleList;
