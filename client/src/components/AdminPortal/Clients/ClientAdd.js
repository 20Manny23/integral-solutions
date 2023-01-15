import React, { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../../../utils/mutations";

import { Row, Col, Container, Form, Button, Select } from "react-bootstrap";

import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ClientAdd() {
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

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

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

  // SECTION ADD
  const [addClient] = useMutation(ADD_CLIENT, {
    refetchQueries: ["getAllClients"],
  });

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

    resetForm();
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
  const stateCode = ["CO","AL", "AK", "AS", "AZ", "AR", "CA",  "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MI", "MN", "MS", "MO", "MT", "NE", "NV" , "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY" ]
  return (
    <Container>
      <Form onSubmit={handleAddClientSubmit} >
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
            <Form.Control
              className="custom-border"
              type="tel"
              placeholder="example: 123-456-7899"
              name="phone"
              value={phone}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
              // defaultValue="suite #"
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
                // defaultValue="test city"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Col>
            <Col>
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
                // defaultValue="CO"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                // required
              >
                {stateCode.map((st) =>
              <option>{st}</option>
              )}
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
                // defaultValue="07801"
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
      </Form>
    </Container>
  );
}
export default ClientAdd;
