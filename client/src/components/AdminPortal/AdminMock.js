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
      <Tab eventKey="scheduleList" title="Job List">
        <Schedule />
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

export default ScheduleList;