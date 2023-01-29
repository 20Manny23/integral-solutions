import React, { useState, useEffect } from "react";
import Auth from "../../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { QUERY_ALL_CLIENTS, QUERY_SINGLE_CLIENT } from "../../../utils/queries";
import { UPDATE_CLIENT } from "../../../utils/mutations";

import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

// import { maskedPhoneInput } from "../../../utils/phoneMask";
import MaskedInput from 'react-text-mask';

import SuccessAlert from "../../Alert";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function ClientUpdate() {
  const [showSuccess, setShowSuccess] = useState(false);

  //form = input fields
  const [businessName, setBusinessName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [oneFieldHasInput, setOneFieldHasInput] = useState(true);
  // const [maskedPhone, setMaskedPhone] = useState("");

  //set selected client
  // const [currentInput, setCurrentInput] = useState({});
  const [currentClientId, setCurrentClientId] = useState("");
  // const [currentClient, setCurrentClient] = useState({});
  const [prevClientData, setPrevClientData] = useState({});

  //set the state of the value in the input fields (either the input by the user or populate based on selected client)
  const [selectBusinessName, setSelectBusinessName] = useState(false);
  const [selectContact, setSelectContact] = useState(false);
  const [selectPhone, setSelectPhone] = useState(false);
  const [selectEmail, setSelectEmail] = useState(false);
  const [selectStreetAddress, setSelectStreetAddress] = useState(false);
  const [selectSuite, setSelectSuite] = useState(false);
  const [selectCity, setSelectCity] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [selectZip, setSelectZip] = useState(false);

  //enable/disable form
  const [formIsDisabled, setFormIsDisabled] = useState(true);

  //validation
  const [showBusinessNameValidation, setShowBusinessNameValidation] =
    useState(false);
  const [showContactValidation, setShowContactValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailClientValidation, setShowEmailClientStateValidation] =
    useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] =
    useState(false);
  // const [showSuiteValidation, setShowSuiteValidation] = useState(false); //not required
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);

  // SECTION GET ALL CLIENTS
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    // eslint-disable-next-line
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    refetch: clientsRefetch,
    // } = useQuery(QUERY_ALL_CLIENTS);
  } = useQuery(QUERY_ALL_CLIENTS, {
    variables: {
      isDisplayable: true, //only retrieve clients with a displayable status
    },
  });

  //SECTION get a single employee
  // eslint-disable-next-line
  const [getASingleClient, { loading: lazyLoading, data: singleClient }] =
    useLazyQuery(QUERY_SINGLE_CLIENT, {
      variables: { clientId: currentClientId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleClient) => {
        // setCurrentClient(singleClient);
      },
    });

  //SECTION UPDATE CLIENT IN DATABASE
  const [updateClient] = useMutation(UPDATE_CLIENT);

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    //mask (auto populate) phone format input as xxx-xxx-xxx
    // if (name === "phone") {
    //   let getMaskedPhone = maskedPhoneInput(event.target.value);
    //   setMaskedPhone(getMaskedPhone);
    // }

    if (name === "businessName") {
      setBusinessName(value);
      setSelectBusinessName(false);
    } else if (name === "contact") {
      setContact(value);
      setSelectContact(false);
    } else if (name === "phone") {
      setPhone(value);
      setSelectPhone(false);
    } else if (name === "email") {
      setEmail(value);
      setSelectEmail(false);
    } else if (name === "streetAddress") {
      setStreetAddress(value);
      setSelectStreetAddress(false);
    } else if (name === "suite") {
      setSuite(value);
      setSelectSuite(false);
    } else if (name === "city") {
      setCity(value);
      setSelectCity(false);
    } else if (name === "state") {
      setState(value);
      setSelectState(false);
    } else if (name === "zip") {
      setZip(value);
      setSelectZip(false);
    } else {
      console.log("Error in form input at ClientUpdate.js");
    }
    return name;
  };

  //SECTION HANDLE SELECTED CLIENT
  async function handleSelectedClient(event) {
    let clientId = event.target.options[event.target.selectedIndex].dataset.id; //get selected client id
    setCurrentClientId(clientId); //set state of current id

    //await query single client
    let currentClientData = await getASingleClient(); //get selected client data

    // console.log('currentClient = ', currentClientData.data.client);

    setPrevClientData(currentClientData?.data?.client); //set data state and rerender in form

    // allow form to populate with selected employee data
    setSelectBusinessName(true);
    setSelectContact(true);
    setSelectPhone(true);
    setSelectEmail(true);
    setSelectStreetAddress(true);
    setSelectSuite(true);
    setSelectCity(true);
    setSelectState(true);
    setSelectZip(true);

    setFormIsDisabled(false); // enable form for input
  }

  //SECTION CLIENT UPDATE
  const handleClientUpdate = async (event) => {
    event.preventDefault();

    let getClient = await getASingleClient();

    try {
      await updateClient({
        variables: {
          id: currentClientId,
          businessName: businessName
            ? businessName
            : getClient.data.client.businessName,
          contact: contact ? contact : getClient.data.client.contact,
          phone: phone ? phone : getClient.data.client.phone,
          email: email ? email : getClient.data.client.email,
          streetAddress: streetAddress
            ? streetAddress
            : getClient.data.client.streetAddress,
          suite: suite ? suite : getClient.data.client.suite,
          city: city ? city : getClient.data.client.city,
          state: state ? state : getClient.data.client.state,
          zip: zip ? zip : getClient.data.client.zip,
        },
      });
    } catch (err) {
      console.log(err);
    }

    clientsRefetch();
    // allow form to populate with selected employee data
    setSelectBusinessName(false);
    setSelectContact(false);
    setSelectPhone(false);
    setSelectEmail(false);
    setSelectStreetAddress(false);
    setSelectSuite(false);
    setSelectCity(false);
    setSelectState(false);
    setSelectZip(false);

    oneFieldHasInput ? setShowSuccess(true) : setShowSuccess(false);

    resetForm();

    setFormIsDisabled(true); // enable form for input
  };

  //SECTION UTILITY FUNCTIONS
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
    name === "email" && value.trim() === ""
      ? setShowEmailClientStateValidation(true)
      : setShowEmailClientStateValidation(false);
    name === "streetAddress" && value.trim() === ""
      ? setShowStreetAddressValidation(true)
      : setShowStreetAddressValidation(false);
    // name === "suite" && value.trim() === "" //not required
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

  //reset = resets form to placeholder values
  const resetForm = (event) => {
    setBusinessName("");
    setContact("");
    setPhone("");
    setEmail("");
    setStreetAddress("");
    setSuite("");
    setCity("");
    setState("");
    setZip("");
  };

  //enable submit button = if input is added to at least one input field
  useEffect(() => {
    setOneFieldHasInput(
      businessName.trim() !== "" ||
        contact.trim() !== "" ||
        phone.trim() !== "" ||
        email.trim() !== "" ||
        streetAddress.trim() !== "" ||
        suite.trim() !== "" || //not required
        city.trim() !== "" ||
        state.trim() !== "" ||
        zip.trim() !== ""
    );
    // eslint-disable-next-line
  }, [
    businessName,
    contact,
    phone,
    email,
    streetAddress,
    suite,
    city,
    state,
    zip,
  ]);
  let arrayForSort = [];
  if (clients) {
    // console.log(clients.clients)
    arrayForSort = [...clients.clients];
    arrayForSort.sort(function (a, b) {
      if (a.businessName.toLowerCase() < b.businessName.toLowerCase())
        return -1;
      if (a.businessName.toLowerCase() > b.businessName.toLowerCase()) return 1;
      return 0;
    });
  }
  return (
    <Container>
      <Form
        data-editclientid={prevClientData?._id}
        className="py-3 overflow-auto custom-about"
        onSubmit={handleClientUpdate}
      >
        <div id="example-collapse-text">
          <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>
              Select Client
            </Form.Label>
            <Form.Control
              as="select"
              className="custom-border"
              type="text"
              placeholder="Select Client"
              value={"form-select"}
              name={"form-select"}
              onChange={handleSelectedClient}
            >
              <option>
                {prevClientData?.businessName
                  ? prevClientData?.businessName
                  : "Select"}
              </option>
              {arrayForSort.map((client, index) => (
                <option
                  key={index}
                  data-id={client?._id}
                >
                  {client?.businessName}
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
              value={
                selectBusinessName ? prevClientData?.businessName : businessName
              }
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
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
              value={selectContact ? prevClientData?.contact : contact}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
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
              value={selectPhone ? prevClientData?.phone : maskedPhone}
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            /> */}

            <MaskedInput
              mask={[/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              className="form-control custom-border"
              placeholder="Enter a phone number"
              guide={true}
              // value={phone}
              value={selectPhone ? prevClientData?.phone : phone}
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
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
              name="email"
              value={selectEmail ? prevClientData?.email : email.toLowerCase()}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
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
              value={
                selectStreetAddress
                  ? prevClientData?.streetAddress
                  : streetAddress
              }
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            // controlId="formBasicEmail"
          >
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Suite</Form.Label>
            </div>
            <Form.Control
              className="custom-border"
              placeholder="Enter Suite"
              name="suite"
              value={selectSuite ? prevClientData?.suite : suite}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
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
                value={selectCity ? prevClientData?.city : city}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
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
                value={selectState ? prevClientData?.state : state}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
              >
                <option>
                  {prevClientData?.state ? prevClientData?.state : "Select"}
                </option>
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
                value={selectZip ? prevClientData?.zip : zip}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
              />
            </Col>
          </Row>
          <SuccessAlert
            message="Client information has been updated!"
            show={showSuccess}
          ></SuccessAlert>

          <div className="d-flex justify-content-center">
            <Button
              className="submit-button-style"
              variant="primary"
              type="submit"
              disabled={!oneFieldHasInput}
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
