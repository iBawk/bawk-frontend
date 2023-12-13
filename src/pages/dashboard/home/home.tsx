import SectionHome from "../../../components/sections/home/home";
import API from "../../../services/api/api";
import { chartResponse } from "../../../services/api/endpoints/transactions";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import { walletResponse } from "../../../services/api/endpoints/wallet";
import Auth from "../../../services/auth/auth";
import { redirect, useLoaderData } from "react-router-dom";

export type DataLoaderPageDashboardHome = {
  userInformations: ResponseGetUserMe;
  walletValues: walletResponse;
  chartValues: chartResponse;
};

export async function loaderPageDashboardHome(): Promise<
  DataLoaderPageDashboardHome | Response
> {
  const authRes = Auth.getAuth();

  if (!authRes || Auth.isTokenExpired(authRes.token)) return redirect("/login");

  const responseUserMe = await API.private.getUserMe(
    authRes.token,
    authRes.tokenType
  );

  const walletValues = await API.private.getWallet(authRes);
  const chartValues = await API.private.getTransactionChart(authRes);

  return {
    userInformations: responseUserMe,
    walletValues: walletValues,
    chartValues: chartValues,
  };
}

export default function PageDashboardHome() {
  const dataLoader = useLoaderData() as DataLoaderPageDashboardHome;

  const { walletValues, chartValues, userInformations } = dataLoader;

  return (
    <main>
      <SectionHome
        user={userInformations}
        chartValues={chartValues}
        walletValues={walletValues}
      />
    </main>
  );
}
