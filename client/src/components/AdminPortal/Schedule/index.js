import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import FullCalendarApp from '../../Calendar/FullCalendarApp';
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
    >
      <Tab eventKey="calendar" title="Calendar">
        <FullCalendarApp />
      </Tab>
      <Tab eventKey="scheduleList" title="Job List">
        <ScheduleList />
      </Tab>
      <Tab eventKey="scheduleAdd" title="Add Jobs">
        <ScheduleAdd />
      </Tab>
      <Tab eventKey="scheduleUpdate" title="Update Jobs">
       <ScheduleUpdate />
      </Tab>
    </Tabs>
  );
}

export default Schedule;