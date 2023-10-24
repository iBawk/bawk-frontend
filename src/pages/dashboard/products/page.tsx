import { useLoaderData } from "react-router-dom";

export type DataLoaderPageProducts = {};

export async function loaderPageProducts(): Promise<
  DataLoaderPageProducts | Response
> {
  return {};
}

export default function PageProducts() {
  const loaderData = useLoaderData() as DataLoaderPageProducts;

  return <main></main>;
}
