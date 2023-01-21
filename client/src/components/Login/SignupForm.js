import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
// import { ADD_USER } from "../../utils/mutations";
import { SIGNUP_EMPLOYEE } from "../../utils/mutations";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/button-style.css";

import decode from "jwt-decode";

const SignupForm = ({ setShowModal }) => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  // const [addUser, { error }] = useMutation(ADD_USER);
  const [signupEmployee, { error }] = useMutation(SIGNUP_EMPLOYEE);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // const { data } = await addUser({
      //   variables: { ...userFormData },
      // });
      const { data } = await signupEmployee({
        variables: { ...userFormData },
      });

      console.log(data);
      console.log(data.signupEmployee);

      // Auth.login(data.addUser);
      Auth.login(data.signupEmployee);

      const decoded = decode(data.signupEmployee.token);
      console.log(decoded);

      // window.location.assign(`/dashboard`);
      window.location.assign(`/`);

    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
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
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="d-flex flex-column align-items-center">
        <Form
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
          className="mx-2 mt-2 mb-1"
          style={{ width: "280px" }}
        >
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>

            <InputGroup className="mb-3">
              <Form.Control
                type={showHidePassword}
                placeholder="Your password"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
                style={{ borderRight: "none" }}
              />
              <Form.Control.Feedback type="invalid">
                Password is required!
              </Form.Control.Feedback>

              <InputGroup.Text
                id="basic-addon1"
                style={{
                  borderRadius: "0%",
                  background: "white",
                  borderLeft: "none",
                }}
              >
                <FontAwesomeIcon
                  icon="fa-eye"
                  style={display ? isDisplayed : isNotDisplayed}
                  onClick={() => handlePassClick()}
                />
                <FontAwesomeIcon
                  icon="fa-eye-slash"
                  style={!display ? isDisplayed : isNotDisplayed}
                  onClick={() => handlePassClick()}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Button
            disabled={
              !(
                userFormData.email &&
                userFormData.password
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

      {/* show alert if server response is bad */}
      {error && (
        <div className="d-flex justify-content-center">
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            className="mt-0 mb-4 py-1 pl-1 bg-danger text-white"
            style={{ width: "300px" }}
          >
            <p className="" style={{ width: "200px" }}>
              Something went wrong with your signup!
            </p>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default SignupForm;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
