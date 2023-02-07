import React from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";
import "../styles/navbar.css";

import logoTop from "../assets/images-avif/logo-no-slogan.avif";

const AppNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="xl" className="custom-nav">
      <Navbar.Brand
        as={Link}
        reloadDocument
        to="/"
        className="d-flex flex-nowrap mx-0"
      >
        <img className="logo" src={logoTop} alt="Integral Solutions logo"></img>
        <div className="brand-container">
          <h2 className="brand-name">Integral Solutions</h2>
          <h6 className="slogan">
            Office Furniture Installation At The Snap Of Your Fingers!
          </h6>
        </div>
      </Navbar.Brand>

      <Navbar.Toggle
        className="hamburger"
        aria-controls="responsive-navbar-nav"
      />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="custom-nav ml-auto">
          <Nav.Link className="navLink" as={Link} to="/">
            Home
          </Nav.Link>
          {!Auth.loggedIn() && (
            <>
              {/* <Nav.Link className="navLink" as={Link} to="/shop-links">
                Shop Furniture
              </Nav.Link> */}
            </>
          )}

          {Auth.loggedIn() &&
            Auth.isAdmin() === true &&
            Auth.isLocked() === false && (
              <>
                <Nav.Link className="navLink" as={Link} to="/jobs-panel" reloadDocument>
                  Admin

                </Nav.Link>
              </>
            )}

          {Auth.loggedIn() && Auth.isLocked() === false && (
            <>
              <Nav.Link
                className="navLink"
                as={Link}
                to="/upcoming-jobs"
                reloadDocument
              >
                Employee
              </Nav.Link>
            </>
          )}

          {!Auth.loggedIn() && (
            <>
              <Nav.Link className="navLink" as={Link} to="/contact-us">
                Contact Us
              </Nav.Link>
            </>
          )}

          {(Auth.loggedIn() && Auth.isLocked() === false) && (
            <>
              <Nav.Link className="navLink" onClick={Auth.logout}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
