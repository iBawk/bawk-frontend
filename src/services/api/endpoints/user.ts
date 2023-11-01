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
