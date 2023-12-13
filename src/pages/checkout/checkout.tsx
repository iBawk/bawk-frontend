import SectionCheckout from "../../components/sections/checkout/checkout";
import Auth from "../../services/auth/auth";
import { ResponseGetUserMe } from "../../services/api/endpoints/user-me";
import API from "../../services/api/api";
import { useLoaderData } from "react-router-dom";

export interface DataLoaderPageCheckout {
  userInformations: ResponseGetUserMe;
}

export async function LoaderPageCheckout(): Promise<
  DataLoaderPageCheckout | Response | null
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) {
    return null;
  }

  const responseUserMe = await API.private.getUserMe(
    authRes.token,
    authRes.tokenType
  );

  return { userInformations: responseUserMe };
}

export default function PageCheckout() {
  const loadData = useLoaderData() as DataLoaderPageCheckout | null;

  return (
    <main>
      <SectionCheckout userInformations={loadData?.userInformations}/>
    </main>
  );
}
