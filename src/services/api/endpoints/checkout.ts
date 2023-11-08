import { axios } from "../api";

export type getCheckoutType = {
  offerId: string;
};

export async function getCheckout(offerId: getCheckoutType) {
  const response = await axios.get("/offer", {});

  return response.data as ResponseGetCheckout;
}
