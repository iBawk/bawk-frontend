import { axios } from "../api";

type ResponseUserLogin = {
  access_token: string;
  token_type: string;
  refresh_token: string;
};

type BodyUserLogin = {
  email: string;
  password: string;
};

export async function postUserLogin(
  body: BodyUserLogin
): Promise<ResponseUserLogin> {
  const response = await axios.post(`/user/login`, JSON.stringify(body));

  if (response.status !== 200) throw new Error(response.statusText);

  return response.data as ResponseUserLogin;
}
