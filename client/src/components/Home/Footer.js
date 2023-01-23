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

          <section className="footer-nav-menu">
            <Nav.Link className="menu-text" as={Link} to="/shoplinks">
              Shop Furniture
            </Nav.Link>
            <Nav.Link className="menu-text" as={Link} to="/contact">
              Contact Us{" "}
            </Nav.Link>
            <Nav.Link className="menu-text" as={Link} to="/login">
              Employee Login
            </Nav.Link>
          </section>
        </main>

        <p className="footer-copy">
          Copyright &copy;{new Date().getFullYear()} Integral Solutions LLC All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
