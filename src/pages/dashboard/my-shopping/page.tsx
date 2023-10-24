import { useLoaderData } from "react-router-dom";

export type DataLoaderPageMyShopping = {};

export async function loaderPageMyShopping(): Promise<
  DataLoaderPageMyShopping | Response
> {
  return {};
}

export default function PageMyShopping() {
  const loaderData = useLoaderData() as DataLoaderPageMyShopping;

  return <main></main>;
}
