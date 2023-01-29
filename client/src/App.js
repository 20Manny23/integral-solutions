import React from "react";
import Auth from "./utils/auth";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AdminPortal from "./pages/AdminPortal";
import ContactUs from "./pages/ContactForm";
import ShopLinks from "./pages/ShopLinks";
import WrongPage from "./pages/WrongPage";
import Login from "./pages/Login";
import EmployeePortal from "./pages/EmployeePortal";
// import EmployeeHours2 from "./components/Employee(Worker)/EmployeeHours2"
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import HoursMock from "./pages/HoursMock";

import { library } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  faDriversLicense,
  faSave,
  faLocationDot,
  faEnvelopeOpenText,
  faPhone,
  faCross,
  faAdd,
  faPencil,
  faTrash,
  faToggleOn,
  faToggleOff,
  faLocation,
  faShareNodes,
  faXmarkCircle,
  faSearch,
  faSpinner,
  faEye,
  faEyeSlash,
  faMap,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faDriversLicense,
  faSave,
  faLocationDot,
  faEnvelopeOpenText,
  faPhone,
  faCross,
  faAdd,
  faPencil,
  faEdit,
  faToggleOn,
  faToggleOff,
  faTrash,
  faLocation,
  faShareNodes,
  faXmarkCircle,
  faSearch,
  faSpinner,
  faEye,
  faEyeSlash,
  faMap
);

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/graphql"
      : "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  if (!Auth.loggedIn()) {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/shoplinks" element={<ShopLinks />} />
              <Route exact path="/contact" element={<ContactUs />} />
              {/* <Route exact path="/resetpassword" element={<ResetPassword />} /> */}

              <Route
                exact
                path="/login"
                element={
                  <Login
                    renderPanel={"login"}
                    // messageButtonIsActive={false}
                    loginButtonIsActive={true}
                  />
                }
              />
              {/* <Route
                exact
                path="/signup"
                element={
                  <Login
                    renderPanel={"signup"}
                    messageButtonIsActive={false}
                    loginButtonIsActive={false}
                    
                  />
                }
              /> */}
              <Route
                exact
                path="/forgotpassword"
                // element={<ForgotPassword renderPanel={"forgotpassword"} />}
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/resetpassword/:token"
                // element={<ResetPassword renderPanel={"resetpassword"} />}
                element={<ResetPassword />}
              />
              <Route path="*" element={<WrongPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              {/* <Route
                exact
                path="/messages"
                element={
                  <Login
                    renderPanel={"messages"}
                    messageButtonIsActive={true}
                    loginButtonIsActive={false}
                    signupButtonIsActive={false}
                  />
                }
              /> */}
              <Route
                exact
                path="/login"
                element={
                  <Login
                    renderPanel={"login"}
                    // messageButtonIsActive={false}
                    loginButtonIsActive={true}
                  />
                }
              />
              {/* <Route
                exact
                path="/signup"
                element={
                  <Login
                    renderPanel={"signup"}
                    messageButtonIsActive={false}
                    loginButtonIsActive={false}
                    signupButtonIsActive={true}
                  />
                }
              /> */}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/forgotpassword"
                  element={<ForgotPassword />}
                />
              )}

              <Route
                exact
                path="/resetpassword/:token"
                element={<ResetPassword />}
              />

              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/calendar"
                  element={
                    <AdminPortal
                      renderPanel={"calendar"}
                      calendarButtonIsActive={true}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/work-order"
                  element={
                    <AdminPortal
                      renderPanel={"workorder"}
                      calendarButtonIsActive={false}
                      workOrderButtonIsActive={true}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/employees"
                  element={
                    <AdminPortal
                      renderPanel={"employees"}
                      calendarButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={true}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {/* {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/admin-mock"
                  element={
                    <AdminPortal
                      renderPanel={"admin"}
                      calendarButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={true}
                    />
                  }
                />
              )} */}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/clientlist"
                  element={
                    <AdminPortal
                      renderPanel={"clientlist"}
                      calendarButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={true}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/employee"
                  element={
                    <EmployeePortal
                      renderPanel={"employee"}
                      pastOrFuture={"future"}
                      calendarButtonIsActive={true}
                      addemployeeButtonIsActive={true}
                      clientlistButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/past"
                  element={
                    <EmployeePortal
                      renderPanel={"past"}
                      pastOrFuture={"past"}
                      calendarButtonIsActive={false}
                      addemployeeButtonIsActive={false}
                      clientlistButtonIsActive={true}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/hoursadmin"
                  element={
                    <HoursMock
                      renderPanel={"hoursadmin"}
                      calendarButtonIsActive={false}
                      hoursAdminButtonIsActive={true}
                      addemployeeButtonIsActive={false}
                      clientlistButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/hours-mock"
                  element={
                    <HoursMock
                      renderPanel={"hoursmock"}
                      hoursButtonIsActive={false}
                      hoursAdminButtonIsActive={false}
                      hoursMockButtonIsActive={true}
                    />
                  }
                />
              )}

              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/hours"
                  element={
                    <HoursMock
                      renderPanel={"hours"}
                      hoursButtonIsActive={true}
                      calendarButtonIsActive={false}
                      addemployeeButtonIsActive={false}
                      clientlistButtonIsActive={false}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                      adminMockButtonIsActive={false}
                      hoursAdminButtonIsActive={false}
                    />
                  }
                />
              )}

              <Route exact path="/contact" element={<ContactUs />} />
              <Route exact path="/shoplinks" element={<ShopLinks />} />
              <Route path="*" element={<WrongPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
