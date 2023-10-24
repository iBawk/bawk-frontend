import { useLoaderData } from "react-router-dom";

export type DataLoaderPageSales = {};

export async function loaderPageSales(): Promise<
  DataLoaderPageSales | Response
> {
  return {};
}

export default function PageSales() {
  const loaderData = useLoaderData() as DataLoaderPageSales;

  return <main></main>;
}
