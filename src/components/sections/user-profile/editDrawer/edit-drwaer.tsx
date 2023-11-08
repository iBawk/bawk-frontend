import type { DrawerProps } from "antd";
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

import { useFormik } from "formik";
import * as Yup from "yup";

import "./edit-drawer.scss";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { AiOutlineCloseCircle } from "react-icons/ai";

const estadosDoBrasil = [
  { value: "Acre", label: "Acre" },
  { value: "Alagoas", label: "Alagoas" },
  { value: "Amapá", label: "Amapá" },
  { value: "Amazonas", label: "Amazonas" },
  { value: "Bahia", label: "Bahia" },
  { value: "Ceará", label: "Ceará" },
  { value: "Distrito Federal", label: "Distrito Federal" },
  { value: "Espírito Santo", label: "Espírito Santo" },
  { value: "Goiás", label: "Goiás" },
  { value: "Maranhão", label: "Maranhão" },
  { value: "Mato Grosso", label: "Mato Grosso" },
  { value: "Mato Grosso do Sul", label: "Mato Grosso do Sul" },
  { value: "Minas Gerais", label: "Minas Gerais" },
  { value: "Pará", label: "Pará" },
  { value: "Paraíba", label: "Paraíba" },
  { value: "Paraná", label: "Paraná" },
  { value: "Pernambuco", label: "Pernambuco" },
  { value: "Piauí", label: "Piauí" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Rio Grande do Norte", label: "Rio Grande do Norte" },
  { value: "Rio Grande do Sul", label: "Rio Grande do Sul" },
  { value: "Rondônia", label: "Rondônia" },
  { value: "Roraima", label: "Roraima" },
  { value: "Santa Catarina", label: "Santa Catarina" },
  { value: "São Paulo", label: "São Paulo" },
  { value: "Sergipe", label: "Sergipe" },
  { value: "Tocantins", label: "Tocantins" },
];

interface EditUserDrawerProps extends DrawerProps {
  onClose: () => void;
  open: boolean;
  initialValues: EditUserFormValues;
  onSubmit: (values: EditUserFormValues) => void;
  disableForm: boolean;
  imageUrl?: string;
}

export type EditUserFormValues = {
  name: string | undefined;
  nationality: string | undefined;
  document: string | undefined;
  birthDate: string | undefined;
  street: string | undefined;
  number: number | undefined;
  city: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  complement: string | undefined;
  state: string | undefined;
  language: string | undefined;
  district: string | undefined;
  phone: string | undefined;
};

const scheme = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório."),
  nationality: Yup.string().required("Nacionalidade é obrigatório."),
  document: Yup.string().required("CPF é obrigatório."),
  birthDate: Yup.string().required("Data de nascimento é obrigatório."),
  street: Yup.string().required("Rua é obrigatório."),
  number: Yup.number()
    .typeError("O numero deve ser apenas numeros.")
    .required("Numero é obrigatório."),
  city: Yup.string().required("Cidade é obrigatório."),
  country: Yup.string().required("Pais é obrigatório."),
  zipCode: Yup.string().required("CEP é obrigatório."),
  complement: Yup.string().optional(),
  state: Yup.string().required("Estado é obrigatório."),
  district: Yup.string().required("Bairro é obrigatório."),
  phone: Yup.string().required("Telefone é obrigatório."),
});

