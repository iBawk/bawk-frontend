import { ChangeEvent, FormEvent } from "react";
import "./product-form.scss";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import ElementImageInput from "../image-input/image-input";

export type FildForm<T> = {
  value: T;
  error: boolean;
  valid: boolean;
};

export type DataProductForm = {
  name: FildForm<string>;
  salerName: FildForm<string>;
  email: FildForm<string>;
  phone: FildForm<string>;
  price: FildForm<string>;
  category: FildForm<string>;
  visibleForSale: FildForm<boolean>;
  description: FildForm<string>;
  markdown: FildForm<string>;
  image: FildForm<File | null>;
};

export type DataElementProductForm = {
  title: string;
  data: DataProductForm;
  setData: (data: DataProductForm) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ElementProductForm({
  title,
  data,
  setData,
  onSubmit,
}: DataElementProductForm) {
  const onChangeImage = (value: File | null) => {
    data.image.value = value;
    setData({ ...data });
  };

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.name.value = value;
    setData({ ...data });
  };

  const onChangeSalerName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.salerName.value = value;
    setData({ ...data });
  };

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.email.value = value;
    setData({ ...data });
  };

  const onChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    data.phone.value = value;
    setData({ ...data });
  };

  const onChangeVisibleForSale = (event: boolean) => {
    data.visibleForSale.value = event;
    setData({ ...data });
  };

  const onChangePrice = (event: string | null) => {
    data.price.value = event ?? "";
    setData({ ...data });
  };

  const onChangeCategory = (event: string) => {
    data.category.value = event;
    setData({ ...data });
  };

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    data.description.value = value;
    setData({ ...data });
  };

  const onChangeMarkdown = (value: string) => {
    data.markdown.value = value;
    setData({ ...data });
  };

  return (
    <div id="ElementProductForm">
      <h1>{title}</h1>
      <hr />
      <Form layout="vertical" onSubmitCapture={onSubmit}>
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="Imagem do Produto" required>
              <ElementImageInput
                required
                onChange={onChangeImage}
                value={data.image.value}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item label="Nome do produto" required>
              <Input required value={data.name.value} onChange={onChangeName} />
            </Form.Item>
            <Form.Item label="Nome do vendedor" required>
              <Input
                required
                value={data.salerName.value}
                onChange={onChangeSalerName}
              />
            </Form.Item>
            <Form.Item label="Email" required>
              <Input
                required
                value={data.email.value}
                onChange={onChangeEmail}
              />
            </Form.Item>
            <Form.Item label="Telefone" required>
              <Input
                required
                value={data.phone.value}
                onChange={onChangePhone}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Listado para venda" valuePropName="checked">
              <Switch
                checked={data.visibleForSale.value}
                onChange={onChangeVisibleForSale}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Valor do produto" required>
              <InputNumber
                className="inputNumber"
                required
                value={data.price.value}
                onChange={onChangePrice}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Categoria do produto" required>
              <Select value={data.category.value} onChange={onChangeCategory}>
                <Select.Option value="demo">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Descrição breve do produto" required>
              <TextArea
                rows={4}
                required
                value={data.description.value}
                onChange={onChangeDescription}
              />
            </Form.Item>
            <Form.Item label="Descrição detalhada do produto">
              <ReactQuill
                className="quill"
                value={data.markdown.value}
                onChange={onChangeMarkdown}
              />
            </Form.Item>
          </Col>
          <Col className="containerButton" span={24}>
            <Button htmlType="submit" type="primary">
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
