import React from "react";
import { useState } from "react";

import useEmailSend from "../components/EmailSend";

import Footer from "../components/Home/Footer";
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

  // handle input change
  // VALIDATION
  const [showCompanyNameValidation, setShowCompanyNameValidation] =
    useState("");
  const [showContactNameValidation, setShowContactNameValidation] =
    useState("");
  const [showPhoneNumberValidation, setShowPhoneNumberValidation] =
    useState("");
  const [showEmailAddressValidation, setShowEmailAddressValidation] =
    useState("");
  const [showAddressValidation, setShowAddressValidation] = useState("");
  const [showCityValidation, setShowCityValidation] = useState("");
  const [showStateValidation, setShowStateValidation] = useState("");
  const [showZipValidation, setShowZipValidation] = useState("");
  const [showSquareFeetValidation, setShowSquareFeetValidation] = useState("");
  const [showEmployeeNumberValidation, setShowEmployeeNumberValidation] =
    useState("");
  const [showStartDateValidation, setShowStartDateValidation] = useState("");
  const [showServicesValidation, setShowServicesValidation] = useState("");
  const [showJobDetailsValidation, setShowJobDetailsValidation] = useState("");

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
    }

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

  // VALIDATION BLUR
  const handleBlurChange = (event) => {
    const { name, value } = event.target;

    name === "company" && value.trim() === ""
      ? setShowCompanyNameValidation(true)
      : setShowCompanyNameValidation(false);
    name === "name" && value.trim() === ""
      ? setShowContactNameValidation(true)
      : setShowContactNameValidation(false);
    name === "email" && value.trim() === ""
      ? setShowEmailAddressValidation(true)
      : setShowEmailAddressValidation(false);
    name === "telNo" && value.trim() === ""
      ? setShowPhoneNumberValidation(true)
      : setShowPhoneNumberValidation(false);
    name === "address" && value.trim() === ""
      ? setShowAddressValidation(true)
      : setShowAddressValidation(false);
    name === "city" && value.trim() === ""
      ? setShowCityValidation(true)
      : setShowCityValidation(false);
    name === "state" && value.trim() === ""
      ? setShowStateValidation(true)
      : setShowStateValidation(false);
    name === "zip" && value.trim() === ""
      ? setShowZipValidation(true)
      : setShowZipValidation(false);
    name === "squareFeet" && value.trim() === ""
      ? setShowSquareFeetValidation(true)
      : setShowSquareFeetValidation(false);
    name === "employeeNumber" && value.trim() === ""
      ? setShowEmployeeNumberValidation(true)
      : setShowEmployeeNumberValidation(false);
    name === "startDate" && value.trim() === ""
      ? setShowStartDateValidation(true)
      : setShowStartDateValidation(false);
    name === "services" && value.trim() === ""
      ? setShowServicesValidation(true)
      : setShowServicesValidation(false);
    name === "body" && value.trim() === ""
      ? setShowJobDetailsValidation(true)
      : setShowJobDetailsValidation(false);
  };

  //section
  const [emailContent, setEmailContent] = useState({});
  // const submitEmailContent = useEmailSendContactUs(emailContent);
  // eslint-disable-next-line
  const submitEmailContent = useEmailSend(emailContent);
  console.log("submit 4 = ", emailContent);
  //section

  const handleSubmit = (event) => {
    setErrorMessage("");
    event.preventDefault();

    console.log("submit 1");

    // console.log("handlesubmit");

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

    // if (!state) {
    //   setErrorMessage("Please choose a state");
    //   return;
    // }

    // if (!employeeNumber) {
    //   setErrorMessage("Please choose a number of employees");
    //   return;
    // }

    // if (!services.length) {
    //   setErrorMessage("Please choose at least one service");
    //   return;
    // }

    setEmailContent({
      source: "contactUs",
      companyName: companyName ? companyName : "null",
      contactName: contactName ? contactName : "null",
      phoneNumber: phoneNumber ? phoneNumber : "null",
      emailAddress: emailAddress ? emailAddress : "null",
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

    // console.log('submit 2 = ', emailContent);

    // set state back to empty form
    // setCompanyName("");
    // setContactName("");
    // setPhoneNumber("");
    // setEmailAddress("");
    // setAddress("");
    // setCity("");
    // setState("");
    // setZip("");
    // setSquareFeet("");
    // setEmployeeNumber("");
    // setStartDate("");
    // setJobDetails("");
    // setServices([]);
  };

  return (
    <>
      <div
        className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
        style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
      >
        {/* media queries for contact form are in navbar.css */}
        <Container className="">
          <Form
            className="py-3 overflow-auto custom-about"
            onSubmit={handleSubmit}
          >
            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Company Name
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showCompanyNameValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="text"
                placeholder="Enter Company Name"
                name="company"
                onChange={handleChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Contact Name
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showContactNameValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>

              <Form.Control
                className="custom-border"
                type="text"
                placeholder="Enter Contact Name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Email Address
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showEmailAddressValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>

              <Form.Control
                className="custom-border"
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Phone Number
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showPhoneNumberValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="tel"
                placeholder="Enter phone 123-456-7890"
                name="telNo"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={handleChange}
                onBlur={handleBlurChange}
              />
            </Form.Group>

            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Address
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showAddressValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                placeholder="Enter Address"
                name="address"
                onChange={handleChange}
                onBlur={handleBlurChange}
              />
            </Form.Group>

            {/* section */}
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>

            {/* section */}

            <Row className="addy">
              <Col sm={12} md={5} style={{ paddingBottom: "15px" }}>
                <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showCityValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="City"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlurChange}
                />
              </Col>

              <Col style={{ marginRight: "auto", marginLeft: "auto" }}>
                <Form.Label style={{ fontWeight: "bolder" }}>State</Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showStateValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
                <Form.Control
                  as={"select"}
                  name="state"
                  className="custom-border"
                  placeholder="State"
                  // style={{ maxWidth: "150px" }}
                  onChange={handleChange}
                  onBlur={handleBlurChange}
                  required
                >
                  <option>Select</option>
                  {STATE_DROPDOWN.map((st, index) => (
                    <option key={index}>{st}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Label style={{ fontWeight: "bolder", align: "right" }}>
                  Zipcode
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showZipValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  // style={{ maxWidth: "150px" }}
                  placeholder="Zip"
                  name="zip"
                  onChange={handleChange}
                  onBlur={handleBlurChange}
                />
              </Col>
            </Row>

            <Row className="addy">
              <Col xs={6} style={{ marginRight: "auto", marginLeft: "auto" }}>
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Office Sqft
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showSquareFeetValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="8000 Sqft"
                  name="squareFeet"
                  onChange={handleChange}
                  onBlur={handleBlurChange}
                />
              </Col>
              {/* <Form.Group> */}
              {/* <Col xs={12} md={6}> */}
              <Col className="margin-expand">
                <Form.Label
                  style={{
                    fontWeight: "bolder",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  # of Employees
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showEmployeeNumberValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
                <Col>
                  <Form.Control
                    as="select"
                    className="custom-border"
                    type="text"
                    name="employeeNumber"
                    onChange={handleChange}
                    onBlur={handleBlurChange}
                    required
                  >
                    <option>Select</option>
                    {numberOfEmployees.map((emp, index) => (
                      <option key={index}>{emp}</option>
                    ))}
                  </Form.Control>
                </Col>
              </Col>
            </Row>

            <Form.Group className="form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Requested Completion Date
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showStartDateValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="date"
                name="startDate"
                onChange={handleChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group
              className="mb-3 form-length"
              controlId="formBasicCompletionDate"
            >
              <div className="form-label">
                <Form.Label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Services Needed
                </Form.Label>
              </div>
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
                    onBlur={handleBlurChange}
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

            {/* <Form.Group 
                  className="mb-3" 
                  controlId="formBasicName"
                  >
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
                        onBlur={handleBlurChange}
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
                </Form.Group> */}

            {/* <Form.Group className="mb-3" controlId="formBasicMessage">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Job Details
                    </Form.Label>
                    <Form.Label
                      className={`text-danger ${
                        showJobDetailsValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
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
                    onBlur={handleBlurChange}
                    required
                  />
                </Form.Group> */}

            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Job Details
                </Form.Label>
                <Form.Label
                  className={`text-danger ${
                    showJobDetailsValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
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
                onBlur={handleBlurChange}
                required
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
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
