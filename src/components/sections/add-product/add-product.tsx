import "./add-product.scss";
import ElementProductForm, {
  DataProductForm,
  DataSubmitStatus,
} from "../../elements/product-form/product-form";
import { FormEvent, useState } from "react";
import API from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import StructContainer from "../../structs/container/container";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";

export interface DataSectionAddProduct {
  userInformations?: ResponseGetUserMe;
}

export default function SectionAddProduct({
  userInformations,
}: DataSectionAddProduct) {
  const initialValue = { value: "", valid: false, invalid: false };

  const navigate = useNavigate();
  const [productData, setProductData] = useState<DataProductForm>({
    name: { ...initialValue },
    category: { ...initialValue },
    description: { ...initialValue },
    email: {
      value: userInformations?.user.email ?? "",
      valid: false,
      invalid: false,
    },
    image: { value: null, invalid: false, valid: false },
    markdown: { value: "", invalid: false, valid: false },
    phone: {
      value: userInformations?.user.phone ?? "",
      valid: false,
      invalid: false,
    },
    salerName: {
      value: userInformations?.user.name ?? "",
      valid: false,
      invalid: false,
    },
    situation: 1,
  });

  const [submitStatus, setSubmitStatus] = useState<DataSubmitStatus>({
    loading: false,
    ok: false,
    send: false,
    text: "",
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Auth.getAuth();

    if (!auth) {
      navigate("/login");
      return;
    }

    const {
      category,
      description,
      email,
      image,
      markdown,
      name,
      phone,
      salerName,
      situation,
    } = productData;

    const isValidForSend =
      category.valid &&
      description.valid &&
      email.valid &&
      image.valid &&
      name.valid &&
      phone.valid &&
      salerName.valid;

    if (!isValidForSend) return;

    setSubmitStatus({
      loading: true,
      ok: false,
      send: false,
      text: "",
    });

    API.private
      .postProduct(auth, {
        category: category.value,
        description: description.value,
        format: "",
        markdown: markdown.value,
        name: name.value,
        sallerInEmail: email.value,
        sallerInName: salerName.value,
        sallerInPhone: phone.value,
        situation: situation,
      })
      .then((response) => {
        if (productData.image.value)
          API.private
            .postProductImage(auth, response.id, productData.image.value)
            .then(() => {
              setSubmitStatus({
                loading: false,
                ok: true,
                send: true,
                text: "Produto cadastrado com sucesso !",
              });
              navigate("/painel/produtos");
            })
            .catch((e) => {
              console.error(e);
              setSubmitStatus({
                loading: false,
                ok: false,
                send: true,
                text: "Falha ao cadastrar imagem do produto !",
              });
            });
      })
      .catch((e) => {
        console.error(e);
        setSubmitStatus({
          loading: false,
          ok: false,
          send: true,
          text: "Falha ao cadastrar produto !",
        });
      });
  };

  return (
    <section id="SectionAddProduct">
      <StructContainer>
        <ElementProductForm
          data={productData}
          onSubmit={onSubmit}
          submitStatus={submitStatus}
          setData={setProductData}
          title="Adicionar novo produto"
        />
      </StructContainer>
    </section>
  );
}
