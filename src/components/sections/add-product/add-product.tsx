import "./add-product.scss";
import ElementProductForm, {
  DataProductForm,
} from "../../elements/product-form/product-form";
import { FormEvent, useState } from "react";
import API from "../../../services/api/api";
import { useNavigate } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import StructContainer from "../../structs/container/container";

export default function SectionAddProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<DataProductForm>({
    name: { value: "", error: false, valid: false },
    category: { value: "", error: false, valid: false },
    description: { value: "", error: false, valid: false },
    email: { value: "", error: false, valid: false },
    image: { value: null, error: false, valid: false },
    markdown: { value: "", error: false, valid: false },
    phone: { value: "", error: false, valid: false },
    price: { value: "", error: false, valid: false },
    salerName: { value: "", error: false, valid: false },
    visibleForSale: { value: true, error: false, valid: false },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = Auth.getAuth();

    if (!auth) {
      navigate("/auth/login");
      return;
    }

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
        situation: productData.visibleForSale.value ? 2 : 1,
      })
      .then((response) => {
        if (productData.image.value)
          API.private
            .postProductImage(auth, response.id, productData.image.value)
            .then(() => {})
            .catch((e) => {
              console.error(e);
            });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <section id="SectionAddProduct">
      <StructContainer>
        <ElementProductForm
          data={productData}
          onSubmit={onSubmit}
          setData={setProductData}
          title="Adicionar novo produto"
        />
      </StructContainer>
    </section>
  );
}
