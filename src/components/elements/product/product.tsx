import "./product.scss";
import { Row, Col } from "antd";
import HTMLReactParser from "html-react-parser";
import ElementPriceTag from "../price-tag/price-tag";

export type DataElementProduct = {
  name: string;
  format: string;
  markdown: string;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
  category: string;
  description: string;
  status: number;
  createDate: string;
  img: string;
  price: string;
};

export default function ElementProduct(data: DataElementProduct) {
  const {
    name,
    img,
    category,
    createDate,
    description,
    format,
    markdown,
    sallerInEmail,
    sallerInName,
    sallerInPhone,
    status,
    price,
  } = data;

  return (
    <div className="ElementProduct">
      <Row gutter={[15, 15]}>
        <Col span={24}>
          <div className="containerImg">
            <img className="img" src={img} alt={name} />
            <ElementPriceTag>R$ {price}</ElementPriceTag>
          </div>
          <div className="containerCharacteristics">
            <span>
              <strong>Categoria</strong>: {category}
            </span>
            <span>
              <strong>Data de Criação</strong>: {createDate}
            </span>
          </div>
        </Col>
        <Col span={16}>
          <h1>{name}</h1>
          <hr />
          {HTMLReactParser(markdown)}
        </Col>
        <Col span={8} className="containerSallerInformations">
          <h2>Informações sobre o vendedor</h2>
          <hr />
          {[
            ["Nome", sallerInName],
            ["Email", sallerInEmail],
            ["Telefone", sallerInPhone],
          ].map(([subtitle, text]) => {
            return (
              <>
                <h3 className="subTitle">{subtitle}</h3>
                <p className="text">{text}</p>
              </>
            );
          })}
        </Col>
      </Row>
    </div>
  );
}
