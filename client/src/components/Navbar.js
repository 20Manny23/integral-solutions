import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";
import "../styles/navbar.css";

import logoTop from "../assets/images/logo-no-slogan.png";

const AppNavbar = () => {
  return (
    <>
      {/* section */}
      <Navbar collapseOnSelect expand="xl">
        <Navbar.Brand
          as={Link}
          reloadDocument
          to="/"
          className="d-flex flex-nowrap mr-0"
        >
          <img className="logo" src={logoTop} alt="logo"></img>
          <div className="brand-container">
            <h2 className="brand-name">Integral Solutions</h2>
            <h6 className="slogan">
              Office Furniture Installation At The Snap Of Your Fingers!
            </h6>
          </div>
        </Navbar.Brand>

        <div className="d-flex justify-content-center">
        <Navbar.Toggle
          className="hamburger"
          aria-controls="responsive-navbar-nav"
          size="sm"
        />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link className="nav-link" as={Link} to="/">
              Home
            </Nav.Link>
            {!Auth.loggedIn() && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/shoplinks">
                  Shop Furniture
                </Nav.Link>
              </>
            )}

            {Auth.loggedIn() &&
              Auth.isAdmin() === true &&
              Auth.isLocked() === false && (
                <>
                  <Nav.Link className="nav-link" as={Link} to="/calendar">
                    Admin
                  </Nav.Link>
                </>
              )}

            {Auth.loggedIn() && Auth.isLocked() === false && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/employee">
                  Employee
                </Nav.Link>
              </>
            )}

            {!Auth.loggedIn() && (
              <>
                <Nav.Link className="nav-link" as={Link} to="/contact">
                  Contact Us
                </Nav.Link>
              </>
            )}

            {Auth.loggedIn() && (
              <>
                <Nav.Link className="nav-link" onClick={Auth.logout}>
                  Logout
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
