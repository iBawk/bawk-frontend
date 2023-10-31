import { ChangeEvent, FormEvent } from "react";
import "./checkout-form.scss";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  InputNumber,
  Switch,
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
  title,
  data,
  setData,
  onSubmit,
}: DataElementCheckoutForm) {
  const onChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.fullName.value = value;
    setData({ ...data });
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.email.value = value;
    setData({ ...data });
  };

  const onChangeCardNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.cardNumber.value = value;
    setData({ ...data });
  };

  const onChangeExpirationDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.expirationDate.value = value;
    setData({ ...data });
  };

  const onChangeSecurityCode = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.securityCode.value = value;
    setData({ ...data });
  };

  const onChangeInstallments = (value: number | null) => {
    data.installments.value = value || 1; // Assuming a default of 1 installment
    setData({ ...data });
  };

  const onChangeSaveDataForFuturePurchases = (event: boolean) => {
    data.saveDataForFuturePurchases.value = event;
    setData({ ...data });
  };

  return (
    <div id="ElementCheckoutForm">
      <h1>{title}</h1>
      <hr />
      <Form layout="vertical" onSubmitCapture={onSubmit}>
        <Row gutter={12}>
          <Col span={18}>
            <Form.Item label="Full Name" required>
              <Input required value={data.fullName.value} onChange={onChangeFullName} />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input required value={data.email.value} onChange={onChangeEmail} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Card Number" required>
              <Input required value={data.cardNumber.value} onChange={onChangeCardNumber} />
            </Form.Item>
            <Form.Item label="Expiration Date" required>
              <Input required value={data.expirationDate.value} onChange={onChangeExpirationDate} />
            </Form.Item>
            <Form.Item label="Security Code" required>
              <Input required value={data.securityCode.value} onChange={onChangeSecurityCode} />
            </Form.Item>
            <Form.Item label="Installments" required>
              <InputNumber
                className="inputNumber"
                required
                value={data.installments.value}
                onChange={onChangeInstallments}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Save Data for Future Purchases" valuePropName="checked">
              <Switch
                checked={data.saveDataForFuturePurchases.value}
                onChange={onChangeSaveDataForFuturePurchases}
              />
            </Form.Item>
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
