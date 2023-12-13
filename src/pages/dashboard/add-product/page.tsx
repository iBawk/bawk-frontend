import { redirect, useLoaderData } from "react-router-dom";
import SectionAddProduct from "../../../components/sections/add-product/add-product";
import API from "../../../services/api/api";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import Auth from "../../../services/auth/auth";

export interface DataLoaderPageAddProduct {
  userInformations: ResponseGetUserMe;
}

export async function LoaderPageAddProduct(): Promise<
  DataLoaderPageAddProduct | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const responseUserMe = await API.private.getUserMe(
    authRes.token,
    authRes.tokenType
  );

  return { userInformations: responseUserMe };
}

export default function PageAddProduct() {
  const loaderData = useLoaderData() as DataLoaderPageAddProduct;

  return (
    <main>
      <SectionAddProduct userInformations={loaderData.userInformations} />
    </main>
  );
}
