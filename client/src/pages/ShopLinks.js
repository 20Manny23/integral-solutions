import Footer from "../components/Home/Footer";
import steelcase from "../assets/images/steelcase.jpg";
import { Row, Col, Container } from "react-bootstrap";
import officescapes from "../assets/images/officescapes.jpeg";
import officestogo from "../assets/images/officestogo.jpg";
import hermanmiller from "../assets/images/hermanmiller2.png";
import "../styles/shopLinks.css";

function ShopLinks() {
  return (
    <div className="bk-img">
      <Container>
      <Row>
        <Col md={6}lg={3} sm={6}>
          <img
            className="company"
            src={steelcase}
            href="https://www.steelcase.com/"
            target={"_blank"}
            alt="steelcase"
          ></img>
        </Col>
        <Col md={6} lg={3} sm={6}>
          <img
            className="company"
            src={officescapes}
            href="https://www.officescapes.com/"
            target={"_blank"}
            alt="officescapes"
          ></img>
        </Col>

        <Col lg={3} md={6} sm={6}>
          <img
            className="company"
            src={hermanmiller}
            href="https://www.hermanmiller.com/"
            target={"_blank"}
            alt="Herman Miller"
          ></img>
        </Col>

        <Col lg={3} md={6} sm={6}>
          <img
            className="company"
            src={officestogo}
            href="https://www.officestogo.com/"
            target={"_blank"}
            alt="OfficesToGo"
          ></img>
        </Col>
      </Row>
      </Container>
      <div className="head">
        <h1>Needing The Best Office Furniture with Competitive Pricing? </h1>
        <h2 style={{ fontStyle: "italic" }}>
          We Work Directly with these Suppliers!
        </h2>
      </div>
      
      <Footer />
    </div>
  );
}
export default ShopLinks;
