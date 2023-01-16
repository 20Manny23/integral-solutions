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
      <Row className="shop-links">
        <Col md={6}lg={3} sm={6}>
        <a  href="https://www.steelcase.com/"
            target={"_blank"}><img
            className="company"
            src={steelcase}
            alt="steelcase"
          ></img></a>
        </Col>
        <Col md={6} lg={3} sm={6}>
          <a href="https://www.officescapes.com/"
            target={"_blank"}><img
            className="company"
            src={officescapes}
            alt="officescapes"
          ></img></a>
        </Col>

        <Col lg={3} md={6} sm={6}>
          <a href="https://www.hermanmiller.com/"
            target={"_blank"}><img
            className="company"
            src={hermanmiller}
            alt="Herman Miller"
          ></img></a>
        </Col>

        <Col lg={3} md={6} sm={6}>
          <a href="https://www.officestogo.com/"
            target={"_blank"}><img
            className="company"
            src={officestogo}
            alt="OfficesToGo"
          ></img></a>
        </Col>
      </Row>
      </Container>
      <div className="head">
        <h1 className="oval-text">Need The Best Office Furniture at Competitive Prices? </h1>
        <h2 className="oval-subtext">
          We Work Directly with these Suppliers!
        </h2>

      </div>
      
      <Footer />
    </div>
  );
}
export default ShopLinks;
