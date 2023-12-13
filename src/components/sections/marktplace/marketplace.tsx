import "./marketplace.scss";
import { Row, Col, Button, Form, Pagination, Flex, Select } from "antd";
import StructContainer from "../../structs/container/container";
import API from "../../../services/api/api";
import ElementProductCard from "../../elements/product-card/product-card";
import { ResponseGetMarketPlaceAll } from "../../../services/api/endpoints/marketplace";
import ElementProduct, {
  DataElementProduct,
} from "../../elements/product/product";
import { FormEvent, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import ElementInputText from "../../elements/form-input-text/form-input-text";
import { Categories } from "../../elements/product-form/product-form";

export interface DataSectionMarketplace {
  initialStateMarket: ResponseGetMarketPlaceAll;
}

export interface DataElementModalViewOffer {
  status: boolean;
  offerId?: string;
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
        {offerId && (
          <Link to={`/checkout/${offerId}`}>
            <Button className="buyButton" type="primary">
              IR COMPRAR
            </Button>
          </Link>
        )}
        <ElementProduct {...data} />
      </StructContainer>
    </div>
  );
}

export default function SectionMarketplace({
  initialStateMarket,
}: DataSectionMarketplace) {
  const [filter, setFilter] = useState<{
    category: string;
    search: string;
    loading: boolean;
  }>({
    category: "",
    search: "",
    loading: false,
  });

  const [marketState, setMarketState] =
    useState<ResponseGetMarketPlaceAll>(initialStateMarket);

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

  const setPage = (newPage: number) => {
    const auth = Auth.getAuth();

    if (!auth) {
      return;
    }

    API.private
      .getMarketplace(auth, newPage, marketState.take)
      .then((response) => setMarketState(response))
      .catch((e) => console.error(e));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    filter.loading = true;
    setFilter({ ...filter });

    const auth = Auth.getAuth();

    if (!auth) {
      return;
    }

    API.private
      .getMarketplace(
        auth,
        marketState.page,
        marketState.take,
        filter.search,
        filter.category
      )
      .then((response) => {
        filter.loading = false;
        setFilter({ ...filter });
        setMarketState(response);
      })
      .catch((e) => {
        filter.loading = false;
        setFilter({ ...filter });
        console.error(e);
      });
  };

  return (
    <section id="SectionProducts">
      <ElementModalViewOffer {...modal} />
      <StructContainer>
        <h1>MARKETPLACE</h1>
        <hr className="hr" />
        <Form layout="vertical" onSubmitCapture={onSubmit}>
          <Row gutter={15}>
            <Col span={8}>
              <ElementInputText
                placeholder="Pesquisar"
                value={{ value: filter.search, valid: false, invalid: false }}
                max={100}
                setValue={(newValue) => {
                  filter.search = newValue.value;
                  setFilter({ ...filter });
                }}
              />
            </Col>
            <Col span={4}>
              <Form.Item>
                <Select
                  value={filter.category}
                  onChange={(newValue) => {
                    filter.category = newValue;
                    setFilter({ ...filter });
                  }}
                  defaultValue={""}
                >
                  <Select.Option value={""}>Todas Categoria</Select.Option>
                  {Categories.map((category, index) => (
                    <Select.Option key={index} value={category}>
                      {category}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={1}>
              <Button
                loading={filter.loading}
                icon={<SearchOutlined />}
                type="primary"
                htmlType="submit"
              />
            </Col>
          </Row>
        </Form>
        <Row gutter={[20, 30]}>
          {marketState?.offers.map(
            ({ product, price, created_at, id }, index) => (
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
            )
          )}
          <Col span={24}>
            <Flex justify="center">
              <Pagination
                defaultCurrent={marketState.page}
                total={marketState.take * marketState.pageCount}
                pageSize={marketState.take}
                onChange={setPage}
              />
            </Flex>
          </Col>
        </Row>
      </StructContainer>
    </section>
  );
}
