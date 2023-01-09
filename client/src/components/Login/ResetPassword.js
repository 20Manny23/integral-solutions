import React, { useState } from "react";
import Auth from "../../utils/auth";
import { useParams } from "react-router-dom";
import decode from "jwt-decode";
import { LOGIN_USER } from "../../utils/mutations";
import { Form, Button, Alert } from "react-bootstrap";
import "../../styles/button-home.css";

// section
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { UPDATE_EMPLOYEE} from "../../utils/mutations";
import { QUERY_EMPLOYEE_BYEMAIL } from "../../utils/queries";
// section end

const ResetPassword = () => {
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
    variables: { email: "a@a.com" },
    // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
    skip: !Auth.loggedIn(),
    onCompleted: (data) => {
      // let schedule = data?.employeeByEmail;
      setEmployee(data?.employeeByEmail);
      console.log("hello = ", data?.employeeByEmail);
    },
  });
  // section end

  // section set temporary password to be used to construct the token
  const [updatePassword, { error: passwordError }] = useMutation(UPDATE_EMPLOYEE);
  
  const setPassword = async () => {
    console.log('reset password = ')
    try {
      const { data } = await updatePassword({
        variables: { ...employee, password: "400" }
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
      // const { data } = await login({
      //   variables: { ...userFormData },
      // });

      // get user data
      await refetch();
      // console.log(employee)

      // reset password
      await setPassword();

      // Auth.login(data.login.token);
      // Auth.login(data.login);

      // window.location.assign(`/calendar`);
      // window.location.assign(`/landing-template-v1`);

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
            <Form.Label htmlFor="email">Enter New Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="password"
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
            <Form.Label htmlFor="email">Re-enter Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="password"
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
            // disabled={!(userFormData.email && userFormData.password)}
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

export default ResetPassword;
