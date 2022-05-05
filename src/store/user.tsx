import { RematchDispatch } from "@rematch/core";
import { getUserProfileApi, updateUserProfileApi } from "api/my-profile-controller.api";
import { addNewsApi, getNewsItemsApi } from "api/news-item-controller.api";
import { CreateNewsItemRequest } from "common/models/CreateNewsItemRequest";
import { UserProfileDTO } from "common/models/UserProfileDTO";

type State = Readonly<{
  news: [];
  userProfile: UserProfileDTO | undefined;
}>;

const model = {
  state: {
    news: [],
    userProfile: undefined,
  } as State,
  reducers: {
    loadedGetNewsFeed: (state: State, payload: any): State => ({
      ...state,
      news: payload,
    }),

    loadedGetMyProfile: (state: State, payload: any): State => ({
      ...state,
      userProfile: payload,
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async getNewsFeed() {
      const resp = await getNewsItemsApi();
      dispatch.user.loadedGetNewsFeed(resp);
    },
    async getMyProfile(id: string) {
      const resp = await getUserProfileApi(id);
      dispatch.user.loadedGetMyProfile(resp);
    },

    async updateMyProfile(payload: { id: string; newUserProfile: UserProfileDTO }) {
      const resp = await updateUserProfileApi(payload.id, payload.newUserProfile);
      dispatch.user.loadedGetMyProfile(resp);
    },
  }),
};

export default model;
