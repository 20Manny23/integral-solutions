import React, { useEffect, useState } from "react";
import Auth from "../../utils/auth";
import decode from "jwt-decode";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_EMPLOYEE_BYEMAIL } from "../../utils/queries";
import { UPDATE_EMPLOYEE} from "../../utils/mutations";
import { FORGOT_PASSWORD } from "../../utils/mutations";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/button-home.css";

function Employees() {
  // section get user using the email address
  const [employee, setEmployee] = useState({});
  // eslint-disable-next-line
  const { loading, data, error: getEmployeeError, refetch } = useQuery(QUERY_EMPLOYEE_BYEMAIL, {
    variables: { email: "a@a.com"},
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      // let schedule = data?.employeeByEmail;
      setEmployee(data?.employeeByEmail);
      console.log('hello = ', data?.employeeByEmail);
    },
  });
  // section end

  // section set temporary password to be used to construct the token
  const [updatePassword, { error: passwordError }] = useMutation(UPDATE_EMPLOYEE);
  
  const setPassword = async () => {
    console.log('reset password = ')
    try {
      const { data } = await updatePassword({
        variables: { ...employee, password: "300" }
      })
    } catch (e) {
      console.error(e);
    }
  };

  // set temp password when employee state is updated (query retrieves employee info)
  // useEffect(() => {
  //   setTempPassword();
  // }, [employee]);
  // section end

  // section Rods Code
  const [ userFormData, setUserFormData ] = useState({ email: "a@a.com", password: "12" });
  const [ forgotPassword, { error } ] = useMutation(FORGOT_PASSWORD);
  const [ payLoadToken, setPayLoadToken ] = useState({});

  const [validated] = useState(false);
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
      return false;
    }

    await refetch();

    // setTempPassword to populate the token 
    await setPassword();

    // create token payload
    let payload = {email: userFormData.email, password: '300'};
    console.log('payload ', payload);

    // create new token using the forgotPassword mutation
    try {
      const { data } = await forgotPassword({
        variables: { ...payload },
      });

      // let payLoadToken = { token: data.forgotPassword.token }
      setPayLoadToken({token: data.forgotPassword.token});
      console.log(data.forgotPassword.token)
      
      // decode token to check contents
      const decoded = decode(data.forgotPassword.token);
      console.log(decoded);

      // Don't save token to local storage at that will log the user id
      // Auth.login(payLoadToken);

      // Bring user back to login page
      // window.location.assign(`/login`);

    } catch (e) {
      console.error('error = ', e);
      setShowAlert(true);
    }

    setUserFormData({
      email: "",
    });

  };

  // After payLoadToken state is updated, launch email to user
  useEffect(() => {
    sendEmail(payLoadToken);
  // eslint-disable-next-line
  }, [payLoadToken]);
  

  const sendEmail = (token) => {
    window.open(
      `mailto:${userFormData.email}?subject=Password Reset&body=Click on this link to create a new pasword: http://localhost:3000/resetpassword/${payLoadToken.token}`
    )
  }
  // section end rods code

  return (
    <>
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
    </>
  );
}

export default Employees;
