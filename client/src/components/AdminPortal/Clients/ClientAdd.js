import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CLIENTS } from "../../../utils/queries";
import { ADD_CLIENT } from "../../../utils/mutations";

import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

// import { maskedPhoneInput } from "../../../utils/phoneMask";
import MaskedInput from 'react-text-mask';

import SuccessAlert from "../../Alert";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ClientAdd() {
  const [showSuccess, setShowSuccess] = useState(false);

  // GET CLIENT FORM DATA
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
  // const [maskedPhone, setMaskedPhone] = useState("");

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

  // SECTION queries & mutations
  // add this query as it seems to be necessary for the refetchQueries on the mutation (which is called after a client is added)
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    // eslint-disable-next-line
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS, {
    variables: {
      isDisplayable: true, //only retrieve clients with a displayable status
    },
  });

  const [addClient] = useMutation(ADD_CLIENT, {
    refetchQueries: [
      { query: QUERY_ALL_CLIENTS }, // DocumentNode object parsed with gql
      "getAllClients", // Query name
    ],
  });

  //section handle input
  // Getting the value or name of input triggering change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //mask (auto populate) phone format input as xxx-xxx-xxx
    // if (name === "phone") {
    //   let getMaskedPhone = maskedPhoneInput(event.target.value);
    //   setMaskedPhone(getMaskedPhone);
    // }

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
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

    return name;
  };

  //section add client
  // Add client to the Client model/table
  const handleAddClientSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

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

    areAllFieldsFilled ? setShowSuccess(true) : setShowSuccess(false);

    resetForm();
  };

  //section utility functions
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

  // Validate all fields are populated to enable submit button
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

  return (
    <Container>
      <Form onSubmit={handleAddClientSubmit}>
        <div id="example-collapse-text">
          <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
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
              value={businessName}
              name="businessName"
              onChange={handleInputChange}
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
              value={contact}
              name="contact"
              onChange={handleInputChange}
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
                className={`validation-color ${
                  showPhoneValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label>
            </div>

            {/* <Form.Control
              className="custom-border"
              type="tel"
              placeholder="ex 555-555-5555"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              maxLength="12"
              value={maskedPhone}
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            /> */}

            <MaskedInput
              mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              className="form-control custom-border"
              placeholder="Enter a phone number"
              guide={true}
              value={phone}
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Email</Form.Label>
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
              value={emailClient}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Address</Form.Label>
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
              value={streetAddress}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Suite</Form.Label>
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
              placeholder="Enter Address"
              name="suite"
              value={suite}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Row className="addy">
            <Col xs={6}>
              <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
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
                value={city}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Col>
            <Col xs={6}>
              <Form.Label style={{ fontWeight: "bolder" }}>State</Form.Label>
              <Form.Label
                className={`validation-color ${
                  showStateValidation ? "show" : "hide"
                }`}
              >
                * required
              </Form.Label>

              <Form.Control
                as="select"
                className="custom-border"
                placeholder="State"
                name="state"
                value={state}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
              >
                <option>Select</option>
                {STATE_DROPDOWN.map((st, index) => (
                  <option key={index}>{st}</option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label style={{ fontWeight: "bolder" }}>Zipcode</Form.Label>
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
                value={zip}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Col>
          </Row>
          <SuccessAlert
              message="Client has been added"
              show={showSuccess}
            >
            </SuccessAlert>

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
      </Form>
    </Container>
  );
}
export default ClientAdd;
