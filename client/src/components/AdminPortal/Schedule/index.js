import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Schedule from "./Schedule";
import ScheduleAdd from "./ScheduleAdd";
import ScheduleUpdate from "./ScheduleUpdate";

function ScheduleList() {
  return (
    <Tabs
      defaultActiveKey="scheduleList"
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