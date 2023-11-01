import { FormEvent } from "react";
import "./checkout-form.scss";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  InputNumber,
} from "antd";

export type FieldForm<T> = {
  value: T;
  error: boolean;
  valid: boolean;
};

export type DataCheckoutForm = {
  cardNumber: FieldForm<string>;
  expirationDate: FieldForm<string>;
  securityCode: FieldForm<string>;
  installments: FieldForm<number>;
  fullName: FieldForm<string>;
  email: FieldForm<string>;
  saveDataForFuturePurchases: FieldForm<boolean>;
};

export type DataElementCheckoutForm = {
  title: string;
  data: DataCheckoutForm;
  setData: (data: DataCheckoutForm) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ElementCheckoutForm({

}: DataElementCheckoutForm) {


  return (
    <div id="ElementCheckoutForm">
      <h1>{"Produto"}</h1>
      <hr />
      <Form layout="vertical" >
        <Row gutter={12}>
          <Col span={18}>
            <Form.Item label="Full Name" required>
              <Input required />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input required />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Card Number" required>
              <Input required />
            </Form.Item>
            <Form.Item label="Expiration Date" required>
              <Input required/>
            </Form.Item>
            <Form.Item label="Security Code" required>
              <Input required />
            </Form.Item>
            <Form.Item label="Installments" required>
              <InputNumber
                className="inputNumber"
                required
              />
            </Form.Item>
          </Col>
          <Col span={12}>
          </Col>
          <Col span={24}>
          </Col>
          <Col className="containerButton" span={24}>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
