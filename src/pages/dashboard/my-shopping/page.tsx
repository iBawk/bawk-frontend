import { redirect, useLoaderData } from "react-router-dom";
import API from "../../../services/api/api";
import Auth from "../../../services/auth/auth";
import { ResponseGetProduct } from "../../../services/api/endpoints/products";

export type DataLoaderPageMyShopping = {
  products: ResponseGetProduct[];
};

export async function loaderPageMyShopping(): Promise<
  DataLoaderPageMyShopping | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const responseUserMe = await API.private.getUserMe(
    authRes.token,
    authRes.tokenType
  );

  const walletValues = await API.private.getWallet(authRes);
  const chartValues = await API.private.getTransactionChart(authRes);

  return { products: [] };
}

export default function PageMyShopping() {
  const loaderData = useLoaderData() as DataLoaderPageMyShopping;

  return <main></main>;
}
