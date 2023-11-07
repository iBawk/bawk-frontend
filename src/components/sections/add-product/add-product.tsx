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

export default function SectionAddProduct() {
  const initialValue = { value: "", valid: false, invalid: false };

  const navigate = useNavigate();
  const [productData, setProductData] = useState<DataProductForm>({
    name: { ...initialValue },
    category: { ...initialValue },
    description: { ...initialValue },
    email: { ...initialValue },
    image: { value: null, error: false, valid: false },
    markdown: { value: "", error: false, valid: false },
    phone: { ...initialValue },
    salerName: { ...initialValue },
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
      navigate("/auth/login");
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
        situation: 1,
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
