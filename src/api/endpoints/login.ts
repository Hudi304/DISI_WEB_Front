import { API } from "api/api";

export const ACCESS_TOKEN = "access_token";

export const loginApi = (body: { username: string; password: string }): Promise<any> => {
  // localStorage.removeItem(ACCESS_TOKEN);

  return API().post(`login`, body);
};
