import SectionFinance from "../../../components/sections/finance/finance";
import API from "../../../services/api/api";
import { walletResponse } from "../../../services/api/endpoints/wallet";
import Auth from "../../../services/auth/auth";
import { redirect, useLoaderData } from "react-router-dom";

export type DataLoaderPageFinance = {
  walletValues: walletResponse;
};

export async function loaderPageFinance(): Promise<
  DataLoaderPageFinance | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const walletValues = await API.private.getWallet(authRes);

  return {
    walletValues: walletValues,
  };
}

export default function PageFinance() {
  const dataLoader = useLoaderData() as DataLoaderPageFinance;

  const { walletValues } = dataLoader;

  return (
    <main>
      <SectionFinance walletValues={walletValues} />
    </main>
  );
}
