import "./edit-product.scss";
import ElementProductForm, {
  DataProductForm,
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

  const [formData, setFormData] = useState<DataProductForm>(productData);

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
      price,
      salerName,
      visibleForSale,
    } = formData;

    API.private.putProduct(auth, {
      id,
      category: category.value,
      description: description.value,
      format: "",
      markdown: markdown.value,
      name: name.value,
      sallerInEmail: email.value,
      sallerInName: salerName.value,
      sallerInPhone: phone.value,
      situation: visibleForSale.value ? 2 : 1,
    });

    console.log(formData);
  };

  return (
    <section id="EditProduct">
      <StructContainer>
        <ElementProductForm
          title="Editar Produto"
          data={formData}
          setData={setFormData}
          onSubmit={onSubmit}
          imgPlaceHolder={imgPlaceHolder}
        />
      </StructContainer>
    </section>
  );
}
