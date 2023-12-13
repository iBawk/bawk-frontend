import { axios } from "../api";
import { DataAuth } from "../../auth/auth";

export enum ResponsePostOffer {
  OK = 200,
  ERROR = 422,
}

export type BodyOffer = {
  price: number;
  marketplace: boolean;
  situation: number;
  product_id: string;
};

export async function postOffer(
  auth: DataAuth,
  body: BodyOffer
): Promise<ResponsePostOffer> {
  const response = await axios.post(`/offer`, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return ResponsePostOffer.OK;
}

export async function updateOffer(
  auth: DataAuth,
  offer_id: string,
  sitution: number
): Promise<ResponsePostOffer> {
  const body = {
    situation: sitution,
    marketplace: false,
  };

  const response = await axios.put(`/offer/${offer_id}`, body, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return ResponsePostOffer.OK;
}
