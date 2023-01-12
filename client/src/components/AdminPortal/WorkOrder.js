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
  // Add schedule to the schedule model/table
  // _id, streetAddress, suite, city, state, zip, startDate, endDate, startTime, endTime, squareFeet, jobDetails, numberOfClientEmployees, client, employees
  const [businessName, setBusinessName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [numberOfClientEmployees, setNumberOfClientEmployees] = useState("");
  const [client, setClient] = useState("");
  const [employees, setEmployees] = useState("");
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);
  
  // // VALIDATION
  // const [showBusinessNameValidation, setShowBusinessNameValidation] =
  //   useState(false);
  // const [showContactValidation, setShowContactValidation] = useState(false);
  // const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  // const [showEmailClientValidation, setShowEmailClientStateValidation] =
  //   useState(false);
  // const [showStreetAddressValidation, setShowStreetAddressValidation] =
  //   useState(false);
  // const [showSuiteValidation, setShowSuiteValidation] = useState(false);
  // const [showCityValidation, setShowCityValidation] = useState(false);
  // const [showStateValidation, setShowStateValidation] = useState(false);
  // const [showZipValidation, setShowZipValidation] = useState(false);

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
  // _id, businessName, streetAddress, suite, city, state, zip, startDate, endDate, startTime, endTime, squareFeet, jobDetails, numberOfClientEmployees, client, employees
    name === "startDate"
      ? setStartDate(value)
      : name === "endDate"
      ? setEndDate(value)
      : name === "startTime"
      ? setStartTime(value)
      : name === "endTime"
      ? setEndTime(value)
      : name === "squareFeet"
      ? setSquareFeet(value)
      : name === "jobDetails"
      ? setJobDetails(value)
      : name === "numberOfClientEmployees"
      ? setNumberOfClientEmployees(value)
      : name === "client"
      ? setClient(value)
      : name === "employees"
      ? setEmployees(value)
      : name === "streetAddress"
      ? setStreetAddress(value)
      : name === "state"
      ? setState(value)
      : name === "city"
      ? setCity(value)
      : setZip(value);

    return name;
  };

  // If user clicks off an input field without entering text, then validation message "is required" displays
  // businessName, contact, phone, email, streetAddress, suite, city, state, zip
  // const handleBlurChange = (e) => {
  //   const { name, value } = e.target;

  //   name === "businessName" && value.trim() === ""
  //     ? setShowBusinessNameValidation(true)
  //     : setShowBusinessNameValidation(false);
  //   name === "contact" && value.trim() === ""
  //     ? setShowContactValidation(true)
  //     : setShowContactValidation(false);
  //   name === "phone" && value.trim() === ""
  //     ? setShowPhoneValidation(true)
  //     : setShowPhoneValidation(false);
  //   name === "emailClient" && value.trim() === ""
  //     ? setShowEmailClientStateValidation(true)
  //     : setShowEmailClientStateValidation(false);
  //   name === "streetAddress" && value.trim() === ""
  //     ? setShowStreetAddressValidation(true)
  //     : setShowStreetAddressValidation(false);
  //   name === "suite" && value.trim() === ""
  //     ? setShowSuiteValidation(true)
  //     : setShowSuiteValidation(false);
  //   name === "city" && value.trim() === ""
  //     ? setShowCityValidation(true)
  //     : setShowCityValidation(false);
  //   name === "state" && value.trim() === ""
  //     ? setShowStateValidation(true)
  //     : setShowStateValidation(false);
  //   name === "zip" && value.trim() === ""
  //     ? setShowZipValidation(true)
  //     : setShowZipValidation(false);
  // };

  // ADD SCHEDULE ITEM

  //  const [addSchedule] = useMutation(ADD_SCHEDULE);
  const handleAddScheduleSubmit = async (e) => {
    e.preventDefault();
    console.log(streetAddress, suite, city, state, zip, startDate, endDate, startTime, endTime, squareFeet, jobDetails, numberOfClientEmployees, client, employees);

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

  // handleUpdateForDisabled(null, businessName, "addClient");
  };

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
            <Form
              className="py-3 overflow-auto custom-about"
              onSubmit={handleAddScheduleSubmit}
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
                  value={streetAddress}
                  name="streetAddress"
                  // defaultValue={client?.streetAddress}
                  onChange={handleInputChange}
                  // onBlur={handleBlurChange}
                  // required
                />
              </Form.Group>
              <Row className="addy">
                <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                  <Form.Control
                    className="custom-border"
                    placeholder="City"
                    value={city}
                    name="city"
                    // defaultValue={client?.city}
                    onChange={handleInputChange}
                    // onBlur={handleBlurChange}
                    // required
                  />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                  <Form.Control
                    className="custom-border"
                    placeholder="State"
                    value={state}
                    name="state"
                    // defaultValue={client?.state}
                    onChange={handleInputChange}
                    // onBlur={handleBlurChange}
                    // required
                  />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                  <Form.Control
                    className="custom-border"
                    placeholder="Zip"
                    value={zip}
                    name="zip"
                    // defaultValue={client?.zip}
                    onChange={handleInputChange}
                    // onBlur={handleBlurChange}
                    // required
                  />
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
                    <Form.Control
                      className="custom-border"
                      type="date"
                      name="startDate"
                      // defaultValue={client?.startDate}
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      // required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formBasicEmail">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Job End Date
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="date"
                      value={endDate}
                      name="endDate"
                      // defaultValue={client?.endDate}
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      // required
                    />
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
                    <Form.Control
                      className="custom-border"
                      type="time"
                      value={startTime}
                      name="startTime"
                      // defaultValue={client?.startTime}
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      // required
                    />
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
                    value={squareFeet}
                    name="squareFeet"
                    // defaultValue={client?.squareFeet}
                    onChange={handleInputChange}
                    // onBlur={handleBlurChange}
                    // required
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
                      value={numberOfClientEmployees}
                      name="numberOfClientEmployees"
                      // onChange={addEmployee}
                      onChange={handleInputChange}
                    >
                      <option>Select</option>
                      {numberOfEmployees.map((emp, index) => (
                        <option 
                          key={index} 
                          // value={emp}
                        >
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
                  // value={employeeChoice}
                  // name="employeeChoice"
                  // onChange={addEmployee}
                  value="employees"
                  name="employees"
                  onChange={handleInputChange}
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
                  // value={emp}
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
                  // name="body"
                  value={jobDetails}
                  name="jobDetails"
                  onChange={handleInputChange}
                  // required
                />
              </Form.Group>

              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                title="Submit to schedule job."
              >
                Schedule Job
              </Button>
            </Form>
        </Row>
      </div>
    </>
  );
}

export default WorkOrder;
