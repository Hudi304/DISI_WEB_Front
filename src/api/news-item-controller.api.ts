import { CreateNewsItemRequest } from "common/models/CreateNewsItemRequest";
import { API } from "./api";

export const addNewsApi = (body: CreateNewsItemRequest): Promise<any> => API().post(`add_news`, body);

export const getNewsItemsApi = (): Promise<any> => API().get(`get_news`);

export const deleteDeviceApi = (itemId: string): Promise<any> => API().delete(`delete_news_item/${itemId}`);
