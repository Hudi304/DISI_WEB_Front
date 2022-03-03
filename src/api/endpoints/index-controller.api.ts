import { API } from "../api";

export const getStatusApi = (): Promise<any> => API().get(``);
