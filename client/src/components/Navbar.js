// color:'#C59435'

import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";

import logoTop from "../assets/images/logo-no-slogan.png";

const AppNavbar = () => {
  return (
    <>
      <Navbar
        expand="lg"
      >
        <Navbar.Brand as={Link} reloadDocument to="/" className="d-flex flex-nowrap">
          <img className="logo" src={logoTop} alt="logo"></img>
          <div className="brand-container">
            <h2
              className="brand-name"
            >
              Integral Solutions
            </h2>
            <h6 className="slogan">
              Office Furniture Installation At The Snap Of Your Fingers!
            </h6>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar"
          className="hamburger"
        />

        <Navbar.Collapse className="" id="" >
          <Nav className="ml-auto">
            {Auth.loggedIn() &&
            Auth.isAdmin() === true &&
            Auth.isLocked() === false ? (
              // User is loggedIn and isAdmin
              // isAdmin explicity set to true to eliminate null values
              // access to home, adm portal, employee portal, logout
              <>
                <Container className="employee-navbar">
                  <Nav.Link
                    style={{ color: "white" }}
                    className="navlink"
                    as={Link}
                    to="/home"
                    eventKey="4"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    className="navlink"
                    as={Link}
                    to="/calendar"
                    eventKey="4"
                  >
                    Admin
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    className="navlink"
                    as={Link}
                    to="/employee"
                    eventKey="10"
                  >
                    Employee
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    className="navlink"
                    onClick={Auth.logout}
                    eventKey="4"
                  >
                    Logout
                  </Nav.Link>
                </Container>
              </>
            ) : Auth.loggedIn() &&
              Auth.isAdmin() === false &&
              Auth.isLocked() === false ? (
              // User is logged in and is not Admin
              // isAdmin explicity set to true to eliminate null values
              // access to home, employee portal, logout
              <>
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/home"
                  eventKey="4"
                  className="navlink"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  style={{ color: "white" }}
                  as={Link}
                  to="/employee"
                  eventKey="10"
                  className="navlink"
                >
                  Employee
                </Nav.Link>
                <Nav.Link
                  style={{ color: "white" }}
                  onClick={Auth.logout}
                  eventKey="4"
                  className="navlink"
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              // User is not logged in; Home page nav
              <>
                <Container className="">
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to="/home"
                    eventKey="4"
                    className="navlink"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to="/shoplinks"
                    eventKey="4"
                    className="navlink"
                  >
                    Shop Furniture
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "white" }}
                    as={Link}
                    to="/contact"
                    eventKey="4"
                    className="navlink"
                  >
                    Contact Us{" "}
                  </Nav.Link>
                </Container>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default AppNavbar;
