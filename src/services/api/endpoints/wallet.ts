import { axios } from "../api";
import { DataAuth } from "../../auth/auth";

export type walletResponse = {
  id: string;
  amout_free: number;
  amout_reclused: number;
  user_id: string;
};

export async function getWallet(auth: DataAuth): Promise<walletResponse> {
  const response = await axios.get(`/wallet`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}
