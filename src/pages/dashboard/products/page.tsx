import { useLoaderData } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";
import { Link } from "react-router-dom";

export type DataLoaderPageProducts = {};

export async function loaderPageProducts(): Promise<
  DataLoaderPageProducts | Response
> {
  const auth = Auth.getAuth();

  if (!auth) return {};

  const resApi = await API.private.getProducts(auth);

  console.log(resApi);

  return {};
}

export default function PageProducts() {
  const loaderData = useLoaderData() as DataLoaderPageProducts;

  return (
    <main>
      <Link to={"add-produto"}>Novo Produto</Link>
    </main>
  );
}
