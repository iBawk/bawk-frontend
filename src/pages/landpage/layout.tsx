import "./layout.scss";
import logo from "../../assets/imgs/logo.svg";
import { Link } from "react-router-dom";


export default function LayoutLandpage() {
    const handleClickScroll = () => {
        const element = document.getElementById('section-1');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
  return (
    <main id="LayoutLandpage">
      <section id="SectionLandpage">
        <header className="header">
          <nav className="nav">
            <ul className="links">
              <p>
                <button className="buttonLink"  onClick={handleClickScroll}>
                  Home
                </button>
              </p>
              <p>
                <button className="buttonLink"  onClick={handleClickScroll}>
                  About Us
                </button>
              </p>
              <p>
                <button className="buttonLink"  onClick={handleClickScroll}>
                  Services
                </button>
              </p>
              <p>
                <button className="buttonLink"  onClick={handleClickScroll}>
                  Contact
                </button>
              </p>
              <Link to="/auth/login" className="containerButton">
                <button className="buttonLogin">
                    Login
                </button>
              </Link>
              <Link to="/auth/sign-up" className="containerButton">
                <button className="buttonSignUp">
                    Sign Up
                </button>
              </Link>
            </ul>
          </nav>
        </header>
        <div className="upperPart">
          <img className="logo" src={logo} alt="Company Logo" />
          <p className="text">
            Welcome to our website. We provide high-quality products and services to our customers. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <main>
          <section className="aboutUs" id="AboutUs">
            <h2>About Us</h2>
            <p>
              We are a dedicated team that aims to provide the best solutions for our customers. Our mission is to exceed your expectations.
            </p>
          </section>
          <section className="services" id="Services">
            <h2>Our Services</h2>
            <ul>
              <li>Service 1</li>
              <li>Service 2</li>
              <li>Service 3</li>
            </ul>
          </section>
        </main>
        <footer>
          <div id="Contact" className="lowerPart">
            <span>Contact Us</span>
            <span>
              <a className="anchor" href="mailto:contact@company.com">
                contact@company.com
              </a>{" "}
              |{" "}
              <a className="anchor" href="tel:+1234567890">
                +11 (44) 99456-7890
              </a>
            </span>
          </div>
        </footer>
    </section>
    </main>
  );
}



