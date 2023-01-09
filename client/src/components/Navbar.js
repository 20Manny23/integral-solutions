import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav, Row } from "react-bootstrap";
import "../styles/navbar.css";
import logo from "../assets/images/integral-logo-no-text.png";

const AppNavbar = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        className="shadow-sm navs"
        style={{backgroundColor: "#6362d4" }}
        expand="lg"
      >
        <Navbar.Brand as={Link} reloadDocument to="/" className="">
          <img className="logo ml-4 " src={logo} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Brand className="slogan" style={{ fontSize: "30px", color:'#34303D' }}>
          {/* Office Furniture Installation At The Snap Of Your Fingers! */}
          Integral Solutions
        </Navbar.Brand>
        <Row>
          <Navbar.Toggle
            aria-controls="navbar"
            className="white toggle-style mr-3"
          />
        </Row>
        <Navbar.Collapse id="navbar" className="">
          <Nav className="ml-auto">
            {Auth.loggedIn() && Auth.isAdmin() === true && Auth.isLocked() === false ? ( 
              // User is loggedIn and isAdmin
              // isAdmin explicity set to true to eliminate null values
              // access to home, adm portal, employee portal, logout
              <>
                <Nav.Link className='navlink'as={Link} to="/home" eventKey="4" >
                  Home
                </Nav.Link>
                <Nav.Link className='navlink'as={Link} to="/calendar" eventKey="4">
                  Admin
                </Nav.Link>
                <Nav.Link className='navlink'as={Link} to="/employee" eventKey="10" >
                  Employee
                </Nav.Link>
                <Nav.Link className='navlink'onClick={Auth.logout} eventKey="4" >
                  Logout
                </Nav.Link>
              </>
            ) : Auth.loggedIn() && Auth.isAdmin() === false  && Auth.isLocked() === false ? (
              // User is logged in and is not Admin
              // isAdmin explicity set to true to eliminate null values
              // access to home, employee portal, logout
              <>
                <Nav.Link  as={Link} to="/home" eventKey="4" className="navlink">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/employee" eventKey="10" className="navlink">
                  Employee
                </Nav.Link>
                <Nav.Link onClick={Auth.logout} eventKey="4" className="navlink">
                  Logout
                </Nav.Link>
              </>
            ) : (
              // User is not logged in; Home page nav
              <>
                <Nav.Link as={Link} to="/home" eventKey="4" className="navlink">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/shoplinks" eventKey="4" className="navlink">
                  Shop Furniture
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" eventKey="4" className="navlink">
                  Contact Us{" "}
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
