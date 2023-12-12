import "./marketplace.scss";
import { Row, Col } from "antd";
import StructContainer from "../../structs/container/container";
import API from "../../../services/api/api";
import ElementProductCard from "../../elements/product-card/product-card";
import { ResponseGetMarketPlaceAll } from "../../../services/api/endpoints/marketplace";

export interface DataSectionMarketplace {
  offers: ResponseGetMarketPlaceAll;
}

export default function SectionMarketplace({ offers }: DataSectionMarketplace) {
  return (
    <section id="SectionProducts">
      <StructContainer>
        <Row>
          <Col className="containerInformations" span={24}>
            <h1>MARKETPLACE</h1>
          </Col>
        </Row>
        <hr className="hr" />
        <Row gutter={[20, 30]}>
          {offers?.offers.map((offer, index) => (
            <Col key={index} span={6}>
              <ElementProductCard
                forOwner={false}
                status={false}
                title={offer.product.name}
                description={offer.product.description}
                img={API.public.getProductImageURL(offer.product.id)}
                price={offer.price.toString()}
                category={offer.product.category}
                viewLink={"/painel/produtos/visualizar/" + offer.product.id}
              />
            </Col>
          ))}
        </Row>
      </StructContainer>
    </section>
  );
}
