import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

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
        
        
        expand="lg"
      >
      
          <Navbar.Brand as={Link} reloadDocument to="/" className="">
          
              <img className="logo ml-4 mr-4" src={logo} alt="logo"></img>

          </Navbar.Brand>
          <Navbar.Brand className="slogan"style={{fontSize:'27px'}}>Office Furniture Installation At The Snap Of Your Fingers!</Navbar.Brand>
          <Row>
            <Navbar.Toggle
              aria-controls="navbar"
              className="white toggle-style mr-3"
            />
          </Row>
          <Navbar.Collapse id="navbar" className="">
            <Nav className="ml-auto">
              {/* if user is logged in show saved books & logout nav links else show login/signup modal */}
              {Auth.loggedIn() ? (
                <>
                  {/* section start */}
                  <Nav.Link
                    as={Link}
                    to="/landing"
                    eventKey="4"
                    className=""
                  >    
                    Landing
                  </Nav.Link>              
              
                  <Nav.Link
                    as={Link}
                    to="/calendar"
                    eventKey="4"
                    className=""
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
                  <Nav.Link onClick={Auth.logout} className="">
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                   
                    as={Link}
                    to="/login"
                    eventKey="10"
                    className=""
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    
                    as={Link}
                    to="/signup"
                    eventKey="10"
                    className=""
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
