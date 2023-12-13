import { useNavigate, useParams } from "react-router-dom";
import "./checkout.scss";
import { Row, Col, Form, Input, Radio, Button, Image, Flex } from "antd";
import { useEffect, useState } from "react";
import API from "../../../services/api/api";
import { ResponseGetOffer } from "../../../services/api/endpoints/checkout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreditCardTwoTone } from "@ant-design/icons";
import { MdPix } from "react-icons/md";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import fazOPixBB from "../../../assets/imgs/faz-o-pix-bb.jpg";
import StructContainer from "../../structs/container/container";

export interface DataSectionCheckout {
  userInformations?: ResponseGetUserMe;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  email: Yup.string().email().required("Email é obrigatório."),
  phone: Yup.string().required("Numero é obrigatório."),
});

export default function SectionCheckout({
  userInformations,
}: DataSectionCheckout) {
  const [statusButton, setStatusButton] = useState<{
    loading: boolean;
    ok: boolean;
    error: boolean;
  }>({
    error: false,
    loading: false,
    ok: false,
  });
  const { offerId } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState<ResponseGetOffer>();

  useEffect(() => {
    if (offerId) {
      API.public.getCheckout(offerId).then((response) => {
        setOffer(response);
      });
    }
  }, [offerId]);

  const formik = useFormik({
    initialValues: {
      name: userInformations?.user.name ?? "",
      email: userInformations?.user.email ?? "",
      phone: userInformations?.user.phone ?? "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const body = {
        offer_id: offerId ? offerId : "",
        email_buyer: values.email,
        name_buyer: values.name,
        phone_buyer: values.phone,
        paymentMethod: 2,
      };

      setStatusButton({
        error: false,
        loading: true,
        ok: false,
      });

      try {
        const res = await API.private.postCheckout(body);
        navigate("/painel/minhas-compras");
        return;
      } catch (e) {
        setStatusButton({
          error: true,
          loading: false,
          ok: false,
        });
        console.error(e);
      }
    },
  });

  return (
    <section id="SectionCheckout">
      {offer?.product?.name ? (
        <StructContainer>
          <Row justify={"center"}>
            <Col lg={12} className="contentCheckout">
              <h1>{offer.product.name}</h1>
              <hr />
              <Form onFinish={formik.handleSubmit} layout="vertical">
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.name ? "error" : ""}
                >
                  <Input
                    size="large"
                    name="name"
                    placeholder="Nome completo"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.email ? "error" : ""}
                >
                  <Input
                    size="large"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  validateStatus={formik.errors.phone ? "error" : ""}
                >
                  <Input
                    size="large"
                    name="phone"
                    placeholder="Telefone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                </Form.Item>
                <Flex vertical align="center">
                  <Radio.Group
                    name="paymentMethod"
                    onChange={formik.handleChange}
                    value={2}
                    size="large"
                  >
                    <Radio.Button value={2} style={{ borderRadius: 0 }}>
                      <MdPix /> - PIX
                    </Radio.Button>
                    <Radio.Button
                      value={1}
                      disabled
                      style={{ borderRadius: 0 }}
                    >
                      <CreditCardTwoTone /> - Cartão de crédito
                    </Radio.Button>
                  </Radio.Group>

                  <Image className="fazOPixBB" src={fazOPixBB} />
                </Flex>
                <Button
                  loading={statusButton.loading}
                  danger={statusButton.error}
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
                  {statusButton.error ? "ERROR" : "COMPRAR"}
                </Button>
              </Form>
            </Col>
          </Row>
        </StructContainer>
      ) : null}
    </section>
  );
}
