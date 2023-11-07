import "./product-offers.scss";
import { redirect, useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import StructContainer from "../../../components/structs/container/container";
import { FormEvent, useState } from "react";
import { Button, Col, Form, Input, InputNumber, Row, Switch } from "antd";
import API from "../../../services/api/api";

export type ResponseLoaderPageProductOffers = {
  productId: string;
};

export async function LoaderPageProductOffers({
  params,
}: any): Promise<ResponseLoaderPageProductOffers | Response> {
  const auth = Auth.getAuth();

  if (!params.id || !auth) return redirect("/auth/login");

  return {
    productId: params.id,
  };
}

export default function PageProductOffers() {
  const loaderData = useLoaderData() as ResponseLoaderPageProductOffers;
  const [formOferta, setFormOferta] = useState<{}>();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Auth.getAuth();

    if (!auth) {
      return;
    }

    API.private.postOffer(auth, {
      marketplace: false,
      price: 100.9,
      product_id: loaderData.productId,
      situation: 1,
    });
  };

  return (
    <main>
      <section id="SectionOffers">
        <StructContainer>
          <Form layout="vertical" onSubmitCapture={onSubmit}>
            <Row>
              <Col span={12}>
                <Form.Item label="InputNumber">
                  <InputNumber />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}></Col>
              <Col span={12}>
                <Button htmlType="submit">Enviar</Button>
              </Col>
              <Col span={12}></Col>
            </Row>
          </Form>
        </StructContainer>
      </section>
    </main>
  );
}
