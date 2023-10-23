import Auth from "../../../services/auth/auth";

export type DataLoaderPageDashboardHome = {};

export function loaderPageDashboardHome():
  | DataLoaderPageDashboardHome
  | Response {
  const authtoken = Auth.getAuth();

  return {};
}

export default function PageDashboardHome() {
  return <main></main>;
}
