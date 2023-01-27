import { Link } from "react-router-dom";
import { Row, Col, Container, Nav,} from "react-bootstrap";
import "../../styles/home.css";
import logo from "../../assets/images/logo.bkg.png";

function Footer () {
    return (       
    <footer >
        <Container>
        {/* <h3 className="footer-title">
        Office Furniture Installation At The Snap Of Your Fingers!
        </h3> */}
        <h3 className="footer-title">
          Serving Greater Denver for Over 15 Years
        </h3> 
          <Row>
            <Col sm={5} md={4} xs={6}>
              <img style={{maxWidth:'200px', height: "25vh"}}src={logo} className='full-logo' alt="logo"></img>
            </Col>
            <Col sm={6} md={4} xs={6} className="footer-phone">
              <p className="number" style= {{marginTop:'30px'}}>(720)-232-2510</p>
              <p className="espanol">Se Habla Español!</p>

            </Col>
            <Col className="d-flex footer-nav">
              <Nav.Link className="footer-nav" as={Link} to="/shoplinks">
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