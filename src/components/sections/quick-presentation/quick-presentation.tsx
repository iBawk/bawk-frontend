import "./quick-presentation.scss";
import logo from "../../../assets/imgs/logo.svg";

export type DataSectionQuickPresentation = {};

export default function SectionQuickPresentation(
  data: DataSectionQuickPresentation
) {
  const {} = data;

  return (
    <section id="SectionQuickPresentation">
      <div className="upperPart">
        <img className="logo" src={logo} alt="Bawk" />
        <p className="text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
      <div className="lowerPart">
        <span>CONTACT</span>
        <span>
          <a className="anchor" href="maito:SUPORT@BAWK.INFO">
            SUPORT@BAWK.INFO
          </a>{" "}
          |{" "}
          <a className="anchor" href="tel:+5544999998888">
            +55 (44) 9 9999-8888
          </a>
        </span>
      </div>
    </section>
  );
}