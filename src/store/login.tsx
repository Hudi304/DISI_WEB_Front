import { RematchDispatch } from "@rematch/core";
import { loginApi } from "api/endpoints/jwt-authentication-controller.api";
import { LoginRequest } from "common/models/LoginRequest";

type State = Readonly<{
  login: any;
  userInfo: any;
}>;

const model = {
  state: {
    login: {},
    userInfo: {},
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
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async login(payload: LoginRequest) {
      const loginResponse = await loginApi(payload);
      dispatch.login.loginLoaded(loginResponse);
    },
  }),
};

export default model;
