import { RematchDispatch } from "@rematch/core";
import { ACCESS_TOKEN } from "api/api";
import { loginApi } from "api/endpoints/jwt-authentication-controller.api";
import { LoginRequest } from "common/models/LoginRequest";

type State = Readonly<{
  login: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
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
      if (payload.user) {
        const user = payload.user;
        localStorage.setItem("userData", JSON.stringify(user));
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
        loggingOut: true,
      };
    },

    setLoggingOutFalseRed: (state: State): State => {
      console.log("setLoggingOutFalseRed");
      return {
        ...state,
        loggingOut: false,
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async login(payload: LoginRequest) {
      const loginResponse = await loginApi(payload);
      dispatch.login.loginLoaded(loginResponse);
    },

    async logout() {
      console.log("logout");
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem("userData");
      dispatch.login.logoutRed();
    },

    async setLoggingOutFalse() {
      console.log("setLoggingOutFalse");
      dispatch.login.setLoggingOutFalseRed();
    },
  }),
};

export default model;
