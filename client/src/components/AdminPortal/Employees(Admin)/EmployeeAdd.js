import React, { useState, useEffect } from "react";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_EMPLOYEES } from "../../../utils/queries";
import { ADD_EMPLOYEE } from "../../../utils/mutations";

import { Container, Form, Button } from "react-bootstrap";

import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import { maskedPhoneInput } from "../../../utils/phoneMask"; //fix

function EmployeeAdd() {
  // GET FORM INPUT
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);
  const [maskedPhone, setMaskedPhone] = useState(""); //fix

  // VALIDATION
  const [showFirstNameValidation, setShowFirstNameValidation] = useState(false);
  const [showLastNameValidation, setShowLastNameValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailEmployeeValidation, setShowEmailEmployeeValidation] =
    useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(event)
    // console.log(event.target.value)

    //mask (auto populate) phone format input as xxx-xxx-xxx //fix
    if (name === "phone") {
      let getMaskedPhone = maskedPhoneInput(event.target.value);
      setMaskedPhone(getMaskedPhone);
    }

    name === "firstName"
      ? setFirstName(value)
      : name === "lastName"
      ? setLastName(value)
      : name === "phone"
      ? setPhone(value)
      : name === "email"
      ? setEmail(value)
      : setPassword(value);

    return name;
  };

  //SECTION GET ALL EMPLOYEES
  // add this query as it seems to be necessary for the refetchQueries on the mutation (which is called after an employee is added)
  const {
    // eslint-disable-next-line
    loading: empLoad,
    // eslint-disable-next-line
    data: emp,
    // eslint-disable-next-line
    error: empError,
    // eslint-disable-next-line
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  //SECTION ADD EMPLOYEE
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [
      { query: QUERY_ALL_EMPLOYEES }, // DocumentNode object parsed with gql
      "getAllEmployees", // Query name
    ],
  });

  const handleAddEmployeeSubmit = async (event) => {
    event.preventDefault();

    console.log(
      event,
      email,
      firstName,
      lastName,
      password,
      phone,
      isAdmin,
      isLocked
    );

    try {
      // eslint-disable-next-line
      const { data } = await addEmployee({
        variables: {
          firstName,
          lastName,
          phone,
          email,
          password,
          isAdmin: false,
          isLocked: false,
        },
      });
    } catch (err) {
      console.error(err);
    }

    resetForm();
  };

  //section utility functions
  //validation blur
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "email" && value.trim() === ""
      ? setShowEmailEmployeeValidation(true)
      : setShowEmailEmployeeValidation(false);
    name === "phone" && value.trim() === ""
      ? setShowPhoneValidation(true)
      : setShowPhoneValidation(false);
    name === "password" && value.trim() === ""
      ? setShowPasswordValidation(true)
      : setShowPasswordValidation(false);
    name === "firstName" && value.trim() === ""
      ? setShowFirstNameValidation(true)
      : setShowFirstNameValidation(false);
    name === "lastName" && value.trim() === ""
      ? setShowLastNameValidation(true)
      : setShowLastNameValidation(false);
  };

  // Reset the add employee form after submission
  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setPassword("");
    setIsAdmin("");
    setIsLocked("");
  };

  // Validate all fields are populated to enable submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      email.trim() !== "" &&
        firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        phone.trim() !== "" &&
        password.trim() !== ""
    );

    // eslint-disable-next-line
  }, [email, phone, firstName, lastName]);

  return (
    <Container>
      <Form onSubmit={handleAddEmployeeSubmit} style={{ alignContent: "left" }}>
        <div id="example-collapse-text">
          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder", marginTop: "10px" }}>
                First Name
              </Form.Label>
              <Form.Label
                className={`validation-color ${
                  showFirstNameValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label>
            </div>
            <Form.Control
              className="custom-border"
              type="text"
              placeholder="Enter Employee Name"
              name="firstName"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder", marginTop: "10px" }}>
                Last Name
              </Form.Label>
              <Form.Label
                className={`validation-color ${
                  showLastNameValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label>
            </div>
            <Form.Control
              className="custom-border"
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
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
            <Form.Control
              className="custom-border"
              type="tel"
              placeholder="ex 555-555-5555"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              maxLength="12" //fix
              value={maskedPhone} //fix
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>
                Email Address
              </Form.Label>
              <Form.Label
                className={`validation-color ${
                  showEmailEmployeeValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label>
            </div>
            <Form.Control
              className="custom-border"
              type="email"
              placeholder="Enter Email Address"
              name="email"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Password</Form.Label>
              <Form.Label
                className={`validation-color ${
                  showPasswordValidation ? "show" : "hide"
                }`}
              >
                * field is required
              </Form.Label>
            </div>
            <Form.Control
              className="custom-border"
              type="password"
              placeholder="Setup Employee Password"
              name="password"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              className="submit-button-style"
              variant="primary"
              type="submit"
              disabled={!areAllFieldsFilled}
              title="Enter all fields to add a new client"
            >
              Add Employee
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}
export default EmployeeAdd;
