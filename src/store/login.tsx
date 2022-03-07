import { RematchDispatch } from "@rematch/core";
import { loginApi } from "api/endpoints/jwt-authentication-controller.api";
import { LoginRequest } from "common/models/LoginRequest";

type State = Readonly<{
  login: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
  userInfo: any;
}>;

const model = {
  state: {
    login: {},

    userInfo: {},
  } as State,
  reducers: {
    loginLoaded: (state: State, payload: any): State => {
      console.log("📅 REDUCER Login : ", payload);
      return {
        //? 🍎 aici ajunge, pune-l pe state
        ...state,
        userInfo: payload, //🍏
      };
    },
    loadedRetailerCategories: (state: State, payload: any): State => ({
      ...state,
      // retailerCategories: payload
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    //? la asta faci dispatch
    async login(payload: LoginRequest) {
      //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
      const loginResponse = await loginApi(payload);
      console.log("-----------", loginResponse);
      //? dispatch result to make it go in reducer 🍎
      dispatch.login.loginLoaded(loginResponse);
    },
    async fetchRetailerCategories(payload: string) {
      // const retailerCategories = await getRetailerCategoriesApi(payload);
      // dispatch.retailers.loadedRetailerCategories(retailerCategories)
    },
  }),
};

export default model;
