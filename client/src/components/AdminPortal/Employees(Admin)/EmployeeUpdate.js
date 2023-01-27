import React, { useState, useEffect } from "react";
import Auth from "../../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_EMPLOYEES,
  QUERY_SINGLE_EMPLOYEE,
} from "../../../utils/queries";
import { UPDATE_EMPLOYEE_FORM } from "../../../utils/mutations";
import { maskedPhoneInput } from "../../../utils/phoneMask";

import { Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";

function EmployeeUpdate() {
  //form = input fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oneFieldHasInput, setOneFieldHasInput] = useState(true);
  const [maskedPhone, setMaskedPhone] = useState("");
  const [hasDriversLicense, setHasDriversLicense] = useState("");

  //set selected employee
  // const [currentEmployee, setCurrentEmployee] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  // const [currentInput, setCurrentInput] = useState({});
  const [prevEmployeeData, setPrevEmployeeData] = useState({});

  //set the state of the value in the input fields (either the input by the user or populate based on selected employee)
  const [selectFirstName, setSelectFirstName] = useState(false);
  const [selectLastName, setSelectLastName] = useState(false);
  const [selectPhone, setSelectPhone] = useState(false);
  const [selectEmail, setSelectEmail] = useState(false);
  const [selectHasDriversLicense, setSelectHasDriversLicense] = useState(false);

  //enable/disable form
  const [formIsDisabled, setFormIsDisabled] = useState(true);

  //validation
  const [showFirstNameValidation, setShowFirstNameValidation] = useState(false);
  const [showLastNameValidation, setShowLastNameValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailEmployeeValidation, setShowEmailEmployeeStateValidation] =
    useState(false);
  const [showLicenseValidation, setShowLicenseValidation] = useState(false);
  //SECTION GET ALL EMPLOYEES
  const {
    // eslint-disable-next-line
    loading: empLoad,
    data: emp,
    // eslint-disable-next-line
    error: empError,
    refetch: empRefetch,
    // } = useQuery(QUERY_ALL_EMPLOYEES);
  } = useQuery(QUERY_ALL_EMPLOYEES, {
    variables: {
      isDisplayable: true, //only retrieve employees with a displayable status
    },
    onCompleted: (data) => {
      // console.log(data)
    },
  });

  //SECTION get a single employee
  // eslint-disable-next-line
  const [getASingleEmployee, { loading: lazyLoading, data: singleEmployee }] =
    useLazyQuery(QUERY_SINGLE_EMPLOYEE, {
      variables: { id: currentEmployeeId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleEmployee) => {
        // setCurrentEmployee(singleEmployee);
        console.log(singleEmployee);
      },
    });

  // SECTION UPDATE EMPLOYEE IN DATABASE
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE_FORM);

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value)

    //mask (auto populate) phone format input as xxx-xxx-xxx
    if (name === "phone") {
      let getMaskedPhone = maskedPhoneInput(event.target.value);
      setMaskedPhone(getMaskedPhone);
    }

    if (name === "firstName") {
      setFirstName(value); //capture input on the form
      setSelectFirstName(false); //allows value property to accept input
    } else if (name === "lastName") {
      setLastName(value);
      setSelectLastName(false);
    } else if (name === "phone") {
      setPhone(value);
      setSelectPhone(false);
    } else if (name === "email") {
      setEmail(value);
      setSelectEmail(false);
    } else if (name === "driversLicense") {
      setHasDriversLicense(value);
      setSelectHasDriversLicense(false);
    };

    return name;
  };

  //SECTION HANDLE SELECTED EMPLOYEE
  //set the state for the selected employee dropdown
  async function handleSelectedEmployee(event) {
    let employeeId =
      event.target.options[event.target.selectedIndex].dataset.id; //get selected employee id
    setCurrentEmployeeId(employeeId); //set state of current id

    //await query single client
    let currentEmployeeData = await getASingleEmployee(); //get selected employee data

    // console.log(currentEmployeeData.data.employeeById);

    setPrevEmployeeData(currentEmployeeData?.data?.employeeById); //set data state and rerender in form

    // allow form to populate with selected employee data
    setSelectFirstName(true);
    setSelectLastName(true);
    setSelectPhone(true);
    setSelectEmail(true);
    setSelectHasDriversLicense(true);

    setFormIsDisabled(false); // enable form for input
  }

  //SECTION EMPLOYEE UPDATE
  const handleEmployeeUpdate = async (event) => {
    event.preventDefault();
    let getEmployee = await getASingleEmployee();

    console.log('update = ', hasDriversLicense);
    console.log(getEmployee.data.employeeById?.hasDriversLicense);

    try {
      await updateEmployee({
        variables: {
          id: currentEmployeeId,
          firstName: firstName
            ? firstName
            : getEmployee.data.employeeById.firstName,
          lastName: lastName
            ? lastName
            : getEmployee.data.employeeById.lastName,
          email: email ? email : getEmployee.data.employeeById.email,
          phone: phone ? phone : getEmployee.data.employeeById.phone,
          // hasDriversLicense: "Weird"
          hasDriversLicense: hasDriversLicense
            ? hasDriversLicense
            : getEmployee.data.employeeById.hasDriversLicense,
        },
      });
    } catch (err) {
      console.log(err);
    }

    empRefetch();

    // allow form to populate with selected client data
    setSelectFirstName(false);
    setSelectLastName(false);
    setSelectPhone(false);
    setSelectEmail(false);
    setSelectHasDriversLicense(false);

    resetForm();

    setFormIsDisabled(true); //set form disabled = true
  };

  //SECTION UTILITY FUNCTIONS
  //validation - if a user clicks off field w/out entering text, then validation is required displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "email" && value.trim() === ""
      ? setShowEmailEmployeeStateValidation(true)
      : setShowEmailEmployeeStateValidation(false);
    name === "phone" && value.trim() === ""
      ? setShowPhoneValidation(true)
      : setShowPhoneValidation(false);
    name === "phone" && value.trim() === ""
      ? setShowPhoneValidation(true)
      : setShowPhoneValidation(false);
    name === "first-name" && value.trim() === ""
      ? setShowFirstNameValidation(true)
      : setShowFirstNameValidation(false);
    name === "last-name" && value.trim() === ""
      ? setShowLastNameValidation(true)
      : setShowLastNameValidation(false);
    name === "hasDriversLicense" && value.trim() === ""
      ? setShowLicenseValidation(true)
      : setShowLicenseValidation(false);
  };

  //reset = resets form to placeholder values
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setHasDriversLicense("");
  };

  //enable submit button = if input is added to at least one input field
  useEffect(() => {
    setOneFieldHasInput(
      email.trim() !== "" ||
        phone.trim() !== "" ||
        firstName.trim() !== "" ||
        lastName.trim() !== "" ||
        hasDriversLicense !== ""
    );
    // eslint-disable-next-line
  }, [email, phone, firstName, lastName, hasDriversLicense]);

  let arrayForSort = [];
  if (emp) {
    arrayForSort = [...emp.employees];
    arrayForSort.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }

  return (
    <Container>
      <Form
        data-editemployeeid={prevEmployeeData?._id}
        className="py-3 overflow-auto custom-about"
        onSubmit={handleEmployeeUpdate}
      >
        <div id="example-collapse-text">
          <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>Select</Form.Label>
            <Form.Control
              as="select"
              className="custom-border"
              type="text"
              placeholder="Select Employee"
              value={"form-select" || ""}
              name={"form-select" || ""}
              onChange={handleSelectedEmployee}
            >
              <option>
                {prevEmployeeData?.firstName
                  ? `${prevEmployeeData.firstName} ${prevEmployeeData.lastName}`
                  : "Select"}
              </option>
              {arrayForSort.map((emp, index) => (
                <option key={index} data-id={emp._id}>
                  {`${emp.lastName}, ${emp.firstName} `}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>
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
              placeholder="Enter First Name"
              name="firstName"
              value={selectFirstName ? prevEmployeeData.firstName : firstName}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>
          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>
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
              value={selectLastName ? prevEmployeeData.lastName : lastName}
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
            <Form.Control
              className="custom-border"
              type="tel"
              placeholder="ex 555-555-5555"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={selectPhone ? prevEmployeeData.phone : maskedPhone}
              name="phone"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Form.Group>

          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label htmlFor="email" style={{ fontWeight: "bolder" }}>
                Email
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
              type="text"
              placeholder="Employee Email"
              name="email"
              value={selectEmail ? prevEmployeeData.email : email.toLowerCase()}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              // required
            />
          </Form.Group>
          <Form.Group className="mb-3 form-length">
            <div className="form-label">
              <Form.Label htmlFor="email" style={{ fontWeight: "bolder" }}>
                Drivers License
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
              as="select"
              className="custom-border"
              type="text"
              placeholder="Employee Email"
              name="driversLicense"
              value={selectHasDriversLicense ? prevEmployeeData.hasDriversLicense : hasDriversLicense}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              // required
            >
              <option>Select</option>
              <option>Yes</option>
              <option>No</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className="submit-button-style"
              variant="primary"
              type="submit"
              disabled={!oneFieldHasInput}
              title="Enter all fields to add a new client"
            >
              Update Employee
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default EmployeeUpdate;
