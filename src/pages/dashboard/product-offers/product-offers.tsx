import { redirect } from "react-router-dom";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";

export type ResponseLoaderPageProductOffers = {

}

export async function LoaderPageProductOffers({
  params,
}: any): Promise<ResponseLoaderPageProductOffers | Response> {
  const auth = Auth.getAuth();

  if (!params.id || !auth) return redirect("/auth/login");

  return {
    
  };
}

export default function PageProductOffers() {
  
  return <main></main>;
}
