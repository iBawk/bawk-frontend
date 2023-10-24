import { axios } from "../api";

export type ResponseGetUserMe = {
  loggedUserInfo: {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      photo: string;
      isUpdated: boolean;
      emailVerified: boolean;
    };
    address: {
      street: string;
      id: string;
      number: string;
      city: string;
      country: string;
      zipCode: string;
      complement: string;
      state: string;
    };
    identification: {
      nationality: string;
      document: string;
      id: string;
      birthDate: string;
    };
  };
};

export async function getUserMe(authToken: string, authTokenType: string) {
  const response = await axios.get("/user/me", {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  return response.data as ResponseGetUserMe;
}
