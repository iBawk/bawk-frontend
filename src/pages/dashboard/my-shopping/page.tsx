import { useLoaderData } from "react-router-dom";
import API from "../../../services/api/api";
import Auth from "../../../services/auth/auth";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";

export type DataLoaderPageMyShopping = {
  products: ResponseGetProduct[];
};

export async function loaderPageMyShopping(): Promise<
  DataLoaderPageMyShopping | Response
> {
  const auth = Auth.getAuth();

  if (!auth) {
    return;
  }

  const products = await API.private.getTransactionPurchases(auth);
  console.log(products);

  return {
    products,
  };
}

export default function PageMyShopping() {
  const loaderData = useLoaderData() as DataLoaderPageMyShopping;

  return (
    <main>
      <h1>oi</h1>
    </main>
  );
}
