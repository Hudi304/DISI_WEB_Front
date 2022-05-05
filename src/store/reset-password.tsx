import { RematchDispatch } from "@rematch/core";
import { resetPasswordApi } from "api/endpoints/forgot-password-controller.api";
import { PasswordResetRequest } from "common/models/PasswordResetRequest";

type State = Readonly<{
  resetPassword: any;
  resetPasswordResponse: any;
}>;

const model = {
  state: {
    resetPassword: {},
    resetPasswordResponse: {},
  } as State,
  reducers: {
    resetPasswordLoaded: (state: State, payload: any): State => {
      return {
        ...state,
        resetPasswordResponse: payload,
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async resetPasswordCall(payload: PasswordResetRequest) {
      const resetPasswordRespond = await resetPasswordApi(payload);
      dispatch.resetPassword.resetPasswordLoaded(resetPasswordRespond);
    },
  }),
};

export default model;
