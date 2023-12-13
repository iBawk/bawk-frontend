import "./marketplace.scss";
import { Row, Col, Button, Space } from "antd";
import StructContainer from "../../structs/container/container";
import API from "../../../services/api/api";
import ElementProductCard from "../../elements/product-card/product-card";
import { ResponseGetMarketPlaceAll } from "../../../services/api/endpoints/marketplace";
import ElementProduct, {
  DataElementProduct,
} from "../../elements/product/product";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export interface DataSectionMarketplace {
  offers: ResponseGetMarketPlaceAll;
}

export interface DataElementModalViewOffer {
  status: boolean;
  offerId: string;
  data: DataElementProduct;
  onClose: () => void;
}

export function ElementModalViewOffer({
  status,
  offerId,
  data,
  onClose,
}: DataElementModalViewOffer) {
  if (!status) return null;
  return (
    <div className="ElementModalViewOffer">
      <StructContainer className="containerContentModal">
        <Button
          className="closeButton"
          icon={<CloseOutlined />}
          danger
          onClickCapture={onClose}
        />
        <Space direction="vertical">
          <Link to={`/checkout/${offerId}`}>
            <Button className="buyButton" type="primary">
              IR COMPRAR
            </Button>
          </Link>
          <ElementProduct {...data} />
        </Space>
      </StructContainer>
    </div>
  );
}

export default function SectionMarketplace({ offers }: DataSectionMarketplace) {
  const [modal, setModal] = useState<DataElementModalViewOffer>({
    status: false,
    offerId: "",
    data: {
      category: "",
      createDate: "",
      description: "",
      format: "",
      img: "",
      markdown: "",
      name: "",
      sallerInEmail: "",
      sallerInName: "",
      sallerInPhone: "",
      price: "",
    },
    onClose: () => {
      modal.status = false;
      setModal({ ...modal });
    },
  });

  return (
    <section id="SectionProducts">
      <ElementModalViewOffer {...modal} />
      <StructContainer>
        <Row>
          <Col className="containerInformations" span={24}>
            <h1>MARKETPLACE</h1>
          </Col>
        </Row>
        <hr className="hr" />
        <Row gutter={[20, 30]}>
          {offers?.offers.map(({ product, price, created_at, id }, index) => (
            <Col key={index} span={6}>
              <ElementProductCard
                forOwner={false}
                status={false}
                title={product.name}
                description={product.description}
                img={API.public.getProductImageURL(product.id)}
                price={price.toString()}
                category={product.category}
                onClick={() => {
                  const date = new Date(created_at);

                  modal.offerId = id;

                  modal.status = true;

                  modal.data = {
                    name: product.name,
                    category: product.category,
                    createDate: `${date.getDate()}/${
                      date.getMonth() + 1
                    }/${date.getFullYear()}`,
                    description: product.description,
                    format: product.format,
                    img: API.public.getProductImageURL(product.id),
                    markdown: product.markdown,
                    sallerInEmail: product.sallerInEmail,
                    sallerInName: product.sallerInName,
                    sallerInPhone: product.sallerInPhone,
                    price: `${price}`,
                  };
                  setModal({ ...modal });
                }}
              />
            </Col>
          ))}
        </Row>
      </StructContainer>
    </section>
  );
}
