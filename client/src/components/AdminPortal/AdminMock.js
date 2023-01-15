import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Schedule from "./Schedule/ScheduleList";
import ScheduleAdd from "./Schedule/ScheduleAdd";
import ScheduleUpdate from "./Schedule/ScheduleUpdate";

function ScheduleList() {
  return (
    <Tabs
      defaultActiveKey="scheduleAdd"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="scheduleList" title="Schedule List">
        <Schedule />
      </Tab>
      <Tab eventKey="scheduleAdd" title="Add Schedule">
        <ScheduleAdd />
      </Tab>
      <Tab eventKey="scheduleUpdate" title="Update Schedule">
       <ScheduleUpdate />
      </Tab>
    </Tabs>
  );
}

export default ScheduleList;