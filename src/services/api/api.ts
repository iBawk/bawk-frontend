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
} from "./endpoints/products";

import { getCheckout } from "./endpoints/checkout";

import {
  postUserImage,
  getUserImage,
  updateUserInformation,
} from "./endpoints/user";

import { postOffer } from "./endpoints/offer";

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
  },
  private: {
    getUserMe,
    updateUserInformation,
    getProduct,
    getProducts,
    postProduct,
    deleteProduct,
    postProductImage,
    getCheckout,
    putProduct,
    postUserImage,
    getUserImage,
    postOffer,
  },
};

export default API;
