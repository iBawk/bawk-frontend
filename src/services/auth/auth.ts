import Cookies from "js-cookie";

export type DataAuth = {
  token: string;
  tokenType: string;
};

export function setAuth({ token, tokenType }: DataAuth) {
  Cookies.set("auth_token", token);
  Cookies.set("token_type", tokenType);
}

export function getAuth(): DataAuth | null {
  const token = Cookies.get("auth_token");
  const tokenType = Cookies.get("token_type");

  if (!token || !tokenType) return null;

  return { token, tokenType };
}

export function removeAuth() {
  Cookies.remove("auth_token");
  Cookies.remove("token_type");
}

export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const expirationTime = payload.exp * 1000;
    const currentTime = Date.now();

    return expirationTime < currentTime;
  } catch (error) {
    return true; // Em caso de erro, considere o token como expirado
  }
}

const Auth = {
  setAuth,
  getAuth,
  removeAuth,
  isTokenExpired,
};

export default Auth;
