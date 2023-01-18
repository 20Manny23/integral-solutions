import React from "react";
import { useState, useEffect } from "react";

import Footer from "../components/Home/Footer";
import useEmailSendContactUs from "../components/EmailSendContactUs";

import { STATE_DROPDOWN } from "../utils/stateDropdown";

import { Row, Col, Button, Form, Container, Alert } from "react-bootstrap";
import "../styles/Forms.css";

function ContactForm() {
  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];
  // set error state
  const [errorMessage, setErrorMessage] = useState("");

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
  const [services, setServices] = useState([]);
  const [jobDetails, setJobDetails] = useState("");

  const [ emailContent, setEmailContent ] = useState({});
  const submitEmailContent = useEmailSendContactUs(emailContent);

 // handle input change
  const handleChange = (event) => {
    const { target } = event;
    const name = target.name;
    const value = target.value;

    // set state for check box input
    // if checkbox is checked and services state does not include value then add to services
    if (event.target.checked && !services.includes(value.trim())) {
      setServices([...services, ` ${value}`]); // add spaces to the value for email formatting
      return;
    } else if (!event.target.checked && name === "services") {
      setServices(
        services.filter((service) => value.trim() !== service.trim()) 
      ); // if target is unchecked and it is a services input then don't include in services state
      return;
    };

    //set state for all other inputs
    if (name === "company") {
      setCompanyName(value);
    } else if (name === "name") {
      setContactName(value);
    } else if (name === "telNo") {
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
    } else {
      console.log("error in handle change contact form input");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailContent({ 
      companyName: companyName ? companyName : "null",
      contactName: contactName ? contactName: "null",
      phoneNumber: phoneNumber ? phoneNumber: "null",
      emailAddress: emailAddress ? emailAddress: "null",
      address: address ? address : "null",
      city: city ? city : "null",
      state: state ? state : "null",
      zip: zip ? zip : "null",
      squareFeet: squareFeet ? squareFeet : "null",
      employeeNumber: employeeNumber ? employeeNumber : "null",
      startDate: startDate ? startDate : "null",
      jobDetails: jobDetails ? jobDetails : "null",
      services: services ? services : "null",
    });

    // console.log(services)
    //fix
    // if (
    //   !companyName ||
    //   !contactName ||
    //   !emailAddress ||
    //   !startDate ||
    //   !jobDetails
    // ) {
    //   setErrorMessage("Please fill in all required fields *");
    //   return;
    // }

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
    setServices([]);
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
                onSubmit={handleSubmit}
              >
                <Form.Group
                  className="mb-3 form-length"
                  controlId="formBasicEmail"
                >
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Company Name &nbsp;<span className="text-danger">*</span>
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
                      Contact Name &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="text"
                    placeholder="Enter Contact Name"
                    name="name"
                    onChange={handleChange}
                    // required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 form-length"
                  controlId="formBasicEmail"
                >
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Email Address &nbsp;<span className="text-danger">*</span>
                    </Form.Label>
                  </div>

                  <Form.Control
                    className="custom-border"
                    type="email"
                    placeholder="Enter Email"
                    name="email"
                    onChange={handleChange}
                    // required
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
                      {STATE_DROPDOWN.map((st, index) => (
                        <option key={index}>{st}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <Form.Label
                      style={{ fontWeight: "bolder", align: "right" }}
                    >
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
                  <Col
                    xs={6}
                    style={{ marginRight: "auto", marginLeft: "auto" }}
                  >
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
                      >
                        <option>Select</option>
                        {numberOfEmployees.map((emp, index) => (
                          <option key={index}>{emp}</option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between">
                  <Form.Group
                    className="form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Estimated Date for Work to be Scheduled &nbsp;
                        <span className="text-danger">*</span>
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="date"
                      name="startDate"
                      onChange={handleChange}
                      // required
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
                        label="Delivery"
                        name="services"
                        value="Delivery"
                        type={type}
                        id={`inline-${type}-1`}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Furniture Installation"
                        name="services"
                        value="Furniture Installation"
                        type={type}
                        id={`inline-${type}-1`}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Moving an Office"
                        name="services"
                        value="Moving an Office"
                        type={type}
                        id={`inline-${type}-2`}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="Office Reconfiguration"
                        name="services"
                        value="Office Reconfiguration"
                        type={type}
                        id={`inline-${type}-3`}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        name="services"
                        label="Cleaning after Installation"
                        value="Cleaning after Installation"
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
                      Job Details &nbsp;<span className="text-danger">*</span>
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
                    // required
                  />
                </Form.Group>

                <Button
                  className="button-custom submit-button-style"
                  variant="primary"
                  type="submit"
                  title="Enter all fields to send email"
                >
                  Send Email
                </Button>
              </Form>
              {errorMessage && (
                <Alert className="form-alert" variant="danger">
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
