import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SCHEDULE } from "../../../utils/queries";
import { DELETE_SCHEDULE } from "../../../utils/mutations";

import { format_date_MMDDYYYY } from "../../../utils/dateFormat";
import format_phone from "../../../utils/helpers";
import googleMap from "../../../utils/googleMap";

import { Row, Col, Container } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";


function ScheduleList({pastOrFuture}) {
  const [openDetails, setOpenDetails] = useState(false);
  const [past, setPast] = useState([]);
  const [future, setFuture] = useState([]);
  const [completed, setCompleted] = useState([])

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
  } = useQuery(QUERY_SCHEDULE, {
    onCompleted: (data) => {
      const todayDate = Date.now();

      setPast([]);
      setFuture([]);
      
      for (let i = 0; i < data?.schedules?.length; i++) {
        const date = new Date(data?.schedules[i].startDate);
        const jobDate = date.getTime();
        if (jobDate < todayDate) {
          past.push(data.schedules[i])
        } else {
          future.push(data.schedules[i])
        }
      }
   
      if(pastOrFuture === "past"){
        setCompleted(past)
      }
      else{
        setCompleted(future)
      }
    }
  });


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
    } catch (err) {
      console.log(err);
    }

    // RELOAD SCHEDULE
    scheduleRefetch();
  };

  // SECTION HANDLE COLLAPSE
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  //Sorts decending for upcoming ascending for completed
  let arrayForSortDate = [];
  
  if(pastOrFuture === "future"){
    arrayForSortDate = [...completed];
    arrayForSortDate.sort(function (a, b) {
      if (a.startDate.toLowerCase() < b.startDate.toLowerCase()) return -1;
      if (a.startDate.toLowerCase() > b.startDate.toLowerCase()) return 1;
      return 0;
    });
  }
  else {
    arrayForSortDate = [...completed];
    arrayForSortDate.sort(function (a, b) {
      if (a.startDate.toLowerCase() < b.startDate.toLowerCase()) return 1;
      if (a.startDate.toLowerCase() > b.startDate.toLowerCase()) return -1;
      return 0;
    })
  };

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {arrayForSortDate.map((job, index) => (
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
                      {job?.client?.businessName}
                    </p>
                    <p className="mb-0 text-left">
                      {format_date_MMDDYYYY(job?.startDate)} at {job?.startTime}
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

              <Collapse className="center-screen2">
                <div id={`#collapse-client-${index}`}>
                  <Container fluid="auto">
                    <Row>
                      <Col
                        xs={12}
                        sm={6}
                        style={{ marginBottom: "15px", marginTop: "10px" }}
                      >
                        <span style={{ fontWeight: "bold" }}>Contact:</span>{" "}
                        {job?.client?.contact}
                        <br></br>{" "}
                        <a href={`tel:+${job?.client?.phone}`}>
                          <FontAwesomeIcon icon="fa-solid fa-phone" />{" "}
                          {format_phone(job?.client?.phone)}
                        </a>{" "}
                        <br></br>{" "}
                        <a href={`mailto:${job?.client?.email}`}>
                          <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" />{" "}
                          {job?.client?.email}
                        </a>{" "}
                        <br></br>{" "}
                        <span style={{ fontWeight: "bold" }}>Client Size:</span>{" "}
                        {job?.numberOfClientEmployees}
                      </Col>

                      <Col style={{ marginBottom: "15px", marginTop: "10px" }}>
                        <a
                          href= {googleMap(job?.streetAddress, job?.city, job?.state, job?.zip)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-location-dot"
                            style={{ marginTop: "4px", marginRight: "5px" }}
                          />
                          {job?.streetAddress}
                          {job?.suite && `, ${job?.suite}`}
                          <br></br>
                          {job?.city}, {job?.state} {job?.zip}
                          <br></br>
                        </a>
                        <span style={{ fontWeight: "bold" }}>Start: </span>
                        {format_date_MMDDYYYY(job?.startDate)}
                        <br></br>
                        <span style={{ fontWeight: "bold" }}>End: </span>{" "}
                        {format_date_MMDDYYYY(job?.endDate)}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <span style={{ fontWeight: "bold" }}>Job Details:</span>{" "}
                        {job?.jobDetails}
                      </Col>
                    </Row>
                    <Row>
                      {/* <hr></hr> */}
                      <h6
                        className="mx-3 mt-2"
                        style={{ textDecoration: "underline" }}
                      >
                        EMPLOYEES
                      </h6>
                      <section
                        className="d-flex flex-row"
                        style={{ width: "100%" }}
                      >
                        {job?.employees?.map((employee, index) => (
                          <article key={index} className="">
                            <p className="ml-3 mb-0">
                              {" "}
                              {employee?.firstName} {employee?.lastName}
                            </p>
                            <p className="ml-3 mb-0">
                              {" "}
                              <a href={`mailto:${employee?.email}`}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-envelope-open-text" />{" "}
                                {employee?.email}
                              </a>
                            </p>
                            <p className="ml-3 mb-0">
                              {" "}
                              <a href={`tel:+${employee?.phone}`}>
                                {" "}
                                <FontAwesomeIcon icon="fa-solid fa-phone" />{" "}
                                {format_phone(employee?.phone)}
                              </a>
                            </p>
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
