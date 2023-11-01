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
    created_at,
    description,
    format,
    id,
    markdown,
    name,
    owner_id,
    sallerInEmail,
    sallerInName,
    sallerInPhone,
    status,
  } = productData;

  return (
    <main>
      <SectionEditProduct
        productData={{
          category: { value: category, valid: false, error: false },
          description: { value: description, valid: false, error: false },
          email: { value: sallerInEmail, valid: false, error: false },
          image: { value: null, valid: false, error: false },
          markdown: { value: markdown, valid: false, error: false },
          name: { value: name, valid: false, error: false },
          phone: { value: sallerInPhone, valid: false, error: false },
          price: { value: "100,00", valid: false, error: false },
          salerName: { value: sallerInName, valid: false, error: false },
          visibleForSale: { value: !!status, valid: false, error: false },
        }}
        imgPlaceHolder={productImage}
      />
    </main>
  );
}
