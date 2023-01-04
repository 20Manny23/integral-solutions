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
          <Navbar.Brand as={Link} reloadDocument to="/" className="">
          
              <img className="logo ml-4 mr-4" src={logo} alt="logo"></img>

          </Navbar.Brand>
          <p className="slogan">Office Furniture Installation At The Snap Of Your Fingers!</p>
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
                  {/* <Nav.Link
                    as={Link}
                    to="/landing-template-v2"
                    eventKey="4"
                    className="text-white"
                  > 
                    Landing_v2
                  </Nav.Link>             */}
                  <Nav.Link
                    as={Link}
                    to="/calendar"
                    eventKey="4"
                    className="text-white"
                  > 
                    Calendar
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
                   
                    as={Link}
                    to="/login"
                    eventKey="10"
                    className="text-white"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    
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
       
      </Navbar>
    </>
  );
};

export default AppNavbar;
