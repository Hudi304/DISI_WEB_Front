import { RematchDispatch } from "@rematch/core";
import { insertNormalUserApi } from "api/endpoints/jwt-authentication-controller.api";
import { UserRegisterRequest } from "common/models/UserRegisterRequest";

type State = Readonly<{
  signUp: any;
  signUpInfo: any;
}>;

const model = {
  state: {
    signUp: {},

    signUpInfo: {},
  } as State,
  reducers: {
    signupLoaded: (state: State, payload: any): State => {
      return {
        ...state,
        signUpInfo: payload,
      };
    },
    loadedRetailerCategories: (state: State, payload: any): State => ({
      ...state,
      // retailerCategories: payload
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    //? la asta faci dispatch
    async signUpCall(payload: UserRegisterRequest) {
      const signupResponse = await insertNormalUserApi(payload);
      dispatch.signUp.signupLoaded(signupResponse);
    },
    async fetchRetailerCategories(payload: string) {
      // const retailerCategories = await getRetailerCategoriesApi(payload);
      // dispatch.retailers.loadedRetailerCategories(retailerCategories)
    },
  }),
};

export default model;
