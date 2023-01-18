import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import decode from "jwt-decode";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EMPLOYEE_BYEMAIL } from "../../utils/queries";
import { UPDATE_EMPLOYEE } from "../../utils/mutations";
import { FORGOT_PASSWORD } from "../../utils/mutations";

import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/button-home.css";
import logo from "../../assets/images/logo.bkg.png";
import Footer from "../Home/Footer";

function Employees() {
  const [tempPassword] = useState('200');
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  // section get user using the email address
  const [employee, setEmployee] = useState({});


  // eslint-disable-next-line
  const { loading, data, error: getEmployeeError, refetch } = useQuery(QUERY_EMPLOYEE_BYEMAIL, {
    variables: { email: userFormData?.email },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      console.log('hello = ', data?.employeeByEmail);
      setEmployee(data?.employeeByEmail);
      console.log('hello employee = ', employee);
    },
  });
  // section end

  // section set temporary password to be used to construct the token
  const [updatePassword, { error: passwordError }] = useMutation(UPDATE_EMPLOYEE);

  const setPassword = async () => {
    console.log('reset password = ', employee)
    try {
      const { data } = await updatePassword({
        variables: { 
          id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          password: tempPassword }
      })
    } catch (e) {
      console.error(e);
    }
    // console.log(data);
  };

  // set temp password when employee state is updated (query retrieves employee info)
  useEffect(() => {
    setPassword();
    // eslint-disable-next-line
  }, [employee]);
  // section end

  // section Rods Code
  const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);
  const [payLoadToken, setPayLoadToken] = useState({});

  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

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
      return false;
    }

    await refetch();

    // create token payload
    let payload = { email: userFormData.email, password: tempPassword };
    console.log('payload ', payload);

    // create new token using the forgotPassword mutation
    try {
      const { data } = await forgotPassword({
        variables: { ...payload },
      });

      // let payLoadToken = { token: data.forgotPassword.token }
      setPayLoadToken({ token: data.forgotPassword.token });
      console.log(data.forgotPassword.token)

      // decode token to check contents
      const decoded = decode(data.forgotPassword.token);
      console.log(decoded);  // decoded jwt delivers model fields and expiration data

      // Don't save token to local storage at that will log the user id
      // Auth.login(payLoadToken);

      // Bring user back to login page
      // window.location.assign(`/login`);
      if (!employee.email) {
        setShowError(true);
      } else {
        setShowAlert(true);
      }
      

    } catch (e) {
      console.error('error = ', e);
      setShowAlert(true);
    }

    // setUserFormData({
    //   email: "",
    // });

  };

  // After payLoadToken state is updated, launch email to user
  useEffect(() => {
    sendEmail(payLoadToken);
    // eslint-disable-next-line
  }, [payLoadToken]);



  const sendEmail = (token) => {
    const url = `http://localhost:3000/resetpassword/${token.token}`;
    window.open(
      `mailto:${userFormData.email}?subject=Integral Solutions Employee Password Reset&body=Hello ${employee.firstName} %0D%0A%0D%0A Click on the link below to create a new pasword: %0D%0A%0D%0A ${url} %0D%0A%0D%0A This link will expire in 15 minutes. %0D%0A%0D%0A Thank you, %0D%0A%0D%0A Integral Solutions`
    )
  }
  // section end rods code

  return (
    <>
      <div className="d-flex flex-column align-items-center mt-3">
        <div className="d-flex flex-column align-items-center box-making"  >
          <h2>Forgot Password</h2>
          <p style={{textAlign:'center'}}>You will recieve an email with instructions to reset your password <br></br>if an account exists with this email address.  </p>
          <Form
            noValidate
            validated={validated}
            // onSubmit={handleFormSubmit}
            className="mx-2 mt-2 mb-1"
            style={{ width: "280px" }}
          >
            <Form.Group style={{ marginTop: "25px" }}>
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
            style={{marginRigt:'auto', marginLeft:'auto'}}
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
        <Alert 
        dismissible
        onClose={() => setShowError(false)}
        variant="success"
        show={showError}
        className="mb- py-1 pl-3 bg-success text-white"
        stlye={{ alignContent: "center" }}
          >
          <p style={{ width: "200px", padding: "8px", marginTop: "5px"}}>Email has been sent to <br></br>{userFormData.email}</p>
          
        </Alert>

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
              <p className="" style={{ width: "200px", padding: "10px", marginTop: "5px" }}>
                Email failed to send. Make sure to use the same email address you created your account with
              </p>
              
            </Alert>
          </div>
        )}
        {/* <img src={logo} alt="large logo"
        style={{borderRadius:'55%', marginTop:'20px'}}></img> */}
        
      </div>
      <Footer></Footer>
    </>
  );
}

export default Employees;
