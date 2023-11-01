import { redirect, useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";
import SectionViewProduct from "../../../components/sections/view-product/view-product";

export type ResponseLoaderPageViewProduct = {
  productData: ResponseGetProduct;
  productImg: string;
};

export async function LoaderPageViewProduct({
  params,
}: any): Promise<ResponseLoaderPageViewProduct | Response> {
  const auth = Auth.getAuth();

  if (!params.id || !auth) return redirect("/auth/login");

  const response = await API.private.getProduct(auth, params.id);

  return {
    productData: response,
    productImg: API.public.getProductImageURL(response.id),
  };
}

export default function PageViewProduct() {
  const { productData, productImg } =
    useLoaderData() as ResponseLoaderPageViewProduct;

  const {
    category,
    created_at,
    description,
    format,
    markdown,
    name,
    sallerInEmail,
    sallerInName,
    sallerInPhone,
    status,
  } = productData;

  const date = new Date(created_at);

  return (
    <main>
      <SectionViewProduct
        productData={{
          category,
          createDate: `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
          description,
          format,
          markdown,
          name,
          sallerInEmail,
          sallerInName,
          sallerInPhone,
          status,
          img: productImg,
          price: "100,00",
        }}
      />
    </main>
  );
}
