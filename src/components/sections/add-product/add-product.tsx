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

    setSubmitStatus({
      loading: true,
      ok: false,
      send: false,
      text: "",
    });

    API.private
      .postProduct(auth, {
        category: productData.category.value,
        description: productData.description.value,
        format: "",
        markdown: productData.markdown.value,
        name: productData.name.value,
        sallerInEmail: productData.email.value,
        sallerInName: productData.salerName.value,
        sallerInPhone: productData.phone.value,
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
