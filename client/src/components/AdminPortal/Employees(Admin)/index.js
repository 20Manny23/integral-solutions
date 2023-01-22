import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Employees from "./Employees";
import EmployeeAdd from "./EmployeeAdd"
import EmployeeUpdate from "./EmployeeUpdate"

function EmployeesList() {
  return (
    <Tabs
      defaultActiveKey="employeeUpdate"
      id="fill-tab-example"
      className="mb-3"
      fill //sizes tabs to fit available space
      unmountOnExit //removes content when entering a different tab
    >
      <Tab eventKey="employeeList" title="Employee List">
        <Employees />
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