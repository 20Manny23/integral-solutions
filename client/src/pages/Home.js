import React from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Home/Footer";

import { Container, Button, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "../styles/home.css";

import delivery from "../assets/images-avif/delivery.avif";
import install from "../assets/images-avif/install.avif";
import cleaning from "../assets/images-avif/cleaning.avif";
import moving from "../assets/images-avif/moving.avif";
import optimize from "../assets/images-avif/optimize.avif";
import reconfig from "../assets/images-avif/reconfig.avif";
import office from "../assets/images-avif/office.avif";

const Home = () => {
  let navigate = useNavigate();
  return (
    <>
      {/* preload image to improve largest contentful paint in lighthouse */}
      <link rel="preload" href={office} as="image"></link> 
      <main className="bk-img">
        <br></br>
        <div className="overlay-box">
          <p className="overlay-header" style={{ fontStyle: "italic" }}>
            Colorado's Premier Choice for Office Installation, Configuration &
            Moving
          </p>
          <p className="overlay-sub-header">
            Integral Solutions offers the delivery and setting up of office
            furniture and floor space design for your business. Whether you’re
            setting up your own office for the first time or changing locations,
            Integral Solutions can help you implement and maintain an ideal
            environment for the growth of your companies. <br />
            <br /> Our family-owned business has more than 15 years of
            experience setting up all kinds of commercial floor plans ranging
            from offices to schools. At Integral Solutions, our goal is to
            provide the office furniture solutions our clients need to achieve
            their entrepreneurial goals.
          </p>
          <Button
            style={{
              backgroundColor: "white",
              color: "#0D2E4F",
              fontStyle: "italic",
            }}
            className="contact-btn"
            onClick={() => {
              navigate("/contact-us");
            }}
          >
            Contact Us
          </Button>
        </div>
        <br></br>
      </main>

      <section>
        <p className="service-title">Services We Offer</p>
      </section>

      <Container>
        <Row>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
              <Card.Img variant="top" src={delivery} alt="Delivery truck and workers unloading content"/>
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
              <Card.Img variant="top" src={moving} alt="Unpacked boxes in an office space"/>
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
              <Card.Img variant="top" src={install} alt="Cabinet installation in progress"/>
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
              <Card.Img className="pics" variant="top" src={cleaning} alt="Workers cleaning an office space"/>
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
              <Card.Img variant="top" src={optimize} alt="Optimized office layout"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Space Analytics
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Our team has set up thousands of office spaces, let us help
                  guide your installation process.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center mb-2">
            <Card style={{ width: "15rem", border: "none" }}>
               <Card.Img variant="top" src={reconfig} alt="Optimized office reconfigured"/>
              <Card.Body>
                <Card.Title style={{ marginTop: "-15px" }}>
                  Reconfiguration
                </Card.Title>
                <Card.Text style={{ fontSize: "13px" }}>
                  Let our Experts advise on the perfect office arrangement to
                  optimize team perfomance.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
