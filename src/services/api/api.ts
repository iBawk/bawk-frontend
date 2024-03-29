import Axios from "axios";

import { postUserRegister } from "./endpoints/user-register";
import { postUserLogin } from "./endpoints/user-login";
import { getUserMe } from "./endpoints/user-me";
import {
  getProduct,
  getProducts,
  postProduct,
  deleteProduct,
  postProductImage,
  getProductImageURL,
  putProduct,
  getProductOffers,
} from "./endpoints/products";

import { getCheckout, postCheckout } from "./endpoints/checkout";

import {
  postUserImage,
  getUserImage,
  updateUserInformation,
} from "./endpoints/user";

import { postOffer, updateOffer } from "./endpoints/offer";
import { getWallet } from "./endpoints/wallet";
import {
  getTransactionChart,
  getTransactionPurchases,
  getTransactionSales,
} from "./endpoints/transactions";
import { getMarketplace } from "./endpoints/marketplace";

const getUserImageURL = (userId: string) =>
  `http://127.0.0.1:3334/user/image/${userId}`;

export const axios = Axios.create({
  baseURL: "http://127.0.0.1:3334",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const API = {
  public: {
    postUserRegister,
    postUserLogin,
    getProductImageURL,
    getUserImageURL,
    getCheckout,
  },
  private: {
    getUserMe,
    updateUserInformation,
    getProduct,
    getProducts,
    postProduct,
    deleteProduct,
    postProductImage,
    putProduct,
    postUserImage,
    getUserImage,
    postOffer,
    updateOffer,
    getProductOffers,
    postCheckout,
    getMarketplace,
    getWallet,
    getTransactionChart,
    getTransactionPurchases,
    getTransactionSales,
  },
};

export default API;
