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
import ShopLinks from "./pages/ShopLinks";
import ContactUs from "./pages/ContactForm";
import Login from "./pages/Login";
import AdminPortal from "./pages/AdminPortal";
import EmployeePortal from "./pages/EmployeePortal";
import WrongPage from "./pages/WrongPage";

import Navbar from "./components/Navbar";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

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
              <Route exact path="/shop-links" element={<ShopLinks />} />
              <Route exact path="/contact-us" element={<ContactUs />} />
              <Route
                exact
                path="/login"
                element={
                  <Login
                    renderPanel={"login"}
                    loginButtonIsActive={true}
                  />
                }
              />
              <Route
                exact
                path="/forgotpassword"
                element={<ForgotPassword />}
              />
              <Route
                exact
                path="/resetpassword/:token"
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
              <Route
                exact
                path="/login"
                element={
                  <Login
                    renderPanel={"login"}
                    
                    loginButtonIsActive={true}
                  />
                }
              />
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/jobs-panel"
                  element={
                    <AdminPortal
                      renderPanel={"workorder"}
                      workOrderButtonIsActive={true}
                      employeeListButtonIsActive={false}
                      clientListButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/employees-panel"
                  element={
                    <AdminPortal
                      renderPanel={"employees"}
                      workOrderButtonIsActive={false}
                      employeeListButtonIsActive={true}
                      clientListButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isAdmin() && !Auth.isLocked() && (
                <Route
                  exact
                  path="/client-panel"
                  element={
                    <AdminPortal
                      renderPanel={"clientlist"}
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
                  path="/upcoming-jobs"
                  element={
                    <EmployeePortal
                      renderPanel={"employee"}
                      pastOrFuture={"future"}
                      upcomingJobsButtonIsActive={true}
                      pastJobsButtonIsActive={false}
                      hoursButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/past-jobs"
                  element={
                    <EmployeePortal
                      renderPanel={"past"}
                      pastOrFuture={"past"}
                      upcomingJobsButtonIsActive={false}
                      pastJobsButtonIsActive={true}
                      hoursButtonIsActive={false}
                    />
                  }
                />
              )}
              {Auth.isLocked() === false && (
                <Route
                  exact
                  path="/employee-hours"
                  element={
                    <EmployeePortal
                      renderPanel={"hours"}
                      upcomingJobsButtonIsActive={false}
                      pastJobsButtonIsActive={false}
                      hoursButtonIsActive={true}
                    />
                  }
                />
              )}
              <Route exact path="/contact-us" element={<ContactUs />} />
              <Route exact path="/shop-links" element={<ShopLinks />} />
              <Route path="*" element={<WrongPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
