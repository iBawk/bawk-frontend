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
  number: string | undefined;
  city: string | undefined;
  country: string | undefined;
  zipCode: string | undefined;
  complement: string | undefined;
  state: string | undefined;
  language: string | undefined;
};

const scheme = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  nationality: Yup.string().required("Nacionalidade é obrigatório"),
  document: Yup.string().required("CPF é obrigatório"),
  birthDate: Yup.string().required("Data de nascimento é obrigatório"),
  street: Yup.string().required("Rua é obrigatório"),
  number: Yup.string().required("Numero é obrigatório"),
  city: Yup.string().required("Cidade é obrigatório"),
  country: Yup.string().required("Pais é obrigatório"),
  zipCode: Yup.string().required("CEP é obrigatório"),
  complement: Yup.string().optional(),
  state: Yup.string().required("Estado é obrigatório"),
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

  console.log(initialValues);
  console.log(formik.initialValues);

  return (
    <>
      <Drawer
        className="edit-drawer"
        width={520}
        onClose={onClose}
        closeIcon={false}
        open={open}
        footer={
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
                validateStatus={
                  formik.touched.name && formik.errors.name ? "error" : ""
                }
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
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={
                  formik.touched.nationality && formik.errors.nationality
                    ? "error"
                    : ""
                }
                help={formik.errors.nationality}
              >
                <label htmlFor="nationality" className="labels">
                  Nacionalidade
                </label>
                <Select
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.nationality}
                  options={[{ value: "brazil", label: "Brasileiro" }]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={
                  formik.touched.nationality && formik.errors.nationality
                    ? "error"
                    : ""
                }
                help={formik.errors.nationality}
              >
                <label htmlFor="nationality" className="labels">
                  Idioma
                </label>
                <Select
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.language}
                  options={[{ value: "portuguese", label: "Portugues" }]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Form.Item>
                <label htmlFor="type" className="labels">
                  Tipo de Documento
                </label>
                <Select
                  size="large"
                  value={"cpf"}
                  options={[{ value: "cpf", label: "CPF" }]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hasFeedback
                validateStatus={
                  formik.touched.document && formik.errors.document
                    ? "error"
                    : ""
                }
                help={formik.errors.document}
              >
                <label htmlFor="document" className="labels">
                  Nº do documento
                </label>
                <Input
                  size="large"
                  onChange={formik.handleChange}
                  value={formik.values.document}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                hasFeedback
                validateStatus={
                  formik.touched.nationality && formik.errors.nationality
                    ? "error"
                    : ""
                }
                help={formik.errors.nationality}
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
                />
              </Form.Item>
            </Col>
          </Row>

          <p className="category">Endereço</p>

          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.street && formik.errors.street ? "error" : ""
            }
            help={formik.errors.street}
          >
            <label htmlFor="street" className="labels">
              Rua
            </label>
            <Input
              size="large"
              placeholder="Rua, Avenida, Alameda"
              onChange={formik.handleChange}
              value={formik.values.street}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.number && formik.errors.number ? "error" : ""
            }
            help={formik.errors.number}
          >
            <label htmlFor="number" className="labels">
              Número
            </label>
            <Input
              size="large"
              placeholder="123"
              onChange={formik.handleChange}
              value={formik.values.number}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.city && formik.errors.city ? "error" : ""
            }
            help={formik.errors.city}
          >
            <label htmlFor="city" className="labels">
              Cidade
            </label>
            <Input
              size="large"
              placeholder="Sao Paulo"
              onChange={formik.handleChange}
              value={formik.values.city}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.country && formik.errors.country ? "error" : ""
            }
            help={formik.errors.country}
          >
            <label htmlFor="country" className="labels">
              País
            </label>
            <Input
              size="large"
              placeholder="Seu nome completo"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.zipCode && formik.errors.zipCode ? "error" : ""
            }
            help={formik.errors.zipCode}
          >
            <label htmlFor="zipCode" className="labels">
              Nacionalidade
            </label>
            <Input
              size="large"
              placeholder="06454-000"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.state && formik.errors.state ? "error" : ""
            }
            help={formik.errors.state}
          >
            <label htmlFor="state" className="labels">
              Nacionalidade
            </label>
            <Input
              size="large"
              placeholder="Seu nome completo"
              onChange={formik.handleChange}
              value={formik.values.state}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              formik.touched.complement && formik.errors.complement
                ? "error"
                : ""
            }
            help={formik.errors.complement}
          >
            <label htmlFor="complement" className="labels">
              Nacionalidade
            </label>
            <Input
              size="large"
              placeholder="Seu nome completo"
              onChange={formik.handleChange}
              value={formik.values.complement}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
