import "./layout.scss";
import logo from "../../assets/imgs/logo.svg";
import { Link } from "react-router-dom";

export default function LayoutLandpage() {
  return (
    <main id="LayoutLandpage">
      <section className="SectionLandpage">
        <header className="header">
          <nav className="nav">
            <ul className="links">
              <Link to="/login" className="containerButton">
                <button className="buttonLogin">Login</button>
              </Link>
              <Link to="/sign-up" className="containerButton">
                <button className="buttonSignUp">Sign Up</button>
              </Link>
            </ul>
          </nav>
        </header>
        <div className="upperPart">
          <img className="logo" src={logo} alt="Company Logo" />
          <h2 className="text">
            <center>
              Simples e essencial para o seu negócio digital vender mais
              <br></br>
              Faça seus produtos digitais, aplicativos e serviços atingirem
              outro nível com nossa infra de pagamentos feita para aumentar a
              conversão e ticket médio das suas vendas
            </center>
          </h2>
        </div>
        <main>
          <section className="aboutUs" id="AboutUs">
            <h2 className="text">About Us</h2>
            <p className="text">
              Somos uma equipe dedicada que visa fornecer as melhores soluções
              para nossos clientes. Nossa missão é superar suas expectativas.
            </p>
          </section>
          <section className="services" id="Services">
            <h2 className="text">Nossos Serviços</h2>
            <ul>
              <li className="text">Alta conversão</li>
              <p>
                <center>
                  Nossa infra de pagamentos possui múltiplas adquirentes com
                  retentiva inteligente,<br></br> gatilhos de recuperação, um
                  checkout ultra rápido com layout simples e agradável.
                </center>
              </p>
              <li className="text">Checkout builder</li>
              <p>
                <center>
                  Construa um checkout rápido para o seu negócio e aumente a
                  confiança e conversão do seus leads.<br></br> Nosso construtor
                  é simples e prático.
                </center>
              </p>
              <li className="text">Alta conversão</li>
              <p>
                <center>
                  Nossa infra de pagamentos possui múltiplas adquirentes com
                  retentiva inteligente,<br></br> gatilhos de recuperação, um
                  checkout ultra rápido com layout simples e agradável.
                </center>
              </p>
            </ul>
          </section>
        </main>
        <footer>
          <div id="Contact" className="lowerPart">
            <span>Contact Us</span>
            <span>
              <a className="anchor" href="mailto:bawk@company.com">
                bawk@company.com
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
