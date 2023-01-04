import React from "react";
import Card from "react-bootstrap/Card";
import { Container, Button, Nav, Row, Col } from "react-bootstrap";
import delivery from "../assets/images/delivery.jpg";
import install from "../assets/images/install.jpg";
import cleaning from "../assets/images/cleaning.jpg";
import moving from "../assets/images/moving.jpg";
import optimize from "../assets/images/optimize.png";
import reconfig from "../assets/images/reconfig.jpg";
import logo from "../assets/images/integral-logo.png";
import "../styles/landing1.css";
import { useNavigate, Link } from "react-router-dom";
import ContactForm from "../pages/ContactForm";
import Footer from "./Footer";

const LandingTemplate1 = () => {

  let navigate = useNavigate();
  return (
    <>
      <section className="bk-img">
        <br></br>
        <div className="overlay-box">
          <p className="overlay-header">
            Colorado's Premier Choice for Office Installation, Configuration &
            Moving
          </p>
          <p className="overlay-sub-header">
          Integral Solutions offers the delivery and setting up of office furniture and floor space design for your business.  Whether you’re setting up your own office for the first time or changing locations, Integrated Solutions can help you implement and maintain an ideal environment for the growth of your companies. <br/><br/> Our family-owned business has more than 15 years of experience setting up all kinds of commercial floor plans ranging from offices to schools.  At Integrated Solutions, our goal is to provide the office furniture solutions our clients need to achieve their entrepreneurial goals.
          </p>
          <Button variant="secondary" 
          className="contact-btn"
          onClick={() => {
            navigate("/contact");
          }}>
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
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={optimize} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Space Analytics</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Our team has set up thousands of office spaces, let us help guide your installation process.   
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={reconfig} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Reconfiguration</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Let our Experts advise on the perfect office arrangement to optimize team perfomance.   
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={reconfig} />
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>Reconfiguration</Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Let our Experts advise on the perfect office arrangement to optimize team perfomance.   
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

        <Footer/>
    </>
  );
};

export default LandingTemplate1;
