import { RematchDispatch } from "@rematch/core";
import { processForgotPasswordApi } from "api/endpoints/forgot-password-controller.api";
import { ForgotPasswordRequest } from "common/models/ForgotPasswordRequest";

type State = Readonly<{
  forgotPassword: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
  forgotPasswordResponse: any;
}>;

const model = {
  state: {
    forgotPassword: {},
    forgotPasswordResponse: {},
  } as State,
  reducers: {
    forgotPasswordLoaded: (state: State, payload: any): State => {
      return {
        ...state,
        forgotPasswordResponse: payload,
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async forgotPasswordCall(payload: ForgotPasswordRequest) {
      const forgotPasswordRespond = await processForgotPasswordApi(payload);
      dispatch.forgotPassword.forgotPasswordLoaded(forgotPasswordRespond);
    },
  }),
};

export default model;
