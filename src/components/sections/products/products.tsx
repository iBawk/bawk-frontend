import "./products.scss";
import ElementProductCard, {
  DataElementProductCard,
} from "../../elements/product-card/product-card";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import StructContainer from "../../structs/container/container";

export type DataSecitonProducts = {
  products: Array<DataElementProductCard>;
};

export default function SectionProducts({ products }: DataSecitonProducts) {
  return (
    <section id="SectionProducts">
      <StructContainer>
        <Row>
          <Col className="containerInformations" span={24}>
            <div className="productsCounter">{products.length}</div>
            <Link to={"/painel/produtos/add-produto"}>
              <Button type="primary">Novo Produto</Button>
            </Link>
          </Col>
        </Row>
        <hr className="hr" />
        <Row gutter={[20, 30]}>
          {products.map(
            (
              {
                category,
                description,
                img,
                viewLink,
                price,
                title,
                editLink,
                onDelete,
              },
              index
            ) => (
              <Col key={index} span={6}>
                <ElementProductCard
                  forOwner={true}
                  status={false}
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  category={category}
                  viewLink={viewLink}
                  editLink={editLink}
                  onDelete={onDelete}
                />
              </Col>
            )
          )}
        </Row>
      </StructContainer>
    </section>
  );
}
