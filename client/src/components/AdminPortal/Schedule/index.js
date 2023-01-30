import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import FullCalendarApp from "../../Calendar/FullCalendarApp";
import ScheduleList from "./ScheduleList";
import ScheduleAdd from "./ScheduleAdd";
import ScheduleUpdate from "./ScheduleUpdate";

function Schedule() {
  return (
    <Tabs
      defaultActiveKey="calendar"
      id="fill-tab-example"
      className="mb-3"
      fill //sizes tabs to fit available space
      unmountOnExit //removes content when entering a different tab
      mountOnEnter
    >
      <Tab eventKey="calendar" title="Calendar">
        <FullCalendarApp />
      </Tab>
      <Tab eventKey="upcoming" title="Upcoming">
        <ScheduleList pastOrFuture="future" />
      </Tab>
      <Tab eventKey="completed" title="Completed">
        <ScheduleList pastOrFuture="past" />
      </Tab>
      <Tab eventKey="scheduleAdd" title="Add Job">
        <ScheduleAdd />
      </Tab>
      <Tab eventKey="scheduleUpdate" title="Update Job">
        <ScheduleUpdate />
      </Tab>
    </Tabs>
  );
}

export default Schedule;
