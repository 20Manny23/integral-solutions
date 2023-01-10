// color:'#C59435'

import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav, Row } from "react-bootstrap";
import "../styles/navbar.css";

import logoTop from "../assets/images/logo-no-slogan.png";

const AppNavbar = () => {
  return (
    <>
      <Navbar
        
        className="shadow-sm navs"
        style={{ backgroundColor: "#0D2E4F" }}
        expand="lg"

      >
        <Navbar.Brand as={Link} reloadDocument to="/" className="">
          <img className="logo" src={logoTop} alt="logo"></img>
        </Navbar.Brand>
        <Navbar.Brand className="slogan" style={{ fontSize: "30px", color: '#ffffff', marginLeft: "20px" }}>
          Integral Solutions
          <h6 className="slogan-size"> Office Furniture Installation At The Snap Of Your Fingers!
          </h6>
        </Navbar.Brand>
        
          <Navbar.Toggle
            aria-controls="navbar"
            className="white toggle-style"
          />
        
        <Navbar.Collapse id="navbar" className="">
          <Nav className="ml-auto">
            {Auth.loggedIn() && Auth.isAdmin() === true && Auth.isLocked() === false ? (
              // User is loggedIn and isAdmin
              // isAdmin explicity set to true to eliminate null values
              // access to home, adm portal, employee portal, logout
              <>
                <Nav.Link style={{ color: 'white' }} className='navlink' as={Link} to="/home" eventKey="4" >
                  Home
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} className='navlink' as={Link} to="/calendar" eventKey="4">
                  Admin
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} className='navlink' as={Link} to="/employee" eventKey="10" >
                  Employee
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} className='navlink' onClick={Auth.logout} eventKey="4" >
                  Logout
                </Nav.Link>
              </>
            ) : Auth.loggedIn() && Auth.isAdmin() === false && Auth.isLocked() === false ? (
              // User is logged in and is not Admin
              // isAdmin explicity set to true to eliminate null values
              // access to home, employee portal, logout
              <>
                <Nav.Link style={{ color: 'white' }} as={Link} to="/home" eventKey="4" className="navlink">
                  Home
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} as={Link} to="/employee" eventKey="10" className="navlink">
                  Employee
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} onClick={Auth.logout} eventKey="4" className="navlink">
                  Logout
                </Nav.Link>
              </>
            ) : (
              // User is not logged in; Home page nav
              <>
                <Nav.Link style={{ color: 'white' }} as={Link} to="/home" eventKey="4" className="navlink">
                  Home
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} as={Link} to="/shoplinks" eventKey="4" className="navlink">
                  Shop Furniture
                </Nav.Link>
                <Nav.Link style={{ color: 'white' }} as={Link} to="/contact" eventKey="4" className="navlink">
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
