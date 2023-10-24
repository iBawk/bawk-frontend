import { useLoaderData } from "react-router-dom";

export type DataLoaderPageSettings = {};

export async function loaderPageSettings(): Promise<
  DataLoaderPageSettings | Response
> {
  return {};
}

export default function PageSettings() {
  const loaderData = useLoaderData() as DataLoaderPageSettings;

  return <main></main>;
}
