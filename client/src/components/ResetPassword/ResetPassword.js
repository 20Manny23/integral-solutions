import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import decode from "jwt-decode";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_EMPLOYEE_BYEMAIL } from "../../utils/queries";
import { UPDATE_PASSWORD } from "../../utils/mutations";

import { Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/button-home.css";

const ResetPassword = () => {
  const [validated] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    password: "",
    passwordCheck: "",
  });

  // section get token from URL
  let params = useParams();

  // section decode token to get current user email address
  const decoded = decode(params.token); 

  // section use email address to get user information
  const [employee, setEmployee] = useState({});
  const { //fix
    // eslint-disable-next-line
    loading,
    // eslint-disable-next-line
    data,
    // eslint-disable-next-line
    error: getEmployeeError,
    // eslint-disable-next-line
    refetch,
  } = useQuery(QUERY_EMPLOYEE_BYEMAIL, {
    variables: { email: decoded.data.email },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      setEmployee(data?.employeeByEmail);
    },
  });

  // section reset password based on input provided by user
  // eslint-disable-next-line
  const [updatePassword, { error: passwordError }] =
    useMutation(UPDATE_PASSWORD);

  const setPassword = async () => {

    try {
      const { data } = await updatePassword({
        variables: {
          id: employee?._id,
          password: passwordFormData.password,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  // set temp password when employee state is updated (query retrieves employee info)
  useEffect(() => {
    setPassword();
  // eslint-disable-next-line
  }, [employee]);

  //section handle input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordFormData({ ...passwordFormData, [name]: value });
  };

  //section handle submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      await refetch();
      window.location.assign(`/login`);
    } catch (e) {
      console.error(e);
      // setShowAlert(true);
    }

    // setPasswordFormData({
    //   password: "",
    //   passwordCheck: "",
    // });
  };

  const [display, setDisplay] = useState(true);
  const [showHidePassword, setShowHidePassword] = useState("password");

  const handlePassClick = () => {
    setDisplay(!display);
    if (showHidePassword === "password") {
      setShowHidePassword("test");
    } else {
      setShowHidePassword("password");
    }
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-3">
        <div className="d-flex flex-column align-items-center box-making">
          <h2>Reset Password</h2>
          <p style={{ textAlign: "center" }}>
            This will assign a new password to your account.{" "}
          </p>

          <Form
            noValidate
            validated={validated}
            onSubmit={handleFormSubmit}
            className="mx-2 mt-2 mb-1"
            style={{ width: "280px" }}
          >
            <Form.Group style={{ marginTop: "25px" }}>
              <Form.Label htmlFor="password">Create new password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={showHidePassword}
                  placeholder="Password (5 character minimum)"
                  minLength="5"
                  name="password"
                  onChange={handleInputChange}
                  value={passwordFormData.password}
                  required
                  autoComplete="true"
                  style={{ borderRight: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  <p>Password is required!</p>
                </Form.Control.Feedback>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{
                    borderRadius: "0px 4px 4px 0px",
                    background: "white",
                    borderLeft: "none",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-eye"
                    onClick={() => handlePassClick()}
                    style={display ? isDisplayed : isNotDisplayed}
                  />
                  <FontAwesomeIcon
                    icon="fa-eye-slash"
                    onClick={() => handlePassClick()}
                    style={!display ? isDisplayed : isNotDisplayed}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="passwordCheck">Re-enter password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={showHidePassword}
                  placeholder="password"
                  name="passwordCheck"
                  onChange={handleInputChange}
                  value={passwordFormData.passwordCheck}
                  required
                  autoComplete="true"
                  style={{ borderRight: "none" }}
                />
                <Form.Control.Feedback type="invalid">
                  <p>Password is required!</p>
                </Form.Control.Feedback>
                <InputGroup.Text
                  id="basic-addon2"
                  style={{
                    borderRadius: "0px 4px 4px 0px",
                    background: "white",
                    borderLeft: "none",
                  }}
                >
                  <FontAwesomeIcon
                    icon="fa-eye"
                    onClick={() => handlePassClick()}
                    style={display ? isDisplayed : isNotDisplayed}
                  />
                  <FontAwesomeIcon
                    icon="fa-eye-slash"
                    onClick={() => handlePassClick()}
                    style={!display ? isDisplayed : isNotDisplayed}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button
              disabled={
                !(
                  passwordFormData.password !== "" &&
                  passwordFormData.password === passwordFormData.passwordCheck
                )
              }
              className="mb-3 submit-button-style"
              type="submit"
              variant="success"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
