import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
// import { NavStarsAsset } from "../components/NavStarsAsset";
// import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
// import { Navbar, Nav, Row, NavDropdown } from "react-bootstrap";
import { Navbar, Nav, Row } from "react-bootstrap";
import "../styles/navbar.css";
import logo from "../assets/images/integral-logo.png"


const AppNavbar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        className="shadow-sm"
        style={{ height: "13%", backgroundColor: "#6362d4" }}
        // fixed="top"
        // variant="dark"
        expand="lg"
      >
        {/* <Container fluid className=""> */}
          <Navbar.Brand as={Link} reloadDocument to="/">
            <Row>
              {/* <NavStarsAsset className="mb-1 ml-0 pl-0 nav-stars-style" /> */}
              {/* <h2 className="m-0 pt-0 pl-3 heading-style">Integral Solutions</h2> */}
              
              <img className="logo d-inline-block align-top" src={logo} alt="logo"></img>
              {/* <h3 className="slogan">Fast, Reliable, Fair </h3> */}
            </Row>
          </Navbar.Brand>
          <Row>
            <Navbar.Toggle
              aria-controls="navbar"
              className="white toggle-style mr-3"
            />
          </Row>
          <Navbar.Collapse id="navbar" className="text-white">
            <Nav className="ml-auto">
              {/* if user is logged in show saved books & logout nav links else show login/signup modal */}
              {Auth.loggedIn() ? (
                <>
                  {/* section start */}
                  <Nav.Link
                    as={Link}
                    to="/landing-template-v1"
                    eventKey="4"
                    className="text-white"
                  >    
                    Landing_v1
                  </Nav.Link>              
                  <Nav.Link
                    as={Link}
                    to="/landing-template-v2"
                    eventKey="4"
                    className="text-white"
                  >
                    Landing_v2
                  </Nav.Link>            
                  <Nav.Link
                    as={Link}
                    to="/landing-template-v3"
                    eventKey="4"
                    className="text-white"
                  >
                    Landing_v3
                  </Nav.Link>
                  {/* section end */}
                  {/* <Nav.Link
                    as={Link}
                    to="/calendar"
                    eventKey="4"
                    className="text-white"
                  >
                    Dashboard
                  </Nav.Link>
                  <NavDropdown
                    id="nav-dropdown-example"
                    title={<span className="text-white">Forms</span>}
                    menuvariant="dark"
                  >
                    <NavDropdown.Item
                      // reloadDocument
                      as={Link}
                      to="/availability"
                      eventKey="5"
                    >
                      Availability
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/timeoff" eventKey="6">
                      Time Off Request
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/incident" eventKey="7">
                      Incident Report
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      reloadDocument
                      as={Link}
                      to="/incidentlist"
                      eventKey="8"
                    >
                      Incident List
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <Nav.Link onClick={Auth.logout} className="text-white">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    // reloadDocument
                    as={Link}
                    to="/login"
                    eventKey="10"
                    className="text-white"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    // reloadDocument
                    as={Link}
                    to="/signup"
                    eventKey="10"
                    className="text-white"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default AppNavbar;
