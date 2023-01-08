import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../../utils/mutations";
import { FORGOT_PASSWORD } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "../../styles/button-home.css";



const ForgotPassword = () => {
  const token = Auth.getToken();

  const [userFormData, setUserFormData] = useState({ email: "" });
  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);

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
    // if (!validateEmail(userFormData.email)) {
    //   return false;
    } else {
      launchEmail();
    }

    try {
      const { data } = await forgotPassword({
        variables: { ...userFormData },
      });

      // Auth.login(data.login.token);
      Auth.login(data.token);

      // window.location.assign(`/calendar`);
      window.location.assign(`/landing-template-v1`);

    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
    });
  };

  const launchEmail = () => {
    window.open(
      `mailto:${userFormData.email}?subject=Password Reset&body=Click on this link to create a new pasword: http://localhost:3000/resetpassword/${token}`
    )

  }

  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <div className="d-flex flex-column align-items-center">
        <Form
          noValidate
          validated={validated}
          // onSubmit={handleFormSubmit}
          className="mx-2 mt-2 mb-1"
          style={{ width: "280px" }}
        >
          <Form.Group>
            <Form.Label htmlFor="email">Enter your email</Form.Label>
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

          <Button
            disabled={!(userFormData.email)}
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

export default ForgotPassword;
