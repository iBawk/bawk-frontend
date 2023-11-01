import "./edit-product.scss";
import ElementProductForm, {
  DataProductForm,
} from "../../elements/product-form/product-form";
import StructContainer from "../../structs/container/container";
import { useState, FormEvent } from "react";

export type DataSectionEditProduct = {
  productData: DataProductForm;
  imgPlaceHolder: string;
};

export default function SectionEditProduct(data: DataSectionEditProduct) {
  const { productData, imgPlaceHolder } = data;

  const [formData, setFormData] = useState<DataProductForm>(productData);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
