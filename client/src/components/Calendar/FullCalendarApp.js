import React, { useState, useEffect, useRef } from "react";
import Auth from "../../utils/auth";

import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_SCHEDULE, QUERY_SINGLE_SCHEDULE } from "../../utils/queries";

import LoadFullCalendar from "./LoadFullCalendar";
import Modal from "../Modal";
import { format_date_ISOString } from "../../utils/dateFormat";

import "../../styles/calendar.css";

const FullCalendarApp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // set state of sctive view through day# click
  const [activeView, setActiveView] = useState("dayGridMonth");
  const [weekendsVisible] = useState(true);

  const [currentScheduleId, setCurrentScheduleId] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState("");

  let colorArray = ["yellow", "red", "green", "blue", "orange", "purple"];
  function getRandomInt(max) {
    let randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
  }

  useEffect(() => {
    setActiveView("listDay");
  }, [activeView]);

  const [INITIAL_EVENTS, setINITIAL_EVENTS] = useState(null);
  const [renderCalendar, setRenderCalendar] = useState(false);
  const previousValue = useRef(null);

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
    // } = useQuery(QUERY_SCHEDULE);
  } = useQuery(QUERY_SCHEDULE, {
    variables: {
      isDisplayable: true, //only retrieve employees with a displayable status
    },
  });

  // eslint-disable-next-line
  const [getASingleSchedule, { loading: lazyLoading, data: singleSchedule }] =
    useLazyQuery(QUERY_SINGLE_SCHEDULE, {
      variables: { scheduleId: currentScheduleId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleSchedule) => {
        
        setCurrentSchedule(singleSchedule);
      },
    });

  const handleEventClick = async (event) => {

    let scheduleId = event.event._def.publicId;
    setCurrentScheduleId(scheduleId);

    let clickedSchedule = await getASingleSchedule();
    

    if (!scheduleLoad) {
      setCurrentSchedule(clickedSchedule.data.schedule);
   
      handleShow();
    }
  };

  //section
  let results = [];
  if (!scheduleLoad) {
    results = schedule?.schedules?.map((job) => {
      return {
        id: job._id,
        title: job.client.businessName,
        start: format_date_ISOString(job.startDate),
        end: format_date_ISOString(job.endDate),
        display: "block",
        backgroundColor: colorArray[getRandomInt(colorArray.length)],
        textColor: "black",
      };
    });

    // prevents infinite render loop by comparing most recent returned query to previous query. if the same, terminates infinate loop
    if (
      results !== undefined &&
      previousValue.current !== undefined &&
      previousValue !== null &&
      results?.length === previousValue.current?.length
    ) {
      return (
        <>
          <LoadFullCalendar
            activeView={activeView}
            weekendsVisible={weekendsVisible}
            INITIAL_EVENTS={INITIAL_EVENTS}
            renderEventContent={renderEventContent}
            handleEventClick={handleEventClick}
          />

          {show && (
            <Modal
              currentSchedule={currentSchedule}
              show={show}
              handleClose={handleClose}
              handleShow={handleShow}
            />
          )}
        </>
      );
    }
    setINITIAL_EVENTS(results);
    setRenderCalendar(true);
  }

  // creates previous result value to help eliminate re-render loop
  if (INITIAL_EVENTS) {
    previousValue.current = INITIAL_EVENTS;
  }

  function renderEventContent(eventInfo) {
    return (
      <div>
        <b>{eventInfo.timeText} </b>
        <i className="event-title">{eventInfo.event.title}</i>
      </div>
    );
  }

  // spinner - wait for query to return event data
  if (!renderCalendar) {
    return (
      <div className="d-flex justify-content-center">
        <div className="lds-hourglass"></div>
      </div>
    );
  } else {
    return (
      <>
        <LoadFullCalendar
          activeView={activeView}
          weekendsVisible={weekendsVisible}
          INITIAL_EVENTS={INITIAL_EVENTS}
          renderEventContent={renderEventContent}
          handleEventClick={handleEventClick}
        />

        {show && (
          <Modal
            currentSchedule={currentSchedule}
            show={show}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          doloribus eius quae deleniti, iste harum excepturi assumenda qui
          perferendis rerum dicta dolores, repellendus quaerat corporis laborum
          id eum laudantium provident.
        </p>
      </>
    );
  }
};

export default FullCalendarApp;
