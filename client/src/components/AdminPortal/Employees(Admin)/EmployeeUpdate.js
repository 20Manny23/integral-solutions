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
  const [prevEmployeeData, setPrevEmployeeData] = useState({});

  //Get Employee Form Data
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

  // VALIDATION
  const [showUsernameValidation, setShowUsernameValidation] = useState(false);
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
  const [currentEmployee, setCurrentEmployee] = useState("");
  const [currentEmployeeId, setCurrentEmployeeId] = useState("");
  const [currentInput, setCurrentInput] = useState({});

  // eslint-disable-next-line
  const [getASingleEmployee, { loading: lazyLoading, data: singleEmployee }] =
    useLazyQuery(QUERY_SINGLE_EMPLOYEE, {
      variables: { id: currentEmployeeId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleEmployee) => {
        setCurrentEmployee(singleEmployee);
      },
    });

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(e)

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

  //SECTION VALIDATION BLUR
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

  //SECTION UPDATE EMPLOYEE
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE_FORM);

  useEffect(() => {
    // console.log(
    //   "current id = ",
    //   currentEmployeeId,
    //   "current input = ",
    //   currentInput
    // );

    if (currentEmployeeId && currentInput) {
      handleGetEditEmployee();
    }

    // eslint-disable-next-line
  }, [currentEmployeeId, currentInput]);

  // call a function to get the single current employee
  const handleGetEditEmployee = async () => {
    let getEmployee = await getASingleEmployee();
    // console.log("getEmployee = ", getEmployee.data);
    // setPrevEmployeeData(getEmployee) This was causing the double click error;
  // };

  // // use effect - when singleEmployee is updated then update employee
  // useEffect(() => {
    console.log(prevEmployeeData);
    console.log(Object.keys(prevEmployeeData).length === 0);
    console.log(currentEmployee)

  //   // since useEffect will run on load, check if prevEmployeeData is empty
    // if (Object.keys(prevEmployeeData).length === 0) {
    //   return;
    // }

    try {
      await updateEmployee({
        variables: {
          id: currentEmployeeId,
          firstName: currentInput?.firstName
            ? currentInput.firstName
            : getEmployee.data.employeeById.firstName,
          lastName: currentInput?.lastName
            ? currentInput.lastName
            : getEmployee.data.employeeById.lastName,
          email: currentInput?.email
            ? currentInput.email
            : getEmployee.data.employeeById.email,
          phone: currentInput?.phone
            ? currentInput.phone
            : getEmployee.data.employeeById.phone,
        },
        
      });
    } catch (err) {
      console.log(err);
    }
   
    empRefetch();

    resetForm();
  }
    // eslint-disable-next-line
  // }, [prevEmployeeData]);

  const resetForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setPassword("");
    setIsAdmin("");
    setIsLocked("");
  };

  useEffect(() => {
    setAreAllFieldsFilled(
      email.trim() !== "" &&
        phone.trim() !== "" &&
        firstName.trim() !== "" &&
        lastName.trim() !== ""
    );

    // eslint-disable-next-line
  }, [email, phone, firstName, lastName]);

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  async function employeeEmailSelect(event) {
    if(currentEmployee){
      window.location.reload();
    }
   
    let employeeId =
      event.target.options[event.target.selectedIndex].dataset.id;
    setCurrentEmployeeId(employeeId);
    // setIsDisabled(false);

    console.log(event.target.value, employeeId);

    setEmail(event.target.value);

    //await query single client
    let currentEmployeeData = await getASingleEmployee();

    console.log(currentEmployeeData.data.employeeById);

    setPrevEmployeeData(currentEmployeeData.data.employeeById);

    console.log(prevEmployeeData?.email + "hi there");
    resetForm();
   
  }
// console.log(currentInput)
  return (
    <Container>
      <Form
        // id={`#collapse-employee-${index}`}
        data-editemployeeid={prevEmployeeData?._id}
        className="py-3 overflow-auto custom-about"
        onSubmit={(event) => {
          event.preventDefault();
          let empId = event.currentTarget.getAttribute("data-editemployeeid");
          console.log(empId);
          setCurrentEmployeeId(empId);
          setCurrentInput({
            firstName,
            lastName,
            phone,
            email,
            isAdmin,
            isLocked,
          });
          resetForm();
          // window.location.reload();
        }}
      >
        <div id="example-collapse-text">
          <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>
              Select Client (to populate below)
            </Form.Label>
            <Form.Label
            className={`validation-color ${
              showEmailEmployeeValidation ? "show" : "hide"
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
              onChange={employeeEmailSelect}
            >
              <option>
                {firstName ? `${firstName} ${lastName}` : "Select"}
              </option>
              {emp?.employees?.map((emp, index) => (
                <option key={index} value={[emp.email, emp.firtsName, emp.lastName, emp.phone]} data-id={emp._id}>
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
              defaultValue={prevEmployeeData?.firstName}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
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
              defaultValue={prevEmployeeData?.lastName}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 form-length"
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
              plaintext="false"
              defaultValue={prevEmployeeData?.phone}
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3 form-length"
            //controlId={formId}
          >
            <div className="form-label">
              <Form.Label style={{ fontWeight: "bolder" }}>Email</Form.Label>
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
              placeholder="Employee Email"
              name="email"
              defaultValue={prevEmployeeData?.email}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              // required
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className="submit-button-style"
              variant="primary"
              type="submit"
              // disabled={!areAllFieldsFilled}
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
