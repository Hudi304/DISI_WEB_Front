import { RematchDispatch } from "@rematch/core";
import { Api, getUserActiveCodesApi } from "api/endpoints/qr-code-controller.api";
import { QrCodeDTO } from "common/models/QrCodeDTO";

type State = Readonly<{
  qrCode: any;
  qrCodeResponse: any;
}>;

const model = {
  state: {
    qrCode: {},
    qrCodeResponse: [],
  } as State,
  reducers: {
    qrCodeLoaded: (state: State, payload: any): State => {
      // console.log("📅 REDUCER QRCODE : ", payload);
      return {
        ...state,
        qrCodeResponse: payload, //🍏
      };
    },
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    async getQrCodeCall(payload: string) {
      //   console.log("REQ");
      const qrcodeRespond = await getUserActiveCodesApi(payload);
      //   console.log("-----------", reqDonationRespond);
      dispatch.qrCode.qrCodeLoaded(qrcodeRespond);
    },

    async postQrCode(payload: QrCodeDTO) {
      const qrcodeRespond = await Api(payload);
      //   console.log("-----------", reqDonationRespond);
      dispatch.qrCode.qrCodeLoaded(qrcodeRespond);
    },
  }),
};

export default model;
