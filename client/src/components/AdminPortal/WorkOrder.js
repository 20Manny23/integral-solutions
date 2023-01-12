import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_SCHEDULE } from "../../utils/mutations";

import { Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import "../../styles/Forms.css";

function WorkOrder() {
  // const [employeeChoice, setEmployeeChoice] = useState("");
  let employeeChoice = "";
  const demoEmployee = ["Steve", "Rod", "Bryan", "George", "Kirtley"];
  const [demoChoice, setDemoChoice] = useState([]);
  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];
  const [demoNumOfEmp, setDemoNumOfEmp] = useState([]);

  function addEmployee(event) {
    setDemoChoice((demoChoice) => [...demoChoice, event.target.value]);
  }

  function removeEmployee(event) {
    const name = event.target.value;
    for (let i = 0; i < demoChoice.length; i++) {
      if (demoChoice[i] === name) {
        demoChoice.splice(i, 1);
      }
    }
    setDemoChoice(demoChoice);
  }

  // SECTION Add Workorder
  //  const [addSchedule] = useMutation(ADD_SCHEDULE);

  // Add schedule to the schedule model/table
  // const handleAddScheduleSubmit = async (e) => {
  //   e.preventDefault();
  // console.log('hello = ', businessName, streetAddress, suite, city, state, zip, contact, phone, emailClient);
  // resetForm();
  // try {
  //   // eslint-disable-next-line
  //   const { data } = await addClient({
  //     variables: {
  //       businessName,
  //       contact,
  //       phone,
  //       email: emailClient,
  //       streetAddress,
  //       suite,
  //       city,
  //       state,
  //       zip,
  //     },
  //   });
  // } catch (err) {
  //   console.error(err);
  // }

  // await clientsRefetch();

  // resetForm();

  // if ()
  // handleUpdateForDisabled(null, businessName, "addClient");
  // };

  // Reset the add client form after submission
  // const resetForm = () => {
  //   setBusinessName("");
  //   setContact("");
  //   setPhone("");
  //   setEmailClient("");
  //   setStreetAddress("");
  //   setSuite("");
  //   setCity("");
  //   setState("");
  //   setZip("");
  // };

  // If all fields are populated then enable the submit button
  // useEffect(() => {
  //   setAreAllFieldsFilled(
  //     businessName.trim() !== "" &&
  //       contact.trim() !== "" &&
  //       phone.trim() !== "" &&
  //       emailClient.trim() !== "" &&
  //       streetAddress.trim() !== "" &&
  //       suite.trim() !== "" &&
  //       city.trim() !== "" &&
  //       state.trim() !== "" &&
  //       zip.trim() !== ""
  //   );
  //   // console.log(areAllFieldsFilled);
  //   // eslint-disable-next-line
  // }, [
  //   businessName,
  //   contact,
  //   phone,
  //   emailClient,
  //   streetAddress,
  //   suite,
  //   city,
  //   state,
  //   zip,
  // ]);

  // SECTION END ADD CLIENT

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
              <h2 className="display-6 custom-text heading">Work Order</h2>

              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-basic-button"
                  style={{ width: "25%" }}
                >
                  Choose Client
                </Dropdown.Toggle>
                {/* This will map through all clients and populate a list to choose */}
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action What if this is super long
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Address
                  </Form.Label>
                  <Form.Label></Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  placeholder="Enter Address"
                  name="address"
                />
              </Form.Group>
              <Row className="addy">
                <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                  <Form.Control className="custom-border" placeholder="City" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="State" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="Zip" />
                </Col>
              </Row>
              <Row className="addy">
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Job Start Date
                      </Form.Label>
                    </div>
                    <Form.Control className="custom-border" type="date" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Job End Date
                      </Form.Label>
                    </div>
                    <Form.Control className="custom-border" type="date" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    //   className="form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Start Time
                      </Form.Label>
                    </div>
                    <Form.Control className="custom-border" type="time" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="addy">
                <Col xs={5}>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Office Sqft
                  </Form.Label>
                  <Form.Control
                    className="custom-border"
                    placeholder="8000 Sqft"
                  />
                </Col>

                <Col xs={7}>
                  <Form.Group className="form-length">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Number of Employees
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="custom-border"
                      type="text"
                      // value={employeeChoice}
                      name="numberOfClientEmployees"
                      // onChange={addEmployee}
                    >
                      <option>Select</option>
                      {numberOfEmployees.map((emp, index) => (
                        <option key={index} value={emp}>
                          {emp}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                {/* <Col>
                  <Form.Label
                    style={{
                      fontWeight: "bolder",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Number of Employees
                  </Form.Label>
                  <Form.Check inline label="Home Office" />
                  <Form.Check inline label="Less than 50" />
                  <Form.Check inline label="50-100" />
                  <Form.Check inline label="More than 100" />
                </Col> */}
              </Row>

              <Form.Group className="form-length">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Select Employees for Job
                </Form.Label>
                <Form.Control
                  as="select"
                  className="custom-border"
                  type="text"
                  value={employeeChoice}
                  name="employeeChoice"
                  onChange={addEmployee}
                >
                  <option>Select</option>
                  {demoEmployee.map((emp, index) => (
                    <option key={index} value={emp}>
                      {emp}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Creates button when adding employee to job  */}
              {demoChoice.map((emp) => (
                <Button
                  style={{ marginRight: "15px" }}
                  onClick={removeEmployee}
                  value={emp}
                  variant="secondary"
                >
                  {emp}{" "}
                </Button>
              ))}

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <div className="form-label form-length">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Job Details
                  </Form.Label>
                </div>
                <Form.Control
                  style={{
                    width: "60%",
                    marginRight: "auto",
                    marginLeft: "auto",
                  }}
                  className="custom-border"
                  as="textarea"
                  rows={4}
                  type="textarea"
                  placeholder="Enter additional information here."
                  name="body"
                  required
                />
              </Form.Group>

              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                title="Enter all fields to send email"
              >
                Schedule Job
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default WorkOrder;
