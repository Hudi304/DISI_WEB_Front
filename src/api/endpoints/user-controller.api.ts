import { API } from "../api";

export const getUserUsernameApi = (id: string): Promise<any> => API().get(`${id}`);
