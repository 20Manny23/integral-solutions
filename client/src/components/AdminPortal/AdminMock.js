import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES, QUERY_ALL_CLIENTS, QUERY_SCHEDULE } from "../../utils/queries";
import { ADD_CLIENT } from "../../utils/mutations";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Contact.css";
import "../../styles/button-style.css";

function AdminMock() {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  // const [openEmployee, setOpenEmployee] = useState(false);
  // const [open2, setOpen2] = useState(false);

  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);
  console.log(emp);

  // SECTION START CLIENT
  // eslint-disable-next-line
  const { loading: clientLoad, data: clients, error: clientError, refetch: clientRefetch } = useQuery(QUERY_ALL_CLIENTS);
  console.log(clients);

  // GET CLIENT FORM DATA
  // businessName, streetAddress, suite, city, state, zip, contact, phone, email
  const [businessName, setBusinessName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [emailClient, setEmailClient] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

  // VALIDATION
  const [showBusinessNameValidation, setShowBusinessNameValidation] = useState(false);
  const [showContactValidation, setShowContactValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailClientValidation, setShowEmailClientStateValidation] = useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] = useState(false);
  // const [showSuiteValidation, setShowSuiteValidation] = useState(false);
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    // businessName, streetAddress, suite, city, state, zip, contact, phone, email
    name === "businessName"
      ? setBusinessName(value)
      : name === "contact"
      ? setContact(value)
      : name === "phone"
      ? setPhone(value)
      : name === "emailClient"
      ? setEmailClient(value)
      : name === "streetAddress"
      ? setStreetAddress(value)
      : name === "suite"
      ? setSuite(value)
      : name === "city"
      ? setCity(value)
      : name === "state"
      ? setState(value)
      : setZip(value)

    console.log('email = ', emailClient);

    return name;
  };

  // If user clicks off an input field without entering text, then validation message "is required" displays
  // businessName, contact, phone, email, streetAddress, suite, city, state, zip
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "businessName" && value.trim() === ""
      ? setShowBusinessNameValidation(true)
      : setShowBusinessNameValidation(false);
    name === "contact" && value.trim() === ""
      ? setShowContactValidation(true)
      : setShowContactValidation(false);
    name === "phone" && value.trim() === ""
      ? setShowPhoneValidation(true)
      : setShowPhoneValidation(false);
    name === "emailClient" && value.trim() === ""
      ? setShowEmailClientStateValidation(true)
      : setShowEmailClientStateValidation(false);
    name === "streetAddress" && value.trim() === ""
      ? setShowStreetAddressValidation(true)
      : setShowStreetAddressValidation(false);
    // name === "suite" && value.trim() === ""
    //   ? setShowSuiteValidation(true)
    //   : setShowSuiteValidation(false);
    name === "city" && value.trim() === ""
      ? setShowCityValidation(true)
      : setShowCityValidation(false);
    name === "state" && value.trim() === ""
      ? setShowStateValidation(true)
      : setShowStateValidation(false);
    name === "zip" && value.trim() === ""
      ? setShowZipValidation(true)
      : setShowZipValidation(false);
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      businessName.trim() !== "" 
      &&  contact.trim() !== "" 
      && phone.trim() !== "" 
      && emailClient.trim() !== ""
      && streetAddress.trim() !== "" 
      // && suite.trim() !== "" 
      && city.trim() !== "" 
      && state.trim() !== "" 
      && zip.trim() !== "" 
    );
  console.log(areAllFieldsFilled);
  // eslint-disable-next-line
  }, [
    businessName,
    contact,
    phone,
    emailClient,
    streetAddress,
    suite,
    city,
    state,
    zip,
  ]);

  // ADD CLIENT

  const [addClient] = useMutation(ADD_CLIENT);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('hello = ', businessName, streetAddress, suite, city, state, zip, contact, phone, emailClient);
    // resetForm();
    try {
      // eslint-disable-next-line
      const { data } = addClient({
        variables: {
          businessName,
          contact,
          phone, 
          email: emailClient,
          streetAddress,
          // suite, 
          city, 
          state, 
          zip, 
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE CLIENT

  // DELETE CLIENT

  // SECTION END CLIENT

  // eslint-disable-next-line
  const {
    loading: scheduleLoad,
    data: schedule,
    error: scheduleError,
    refetch: scheduleRefetch,
  } = useQuery(QUERY_SCHEDULE);
  console.log(schedule);

  // collapse show / not show detail
  const getElement = (event) => {
    let currentCollapseTarget = event.currentTarget.getAttribute("data-target");
    let currentCollapseTable = document.getElementById(currentCollapseTarget);
    // console.log(currentAvailTarget);

    if (currentCollapseTable.classList.contains("show")) {
      currentCollapseTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentCollapseTable.classList.add("show");
      setOpenDetails(true);
    }
  };

  // toggle
  const [adminToggle, setAdminToggle] = useState(true);
  const [lockedToggle, setLockedToggle] = useState(false);
  // const [showHidePassword, setShowHidePassword] = useState("password");

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

  return (
    <>
      {/* section start employee list */}
      <Container style={{ border: "1px solid black" }}>
        <div className="d-flex justify-content-between">
          <h3>Employee List</h3>
          <FontAwesomeIcon
            icon="fa-add"
            className="p-2"
            onClick={() => console.log("add")}
            // onClick={() => handlePassClick()}
            // style={display ? isDisplayed : isNotDisplayed}
          />
        </div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {emp?.employees?.map((emp, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
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
                  <div className="mr-2" style={{ display: "flex" }}>
                    <FontAwesomeIcon
                      icon="fa-add"
                      className="p-2"
                      onClick={() => console.log("pencil")}
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-pencil"
                      className="p-2"
                      onClick={() => console.log("pencil")}
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    />
                    {/* ADMIN TOGGLE */}
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("admin")}
                      style={adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("admin")}
                      style={!adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    {/* LOCKED TOGGLE */}
                    <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("locked")}
                      style={lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("locked")}
                      style={!lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2"
                      // onClick={() => console.log("trash")}
                      // onClick={() => handlePassClick()}
                      // style={display ? isDisplayed : isNotDisplayed}
                    />
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
                      <div key={index}>
                        <div>Client: {job?.client.businessName}</div>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>
                          Number of Clients: {job?.numberOfClientEmployees}
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
      {/* section end employee list */}

      {/* section start client list */}
      <Container style={{ border: "1px solid black" }}>
        <h3>Client List</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {clients?.clients?.map((client, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      //section
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-client-${index}`}
                      //section
                    >
                      {client?.businessName}
                    </button>
                  </h5>
                </div>

                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <div>Contact Name: {client?.contact}</div>
                    <div>Phone: {client?.phone}</div>
                    <div>Email: {client?.email}</div>
                    <div>Address: {client?.streetAddress}</div>
                    <div>Suite: {client?.suite}</div>
                    <div>City: {client?.city}</div>
                    <div>State: {client?.state}</div>
                    <div>Zip: {client?.zip}</div>
                    {client?.schedule.map((job, index) => (
                      <div key={index}>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>
                          Number of Clients: {job?.numberOfClientEmployees}
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
      {/* section end client list */}

      {/* section start client form */}
      <Container style={{ border: "1px solid black" }}>
        <div className="d-flex justify-content-between">
          <h3>Client List</h3>
          <FontAwesomeIcon
            icon="fa-add"
            className="p-2"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            title="Add new client"
            transform="grow-10"
            alt="Add a new client"
          />
        </div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Form
            className="py-3 overflow-auto custom-about"
            onSubmit={handleFormSubmit}
            style={{ width: "80vw" }}
          >
            <Collapse in={open}>
            {/* <Collapse> */}
              <div id="example-collapse-text">
                <Form.Group
                  className="mb-3 form-length"
                  controlId="formBasicEmail"
                >
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Company Name
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showBusinessNameValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="text"
                    placeholder="Enter Company Name"
                    name="businessName"
                    defaultValue="test"
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 form-length"
                  controlId="formBasicEmail"
                >
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Contact Name
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showContactValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="text"
                    placeholder="Enter Contact Person"
                    name="contact"
                    defaultValue="test contact"
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
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
                    <Form.Label
                      className={`validation-color ${
                        showPhoneValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="tel"
                    placeholder="example: 123-456-7899"
                    name="phone"
                    defaultValue="123-456-7899"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 form-length"
                  controlId="formBasicEmail"
                >
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Email
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showEmailClientValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="email"
                    placeholder="Client Email"
                    name="emailClient"
                    defaultValue="test@test.com"
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    required
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
                    <Form.Label
                      className={`validation-color ${
                        showStreetAddressValidation ? "show" : "hide"
                      }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    placeholder="Enter Address"
                    name="streetAddress"
                    defaultValue="test address"
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    required
                  />
                </Form.Group>

                <Row className="addy">
                  <Col xs={6}>
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      City
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showCityValidation ? "show" : "hide"
                      }`}
                    >
                      * required
                    </Form.Label>
                    <Form.Control
                      className="custom-border"
                      placeholder="City"
                      name="city"
                      defaultValue="test city"
                      onChange={handleInputChange}
                      onBlur={handleBlurChange}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      State
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showStateValidation ? "show" : "hide"
                      }`}
                    >
                      * required
                    </Form.Label>
                    <Form.Control
                      className="custom-border"
                      placeholder="State"
                      name="state"
                      defaultValue="CO"
                      onChange={handleInputChange}
                      onBlur={handleBlurChange}
                      required
                    />
                  </Col>
                  <Col>
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Zipcode
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showZipValidation ? "show" : "hide"
                      }`}
                    >
                      * required
                    </Form.Label>
                    <Form.Control
                      className="custom-border"
                      placeholder="Zip"
                      name="zip"
                      defaultValue="07801"
                      onChange={handleInputChange}
                      onBlur={handleBlurChange}
                      required
                    />
                  </Col>
                </Row>
                <div className="d-flex justify-content-center">
                  <Button
                    className="submit-button-style"
                    variant="primary"
                    type="submit"
                    disabled={!areAllFieldsFilled}
                    title="Enter all fields to add a new client"
                  >
                    Add Client
                  </Button>
                </div>
              </div>
            </Collapse>
          </Form>
          {/* </section> */}
        </Row>
      </Container>
      {/* section end client form */}

      {/* section start work order list */}
      <Container style={{ border: "1px solid black" }}>
        <h3>Schedule</h3>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {schedule?.schedules?.map((job, index) => (
            <div id="accordion" key={index} style={{ width: "100%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{ color: "black" }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      // //section
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-schedule-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-schedule-${index}`}
                      //section
                    >
                      {job?.client.businessName}
                    </button>
                  </h5>
                </div>

                {/* <Collapse in={open}> */}
                <Collapse>
                  <div id={`#collapse-schedule-${index}`}>
                    <div>Contact Name: {job?.client.contact}</div>
                    <div>Phone: {job?.client.phone}</div>
                    <div>Email: {job?.client.email}</div>
                    <div>Address: {job?.client.streetAddress}</div>
                    <div>Suite: {job?.client.suite}</div>
                    <div>City: {job?.client.city}</div>
                    <div>State: {job?.client.state}</div>
                    <div>Zip: {job?.client.zip}</div>
                    <div>Start Date: {job?.startDate}</div>
                    <div>Start Time: {job?.startTime}</div>
                    <div>End Date: {job?.endDate}</div>
                    <div>Job Details: {job?.jobDetails}</div>
                    <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                    {job?.employees.map((employee, index) => (
                      <div key={index}>
                        <div>First Name: {employee?.firstName}</div>
                        <div>Last Name: {employee?.lastName}</div>
                        <div>Email: {employee?.email}</div>
                        <div>Phone: {employee?.phone}</div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
      {/* section end work order list */}
    </>
  );
}

export default AdminMock;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
