import { DataAuth } from "../../auth/auth";
import { axios } from "../api";

export async function postUserImage(
  auth: DataAuth,
  userId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`/user/image/${userId}`, formData, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}

export type updateUserBody = {
  user: {
    name: string | undefined;
    email: string | undefined;
    phone: string | undefined;
    photo: string | undefined;
    isUpdated: boolean | undefined;
    emailVerified: boolean | undefined;
  };
  address: {
    street: string | undefined;
    number: number | undefined;
    city: string | undefined;
    country: string | undefined;
    zipCode: string | undefined;
    complement: string | undefined;
    state: string | undefined;
  };
  identification: {
    nationality: string | undefined;
    document: string | undefined;
    birthDate: string | undefined;
  };
};

export async function updateUserInformation(
  auth: DataAuth,
  data: updateUserBody
) {
  const response = await axios.put(`/user/update`, data, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}

export async function getUserImage(auth: DataAuth, userId: string) {
  const response = await axios.get(`/user/image/${userId}`, {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data;
}
