import "./product-offers.scss";
import { redirect, useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import SectionAddOffer from "../../../components/sections/add-offer/add-offer";
import API from "../../../services/api/api";
import { ResponseGetProductOffer } from "../../../services/api/endpoints/products";

export type ResponseLoaderPageProductOffers = {
  productId: string;
  productName: string;
  productOffers: Array<ResponseGetProductOffer>;
};

export async function LoaderPageProductOffers({
  params,
}: any): Promise<ResponseLoaderPageProductOffers | Response> {
  const auth = Auth.getAuth();

  if (!params.id || !auth) return redirect("/auth/login");

  const productData = await API.private.getProduct(auth, params.id);
  const productOffers = await API.private.getProductOffers(auth, params.id);

  return {
    productId: params.id,
    productName: productData.name,
    productOffers: productOffers,
  };
}

export default function PageProductOffers() {
  const loaderData = useLoaderData() as ResponseLoaderPageProductOffers;

  console.log(loaderData.productOffers);

  return (
    <main>
      <SectionAddOffer
        productId={loaderData.productId}
        productName={loaderData.productName}
        productOffersInitial  ={loaderData.productOffers}
      />
    </main>
  );
}
