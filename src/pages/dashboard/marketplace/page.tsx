import SectionMarketplace from "../../../components/sections/marktplace/marketplace";
import { redirect, useLoaderData } from "react-router-dom";
import { ResponseGetMarketPlaceAll } from "../../../services/api/endpoints/marketplace";
import Auth from "../../../services/auth/auth";
import API from "../../../services/api/api";

export type ResponseLoaderPageMarketplace = {
  offers: ResponseGetMarketPlaceAll;
};

export async function LoaderPageMarketplace(): Promise<
  ResponseLoaderPageMarketplace | Response
> {
  const auth = Auth.getAuth();

  if (!auth) return redirect("/login");

  const responseOffers = await API.private.getMarketplace(auth, 1, 8);

  return {
    offers: responseOffers,
  };
}

export default function PageMarketplace() {
  const loaderData = useLoaderData() as ResponseLoaderPageMarketplace;

  console.log(loaderData.offers)

  return (
    <main>
      <SectionMarketplace initialStateMarket={loaderData.offers} />
    </main>
  );
}
