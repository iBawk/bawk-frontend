import { DataAuth } from "../../auth/auth";
import { axios } from "../api";

export type ProductInfo = {
  name: string;
  price: number; 
};

export type CheckoutInfo = {
  name: string;
  email: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  installments: number;
};

export type ResponseCheckout = {
  orderId: string; 
};

export async function postCheckout(
  auth: DataAuth,
  productInfo: ProductInfo,
  checkoutInfo: CheckoutInfo
): Promise<ResponseCheckout> {
  const response = await axios.post(`/checkout`, {
    productInfo,
    checkoutInfo,
  }, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}
