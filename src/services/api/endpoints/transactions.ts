import { axios } from "../api";
import { DataAuth } from "../../auth/auth";
import { ResponseGetProduct } from "./products";

export type chartResponse = {
  data: {
    date: string;
    value: number;
  }[];
  totalValue: number;
};

export type purchasesResponse = {};

export async function getTransactionChart(
  auth: DataAuth
): Promise<chartResponse> {
  const response = await axios.get(`/transaction/chart`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}

export async function getTransactionPurchases(
  auth: DataAuth
): Promise<Array<ResponseGetProduct>> {
  const response = await axios.get(`/transaction/purchases`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as Array<ResponseGetProduct>;
}
