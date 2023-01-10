import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { useParams } from "react-router-dom";
import decode from "jwt-decode";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { UPDATE_EMPLOYEE} from "../../utils/mutations";
import { QUERY_EMPLOYEE_BYEMAIL } from "../../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import "../../styles/button-home.css";

const ResetPassword = () => {
  const [ validated ] = useState(false);
  const [ showAlert, setShowAlert ] = useState(false);
  const [ passwordFormData, setPasswordFormData ] = useState({ password: "", passwordCheck: "" });
  console.log(passwordFormData);

  // section get token from URL
  let params = useParams();
  console.log(params);

  // section decode token to check contents
  const decoded = decode(params.token);
  console.log(decoded);

  // section use email address to get user information
  const [employee, setEmployee] = useState({});
  // eslint-disable-next-line
  const {loading, data, error: getEmployeeError, refetch } = useQuery(QUERY_EMPLOYEE_BYEMAIL, {
    variables: { email: decoded.data.email },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      setEmployee(data?.employeeByEmail);
      console.log("hello = ", data?.employeeByEmail);
    },
  });
  // section end

  // section set temporary password to be used to construct the token
  const [updatePassword, { error: passwordError }] = useMutation(UPDATE_EMPLOYEE);
  
  const setPassword = async () => {
    console.log('reset password = ', passwordFormData)
    try {
      const { data } = await updatePassword({
        variables: { ...employee, password: passwordFormData.password }
      })
    } catch (e) {
      console.error(e);
    }
  };

  // set temp password when employee state is updated (query retrieves employee info)
  useEffect(() => {
    setPassword();
  }, [employee]);
  // section end

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('inputChange = ', name,value, event.target);
    setPasswordFormData({ ...passwordFormData, [name]: value });
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
      await refetch();

      window.location.assign(`/login`);

    } catch (e) {
      console.error(e);
      setShowAlert(true);
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
            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showHidePassword}
                placeholder="password"
                name="password"
                onChange={handleInputChange}
                value={passwordFormData.password}
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
            <Form.Label htmlFor="passwordCheck">Re-enter Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={showHidePassword}
                placeholder="password"
                name="passwordCheck"
                onChange={handleInputChange}
                value={passwordFormData.passwordCheck}
                required
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
            // disabled={!(passwordFormData.email && passwordFormData.password)}
            className="mb-3 submit-button-style"
            type="submit"
            variant="success"
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>

      {/* show alert if server response is bad */}
      {/* {error && (
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
      )} */}
    </div>
  );
};

export default ResetPassword;

const isDisplayed = {
  display: "block",
};

const isNotDisplayed = {
  display: "none",
};
