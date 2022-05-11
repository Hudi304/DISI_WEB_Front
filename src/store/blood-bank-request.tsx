import { RematchDispatch } from "@rematch/core";
import { Api, getActiveRequestsApi } from "api/endpoints/blood-bank-requests-controller.api";
import { BloodBankRequestDTO } from "common/models/BloodBankRequestDTO";

type State = Readonly<{
  reqBloodBank: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
  reqBloodBankResponse: any;
}>;

const model = {
  state: {
    reqBloodBank: {},
    reqBloodBankResponse: [],
  } as State,
  reducers: {
    reqBloodBankLoaded: (state: State, payload: any): State => {
      console.log("📅 REDUCER ReqPassword : ", payload);
      return {
        ...state,
        reqBloodBankResponse: payload, //🍏
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async getBloodBankRequestsCall() {
      const reqBloodBankRespond = await getActiveRequestsApi();
      dispatch.bloodBank.reqBloodBankLoaded(reqBloodBankRespond);
    },

    async postBloodRequestReq(payload: BloodBankRequestDTO) {
      const reqBloodBankRespond = await Api(payload);
      dispatch.bloodBank.reqBloodBankLoaded(reqBloodBankRespond);
    },
  }),
};

export default model;
