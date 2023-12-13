import { DataAuth } from "../../auth/auth";
import { axios } from "../api";

export type ResponseGetMarketPlaceAll = {
  offers: {
    price: number;
    situation: number;
    created_at: string;
    marketplace: boolean;
    id: string;
    product_id: string;
    product: {
      owner_id: string;
      description: string;
      situation: number;
      created_at: string;
      category: string;
      sallerInName: string;
      sallerInPhone: string;
      id: string;
      name: string;
      format: string;
      markdown: string;
      sallerInEmail: string;
    };
  }[];
  take: number;
  page: number;
  pageCount: number;
};

export async function getMarketplace(
  auth: DataAuth,
  page: number,
  take: number,
  search?: string,
  category?: string
) {
  const response = await axios.get(`/offer/marketplace/all`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    params: {
      take,
      page,
      search,
      category,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);
  return response.data as ResponseGetMarketPlaceAll;
}
