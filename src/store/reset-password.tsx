import { RematchDispatch } from "@rematch/core";
import { resetPasswordApi } from "api/endpoints/forgot-password-controller.api";
import { PasswordResetRequest } from "common/models/PasswordResetRequest";

type State = Readonly<{
    resetPassword: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
    resetPasswordResponse: any;
  }>;

const model = {
    state: {
        resetPassword:{},
        resetPasswordResponse:{},
    } as State,
    reducers: {
        resetPasswordLoaded: (state: State, payload: any): State => {
            console.log("📅 REDUCER ResetPassword : ", payload);
            return{
                //? 🍎 aici ajunge, pune-l pe state
                ...state,
                resetPasswordResponse: payload, //🍏
            };
        },
    },
   effects: (dispatch: RematchDispatch<any>) => ({
        //? la asta faci dispatch
        async resetPasswordCall(payload: PasswordResetRequest){
            //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
            const resetPasswordRespond = await resetPasswordApi(payload);
            console.log("-----------", resetPasswordRespond);
            //? dispatch result to make it go in reducer 🍎
            dispatch.resetPassword.resetPasswordLoaded(resetPasswordRespond);
        },
   }),
};

export default model;