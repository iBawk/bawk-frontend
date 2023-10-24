import Auth from "../../../services/auth/auth";
import { useLoaderData } from "react-router-dom";

export type DataLoaderPageDashboardHome = {};

export async function loaderPageDashboardHome(): Promise<
  DataLoaderPageDashboardHome | Response
> {
  const authtoken = Auth.getAuth();

  return {};
}

export default function PageDashboardHome() {
  const dataLoader = useLoaderData() as DataLoaderPageDashboardHome;

  return <main></main>;
}
