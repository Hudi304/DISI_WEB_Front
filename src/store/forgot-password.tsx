import { RematchDispatch } from "@rematch/core";
import { processForgotPasswordApi } from "api/endpoints/forgot-password-controller.api";
import { ForgotPasswordRequest } from "common/models/ForgotPasswordRequest";

type State = Readonly<{
    forgotPassword: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
    forgotPasswordResponse: any;
  }>;

const model = {
    state: {
        forgotPassword:{},
        forgotPasswordResponse:{},
    } as State,
    reducers: {
        forgotPasswordLoaded: (state: State, payload: any): State => {
            console.log("📅 REDUCER ResetPassword : ", payload);
            return{
                //? 🍎 aici ajunge, pune-l pe state
                ...state,
                forgotPasswordResponse: payload, //🍏
            };
        },
    },
   effects: (dispatch: RematchDispatch<any>) => ({
        //? la asta faci dispatch
        async forgotPasswordCall(payload: ForgotPasswordRequest){
            //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
            const forgotPasswordRespond = await processForgotPasswordApi(payload);
            console.log("-----------", forgotPasswordRespond);
            //? dispatch result to make it go in reducer 🍎
            dispatch.forgotPassword.forgotPasswordLoaded(forgotPasswordRespond);
        },
   }),
};

export default model;