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
} from "./endpoints/products";
import { postUserImage, getUserImage } from "./endpoints/user";

const getProductImageURL = (productId: string) =>
  `http://127.0.0.1:3334/product/image/${productId}`;

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
    getProduct,
    getProducts,
    postProduct,
    deleteProduct,
    postProductImage,
    postUserImage,
    getUserImage,
  },
};

export default API;
