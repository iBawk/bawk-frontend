import { ChangeEvent, FormEvent } from "react";
import "./product-form.scss";
import { Form, Row, Col, Button, Select, Alert, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import ReactQuill from "react-quill";
import ElementImageInput from "../image-input/image-input";
import ElementInputText, {
  FildInputText,
} from "../form-input-text/form-input-text";
import Validation from "../../../helpers/validation/validation";
import Mask from "../../../helpers/mask/maks";

export type FildForm<T> = {
  value: T;
  invalid: boolean;
  valid: boolean;
};

export const Categories = [
  "Alimentos e Bebidas",
  "Animais",
  "Arte e Artesanato",
  "Bebês",
  "Beleza e Cuidados Pessoais",
  "Brinquedos e Jogos",
  "Casa e Cozinha",
  "CDs e Vinil",
  "Computadores e Informática",
  "Cozinha",
  "DVD e Blu-ray",
  "Dispositivos Amazon e Acessórios",
  "Eletrônicos",
  "Ferramentas e Materiais de Construção",
  "Games",
  "Instrumentos Musicais",
  "Jardim e Piscina",
  "Livros",
  "Livros em outras Línguas",
  "Moda",
  "Música Digital",
  "Papelaria e Escritório",
  "Pet Shop",
  "Saúde",
  "Software",
  "Utilidades Domésticas",
  "Vestuário",
  "Videogames",
];

export type DataProductForm = {
  name: FildInputText;
  salerName: FildInputText;
  email: FildInputText;
  phone: FildInputText;
  category: FildInputText;
  description: FildInputText;
  markdown: FildForm<string>;
  image: FildForm<File | null>;
  situation: number;
};

export type DataSubmitStatus = {
  send: boolean;
  ok: boolean;
  loading: boolean;
  text: string;
};

export type DataElementProductForm = {
  title: string;
  data: DataProductForm;
  setData: (data: DataProductForm) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  imgPlaceHolder?: string;
  submitStatus?: DataSubmitStatus;
};

export default function ElementProductForm({
  title,
  data,
  setData,
  onSubmit,
  imgPlaceHolder,
  submitStatus,
}: DataElementProductForm) {
  const onChangeImage = (value: File | null) => {
    data.image = { value: value, valid: !!value, invalid: false };
    setData({ ...data });
  };

  const onChangeCategory = (event: string) => {
    data.category = { value: event, invalid: false, valid: true };
    setData({ ...data });
  };

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    data.description = {
      value: newValue,
      valid: newValue.length > 0,
      invalid: false,
    };

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
                required={!imgPlaceHolder}
                onChange={onChangeImage}
                value={data.image.value}
                imgPlaceHolder={imgPlaceHolder}
              />
            </Form.Item>
            <Form.Item label="Produto Ativo ?">
              <Switch
                checked={data.situation === 1}
                onChange={(newValue) => {
                  data.situation = newValue ? 1 : 2;
                  setData({ ...data });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <ElementInputText
              required
              label="Nome do Produto"
              min={4}
              value={data.name}
              setValue={(newValue) => {
                data.name = newValue;
                setData({ ...data });
              }}
            />
            <ElementInputText
              required
              label="Nome do Vendedor"
              min={4}
              value={data.salerName}
              setValue={(newValue) => {
                data.salerName = newValue;
                setData({ ...data });
              }}
            />
            <ElementInputText
              required
              label="Email"
              value={data.email}
              setValue={(newValue) => {
                data.email = newValue;
                setData({ ...data });
              }}
              isValid={Validation.isEmailValid}
              isInvalid={Validation.isEmailInvalid}
            />
            <ElementInputText
              required
              label="Telefone"
              value={data.phone}
              setValue={(newValue) => {
                data.phone = newValue;
                setData({ ...data });
              }}
              isValid={Validation.isPhoneNumberValid}
              isInvalid={Validation.isPasswordInvalid}
              masked={Mask.phoneNumberMask}
            />
            <Form.Item label="Categoria do produto" required>
              <Select value={data.category.value} onChange={onChangeCategory}>
                {Categories.map((category, index) => (
                  <Select.Option key={index} value={category}>
                    {category}
                  </Select.Option>
                ))}
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
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ script: "sub" }, { script: "super" }],
                    [{ indent: "-1" }, { indent: "+1" }],
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],
                    ["clean"],
                  ],
                  clipboard: {
                    matchVisual: false,
                  },
                }}
              />
            </Form.Item>
          </Col>
          <Col className="containerButton" span={24}>
            {submitStatus?.send && (
              <Alert
                type={submitStatus?.ok ? "success" : "error"}
                message={submitStatus?.text}
              />
            )}
            <Button
              htmlType="submit"
              type="primary"
              loading={submitStatus?.loading}
            >
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
