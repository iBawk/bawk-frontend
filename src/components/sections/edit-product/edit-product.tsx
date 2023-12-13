import "./edit-product.scss";
import ElementProductForm, {
  DataProductForm,
  DataSubmitStatus,
} from "../../elements/product-form/product-form";
import StructContainer from "../../structs/container/container";
import { useState, FormEvent } from "react";
import Auth from "../../../services/auth/auth";
import { useNavigate } from "react-router-dom";
import API from "../../../services/api/api";

export type DataSectionEditProduct = {
  id: string;
  productData: DataProductForm;
  imgPlaceHolder: string;
};

export default function SectionEditProduct(data: DataSectionEditProduct) {
  const { productData, imgPlaceHolder, id } = data;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    edit: boolean;
    data: DataProductForm;
  }>({
    edit: false,
    data: productData,
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
    } = formData.data;

    const imageUpdate = image.value !== null;
    const validToSend =
      formData.edit &&
      category.valid &&
      description.valid &&
      email.valid &&
      markdown.valid &&
      name.valid &&
      phone.valid &&
      salerName.valid;

    if (imageUpdate || validToSend)
      setSubmitStatus({
        send: false,
        loading: true,
        ok: false,
        text: "",
      });

    if (imageUpdate)
      API.private.postProductImage(auth, id, image.value!).then(() => {
        setSubmitStatus({
          send: true,
          loading: false,
          ok: true,
          text: "Sucesso ao editar produto !",
        });
        navigate("/painel/produtos");
      });

    if (validToSend)
      API.private
        .putProduct(auth, {
          id,
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
        .then(() => {
          setSubmitStatus({
            send: true,
            loading: false,
            ok: true,
            text: "Sucesso ao editar produto !",
          });
          navigate("/painel/produtos");
        })
        .catch((error) => {
          console.log(error);
          setSubmitStatus({
            send: true,
            loading: false,
            ok: true,
            text: "Erro ao editar produto! Tente nomavente mais tarde.",
          });
        });
  };

  return (
    <section id="EditProduct">
      <StructContainer>
        <ElementProductForm
          title="Editar Produto"
          data={formData.data}
          setData={(newData) => {
            setFormData({ edit: true, data: { ...newData } });
          }}
          onSubmit={onSubmit}
          submitStatus={submitStatus}
          imgPlaceHolder={imgPlaceHolder}
        />
      </StructContainer>
    </section>
  );
}
