import React, { useState } from "react";
import { Row, Col, Button, Form, Collapse, Container } from "react-bootstrap";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES} from "../../utils/queries";
import "../../styles/Forms.css";

function EmployeeList() {
  const demoEmployee = ["Bryan", "Steve", "Rod", "George", "Kirtley"];

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    let currentAvailTable = document.getElementById(currentAvailTarget);
    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenEmployee(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenEmployee(true);
    }
  };
  return (
    <>
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
        style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
      >
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
            >
              {/* <h2 className="display-6 custom-text heading">Add Employee</h2> */}
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Add New Employee
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Employee Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Employee Name"
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Phone Number
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="tel"
                      placeholder="ex 555-555-5555"
                      name="telNo"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Email Address
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Email Address"
                      name="name"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Password
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="email"
                      placeholder="Setup Employee Password"
                      name="email"
                    />
                  </Form.Group>
                  <Button
                    className="button-custom submit-button-style"
                    variant="primary"
                    type="submit"
                    title="Enter all fields to send email"
                  >
                    Add
                  </Button>
                </div>
              </Collapse>
            </Form>
          </Col>
        </Row>
      </div>

      <Container
        className="mx-3 pb-2 d-flex flex-column align-self-center shadow rounded-lg border border-secondary"
        style={{ margin: "20px 0px 20px 0px" }}
      >
        <h3 style={{textAlign:'center'}}>Employee List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {emp?.employees?.map((emp, index) => (
            <div id="accordion" key={index} style={{ width: "100%", display:'inline-block' }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black", display:'inline-block' }}
                >
                  <h5 className="mb-0 text-left" >
                    <button
                      className="btn btn-link pl-1"
                      onClick={(event) => getElement(event)}
                      aria-controls={`collapse-${index}`}
                      aria-expanded={open2}
                      data-target={`#collapseTarget-${index}`}
                      
                    >
                      {emp?.firstName} {emp?.lastName}
                    </button>
                  
                  </h5>
                  <button style={{display:'inline-block'}}>
                    Edit Info
                  </button>
                  <Form>
                
                     {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Admin "
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Active Employee"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    
                    </div>
                     ))}
                  </Form>
                
                  
                </div>

                <Collapse >
                  <div id={`#collapseTarget-${index}`}>
                    <div>Email: {emp?.email}</div>
                    <div>username: {emp?.username}</div>
                    <div>Phone: {emp?.phone}</div>
                    <div>isAdmin: {emp?.isAdmin ? "True" : "False"}</div>
                    <div>isLocked: {emp?.isLocked ? "True" : "False"}</div>
                    {emp?.schedule.map((job, index) => (
                      <>
                        <div>Client: {job?.client.businessName}</div>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>
                          Number of Clients: {job?.numberOfClientEmployees}
                        </div>
                      </>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default EmployeeList;
