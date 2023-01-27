import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../styles/footer.css";
import logo from "../../assets/images/logo.bkg.png";

function Footer() {
  return (
    <footer>
      <div className="">
        <h3 className="footer-title">
          Serving Greater Denver for Over 15 Years
        </h3>
        <main className="footer-container">
          <img className="full-logo" src={logo} alt="logo"></img>
          <section className="phone-container">
            <p className="">(555)-555-5555</p>
            <p className="espanol">Se Habla Español!</p>
          </section>
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
