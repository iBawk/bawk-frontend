import { useNavigate, useParams } from "react-router-dom";
import "./checkout.scss";
import { Row, Col, Flex, Form, Input, Radio, Button, Select } from "antd";
import { useEffect, useState } from "react";
import API from "../../../services/api/api";
import { ResponseGetOffer } from "../../../services/api/endpoints/checkout";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CreditCardTwoTone,
  Loading3QuartersOutlined,
  QuestionOutlined,
  SecurityScanFilled,
} from "@ant-design/icons";
import { MdPix } from "react-icons/md";

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  email: Yup.string().email().required("Email é obrigatório."),
  phone: Yup.string().required("Numero é obrigatório."),
  paymentMethod: Yup.number().required("Forma de pagamento é obrigatório."),
  cardNumber: Yup.string().required("Numero do cartão é obrigatório."),
  cardMonth: Yup.string().required("Mês é obrigatório."),
  cardYear: Yup.string().required("Ano é obrigatório."),
  cardSecurityCode: Yup.string().required("Código de segurança é obrigatório."),
  parcels: Yup.number().required("Parcelas é obrigatório."),
});

export default function SectionCheckout() {
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState<ResponseGetOffer>();

  console.log(offerId);

  useEffect(() => {
    if (offerId) {
      API.public.getCheckout(offerId).then((response) => {
        console.log(response);
        setOffer(response);
      });
    }
  }, [offerId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      paymentMethod: 1,
      cardNumber: "",
      cardMonth: "Mês",
      cardYear: "Ano",
      cardSecurityCode: "",
      parcels: 1,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const body = {
        offer_id: offerId ? offerId : "",
        email_buyer: values.email,
        name_buyer: values.name,
        phone_buyer: values.phone,
        paymentMethod: values.paymentMethod,
      };

      API.private.postCheckout(body);

      navigate("/checkout/success");
    },
  });

  return (
    <section id="SectionCheckout">
      {offer?.product?.name ? (
        <Flex className="main" justify="start" align="start" vertical>
          <Flex className="titleBox" justify="left" align="left">
            <h1>{offer.product.name}</h1>
          </Flex>
          <Flex className="formWrapper" justify="left" align="left">
            <Form className="form" onFinish={formik.handleSubmit}>
              <div>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.name ? "error" : ""}
                  style={{ marginBottom: 8 }}
                >
                  <Input
                    size="large"
                    name="name"
                    placeholder="Nome completo"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.email ? "error" : ""}
                  style={{ marginBottom: 8 }}
                >
                  <Input
                    size="large"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.phone ? "error" : ""}
                  style={{ marginBottom: 64 }}
                >
                  <Input
                    size="large"
                    name="phone"
                    placeholder="Telefone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </Form.Item>
              </div>
              <div>
                <Radio.Group
                  name="paymentMethod"
                  onChange={formik.handleChange}
                  value={formik.values.paymentMethod}
                  size="large"
                >
                  <Radio.Button value={1} style={{ borderRadius: 0 }}>
                    <CreditCardTwoTone /> - Cartão de crédito
                  </Radio.Button>
                  <Radio.Button value={2} disabled style={{ borderRadius: 0 }}>
                    <MdPix /> - PIX
                  </Radio.Button>
                </Radio.Group>
              </div>
              <div>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.cardNumber ? "error" : ""}
                  style={{ marginTop: 18 }}
                >
                  <Input
                    size="large"
                    name="cardNumber"
                    placeholder="Numero do cartão"
                    onChange={formik.handleChange}
                    value={formik.values.cardNumber}
                    suffix={<SecurityScanFilled />}
                  />
                </Form.Item>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
                    <Form.Item
                      hasFeedback
                      validateStatus={formik.errors.cardMonth ? "error" : ""}
                    >
                      <Select
                        size="large"
                        placeholder="Numero do cartão"
                        onChange={(value) => {
                          formik.setValues({
                            ...formik.values,
                            cardMonth: value,
                          });
                        }}
                        value={formik.values.cardMonth}
                        options={[
                          { value: "01", label: "01" },
                          { value: "02", label: "02" },
                          { value: "03", label: "03" },
                          { value: "04", label: "04" },
                          { value: "05", label: "05" },
                          { value: "06", label: "06" },
                          { value: "07", label: "07" },
                          { value: "08", label: "08" },
                          { value: "09", label: "09" },
                          { value: "10", label: "10" },
                          { value: "11", label: "11" },
                          { value: "12", label: "12" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      hasFeedback
                      validateStatus={formik.errors.cardYear ? "error" : ""}
                    >
                      <Select
                        size="large"
                        onChange={(value) => {
                          formik.setValues({
                            ...formik.values,
                            cardYear: value,
                          });
                        }}
                        value={formik.values.cardYear}
                        options={[
                          { value: "23", label: "23" },
                          { value: "24", label: "24" },
                          { value: "25", label: "25" },
                          { value: "26", label: "26" },
                          { value: "27", label: "27" },
                          { value: "28", label: "28" },
                          { value: "29", label: "29" },
                          { value: "30", label: "30" },
                          { value: "31", label: "31" },
                          { value: "32", label: "32" },
                          { value: "33", label: "33" },
                          { value: "34", label: "34" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      hasFeedback
                      validateStatus={
                        formik.errors.cardSecurityCode ? "error" : ""
                      }
                    >
                      <Input
                        size="large"
                        name="cardSecurityCode"
                        placeholder="Cod. Segurança"
                        onChange={formik.handleChange}
                        value={formik.values.cardSecurityCode}
                        suffix={<QuestionOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <Form.Item
                    hasFeedback
                    validateStatus={formik.errors.parcels ? "error" : ""}
                  >
                    <label htmlFor="nationality" className="labels">
                      Parcelas
                    </label>
                    <Select
                      size="large"
                      placeholder="Confirmar email"
                      onChange={(value) => {
                        formik.setValues({
                          ...formik.values,
                          parcels: value,
                        });
                      }}
                      value={formik.values.parcels}
                      options={[{ value: 1, label: `1x de R$ ${offer.price}` }]}
                    />
                  </Form.Item>
                </div>
                <Col span={24}>
                  <Button
                    size="large"
                    style={{
                      width: "100%",
                      backgroundColor: "#46C900",
                      color: "#fff",
                    }}
                    onClick={(
                      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                      event.preventDefault();
                      formik.handleSubmit();
                    }}
                  >
                    COMPRAR
                  </Button>
                </Col>
              </div>
            </Form>
          </Flex>
        </Flex>
      ) : (
        <Flex>
          <Loading3QuartersOutlined />
        </Flex>
      )}
    </section>
  );
}
