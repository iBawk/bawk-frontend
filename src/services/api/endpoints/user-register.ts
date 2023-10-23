import { axios } from "../api";

enum CodeResponse {
  OK = 200,
  VALIDATION_ERRO = 422,
  ERROR = 400,
}

type Body = {
  name: string;
  email: string;
  password: string;
};

export async function postUserRegister(body: Body): Promise<CodeResponse> {
  const response = await axios.post("/user", JSON.stringify(body));

  if (response.status !== CodeResponse.OK) throw new Error(response.statusText);

  return CodeResponse.OK;
}
