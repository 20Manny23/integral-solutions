import React from "react";
import { useState, useEffect } from "react";

import useEmailSend from "../components/EmailSend";

import Footer from "../components/Home/Footer";
import { STATE_DROPDOWN } from "../utils/stateDropdown";
import { NUMBER_OF_EMPLOYEES } from "../utils/numberOfEmployees";

import { Row, Col, Button, Form, Container, Alert } from "react-bootstrap";
import "../styles/Forms.css";

function ContactForm() {
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

  //  validation
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
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);


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

  const [emailContent, setEmailContent] = useState({});
  // eslint-disable-next-line
  const submitEmailContent = useEmailSend(emailContent);

  const handleSubmit = (event) => {
    setErrorMessage("");
    event.preventDefault();

    if (
      !companyName ||
      !contactName ||
      !emailAddress ||
      !startDate ||
      !jobDetails
    ) {
      setErrorMessage("Please fill in all required fields *");
      return;
    }

    if (!state) {
      setErrorMessage("Please choose a state");
      return;
    }

    if (!employeeNumber) {
      setErrorMessage("Please choose a number of employees");
      return;
    }

    if (!services.length) {
      setErrorMessage("Please choose at least one service");
      return;
    }

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

  useEffect(() => {
    setAreAllFieldsFilled(
      companyName.trim() !== "" &&
        contactName.trim() !== "" &&
        phoneNumber.trim() !== "" &&
        emailAddress.trim() !== "" &&
        address.trim() !== "" &&
        // suite.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zip.trim() !== "" &&
        squareFeet.trim() !== "" &&
        employeeNumber.trim() !== "" &&
        startDate.trim() !== "" &&
        jobDetails.trim() !== ""
    );
  }, [
    companyName,
    contactName,
    phoneNumber,
    emailAddress,
    address,
    city,
    state,
    zip,
    squareFeet,
    employeeNumber,
    startDate,
    jobDetails
  ]);

  return (
    <>
      <div
        className=" mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
        style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
      >
        {/* media queries for contact form are in navbar.css */}
        <Container className="">
          {errorMessage && (
            <Alert className="form-alert" variant="danger">
              <p className="error-text">{errorMessage}</p>
            </Alert>
          )}
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

            <Row
              className="addy"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              <Col sm={12} md={5}>
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
              <Col className="margin-expand" style={{ paddingLeft: "0px" }}>
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
                    {NUMBER_OF_EMPLOYEES.map((emp, index) => (
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
                <div
                  key={`inline-${type}`}
                  className="mb-3 d-flex justify-content-around flex-wrap"
                  style={{ textAlign: "left" }}
                >
                  <Form.Check
                    style={{ width: "250px" }}
                    label="Delivery"
                    name="services"
                    value="Delivery"
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={handleChange}
                    onBlur={handleBlurChange}
                  />
                  <Form.Check
                    style={{ width: "250px" }}
                    label="Furniture Installation"
                    name="services"
                    value="Furniture Installation"
                    type={type}
                    id={`inline-${type}-1`}
                    onChange={handleChange}
                  />
                  <Form.Check
                    style={{ width: "250px" }}
                    name="services"
                    label="Cleaning after Installation"
                    value="Cleaning after Installation"
                    type={type}
                    id={`inline-${type}-4`}
                    onChange={handleChange}
                  />
                  <Form.Check
                    style={{ width: "250px" }}
                    label="Moving an Office"
                    name="services"
                    value="Moving an Office"
                    type={type}
                    id={`inline-${type}-2`}
                    onChange={handleChange}
                  />
                  <Form.Check
                    style={{ width: "250px" }}
                    label="Office Reconfiguration"
                    name="services"
                    value="Office Reconfiguration"
                    type={type}
                    id={`inline-${type}-3`}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </Form.Group>
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
              disabled={!areAllFieldsFilled}
            >
              Send Email
            </Button>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
