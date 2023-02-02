import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Employees from "./Employees";
import EmployeeAdd from "./EmployeeAdd";
import EmployeeUpdate from "./EmployeeUpdate";
import EmployeeHoursReport from "./EmployeeHoursReport";

function EmployeesList() {
  return (
    <Tabs
      defaultActiveKey="employeeList"
      id="fill-tab-example"
      className="mb-3"
      fill //sizes tabs to fit available space
      unmountOnExit //removes content when entering a different tab
      mountOnEnter
    >
      <Tab eventKey="employeeList" title="Employee List">
        <Employees />
      </Tab>
      <Tab eventKey="employeeHours" title="Hours Report">
        <EmployeeHoursReport />
      </Tab>
      <Tab eventKey="employeeAdd" title="Add Employee">
        <EmployeeAdd />
      </Tab>
      <Tab eventKey="employeeUpdate" title="Update Employee">
        <EmployeeUpdate />
      </Tab>
    </Tabs>
  );
}

export default EmployeesList;
