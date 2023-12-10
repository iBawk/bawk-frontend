import { DataAuth } from "../../auth/auth";
import { axios } from "../api";

export type ResponseGetProduct = {
  name: string;
  format: string;
  markdown: string;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
  category: string;
  id: string;
  owner_id: string;
  description: string;
  situation: number;
  created_at: string;
};

export async function getProduct(
  auth: DataAuth,
  id: string
): Promise<ResponseGetProduct> {
  const response = await axios.get(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);
  return response.data as ResponseGetProduct;
}

export async function getProducts(
  auth: DataAuth
): Promise<Array<ResponseGetProduct>> {
  const response = await axios.get(`/product`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as Array<ResponseGetProduct>;
}

export type BodyPostProduct = {
  name: string;
  description: string;
  format: string;
  category: string;
  markdown: string;
  situation: number;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
};

export type ResponsePostProduct = {
  description: string;
  owner_id: string;
  id: string;
  status: number;
  created_at: string;
  name: string;
  format: string;
  markdown: string;
  category: string;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
};

export async function postProduct(
  auth: DataAuth,
  body: BodyPostProduct
): Promise<ResponsePostProduct> {
  const response = await axios.post(`/product`, body, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as ResponsePostProduct;
}

export type BodyPutProduct = {
  id: string;
  name: string;
  description: string;
  format: string;
  category: string;
  markdown: string;
  situation: number;
  sallerInName: string;
  sallerInEmail: string;
  sallerInPhone: string;
};

export async function putProduct(
  auth: DataAuth,
  body: BodyPutProduct
): Promise<ResponsePostProduct> {
  const { id, ...DataProduct } = body;

  const response = await axios.put(`/product/${body.id}`, DataProduct, {
    headers: { Authorization: `Bearer ${auth.token}` },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as ResponsePostProduct;
}

export enum ResponseDeleteProduct {
  OK = 200,
  ERROR = 400,
}

export async function deleteProduct(
  auth: DataAuth,
  id: string
): Promise<ResponseDeleteProduct> {
  const response = await axios.delete(`/product/${id}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return ResponseDeleteProduct.OK;
}

export async function postProductImage(
  auth: DataAuth,
  productId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`/product/image/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}

export const getProductImageURL = (productId: string) =>
  `http://127.0.0.1:3334/product/image/${productId}`;

export type ResponseGetProductOffer = {
  created_at: string;
  id: string;
  marketplace: boolean;
  price: number;
  product_id: string;
  situation: number;
};

export async function getProductOffers(
  auth: DataAuth,
  id: string
): Promise<Array<ResponseGetProductOffer>> {
  const response = await axios.get(`/product/${id}/offers`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as Array<ResponseGetProductOffer>;
}
