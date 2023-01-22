import React, { useState, useEffect } from "react";
import Auth from "../../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_EMPLOYEES,
  QUERY_SINGLE_EMPLOYEE,
} from "../../../utils/queries";
import { UPDATE_EMPLOYEE_FORM } from "../../../utils/mutations";

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

  //set current employee selected
  // const [currentEmployee, setCurrentEmployee] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  // const [currentInput, setCurrentInput] = useState({});
  const [prevEmployeeData, setPrevEmployeeData] = useState({});

  //set the state of the value in the input fields (either the input by the user or populate based on selected employee)
  const [selectFirstName, setSelectFirstName] = useState(false);
  const [selectLastName, setSelectLastName] = useState(false);
  const [selectPhone, setSelectPhone] = useState(false);
  const [selectEmail, setSelectEmail] = useState(false);

  //enable/disable form
  const [formIsDisabled, setFormIsDisabled] = useState(true);

  //validation
  const [showFirstNameValidation, setShowFirstNameValidation] = useState(false);
  const [showLastNameValidation, setShowLastNameValidation] = useState(false);
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailEmployeeValidation, setShowEmailEmployeeStateValidation] =
    useState(false);

  //SECTION GET ALL EMPLOYEES
  // eslint-disable-next-line
  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefetch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  //SECTION get a single employee Query
  // eslint-disable-next-line
  const [getASingleEmployee, { loading: lazyLoading, data: singleEmployee }] =
    useLazyQuery(QUERY_SINGLE_EMPLOYEE, {
      variables: { id: currentEmployeeId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleEmployee) => {
        // setCurrentEmployee(singleEmployee);
      },
    });

  //mutation to update employee databse record
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE_FORM);

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(e)

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
    } else {
      console.log("Error in form input at EmployeeUpdate.js");
    }
    return name;
  };

  //SECTION HANDLE SELECTED EMPLOYEE
  //set the state for the selected employee dropdown
  async function handleSelectedEmployee(event) {
    let employeeId = event.target.options[event.target.selectedIndex].dataset.id; //get selected employee id
    setCurrentEmployeeId(employeeId); //set state of current id

    //await query single client
    let currentEmployeeData = await getASingleEmployee(); //get selected employee data

    // console.log(currentEmployeeData.data.employeeById);

    setPrevEmployeeData(currentEmployeeData.data.employeeById); //set data state and rerender in form

    //fix start
    // allow form to populate with selected employee data
    setSelectFirstName(true);
    setSelectLastName(true);
    setSelectPhone(true);
    setSelectEmail(true);

    setFormIsDisabled(false); // enable form for input
    //fix end
  }

  //SECTION UPDATE EMPLOYEE
  const handleEmployeeUpdate = async (event) => {
    event.preventDefault();

    let getEmployee = await getASingleEmployee();

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
        },
      });
    } catch (err) {
      console.log(err);
    }

    empRefetch();

    setSelectFirstName(false); //fix
    setSelectLastName(false);
    setSelectPhone(false);
    setSelectEmail(false);

    resetForm(); // fix

    setFormIsDisabled(true); //fix //set form disabled = true
  };

  //SECTION UTILITY FUNCTIONS
  //validation
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
  };

  //reset = resets form to placeholder values
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
  };

  //enable submit button = if input is added to at least one input field
  useEffect(() => {
    setOneFieldHasInput(
      email.trim() !== "" ||
        phone.trim() !== "" ||
        firstName.trim() !== "" ||
        lastName.trim() !== ""
    );
    // eslint-disable-next-line
  }, [email, phone, firstName, lastName]);

  return (
    <Container>
      <Form
        data-editemployeeid={prevEmployeeData?._id}
        className="py-3 overflow-auto custom-about"
        onSubmit={handleEmployeeUpdate}
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   // setCurrentInput({ //triggers useEffect which triggers the handleEmployeeUpdate function
        //   //   firstName,
        //   //   lastName,
        //   //   phone,
        //   //   email,
        //   //   isAdmin,
        //   //   isLocked,
        //   // });
        //   // resetForm();
        // }}
      >
        <div id="example-collapse-text">
          <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>
              Select Client (to populate below)
            </Form.Label>
            <Form.Control
              as="select"
              className="custom-border"
              type="text"
              placeholder="Select Client"
              // value={"form-select" || ""}
              name={"form-select" || ""}
              onChange={handleSelectedEmployee}
            >
              <option>
                {prevEmployeeData?.firstName
                  ? `${prevEmployeeData.firstName} ${prevEmployeeData.lastName}`
                  : "Select"}
              </option>
              {emp?.employees?.map((emp, index) => (
                <option
                  key={index}
                  // value={[emp.email, emp.firstName, emp.lastName, emp.phone]}
                  data-id={emp._id}
                >
                  {`${emp.firstName} ${emp.lastName}`}
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
              // defaultValue={prevEmployeeData?.firstName} //fix
              value={selectFirstName ? prevEmployeeData.firstName : firstName} // fix
              // value={firstName} // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              required
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
              // defaultValue={prevEmployeeData?.lastName} //fix
              value={selectLastName ? prevEmployeeData.lastName : lastName} // fix
              // value={lastName} // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
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
              placeholder="example: 123-456-7899"
              name="phone"
              // defaultValue={prevEmployeeData?.phone} //fix
              value={selectPhone ? prevEmployeeData.phone : phone} // fix
              // value={phone} // fix
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              required
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
              // defaultValue={prevEmployeeData?.email} // fix
              value={selectEmail ? prevEmployeeData.email : email} // fix
              // value={email} // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
              // required
            />
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
