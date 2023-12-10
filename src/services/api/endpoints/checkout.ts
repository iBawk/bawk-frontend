import { axios } from "../api";

export type ResponseGetOffer = {
  id: string;
  price: number;
  marketplace: boolean;
  situation: number;
  product: {
    id: string;
    name: string;
    description: string;
    saller: {
      id: string;
      name: string;
      email: string;
    };
  };
};

export async function getCheckout(offerId: string) {
  const response = await axios.get(`/offer/${offerId}`);

  return response.data as ResponseGetOffer;
}

export type BodyPostTransaction = {
  offer_id: string;
  email_buyer: string;
  name_buyer: string;
  phone_buyer: string;
  paymentMethod: number;
};

export async function postCheckout(body: BodyPostTransaction) {
  const response = await axios.post(`/transaction`, body);

  if (response.status !== 200) throw new Error(response.statusText);
}
