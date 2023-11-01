import { axios } from "../api";

export type ProductInfo = {
  id: number;
  name: string;
  price: number; 
};


export type ResponseGetCheckout = {
  orderId: string; 
};


export async function getCheckout() {
  const response = await axios.get("/offer", {

  });

  return response.data as ResponseGetCheckout;
}
