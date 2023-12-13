import "./add-offer.scss";
import { Alert, Button, Col, Form, InputNumber, Row, Switch } from "antd";
import StructContainer from "../../../components/structs/container/container";
import { FormEvent, useState } from "react";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import { Link, useNavigate } from "react-router-dom";
import { ResponseGetProductOffer } from "../../../services/api/endpoints/products";
import { MdOfflineBolt } from "react-icons/md";

export type DataSectionAddOffer = {
  productId: string;
  productName: string;
  productOffersInitial: Array<ResponseGetProductOffer>;
};

export default function SectionAddOffer({
  productId,
  productName,
  productOffersInitial,
}: DataSectionAddOffer) {
  const navigate = useNavigate();

  const [productOffers, setProductOffers] = useState(productOffersInitial);

  const [formAddOffer, setFormAddOffer] = useState<{
    marketplace: boolean;
    price: number;
    situation: number;
  }>({
    marketplace: false,
    price: 0,
    situation: 2,
  });

  const [submitStatus, setSubmitStatus] = useState<{
    send: boolean;
    text: string;
    loading: boolean;
    success: boolean;
  }>({
    loading: false,
    send: false,
    success: false,
    text: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Auth.getAuth();

    if (!auth) {
      navigate("/login");
      return;
    }

    const { marketplace, price, situation } = formAddOffer;

    setSubmitStatus({
      loading: true,
      send: false,
      success: false,
      text: "",
    });

    API.private
      .postOffer(auth, {
        product_id: productId,
        marketplace,
        price,
        situation,
      })
      .then(async () => {
        setSubmitStatus({
          loading: false,
          send: true,
          success: true,
          text: "Oferta adicionada !",
        });

        const newProductOffersValue = await API.private.getProductOffers(
          auth,
          productId
        );
        setProductOffers(newProductOffersValue);
      })
      .catch(() => {
        setSubmitStatus({
          loading: false,
          send: true,
          success: false,
          text: "Erro ao adicionar oferta !",
        });
      });
  };

  const updateOffer = async (offer_id: string, situation: number) => {
    const auth = Auth.getAuth();

    if (!auth) {
      navigate("/login");
      return;
    }

    API.private
      .updateOffer(auth, offer_id, situation)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <section id="SectionOffers">
      <StructContainer>
        <h1>Ofertas do produto: {productName}</h1>
        <hr />
        <Row gutter={15}>
          <Col span={16}>
            <h2>Listagem de ofertas</h2>
            <Row gutter={[15, 15]}>
              {productOffers.map(
                ({ created_at, id, marketplace, price, situation }, index) => {
                  const date = new Date(created_at);

                  return (
                    <Col span={12} key={index}>
                      <div key={index} className="cardOffer">
                        <h3>
                          Id da oferta: <strong>{id}</strong>
                        </h3>
                        <p>
                          Valor : <strong>R$ {price}</strong>
                        </p>
                        <p>
                          Criada em :{" "}
                          <strong>
                            {`${date.getDate()}/${
                              date.getMonth() + 1
                            }/${date.getFullYear()}`}
                          </strong>
                        </p>
                        <p>
                          Listada no marketplace :{" "}
                          <strong>{marketplace ? "Sim" : "Não"}</strong>
                        </p>
                        <p>
                          Situação :{" "}
                          <strong>
                            {situation === 1 ? "Ativa" : "Inativa"}
                          </strong>
                        </p>
                        {situation === 1 && (
                          <Link to={`/checkout/${id}`} target="_blank">
                            <Button>Ir para Checkout da Oferta</Button>
                          </Link>
                        )}
                        <button
                          disabled={marketplace == false}
                          onClick={() => updateOffer(id, situation)}
                        >
                          <MdOfflineBolt />
                        </button>
                      </div>
                    </Col>
                  );
                }
              )}
            </Row>
          </Col>
          <Col span={8}>
            <h2>Adicionar nova oferta</h2>
            <Form layout="vertical" onSubmitCapture={onSubmit}>
              <Row gutter={[15, 15]}>
                <Col span={24}>
                  <Form.Item label="Valor da Oferta" required>
                    <InputNumber<number>
                      precision={2}
                      value={formAddOffer.price}
                      onChange={(newValue) => {
                        if (newValue) {
                          formAddOffer.price = newValue < 0 ? 0 : newValue;
                          setFormAddOffer({ ...formAddOffer });
                          return;
                        }

                        formAddOffer.price = 0;
                        setFormAddOffer({ ...formAddOffer });
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Oferta ativa ?" valuePropName="checked">
                    <Switch
                      checked={formAddOffer.situation === 1 ? true : false}
                      onChange={(newValue) => {
                        formAddOffer.situation = newValue ? 1 : 2;
                        setFormAddOffer({ ...formAddOffer });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Listada no marketplace ?"
                    valuePropName="checked"
                  >
                    <Switch
                      checked={formAddOffer.marketplace}
                      onChange={(newValue) => {
                        formAddOffer.marketplace = newValue;
                        setFormAddOffer({ ...formAddOffer });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={submitStatus.loading}
                  >
                    Adicionar Nova Oferta
                  </Button>
                </Col>
                <Col span={24}>
                  {submitStatus.send && (
                    <Alert
                      message={submitStatus.text}
                      type={submitStatus.success ? "success" : "error"}
                    />
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </StructContainer>
    </section>
  );
}
