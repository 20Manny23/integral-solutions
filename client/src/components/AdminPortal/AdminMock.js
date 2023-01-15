import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Employees from "./Employees(Admin)/Employees";
import EmployeeAdd from "./Employees(Admin)/EmployeeAdd"
import EmployeeUpdate from "./Employees(Admin)/EmployeeUpdate"

function AdminMock() {
  return (
    <Tabs
      defaultActiveKey="employeeUpdate"
      id="fill-tab-example"
      className="mb-3"
      fill
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

export default AdminMock;