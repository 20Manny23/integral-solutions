import React from "react";
// import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, Navbar, Nav, Row, Col } from "react-bootstrap";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import delivery from "../assets/images/delivery.jpg";
import install from "../assets/images/install.jpg";
import cleaning from "../assets/images/cleaning.jpg";
import moving from "../assets/images/moving.jpg";
import logo from "../assets/images/integral-logo.png";
import "../styles/landing1.css";

const LandingTemplate1 = () => {
  return (
    <>
      <section className="bk-img">
        <br></br>
        <div className="overlay-box">
          <p className="overlay-header">
            Colorado's Premier Choice for Office Installation, Configuring &
            Moving
          </p>
          <p className="overlay-sub-header">
            We are a full service, independent installation company. We offer
            office installation, moving, delivery and clean-up. We are locally
            staffed with professional installation teams and will take your next
            project from start to finish.
          </p>
          <Button variant="secondary" className="contact-btn">
            Contact Us
          </Button>
        </div>
        <br></br>
      </section>

      <section>
        <p className="service-title">Services We Offer</p>
      </section>

      <Container
        className=""
        style={{ marginTop: "50px", marginBottom: "35px" }}
      >
        <Row>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={delivery} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Delivery</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  We will pick up all items directly from your chosen
                  distrubutor. No need to hire an additional company for
                  delivery.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={moving} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Moving</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Make your office move smooth and easy as we safely pack your
                  office and bring to your new location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={install} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Installation
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Our qualified team can install cubicles, office furniture,
                  workstations, seating, conference rooms, and more.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={cleaning} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Cleaning</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  No mess left behind. Your office space will be fully cleaned
                  and all packaging material will be disposed responsibly.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer>
        <h3 className="footer-title">
          Serving Greater Denver for Over 20 Years!
        </h3>
        <Container>
          <Row>
            <Col>
              <img src={logo} alt="logo"></img>
            </Col>
            <Col className="footer-phone">
              <p className="">(555)-555-5555</p>
            </Col>
            <Col className="d-flex footer-nav">
              <Nav.Link className="footer-nav" href="#features">
                Shop Furniture
              </Nav.Link>
              <Nav.Link className="footer-nav" href="#pricing">
                About Us{" "}
              </Nav.Link>
              <Nav.Link className="footer-nav" href="#home">
                Make Payment
              </Nav.Link>
            </Col>
          </Row>
          <p style={{ textAlign: "center" }}>©️ Integral Solutions 2022</p>
        </Container>
      </footer>
    </>
  );
};

export default LandingTemplate1;
