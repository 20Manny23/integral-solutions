import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Schedule from "./Schedule";
import ScheduleAdd from "./ScheduleAdd";
import ScheduleUpdate from "./ScheduleUpdate";

function ScheduleList() {
  return (
    <Tabs
      defaultActiveKey="employeeList"
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