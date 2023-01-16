import React from "react";
import { useState } from "react";

import { STATE_DROPDOWN } from "../utils/stateDropdown";

import { Row, Col, Button, Form, Container, Alert } from "react-bootstrap";
import "../styles/Forms.css";
import Footer from "../components/Home/Footer";

function ContactForm() {
  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];
  // set error state
  const [ errorMessage, setErrorMessage ] = useState("");
 
  // set state for form inputs
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [services, setServices] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  

  const handleChange = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;

   if(name === "company") {
      setCompanyName(value);
    } else if(name === "name") {
      setContactName(value);
    } else if(name === "telNo") {
      setPhoneNumber(value);
    } else if (name === "email") {
      setEmailAddress(value);
    } else if (name === "address") {
      setAddress(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "state") {
      setState(value);
    } else if (name === "zip") {
      setZip(value);
    } else if (name === "squareFeet") {
      setSquareFeet(value);
    } else if (name === "employeeNumber") {
      setEmployeeNumber(value);
    } else if (name === "startDate") {
      setStartDate(value);
    } else if (name === "body") {
      setJobDetails(value);
    } else if (name === "group1") {
      setServices(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!companyName || !contactName || !emailAddress || !startDate || !jobDetails) {
      setErrorMessage("Please fill in all required fields *");
      return;
    }

    if(contactName && emailAddress) {
      launchEmail()
  }
  // set state back to empty form
  setCompanyName("");
  setContactName("");
  setPhoneNumber("");
  setEmailAddress("");
  setAddress("");
  setCity("");
  setState("");
  setZip("");
  setSquareFeet("");
  setEmployeeNumber("");
  setStartDate("");
  setJobDetails("");
  setServices("");
  };

  const launchEmail = () => {
    console.log(contactName, emailAddress, jobDetails);
    window.open(
      `mailto:rod.bennett75@gmail.com?subject=Work Order&&body=Company Name=${companyName} %0D%0A%0D%0A Email Address=${emailAddress} %0D%0A%0D%0A City=${city} %0D%0A%0D%0A Contact Name=${contactName} %0D%0A%0D%0A Phone Number=${phoneNumber} %0D%0A%0D%0A Address=${address} %0D%0A%0D%0A State=${state} ${zip} %0D%0A%0D%0A Square Feet=${squareFeet} %0D%0A%0D%0A Employee Number=${employeeNumber} %0D%0A%0D%0A Start Date=${startDate} %0D%0A%0D%0A Services Needed=${services} %0D%0A%0D%0A Job Details=${jobDetails}`
    );
    return false;
  };

    return (
      <>
        <div
          className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
          style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
        >
          {/* media queries for contact form are in navbar.css */}
          <Container className="contact-form">
            <Row>
              <Col>
                <Form
                  className="py-3 overflow-auto custom-about"
                  style={{ width: "80vw" }}
                  action="mailto:bhoff1980@gmail.com"
                >
                  <h2
                    className="display-6 custom-text heading"
                    style={{ fontStyle: "italic" }}
                  >
                    How Can We Help?
                  </h2>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Company Name &nbsp;<span class="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Company Name"
                      name="company"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Contact Name &nbsp;<span class="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Contact Name"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Email Address &nbsp;<span class="text-danger">*</span>
                      </Form.Label>
                    </div>

                    <Form.Control
                      className="custom-border"
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      onChange={handleChange}
                      required
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
                      placeholder="Enter phone 123-456-7890"
                      name="telNo"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      onChange={handleChange}
                    />
                  </Form.Group>

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
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Row className="addy">
                    <Col sm={12} md={5} style={{ paddingBottom: "15px" }}>
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        City
                      </Form.Label>
                      <Form.Control
                        className="custom-border"
                        placeholder="City"
                        name="city"
                        onChange={handleChange}
                      
                      />
                    </Col>

                    <Col style={{ marginRight: "auto", marginLeft: "auto" }}>
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        State
                      </Form.Label>
                      <Form.Control
                        as={"select"}
                        name="state"
                        className="custom-border"
                        placeholder="State"
                        style={{ maxWidth: "150px" }}
                        onChange={handleChange}
                      
                      >
                        <option>Select</option>
                        {STATE_DROPDOWN.map((st) => (
                          <option>{st}</option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col style={{ marginRight: "auto", marginLeft: "auto" }}>
                      <Form.Label style={{ fontWeight: "bolder", align: "right" }}>
                        Zipcode
                      </Form.Label>
                      <Form.Control
                        className="custom-border"
                        style={{ maxWidth: "150px" }}
                        placeholder="Zip"
                        name="zip"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>

                  <Row className="addy">
                    <Col xs={6} style={{ marginRight: "auto", marginLeft: "auto" }}>
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Office Sqft
                      </Form.Label>
                      <Form.Control
                        className="custom-border"
                        placeholder="8000 Sqft"
                        name="squareFeet"
                        onChange={handleChange}
                      />
                    </Col>
                    {/* <Form.Group> */}
                    {/* <Col xs={12} md={6}> */}
                    <Col>
                      <Form.Label
                        style={{
                          fontWeight: "bolder",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        # of Employees
                      </Form.Label>
                      {/* <Col xs={12}> */}
                      <Col>
                        {/* <Form.Label
                      className={`validation-color ${
                        showNumberOfClientEmployeesValidation ? "show" : "hide"
                      }`}
                    >
                      *required
                    </Form.Label> */}
                        <Form.Control
                          as="select"
                          className="custom-border"
                          type="text"
                          name="employeeNumber"
                          onChange={handleChange}
                        // value={numberOfClientEmployees}
                        // name="numberOfClientEmployees"
                        // onChange={handleInputChange}
                        >
                          <option>Select</option>
                          {numberOfEmployees.map((emp, index) => (
                            <option
                              key={index}
                            >
                              {emp}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between">
                    <Form.Group className="form-length" controlId="formBasicEmail">
                      <div className="form-label">
                        <Form.Label style={{ fontWeight: "bolder" }}>
                          Estimated Date for Work to be Scheduled &nbsp;<span class="text-danger">*</span>
                        </Form.Label>
                      </div>
                      <Form.Control
                        className="custom-border"
                        type="date"
                        name="startDate"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "bolder",
                        
                      }}
                    >
                      Services Needed 
                    </Form.Label>
                    {["checkbox"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Delivery "
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          label="Furniture Installation "
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          onChange={handleChange}

                        />
                        <Form.Check
                          inline
                          label="Moving an Office "
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}                          
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          label="Office Reconfiguration "
                          name="group1"
                          type={type}
                          id={`inline-${type}-3`}
                          onChange={handleChange}

                        />
                        <Form.Check
                          inline
                          name="group1"
                          label="Cleaning after Installation "
                          type={type}
                          id={`inline-${type}-4`}
                          onChange={handleChange}

                        />
                      </div>
                    ))}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicMessage">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Job Details &nbsp;<span class="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Enter additional information here."
                      name="body"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button
                    className="button-custom submit-button-style"
                    variant="primary"
                    type="submit"
                    title="Enter all fields to send email"
                    onClick={handleSubmit}
                  >
                    Send Email
                  </Button>
                </Form>
                {errorMessage && (
                  <Alert
                  className="form-alert"
                  variant="danger"
                  >
                    <p className="error-text">{errorMessage}</p>
                  </Alert>
                )}
              </Col>
            </Row>
          </Container>
        </div>

        <Footer />
      </>
    );
  }

export default ContactForm;
