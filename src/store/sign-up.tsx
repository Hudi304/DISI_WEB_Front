import { RematchDispatch } from "@rematch/core";
import { insertNormalUserApi } from "api/endpoints/jwt-authentication-controller.api";
import { UserRegisterRequest } from "common/models/UserRegisterRequest";

type State = Readonly<{
  signUp: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
  signUpInfo: any;
}>;

const model = {
  state: {
    signUp: {},

    signUpInfo: {},
  } as State,
  reducers: {
    signupLoaded: (state: State, payload: any): State => {
      console.log("📅 REDUCER SignUp : ", payload);
      return {
        //? 🍎 aici ajunge, pune-l pe state
        ...state,
        signUpInfo: payload, //🍏
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
      //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
      const signupResponse = await insertNormalUserApi(payload);
      console.log("-----------", signupResponse);
      //? dispatch result to make it go in reducer 🍎
      dispatch.signUp.signupLoaded(signupResponse);
    },
    async fetchRetailerCategories(payload: string) {
      // const retailerCategories = await getRetailerCategoriesApi(payload);
      // dispatch.retailers.loadedRetailerCategories(retailerCategories)
    },
  }),
};

export default model;
