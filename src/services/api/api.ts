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

const getProductImageURL = (productId: string) =>
  `http://127.0.0.1:3334/product/image/${productId}`;

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
  },
  private: {
    getUserMe,
    getProduct,
    getProducts,
    postProduct,
    deleteProduct,
    postProductImage,
  },
};

export default API;
