import React, { useState } from "react";
import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

import { Form, Button, Alert, InputGroup, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/button-home.css";

const LoginForm = () => {
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

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
        //get user information based on email address
        const { data } = await login({
          variables: { ...userFormData },
        });

        // if user is not locked then give access via Auth.login function
        if (data.login.employee.isLocked === false) {

        Auth.login(data.login);

        window.location.assign(`/`); //sends user back to home; on the home page the nav will display the nav links based on auth rights (isAdmin true or isAdmin false)
      // }

        } else {

          //if user is locked remove token from local storage & send to home page
          console.log("user is locked === true");
          localStorage.removeItem("id_token");
          window.location.assign(`/`);
          alert("You do not have employee access. Please contact Integral Solutions.")

        }

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
              type="text"
              placeholder="Your email address"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email.toLowerCase()}
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
                placeholder="Your password (5 character minimum)"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                minLength="5"
                name="password"
                onChange={handleInputChange}
                value={userFormData.password}
                required
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
            disabled={!(userFormData.email && userFormData.password)}
            className="mb-3 submit-button-style"
            type="submit"
            variant="success"
          >
            Submit
          </Button>
        </Form>
        <Nav.Item>
          <Nav.Link href="/forgotpassword" className="text-blue">
            Forgot Password?
          </Nav.Link>
        </Nav.Item>
      </div>

      {/* show alert if server response is bad */}
      {error && (
        <div className="d-flex justify-content-center">
          <Alert
            dismissible
            onClose={() => setShowAlert(false)}
            show={showAlert}
            variant="danger"
            className="mb-4 py-1 pl-1 bg-danger text-white"
            style={{ width: "300px" }}
          >
            <p className="" style={{ width: "200px" }}>
              Something went wrong with your login credentials!
            </p>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default LoginForm;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
 
// for reference ...
// console.log(data)
// console.log(data.login)
// console.log(data.login.token)
// const decoded = decode(data.login.token);
// console.log(decoded);
// console.log(Auth.decode(data.login.token));
