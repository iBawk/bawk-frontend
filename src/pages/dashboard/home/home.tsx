import SectionHome from "../../../components/sections/home/home";
import API from "../../../services/api/api";
import { ResponseGetUserMe } from "../../../services/api/endpoints/user-me";
import { walletResponse } from "../../../services/api/endpoints/wallet";
import Auth from "../../../services/auth/auth";
import { redirect, useLoaderData } from "react-router-dom";

export type DataLoaderPageDashboardHome = {
  userInformations: ResponseGetUserMe;
  walletValues: walletResponse;
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

  return {
    userInformations: responseUserMe,
    walletValues: walletValues,
  };
}

const chatValues = {
  data: [
    {
      date: "2023-12-05",
      value: 0,
    },
    {
      date: "2023-12-06",
      value: 0,
    },
    {
      date: "2023-12-07",
      value: 0,
    },
    {
      date: "2023-12-08",
      value: 0,
    },
    {
      date: "2023-12-09",
      value: 0,
    },
    {
      date: "2023-12-10",
      value: 0,
    },
    {
      date: "2023-12-11",
      value: 0,
    },
  ],
  totalValue: 0,
};

export default function PageDashboardHome() {
  const dataLoader = useLoaderData() as DataLoaderPageDashboardHome;

  const user = dataLoader.userInformations;
  const { walletValues } = dataLoader;

  return (
    <main>
      <SectionHome
        user={user}
        chartValues={chatValues}
        walletValues={walletValues}
      />
    </main>
  );
}