export default function EditUserDrawer({
  open,
  onClose,
  initialValues,
  onSubmit,
  disableForm,
  imageUrl,
}: EditUserDrawerProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: scheme,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <Drawer
        className="edit-drawer"
        width={520}
        onClose={onClose}
        closeIcon={false}
        open={open}
        footer={
          disableForm ? null : (
            <Space style={{ float: "right" }}>
              <Button
                style={{
                  marginRight: 8,
                  width: 120,
                  height: 50,
                  border: "none",
                  fontWeight: "bold",
                }}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                style={{
                  marginRight: 8,
                  width: "auto",
                  height: 50,
                  padding: "0 20px",
                  fontWeight: "bold",
                  backgroundColor: "#23CC67",
                }}
                type="primary"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  event.preventDefault();
                  formik.handleSubmit();
                }}
                disabled={disableForm}
                icon={<CheckCircleOutlined size={10} />}
              >
                Salvar Dados
              </Button>
            </Space>
          )
        }
      >
        <div className="header">
          <h1 className="">Editar perfil</h1>

          <div className="closeIcon">
            <AiOutlineCloseCircle
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
              size={30}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="avatar">
          <Avatar src={imageUrl} size={100} icon={<UserOutlined />} />
        </div>
        <Form onFinish={formik.handleSubmit} className="formikkk">
          <p className="category">Identificação</p>
          <Row>
            <Col span={24}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.name ? "error" : ""}
                help={formik.errors.name}
              >
                <label htmlFor="name" className="labels">
                  Nome
                </label>
                <Input
                  size="large"
                  name="name"
                  placeholder="Seu nome completo"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 8]}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.nationality ? "error" : ""}
                help={formik.errors.nationality}
              >
                <label htmlFor="nationality" className="labels">
                  Nacionalidade
                </label>
                <Select
                  size="large"
                  onChange={(value) => {
                    formik.setValues({
                      ...formik.values,
                      nationality: value,
                    });
                  }}
                  value={formik.values.nationality}
                  options={[{ value: "Brasileiro", label: "Brasileiro" }]}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.language ? "error" : ""}
                help={formik.errors.language}
              >
                <label htmlFor="language" className="labels">
                  Idioma
                </label>
                <Select
                  size="large"
                  onChange={(value) => {
                    formik.setValues({
                      ...formik.values,
                      language: value,
                    });
                  }}
                  value={formik.values.language}
                  options={[{ value: "Portugues", label: "Portugues" }]}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 8]}>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="type" className="labels">
                  Tipo de Documento
                </label>
                <Select
                  size="large"
                  value={"cpf"}
                  options={[{ value: "cpf", label: "CPF" }]}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.document ? "error" : ""}
                help={formik.errors.document}
              >
                <label htmlFor="document" className="labels">
                  Nº do documento
                </label>
                <Input
                  name="document"
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.document}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.birthDate ? "error" : ""}
                help={formik.errors.birthDate}
              >
                <label htmlFor="birtDate" className="labels">
                  Data de nascimento
                </label>
                <Input
                  name="birthDate"
                  size="large"
                  onChange={(event) => {
                    let { value } = event.target;

                    value = value.replace(/\D/g, "");

                    if (value.length >= 2) {
                      value = `${value.slice(0, 2)}/${value.slice(2)}`;
                    }
                    if (value.length >= 5) {
                      value = `${value.slice(0, 5)}/${value.slice(5)}`;
                    }

                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }

                    formik.setFieldValue("birthDate", value);
                  }}
                  value={formik.values.birthDate}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.phone ? "error" : ""}
                help={formik.errors.phone}
              >
                <label htmlFor="birtDate" className="labels">
                  Telefone
                </label>
                <Input
                  name="phone"
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <p className="category">Endereço</p>

          <Row gutter={[10, 8]}>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="type" className="labels">
                  País
                </label>
                <Select
                  size="large"
                  value={formik.values.country}
                  onChange={(value) => {
                    formik.setValues({
                      ...formik.values,
                      country: value,
                    });
                  }}
                  options={[{ value: "brazil", label: "Brasil" }]}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.zipCode ? "error" : ""}
                help={formik.errors.zipCode}
              >
                <label htmlFor="zipCode" className="labels">
                  CEP
                </label>
                <Input
                  name="zipCode"
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.zipCode}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 8]}>
            <Col span={16}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.street ? "error" : ""}
                help={formik.errors.street}
              >
                <label htmlFor="street" className="labels">
                  Endereço
                </label>
                <Input
                  size="large"
                  name="street"
                  placeholder="Rua, Avenida, Alameda"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.number ? "error" : ""}
                help={formik.errors.number}
              >
                <label htmlFor="number" className="labels">
                  Numero
                </label>
                <Input
                  size="large"
                  name="number"
                  placeholder="123"
                  onChange={formik.handleChange}
                  value={formik.values.number}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 8]}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.complement ? "error" : ""}
                help={formik.errors.complement}
              >
                <label htmlFor="complement" className="labels">
                  Complemento
                </label>
                <Input
                  size="large"
                  name="complement"
                  placeholder="Ap, Bloco"
                  onChange={formik.handleChange}
                  value={formik.values.complement}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.district ? "error" : ""}
                help={formik.errors.district}
              >
                <label htmlFor="district" className="labels">
                  Bairro
                </label>
                <Input
                  size="large"
                  name="district"
                  placeholder="Centro"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 8]}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.city ? "error" : ""}
                help={formik.errors.city}
              >
                <label htmlFor="city" className="labels">
                  Cidade
                </label>
                <Input
                  size="large"
                  name="city"
                  placeholder="Ap, Bloco"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={formik.errors.state ? "error" : ""}
                help={formik.errors.state}
              >
                <label htmlFor="state" className="labels">
                  Estado
                </label>
                <Select
                  size="large"
                  value={formik.values.state}
                  onChange={(value) => {
                    console.log(value),
                      formik.setValues({
                        ...formik.values,
                        state: value,
                      });
                  }}
                  options={estadosDoBrasil}
                  disabled={disableForm}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
