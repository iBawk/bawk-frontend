import { axios } from "../api";

export type ResponseGetUserMe = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
    isUpdated: boolean;
    emailVerified: boolean;
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
      birthDate: Date;
    };
  };
};

export async function getUserMe(authToken: string, authTokenType: string) {
  const response = await axios.get("/user/me", {
    headers: { Authorization: `${authTokenType} ${authToken}` },
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.data as ResponseGetUserMe;
}
