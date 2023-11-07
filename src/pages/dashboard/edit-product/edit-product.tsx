import { redirect, useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import SectionEditProduct from "../../../components/sections/edit-product/edit-product";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";

export type ResponseLoaderPageEditProduct = {
  productData: ResponseGetProduct;
  productImage: string;
};

export async function LoaderPageEditProduct({
  params,
}: any): Promise<ResponseLoaderPageEditProduct | Response> {
  const auth = Auth.getAuth();

  if (!params.id || !auth) return redirect("/auth/login");

  const responseProduct = await API.private.getProduct(auth, params.id);

  const responseImage = API.public.getProductImageURL(responseProduct.id);

  return {
    productData: responseProduct,
    productImage: responseImage,
  };
}

export default function PageEditProduct() {
  const { productData, productImage } =
    useLoaderData() as ResponseLoaderPageEditProduct;

  const {
    category,
    description,
    id,
    markdown,
    name,
    sallerInEmail,
    sallerInName,
    sallerInPhone,
    situation,
  } = productData;

  return (
    <main>
      <SectionEditProduct
        id={id}
        productData={{
          category: { value: category, valid: true, invalid: false },
          description: { value: description, valid: true, invalid: false },
          email: { value: sallerInEmail, valid: true, invalid: false },
          image: { value: null, valid: true, invalid: false },
          markdown: { value: markdown, valid: true, invalid: false },
          name: { value: name, valid: true, invalid: false },
          phone: { value: sallerInPhone, valid: true, invalid: false },
          salerName: { value: sallerInName, valid: true, invalid: false },
          situation: situation,
        }}
        imgPlaceHolder={productImage}
      />
    </main>
  );
}
