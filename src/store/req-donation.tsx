import { RematchDispatch } from "@rematch/core";
import { getDonationRequirementsApi, updateDonationRequirementsApi } from "api/endpoints/donation-requirements-controller.api";
import { DonationRequirementsDTO } from "common/models/DonationRequirementsDTO";

type State = Readonly<{
    reqDonation: any; //! 🤖 ar trebui sa fie de tip Login response da'nu e definit pe server inca
    reqDonationResponse: any;
}>;

const model = {
    state: {
        reqDonation:{},
        reqDonationResponse:{},
    } as State,
    reducers: {
        reqDonationLoaded: (state: State, payload: any): State => {
            console.log("📅 REDUCER ReqPassword : ", payload);
            return{
                //? 🍎 aici ajunge, pune-l pe state
                ...state,
                reqDonationResponse: payload, //🍏
            };
        },
    },
   effects: (dispatch: RematchDispatch<any>) => ({
        //? la asta faci dispatch
        async getReqDonationCall(){
            console.log("REQ")
            //? wait for API call [src\api\endpoints\jwt-authentication-controller.api.ts]
            const reqDonationRespond = await getDonationRequirementsApi();
            console.log("-----------", reqDonationRespond);
            //? dispatch result to make it go in reducer 🍎
            dispatch.reqDonation.reqDonationLoaded(reqDonationRespond)
        },

        async updateDonationReq(payload: DonationRequirementsDTO){
            const reqDonationRespond = await updateDonationRequirementsApi(payload)
            console.log("-----------", reqDonationRespond);
            dispatch.reqDonation.reqDonationLoaded(reqDonationRespond)

        },
   }),
};

export default model;