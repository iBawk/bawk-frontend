import { useLoaderData } from "react-router-dom";

export type DataLoaderPageMarketplace = {};

export async function loaderPageMarketplace(): Promise<
  DataLoaderPageMarketplace | Response
> {
  return {};
}

export default function PageMarketplace() {
  const loaderData = useLoaderData() as DataLoaderPageMarketplace;

  return <main></main>;
}
