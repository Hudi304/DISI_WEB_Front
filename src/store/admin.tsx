import { RematchDispatch } from "@rematch/core";
import { addNewsApi, getNewsItemsApi } from "api/news-item-controller.api";
import { CreateNewsItemRequest } from "common/models/CreateNewsItemRequest";

type State = Readonly<{
  news: [];
}>;

const model = {
  state: {
    news: [],
  } as State,
  reducers: {
    loadedPostNews: (state: State, payload: any): State => ({
      ...state,
    }),

    loadedGetNewsFeed: (state: State, payload: any): State => ({
      ...state,
      news: payload,
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async postNews(payload: CreateNewsItemRequest) {
      const resp = await addNewsApi(payload);
    },

    async getNewsFeed() {
      const resp = await getNewsItemsApi();
      dispatch.admin.loadedGetNewsFeed(resp);
    },
  }),
};

export default model;
