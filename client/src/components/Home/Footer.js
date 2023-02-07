import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../styles/footer.css";

import logo from "../../assets/images-avif/logo.bkg.avif";

function Footer() {
  return (
    <footer>
      <div className="">
        <h3 className="footer-title">
          Serving Greater Denver for Over 15 Years
        </h3>
        <main className="footer-container">
          <img className="full-logo" src={logo} alt="Integral Solutons logo"></img>
          <section className="phone-container">
            <p className="">(720)-232-2510</p>
            <p className="espanol">Se Habla Español!</p>
          </section>

          <section className="footer-nav-menu">
            {/* <Nav.Link className="menu-text" as={Link} to="/shop-links">
              Shop Furniture
            </Nav.Link> */}
            <Nav.Link className="menu-text" as={Link} to="/contact-us">
              Contact Us{" "}
            </Nav.Link>
            <Nav.Link className="menu-text" as={Link} to="/login">
              Employee Login
            </Nav.Link>
          </section>
        </main>

        <p className="footer-copy">
          &copy;{new Date().getFullYear()} Integral Solutions LLC.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
