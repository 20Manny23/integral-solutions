import React, { useState, useEffect } from "react";
import Auth from "../../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_ALL_CLIENTS, QUERY_SINGLE_CLIENT } from "../../../utils/queries";
import { UPDATE_CLIENT } from "../../../utils/mutations";

import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ClientUpdate() {
  // SECTION START CLIENT
  const [prevClientData, setPrevClientData] = useState({});

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
  // const [isDisabled, setIsDisabled] = useState(true);
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
  // const [showSuiteValidation, setShowSuiteValidation] = useState(false);
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);

  const [currentInput, setCurrentInput] = useState({});
  const [currentClientId, setCurrentClientId] = useState("");
  const [currentClient, setCurrentClient] = useState("");

  // SECTION QUERIES & MUTATIONS
  // get all clients
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    // eslint-disable-next-line
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS);

  // eslint-disable-next-line
  const [getASingleClient, { loading: lazyLoading, data: singleClient }] =
    useLazyQuery(QUERY_SINGLE_CLIENT, {
      variables: { clientId: currentClientId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleClient) => {
        setCurrentClient(singleClient);
      },
    });

  // SECTION HANDLE INPUT
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

  // SECTION UPDATE CLIENT IN DATABASE
  const [updateClient] = useMutation(UPDATE_CLIENT);

  // Wait for currentClientId OR current input to be updated
  useEffect(() => {
    console.log(
      "current id = ",
      currentClientId,
      "current input = ",
      currentInput
    );
    console.log("prev data = ", prevClientData);

    if (currentClientId && currentInput) {
      handleEditClientSubmit();
      // console.log("useEffect = ", currentClientId);
    }

    // eslint-disable-next-line
  }, [currentClientId, currentInput]);

  const handleEditClientSubmit = async () => {
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

    // setIsDisabled(true);

    resetForm();
  };

  //  Reset the form after onSubmit
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
        // suite.trim() !== "" && //not required
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

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  async function businessNameSelect(event) {
    let clientId = event.target.options[event.target.selectedIndex].dataset.id;
    setCurrentClientId(clientId);
    // setIsDisabled(false);

    console.log(event.target.value, clientId);

    setBusinessName(event.target.value);

    //await query single client
    let currentClientData = await getASingleClient();

    console.log(currentClientData);

    setPrevClientData(currentClientData.data.client);

    console.log(prevClientData.businessName);
  }

  return (
    <Container>
      <Form
        data-editclientid={prevClientData?._id}
        className="py-3 overflow-auto custom-about"
        // section submit
        onSubmit={(event) => {
          let clientId = event.currentTarget.getAttribute("data-editclientid");
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
      >
        <div id="example-collapse-text">
          <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>
              Select Client (to populate below)
            </Form.Label>
            <Form.Label
              className={`validation-color ${
                showBusinessNameValidation ? "show" : "hide"
              }`}
            >
              *required
            </Form.Label>
            <Form.Control
              as="select"
              className="custom-border"
              type="text"
              placeholder="Select Client"
              value={"form-select"}
              name={"form-select"}
              onChange={businessNameSelect}
            >
              <option>{businessName ? businessName : "Select"}</option>
              {clients?.clients?.map((client, index) => (
                <option
                  key={index}
                  value={client.businessName}
                  data-id={client._id}
                >
                  {client.businessName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3 form-length">
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
              defaultValue={prevClientData?.businessName}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
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
              defaultValue={prevClientData?.contact}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
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
              defaultValue={prevClientData?.phone}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
          >
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
              defaultValue={prevClientData?.email}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              // required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
          >
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
              defaultValue={prevClientData?.streetAddress}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
          >
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Suite</Form.Label>
              {/* <Form.Label
                className={`validation-color ${
                  showSuiteValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label> */}
            </div>
            <Form.Control
              className="custom-border"
              placeholder="Enter Suite"
              name="suite"
              defaultValue={prevClientData?.suite}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //disabled={isDisabled}
              // required
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
                defaultValue={prevClientData?.city}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                //disabled={isDisabled}
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
                as={"select"}
                className="custom-border"
                placeholder="State"
                name="state"
                defaultValue={prevClientData?.state}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                //disabled={isDisabled}
                required
              >
                <option>{prevClientData?.state ? prevClientData?.state : "Select"}</option>
                {STATE_DROPDOWN.map((st) => (
                  <option>{st}</option>
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
                defaultValue={prevClientData?.zip}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                //disabled={isDisabled}
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
      </Form>
    </Container>
  );
}

export default ClientUpdate;
