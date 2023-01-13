import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Collapse, Container } from "react-bootstrap";
import Auth from "../../utils/auth";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_ALL_EMPLOYEES,
  QUERY_SINGLE_EMPLOYEE,
} from "../../utils/queries";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../../utils/mutations";
import "../../styles/Forms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmployeeList() {
  const [open, setOpen] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);

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
  const [showEmailEmployeeValidation, setShowEmailEmployeeStateValidation] = useState(false);

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

  const [getASingleEmployee, { loading: lazyLoading, data: singleEmployee }] =
    useLazyQuery(QUERY_SINGLE_EMPLOYEE, {
      variables: { employeeId: currentEmployeeId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleEmployee) => {
        setCurrentEmployee(singleEmployee);
      },
    });

  const getElement = (event) => {
    let currentCollapseTarget = event.currentTarget.getAttribute("data-target");
    let currentCollapseTable = document.getElementById(currentCollapseTarget);
    // console.log(currentAvailTarget);

    if (currentCollapseTable.classList.contains("show")) {
      currentCollapseTable.classList.remove("show");
      setOpenEmployee(false);
    } else {
      currentCollapseTable.classList.add("show");
      setOpenEmployee(true);
    }
  };

  //SECTION HANDLE TOGGLE
  // const [adminToggle, setAdminToggle] = useState(true);
  // const [lockedToggle, setLockedToggle] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  // const handleToggle = (toggle) => {
  //   toggle === "admin"
  //     ? setAdminToggle(!adminToggle)
  //     : setLockedToggle(!lockedToggle);

  //   // if (showHidePassword === "password") {
  //   //   setShowHidePassword("test");
  //   // } else {
  //   //   setShowHidePassword("password");
  //   // }
  // };

  //Ternary to handle the change in inputs
  
  //SECTION HANDLE INPUT
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e)

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

  //SECTION ADD EMPLOYEE
  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: ["getAllEmployees"],
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
      isLocked,
    )

    try {
      // eslint-disable-next-line
      const { data } = await addEmployee({
        variables: {
          email,
          firstName,
          lastName,
          password,
          phone,
          isAdmin: false,
          isLocked: false,
        },
      });
    } catch (err) {
      console.error(err);
    }

    empRefetch();

    // resetForm();

    // if ()
    // handleUpdateForDisabled(null, firstName, "addEmployee");
  };
  const resetForm = () => {
    setEmail("");
    setPhone("");
    setFirstName("");
    setLastName("");
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

  //SECTION UPDATE EMPLOYEE
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  useEffect(() => {
    if (currentEmployeeId && currentInput) {
      handleEditEmployeeSubmit();
    }

    // eslint-disable-next-line
  }, [currentEmployeeId, currentInput]);

  const handleEditEmployeeSubmit = async () => {
    // event.preventDefault();

    let test = await getASingleEmployee();
    console.log("test = ", test);

    try {
      await updateEmployee({
        variables: {
          id: currentEmployeeId,
          email: currentInput.email
            ? currentInput.email
            : test.data.employee.email,
          phone: currentInput.phone
            ? currentInput.phone
            : test.data.employee.phone,
          firstName: currentInput.firstName
            ? currentInput.firstName
            : test.data.employee.firstName,
          lastName: currentInput.lastName
            ? currentInput.lastName
            : test.data.employee.lastName,
          isLocked: currentInput.isLocked
            ? currentInput.isLocked
            : test.data.employee.isLocked,
          isAdmin: currentInput.isAdmin
            ? currentInput.isAdmin
            : test.data.employee.isAdmin,
        },
      });
    } catch (err) {
      console.log(err);
    }

    empRefetch();
  };

  //SECTION DISABLE UPDATE EMPLOYEE
  const [updateEmployeeDisabled, setUpdateEmployeeDisabled] = useState({});

  useEffect(() => {
    let fields = document.querySelectorAll("fieldset");
    console.log(fields);

    var newObj = {};
    for (var i = 0; i < fields.length; i++) {
      newObj[fields[i].dataset.email] = true;
    }

    setUpdateEmployeeDisabled(newObj);

    console.log(newObj);
    console.log(updateEmployeeDisabled);
  // eslint-disable-next-line
  }, []);

  const handleUpdateForDisabled = (event, firstName, addEmployee) => {
    let currentName = firstName
      ? firstName
      : event.currentTarget.getAttribute("data-firstname");
    let keys = document.querySelectorAll("fieldset");

    console.log(currentName);
    console.log("keys = ", keys);

    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i].dataset.firstName);
      console.log(updateEmployeeDisabled[keys[i].dataset.firstName]);

      if (keys[i].dataset.firstName === currentName) {
        newObj[keys[i].dataset.firstName] =
          !updateEmployeeDisabled[keys[i].dataset.firstName];
      } else if (addEmployee === "addEmployee") {
        newObj[keys[i].dataset.firstName] = true;
      } else {
        newObj[keys[i].dataset.firstName] = true;
      }
    }

    setUpdateEmployeeDisabled(newObj);

    console.log(newObj);
    console.log(updateEmployeeDisabled);
  };

  // SECTION DELETE EMPLOYEE
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  const handleDeleteEmployee = async (event) => {
    let employeeId = event.currentTarget.getAttribute("data-employeeid");

    try {
      // eslint-disable-next-line
      await deleteEmployee({
        variables: {
          id: employeeId,
        },
      });

      // REFETCH EMPLOYEES
      empRefetch();
    } catch (err) {
      console.log(err);
    }
  };
  // SECTION END DELETE EMPLOYEE

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              onSubmit={handleAddEmployeeSubmit}
              style={{ maxWidth: "80vw" }}
            >
              <Collapse 
                in={open}
                className=" pb-2 
                  flex-column 
                  align-self-center 
                  align-items-center 
                  shadow 
                  rounded-lg 
                  border 
                  border-secondary"
              >
                <div id="collapse-text ">
                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label
                        style={{ fontWeight: "bolder", marginTop: "10px" }}
                      >
                        First Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Employee Name"
                      name="firstName"
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label
                        style={{ fontWeight: "bolder", marginTop: "10px" }}
                      >
                        Last Name
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="text"
                      placeholder="Enter Last Name"
                      name="lastName"
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
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
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="ex 555-555-5555"
                      name="phone"
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Email Address
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="email"
                      placeholder="Enter Email Address"
                      name="email"
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3 form-length"
                    controlId="formBasicEmail"
                  >
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Password
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="password"
                      placeholder="Setup Employee Password"
                      name="password"
                      onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    style={{ marginBottom: "15px" }}
                    className="button-custom submit-button-style"
                    variant="primary"
                    type="submit"
                    title="Enter all fields to send email"
                  >
                    Add Employee
                  </Button>
                </div>
              </Collapse>
            </Form>
          </Col>
        </Row>
      </div>
      <Container
        style={{ border: "1px solid black" }}
        className="pb-2 d-flex flex-column align-self-center shadow rounded-lg border border-secondary"
      >
        <div className="d-flex justify-content-between">
          <h3 style={{ textAlign: "center" }}>Employee List</h3>

          <button
            style={{
              marginBottom: "25px",
              border: "none",
              backgroundColor: "white",
            }}
            className="p-2"
            onClick={() => setOpen(!open)}
          >
            Add New ➕
          </button>
        </div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {emp?.employees?.map((emp, index) => (
            <div id="accordion" key={index} style={{ width: "98%" }}>
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
                    <span style={{ paddingTop: "7px", fontSize: "12px" }}>
                      Edit
                    </span>
                    <FontAwesomeIcon
                      icon="fa-pencil"
                      className="p-2 fa-lg"
                      onClick={handleUpdateForDisabled}
                    />
                    {/* ADMIN TOGGLE */}
                    {/* <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      // onClick={() => console.log("toggle-on")}
                      onClick={() => handleToggle("admin")}
                      style={adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      onClick={() => handleToggle("admin")}
                      style={!adminToggle ? isDisplayed : isNotDisplayed}
                    />
                    {/* LOCKED TOGGLE */}
                    {/* <FontAwesomeIcon
                      icon="fa-toggle-on"
                      className="p-2"
                      onClick={() => handleToggle("locked")}
                      style={lockedToggle ? isDisplayed : isNotDisplayed}
                    />
                    <FontAwesomeIcon
                      icon="fa-toggle-off"
                      className="p-2"
                      // onClick={() => console.log("toggle-off")}
                      onClick={() => handleToggle("locked")}
                      style={!lockedToggle ? isDisplayed : isNotDisplayed}
                    />  */}
                    <span style={{ paddingTop: "7px", fontSize: "12px" }}>
                      Delete
                    </span>
                    <FontAwesomeIcon
                      icon="fa-trash"
                      className="p-2 fa-lg"
                      data-employeeid={emp?._id}
                      onClick={(event) => {
                        handleDeleteEmployee(event);
                      }}
                    />
                  </div>
                </div>

                <Collapse>
                  <Form
                    id={`#collapse-employee-${index}`}
                    data-editemployeeid={emp?._id}
                    className="py-3 overflow-auto custom-about"
                    onSubmit={(event) => {
                      event.preventDefault();
                      let clientId = event.currentTarget.getAttribute(
                        "data-editemployeeid"
                      );
                      setCurrentEmployeeId(clientId);
                      setCurrentInput({
                        firstName,
                        lastName,
                        phone,
                        email,
                        isAdmin,
                        isLocked,
                      });
                    }}
                    // style={{ width: "80vw" }}
                  >
                    <fieldset
                      data-employeeid={emp?._id}
                      disabled={
                        updateEmployeeDisabled === {}
                          ? true
                          : updateEmployeeDisabled[emp?._id]
                      }
                    >
                      <div id="example-collapse-text">
                        <Form.Group
                          className="mb-3 form-length"
                          controlId="formBasicEmail"
                        >
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
                            defaultValue={emp?.firstName}
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
                            name="LastName"
                            defaultValue={emp?.lastName}
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
                            defaultValue={emp?.phone}
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
                            defaultValue={emp?.email}
                            onChange={handleInputChange}
                            onBlur={handleBlurChange}
                            // required
                          />
                        </Form.Group>
                        <Row
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Form.Group>
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              Admin Access
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Blue for Yes"
                            />
                          </Form.Group>

                          <Form.Group style={{ marginLeft: "30px" }}>
                            <Form.Label style={{ fontWeight: "bolder" }}>
                              Active Employee
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="custom-switch"
                              label="Blue for Yes"
                            />
                          </Form.Group>
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

                    {/* <div>Email: {emp?.email}</div>
                    <div>Phone: {emp?.phone}</div>
                    <div>isAdmin: {emp?.isAdmin ? "True" : "False"}</div>
                    <div>isLocked: {emp?.isLocked ? "True" : "False"}</div>
                    {emp?.schedule.map((job, index) => (
                      <div key={index}>
                        <div>Client: {job?.client.firstName}</div>
                        <div>Start Date: {job?.startDate}</div>
                        <div>Start Time: {job?.startTime}</div>
                        <div>End Date: {job?.endDate}</div>
                        <div>Job Details: {job?.jobDetails}</div>
                        <div>
                          Number of Clients: {job?.numberOfClientEmployees}
                        </div>
                      </div>
                    ))} */}
                  </Form>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default EmployeeList;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
