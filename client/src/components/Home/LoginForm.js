import React, { useState } from "react";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/button-home.css";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // let navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      // Auth.login(data.login.token);
      Auth.login(data.login);

      window.location.assign(`/calendar`);

    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
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
              placeholder="Your email"
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
                <p>Password is required!</p>
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
            disabled={!(userFormData.email && userFormData.password)}
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
