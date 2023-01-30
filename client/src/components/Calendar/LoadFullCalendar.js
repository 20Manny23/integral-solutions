import React from "react";

import FullCalendar from "@fullcalendar/react";
import moment from "moment";
import momentPlugin from "@fullcalendar/moment";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { mobile_check } from "../../utils/mobileCheck";

import "../../styles/calendar.css";

const LoadFullCalendar = ({
  activeView,
  weekendsVisible,
  INITIAL_EVENTS,
  renderEventContent,
  handleEventClick,
}) => {
  
  window.mobilecheck = mobile_check();

  return (
    <div className="cal-app my-3 p-1 shadow border border-secondary rounded-lg">
      <div id="calendar" className="cal-app-main">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
            momentPlugin,
          ]}
          headerToolbar={{
            left: "title",
            center: "",
            right: "prev,next,today",
          }}
          footerToolbar={{
            left: "",
            center: "dayGridMonth,listWeek",
            right: "",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            list: "Week",
          }}
          titleFormat="MMM-YYYY"
          listDayFormat={{
            day: "numeric",
            weekday: "short",
            month: "short",
            omitCommas: false,
          }}
          navLinkDayClick={activeView}
          slotMinTime="06:00:00"
          initialView={window.mobilecheck ? "dayGridMonth" : "listWeek"}
          initialDate={moment().format()}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick} //section
          navLinks={true} // allows for navigation to day-view of selected date
        />
      </div>
    </div>
  );
};

export default LoadFullCalendar;
