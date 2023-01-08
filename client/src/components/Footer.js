import { Row, Col, Container, Nav,} from "react-bootstrap";
import logo from "../assets/images/integral-logo.png";
import "../styles/landing1.css";
import { Link } from "react-router-dom";

function Footer () {
    return (       
    <footer >
        <Container>
        <h3 className="footer-title">
          Serving Greater Denver for Over 15 Years!
        </h3>
          <Row>
            <Col>
              <img src={logo} alt="logo"></img>
            </Col>
            <Col className="footer-phone">
              <p className="">(555)-555-5555</p>
              <p>Se Habla Español!</p>

            </Col>
            <Col className="d-flex footer-nav">
              <Nav.Link className="footer-nav" as={Link} to="/linkspage">
                Shop Furniture
              </Nav.Link>
              <Nav.Link className="footer-nav" as={Link} to="/contact">

                Contact Us{" "}
              </Nav.Link>
              <Nav.Link className="footer-nav" as={Link} to="/login">
                Employee Login 
              </Nav.Link>
            </Col>
          </Row>
          <p className="footer-copy">Copyright &copy;{new Date().getFullYear()} Integral Solutions LLC All Rights Reserved.</p>
        </Container>
      </footer>)

}
export default Footer;