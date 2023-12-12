import "./marketplace.scss";
import { Row, Col } from "antd";
import StructContainer from "../../structs/container/container";
import { useEffect, useState } from "react";
import API from "../../../services/api/api";
import Auth from "../../../services/auth/auth";
import ElementProductCard from "../../elements/product-card/product-card";
import { MarketplaceResponse } from "../../../services/api/endpoints/marketplace";

export default function SectionMarketplace() {
  const [data, setData] = useState<MarketplaceResponse>();

  const [marketplaceParams, setMarketplaceParams] = useState({
    category: "",
    title: "",
  });

  const auth = Auth.getAuth();

  useEffect(() => {
    async function getMarketplace() {
      if (!auth) return {} as MarketplaceResponse;

      const { category, title } = marketplaceParams;

      const data = await API.private.getMarketplace(auth, category, title);

      console.log(data);
      setData(data);
    }

    getMarketplace();
  }, []);

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
          {data?.offers.map((offer, index) => (
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
