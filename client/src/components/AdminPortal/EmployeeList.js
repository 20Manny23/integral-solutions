import React, { useState } from "react";
import { Row, Col, Button, Form, Collapse, Container } from "react-bootstrap";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../utils/queries";
import "../../styles/Forms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmployeeList() {
  const demoEmployee = ["Bryan", "Steve", "Rod", "George", "Kirtley"];

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openClient, setOpenClient] = useState(false);

  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  const getElement = (event) => {
    let currentCollapseTarget = event.currentTarget.getAttribute("data-target");
    let currentCollapseTable = document.getElementById(currentCollapseTarget);
    // console.log(currentAvailTarget);

    if (currentCollapseTable.classList.contains("show")) {
      currentCollapseTable.classList.remove("show");
      setOpenClient(false);
    } else {
      currentCollapseTable.classList.add("show");
      setOpenClient(true);
    }
  };
  const [adminToggle, setAdminToggle] = useState(true);
  const [lockedToggle, setLockedToggle] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleToggle = (toggle) => {
    toggle === "admin"
      ? setAdminToggle(!adminToggle)
      : setLockedToggle(!lockedToggle);

    // if (showHidePassword === "password") {
    //   setShowHidePassword("test");
    // } else {
    //   setShowHidePassword("password");
    // }
  };

  function trash (){
    let deleteConfirm = prompt("Are you sure you want to delete employee? Type Yes to Delete");
    if(deleteConfirm === 'Yes'){
      // delete logic here 
    }
    else{

    }
  }
  return (
    <>
      <div
        // className=" pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
        style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
      >
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
            >
              {/* <h2 className="display-6 custom-text heading">Add Employee</h2> */}
             
              <Collapse in={open} className='shadow rounded-lg border border-secondary'>
                <div id="collapse-text ">
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
        className="pb-2 d-flex flex-column align-self-center shadow rounded-lg border border-secondary"
        style={{ marginBottom: "20px", marginTop:'-20px' }}
      >
        <div className="d-flex justify-content-between">
          <h3 style={{ textAlign: "center" }}>Employee List</h3>
          
            <button style={{marginBottom:'25px', border:'none', backgroundColor:'white'}}
           
              className="p-2"
              onClick={() => setOpen(!open)}
              >Add New ➕</button>
          
        </div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {emp?.employees?.map((emp, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black", display: "flex", justifyContent: "space-between" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-employee-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-employee-${index}`}
                    >
                      {emp?.firstName} {emp?.lastName}
                    </button>
                  </h5>
                  <div className="mr-2" style={{ display: "flex"}}>
                  <span style={{paddingTop:'5px'}}>Edit</span>
                  {/* <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-employee-${index}`}
                      aria-expanded={openDetails}
                      style={{border:'none', backgroundColor:'white'}}
                      data-target={`#collapse-employee-${index}`} */}
                    <FontAwesomeIcon
                    icon="fa-pencil "
                    className="p-2 fa-lg"
                    
                    // onClick={() => handlePassClick()}
                    // style={display ? isDisplayed : isNotDisplayed}
                  />
                      
                    {/* </button> */}
                    {/* <FontAwesomeIcon
                      icon="fa-pencil "
                      className="p-2 fa-lg"
                      onClick={() => console.log("pencil")}
                      onClick={() => handlePassClick()}
                      style={display ? isDisplayed : isNotDisplayed}
                    /> */}
                    {/* ADMIN TOGGLE */}
                    <span style={{paddingTop:'5px'}}>Admin</span>
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2 fa-lg"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("admin")}
                      style={adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2 fa-lg"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("admin")}
                      style={!adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    {/* LOCKED TOGGLE */}
                    <span style={{paddingTop:'5px'}}>Active</span>
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2 fa-lg up-10"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("locked")}
                      style={lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                     className="fa-layers fa-fw p-2 fa-lg up-5" icon="fa-toggle-off"
                      
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("locked")}
                      style={!lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <button onClick={trash} style={{backgroundColor:'white', border:'none'}}>
                    <FontAwesomeIcon
                      icon="fa-trash"
                       className="p-2 fa-lg"
                      
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    /></button>
                  </div>
                </div>

                <Collapse>
                  <div id={`#collapse-employee-${index}`}>
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

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
