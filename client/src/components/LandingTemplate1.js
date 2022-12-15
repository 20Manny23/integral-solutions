import React from "react";
// import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
import { Container, Button, Navbar, Nav, Row, Col } from "react-bootstrap";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import "../styles/landing1.css";
import delivery from "../assets/images/delivery.jpg";
import install from "../assets/images/install.jpg";
import cleaning from "../assets/images/cleaning.jpg";
import moving from "../assets/images/moving.jpg";
import logo from "../assets/images/integral-logo.png";

const LandingTemplate1 = () => {
  return (
    <>
      <main>
        <div className="bk-img">
          <br></br>
          <div className="text-box">
            <p
              style={{
                padding: "14px",
                fontSize: "37px",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Colorado's Premier Choice for Office Installation, Configuring and
              Moving{" "}
            </p>
            <p style={{ fontSize: "16px", padding: "14px" }}>
              We are a full service, independent installation company. We offer
              office installation, moving, delivery and clean-up. We are locally
              staffed with professional installation teams and will take your
              next project from start to finish.
            </p>
            <Button variant="secondary" className="contact-btn">
              Contact Us
            </Button>{" "}
          </div>
          <br></br>
        </div>
        <div>
          <p
            style={{
              textAlign: "center",
              backgroundColor: "#6362d4",
              padding: "10px 0 10px 0",
              fontSize: "35px",
              color: "white",
              marginBottom:'50px'
            }}>
            Services We Offer{" "}
          </p>
        </div>
        {/* <Container className="d-flex" style={{ paddingBottom: "35px" }}> */}
        <Container>
          <Row className="d-flex">
            <Col>
              <Card style={{ width: "15rem", border: "none" }}>
                <Card.Img variant="top" src={delivery} />
                <Card.Body>
                  <Card.Title style={{ marginTop: "-15px" }}>
                    Delivery
                  </Card.Title>
                  <Card.Text style={{ fontSize: "13px" }}>
                    We will pick up all items directly from your chosen
                    distrubutor. No need to hire an additional company for
                    delivery.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
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
            <Col>
              <Card style={{ width: "15rem", border: "none" }}>
                <Card.Img variant="top" src={install} />
                <Card.Body>
                  <Card.Title style={{ marginTop: "-15px" }}>
                    Installation
                  </Card.Title>
                  <Card.Text style={{ fontSize: "13px" }}>
                    Our qualified team can install cubicles, office furniture,
                    workstations, seating, conference rooms, and
                    more.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "15rem", border: "none" }}>
                <Card.Img variant="top" src={cleaning} />
                <Card.Body>
                  <Card.Title style={{ marginTop: "-15px" }}>
                    Cleaning
                  </Card.Title>
                  <Card.Text style={{ fontSize: "13px" }}>
                    No mess left behind. Your office space will be fully cleaned
                    and all packaging material will be disposed responsibly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <div className="footer">
          <h3 style={{ textAlign: "center", paddingTop: "15px" }}>
            Serving the Greater Denver Metro Area for Over 20 Years!
          </h3>
          <br></br>
          <Container>
            <Row>
              <Col>
                <img src={logo} alt="logo"></img>
              </Col>
              <Col>
                <p
                  style={{
                    fontWeight: "bolder",
                    textAlign: "center",
                    fontSize: "30px",
                  }}
                >
                  (555)-555-5555
                </p>
                <br></br>
                <p style={{ textAlign: "center" }}>
                  ©️ Integral Solutions 2022
                </p>
              </Col>
              <Col>
                <Nav.Link
                  style={{ color: "white", textAlign: "end" }}
                  href="#features"
                >
                  Shop Furniture
                </Nav.Link>
                <Nav.Link
                  style={{ color: "white", textAlign: "end" }}
                  href="#pricing"
                >
                  About Us{" "}
                </Nav.Link>
                <Nav.Link
                  style={{ color: "white", textAlign: "end" }}
                  href="#home"
                >
                  Make Payment
                </Nav.Link>
              </Col>
            </Row>
          </Container>
        </div>
      </main>
    </>
  );
};

export default LandingTemplate1;
