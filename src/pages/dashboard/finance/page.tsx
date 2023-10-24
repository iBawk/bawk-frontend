import { useLoaderData } from "react-router-dom";

export type DataLoaderPageFinance = {};

export async function loaderPageFinance(): Promise<
  DataLoaderPageFinance | Response
> {
  return {};
}

export default function PageFinance() {
  const loaderData = useLoaderData() as DataLoaderPageFinance;

  return <main></main>;
}
