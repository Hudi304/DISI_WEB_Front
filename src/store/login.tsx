import { RematchDispatch } from "@rematch/core";
import { ACCESS_TOKEN } from "api/api";
import { loginApi } from "api/endpoints/jwt-authentication-controller.api";
import { LoginRequest } from "common/models/LoginRequest";

type State = Readonly<{
  login: any;
  userInfo: any;
  loggingOut: boolean;
}>;

const model = {
  state: {
    login: {},
    userInfo: {},
    loggingOut: false,
  } as State,

  reducers: {
    loginLoaded: (state: State, payload: any): State => {
      // console.log("📅 REDUCER Login : ", payload);
      if (payload.user) {
        const user = payload.user;
        // localStorage.setItem("userData", JSON.stringify(user));
        const localStoaregeUser = localStorage.getItem("userData");
        // console.log("localStoaregeUser 🔥  ", localStoaregeUser);
      }
      return {
        ...state,
        userInfo: payload,
      };
    },

    logoutRed: (state: State): State => {
      console.log("logoutRed");
      return {
        ...state,
        // userInfo: payload,
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async login(payload: LoginRequest) {
      localStorage.removeItem("emailUser");
      localStorage.setItem("emailUser", payload.email);
      const localStoaregeUser = localStorage.getItem("emailUser");
      // console.log("MAIL", localStoaregeUser);
      const loginResponse = await loginApi(payload);
      dispatch.login.loginLoaded(loginResponse);
    },
  }),
};

export default model;
