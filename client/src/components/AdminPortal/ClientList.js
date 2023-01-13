import React, { useState, useEffect, useLayoutEffect } from "react";
import Auth from "../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_EMPLOYEES,
  QUERY_ALL_CLIENTS,
  QUERY_SCHEDULE,
  QUERY_SINGLE_CLIENT,
} from "../../utils/queries";
import {
  ADD_CLIENT,
  DELETE_CLIENT,
  UPDATE_CLIENT,
} from "../../utils/mutations";

import { Row, Col, Container, Form, Button, Modal } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Contact.css";
import "../../styles/button-style.css";

function ClientList() {
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  // eslint-disable-next-line

  const { loading: clientsLoad, data: clients, error: clientError, refetch: clientsRefetch } = useQuery(QUERY_ALL_CLIENTS);

  // SECTION START CLIENT
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

  //Modal State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // VALIDATION
  const [showBusinessNameValidation, setShowBusinessNameValidation] =
    useState(false);
  const [showContactValidation, setShowContactValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailClientValidation, setShowEmailClientStateValidation] =
    useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] =
    useState(false);
  const [showSuiteValidation, setShowSuiteValidation] = useState(false);
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);

  // SECTION GET A SINGLE CLIENT QUERY
  const [currentClient, setCurrentClient] = useState("");
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentInput, setCurrentInput] = useState({});

  const [getASingleClient, { loading: lazyLoading, data: singleClient }] =
    useLazyQuery(QUERY_SINGLE_CLIENT, {
      variables: { clientId: currentClientId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleClient) => {
        setCurrentClient(singleClient);
      },
    });
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
      : setZip(value);

    console.log("email = ", emailClient);

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
    name === "suite" && value.trim() === ""
      ? setShowSuiteValidation(true)
      : setShowSuiteValidation(false);
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

  // SECTION ADD CLIENT
  const [addClient] = useMutation(ADD_CLIENT, {
    refetchQueries: ["getAllClients"],
  });

  // Add client to the Client model/table
  const handleAddClientSubmit = async (e) => {
    e.preventDefault();
    // console.log('hello = ', businessName, streetAddress, suite, city, state, zip, contact, phone, emailClient);
    // resetForm();
    try {
      // eslint-disable-next-line
      const { data } = await addClient({
        variables: {
          businessName,
          contact,
          phone,
          email: emailClient,
          streetAddress,
          suite,
          city,
          state,
          zip,
        },
      });
    } catch (err) {
      console.error(err);
    }

    // await clientsRefetch();

    resetForm();

    // if ()
    handleUpdateForDisabled(null, businessName, "addClient");
  };

  // Reset the add client form after submission
  const resetForm = () => {
    setBusinessName("");
    setContact("");
    setPhone("");
    setEmailClient("");
    setStreetAddress("");
    setSuite("");
    setCity("");
    setState("");
    setZip("");
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      businessName.trim() !== "" &&
        contact.trim() !== "" &&
        phone.trim() !== "" &&
        emailClient.trim() !== "" &&
        streetAddress.trim() !== "" &&
        suite.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "" &&
        zip.trim() !== ""
    );
    // console.log(areAllFieldsFilled);
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

  // SECTION END ADD CLIENT

  // SECTION UPDATE CLIENT
  // const [editClient, setEditClient] = useState([]);

  const [updateClient] = useMutation(UPDATE_CLIENT);

  // Wait for currentClientId OR current input to be updated
  useEffect(() => {
    // console.log('current id = ', currentClientId, 'current input = ', currentInput);

    if (currentClientId && currentInput) {
      handleEditClientSubmit();
      // console.log("useEffect = ", currentClientId);
    }

    // eslint-disable-next-line
  }, [currentClientId, currentInput]);

  const handleEditClientSubmit = async () => {
    // event.preventDefault();

    // get the current client data
    // let test = await clientRefetch();
    let test = await getASingleClient();
    console.log("test = ", test);

    // Update current client data
    try {
      await updateClient({
        variables: {
          id: currentClientId,
          businessName: currentInput.businessName
            ? currentInput.businessName
            : test.data.client.businessName,
          contact: currentInput.contact
            ? currentInput.contact
            : test.data.client.contact,
          phone: currentInput.phone
            ? currentInput.phone
            : test.data.client.phone,
          email: currentInput.emailClient
            ? currentInput.emailClient
            : test.data.client.email,
          streetAddress: currentInput.streetAddress
            ? currentInput.streetAddress
            : test.data.client.streetAddress,
          suite: currentInput.suite
            ? currentInput.suite
            : test.data.client.suite,
          city: currentInput.city ? currentInput.city : test.data.client.city,
          state: currentInput.state
            ? currentInput.state
            : test.data.client.state,
          zip: currentInput.zip ? currentInput.zip : test.data.client.zip,
        },
      });
    } catch (err) {
      console.log(err);
    }
      clientsRefetch();
  };

  // Handle add form edit pencil = disabled = false or true
  const [updateClientDisabled, setUpdateClientDisabled] = useState({});

  useEffect(() => {
    console.log("add client");
    let fields = document.querySelectorAll("fieldset");
    console.log(fields);

    var newObj = {};
    for (var i = 0; i < fields.length; i++) {
      newObj[fields[i].dataset.businessname] = true;
    }

    setUpdateClientDisabled(newObj);

    console.log(newObj);
    console.log(updateClientDisabled);
  }, []);

  const handleUpdateForDisabled = (event, businessName, addClient) => {
    console.log(event);
    console.log(businessName);
    console.log(
      businessName
        ? businessName
        : event.currentTarget.getAttribute("data-businessname")
    );

    let currentName = businessName
      ? businessName
      : event.currentTarget.getAttribute("data-businessname");
    let keys = document.querySelectorAll("fieldset");

    console.log(currentName);
    console.log("keys = ", keys);

    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i].dataset.businessname);
      console.log(updateClientDisabled[keys[i].dataset.businessname]);

      if (keys[i].dataset.businessname === currentName) {
        newObj[keys[i].dataset.businessname] =
          !updateClientDisabled[keys[i].dataset.businessname];
      } else if (addClient === "addClient") {
        newObj[keys[i].dataset.businessname] = true;
      } else {
        newObj[keys[i].dataset.businessname] = true;
      }
    }

    setUpdateClientDisabled(newObj);

    console.log(newObj);
    console.log(updateClientDisabled);
  };

  // SECTION END UPDATE CLIENT

  // SECTION START DELETE CLIENT
  // DELETE CLIENT
  // delete incident query
  const [deleteClient] = useMutation(DELETE_CLIENT);

  // delete incident
  

  const handleDeleteClient = async (event) => {
    let clientId = event.currentTarget.getAttribute("data-clientid");
    try {
      // eslint-disable-next-line
      const { data } = await deleteClient({
        variables: {
          id: clientId,
        },
      });

      // RELOAD CLIENT LIST
      clientsRefetch();
    } catch (err) {
      console.log(err);
    }
  };
 
  // SECTION END DELETE CLIENT

  // SECTION END CLIENT

  // collapse show / not show detail

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

  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    console.log(currentAvailTarget);
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };


  return (
    <>
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center "
        style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
      >
        <Form>
          <Collapse
            in={open}
            className="shadow rounded-lg border border-secondary"
          >
            <div id="example-collapse-text">
              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label
                    style={{ fontWeight: "bolder", marginTop: "10px" }}
                  >
                    Company Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Company Name"
                  name="name"
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
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Contact Person"
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
                  placeholder="Client Phone"
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
                    Email
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="email"
                  placeholder="Client Email"
                  name="email"
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
                />
              </Form.Group>

              <Row className="addy">
                <Col xs={6}>
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
              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                style={{ marginBottom: "15px" }}
              >
                Add Client
              </Button>
            </div>
          </Collapse>
        </Form>
      </div>
      
      <Container style={{ border: "1px solid black" }}>
        <div className="d-flex justify-content-between">
          <h3>Client List</h3>
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            style={{ backgroundColor: "white", border: "none", color: "black" }}
          >
            Add New Client ➕
          </button>
        </div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {clients?.clients?.map((client, index) => (
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
                      aria-controls={`#collapse-client-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-client-${index}`}
                    >
                      {client?.businessName}
                    </button>
                  </h5>
                  <div className="mr-2" style={{ display: "flex" }}>
                    {/* section pencil */}
                    <span style={{ marginTop: "7px", fontSize: "13px" }}>
                      Edit
                    </span>
                    <FontAwesomeIcon
                      icon="fa-pencil"
                      className="p-2 fa-lg"
                      data-businessname={client?.businessName}
                      onClick={handleUpdateForDisabled}
                    />
                    {/* DELETE */}
                    <span style={{ marginTop: "7px", fontSize: "13px" }}>
                      Delete
                    </span>

                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-clientid={client?._id}
                      // data-target={`#modal-control{index}`}
                      onClick={(event) => {handleDeleteClient(event);}}
                    />
                      {/* <Modal
                  show={show}
                  
                  size="sm"
                  onHide={handleClose}
                  // backdrop="static"
                  // keyboard={true}
                >
                  <div id={`#modal-control{index}`}>
                  <Modal.Header>
                    <Modal.Title>Delete Client</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>Are you sure you would like to delete {client.businessName}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" 
                    data-clientid={client?._id}
                    onClick={(event) => {handleDeleteClient(event);}}
                    >
                      Yes, Delete
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </Modal.Footer>
                  </div>
                </Modal> */}
                  </div>
                  
                </div>
              
                <Collapse>
                  <div id={`#collapse-client-${index}`}>
                    <Form
                      data-editclientid={client?._id}
                      className="py-3 overflow-auto custom-about"
                      // section submit
                      onSubmit={(event) => {
                        event.preventDefault();
                        let clientId =
                          event.currentTarget.getAttribute("data-editclientid");
                        setCurrentClientId(clientId);
                        setCurrentInput({
                          businessName,
                          contact,
                          phone,
                          emailClient,
                          streetAddress,
                          suite,
                          state,
                          city,
                          zip,
                        });
                      }}
                      style={{ width: "80vw" }}
                    >
                      <fieldset
                        data-businessname={client?.businessName}
                        disabled={
                          updateClientDisabled === {}
                            ? true
                            : updateClientDisabled[client?.businessName]
                        }
                      >
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
                              defaultValue={client?.businessName}
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
                              defaultValue={client?.contact}
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
                              defaultValue={client?.phone}
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
                              defaultValue={client?.email}
                              onChange={handleInputChange}
                              onBlur={handleBlurChange}
                              // required
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
                              defaultValue={client?.streetAddress}
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
                                Suite
                              </Form.Label>
                              <Form.Label
                                className={`validation-color ${
                                  showSuiteValidation ? "show" : "hide"
                                }`}
                              >
                                * field is required
                              </Form.Label>
                            </div>
                            <Form.Control
                              className="custom-border"
                              placeholder="Enter Suite"
                              name="suite"
                              defaultValue={client?.suite}
                              onChange={handleInputChange}
                              onBlur={handleBlurChange}
                              // required
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
                                defaultValue={client?.city}
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
                                defaultValue={client?.state}
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
                                defaultValue={client?.zip}
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
                              // disabled={!areAllFieldsFilled}
                              title="Enter all fields to add a new client"
                            >
                              Update Client
                            </Button>
                          </div>
                        </div>
                      </fieldset>
                    </Form>

                    {/* {client?.schedule.map((job, index) => (
                      <div key={index}>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>
                          Number of Clients: {job?.numberOfClientEmployees}
                        </div>
                      </div>
                    ))} */}
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
export default ClientList;
const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
