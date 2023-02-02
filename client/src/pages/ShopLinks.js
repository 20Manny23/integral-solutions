import Footer from "../components/Home/Footer";

import { Row, Col, Container } from "react-bootstrap";
import "../styles/shopLinks.css";

import steelcase from "../assets/images-avif/steelcase.avif";
import officescapes from "../assets/images-avif/officescapes.avif";
import officestogo from "../assets/images-avif/officestogo.avif";
import hermanmiller from "../assets/images-avif/hermanmiller2.avif";
import office from "../assets/images-avif/office.avif";

function ShopLinks() {
  return (
    <>
      {/* preload image to improve largest contentful paint in lighthouse */}
      <link rel="preload" href={office}></link>
      <div className="bk-img" style={{ minHeight: "80vh" }}>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col className="d-flex justify-content-center" md={6} lg={3} sm={6}>
              <a
                href="https://www.steelcase.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="company-logos"
                  src={steelcase}
                  alt="Steelcase logo"
                ></img>
              </a>
            </Col>
            <Col className="d-flex justify-content-center" md={6} lg={3} sm={6}>
              <a
                href="https://www.officescapes.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="company-logos"
                  src={officescapes}
                  alt="Office Scapes logo"
                ></img>
              </a>
            </Col>

            <Col className="d-flex justify-content-center" lg={3} md={6} sm={6}>
              <a
                href="https://www.hermanmiller.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="company-logos"
                  src={hermanmiller}
                  alt="Herman Miller logo"
                ></img>
              </a>
            </Col>

            <Col className="d-flex justify-content-center" lg={3} md={6} sm={6}>
              <a
                href="https://www.officestogo.com/"
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  className="company-logos"
                  src={officestogo}
                  alt="Offices To Go logo"
                ></img>
              </a>
            </Col>
          </Row>
        </Container>
        <div className="head">
          <h1 className="d-flex justify-content-center oval-text">
            The Best Office Furniture at Competitive Prices!!
          </h1>
          <h2 className="oval-subtext">
            We Work Directly with these Suppliers!
          </h2>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default ShopLinks;
