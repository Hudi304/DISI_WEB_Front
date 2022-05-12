import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import "./qrcode.scss";
import * as yup from "yup";
import { Input } from "components/form-components/input/input";
import { RootDispatch, RootState } from "store";
import { connect } from "react-redux";
import { QrCodeDTO } from "common/models/QrCodeDTO";

const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

export const QrCodeComponent: FC<Props> = ({ getQrCodeCall, qrCodeResponse, postQrCode }: Props) => {
  const [qrc, setQrc] = useState([""]);
  const [showQr, setShowQr] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [showPromoCode, setShowPromoCode] = useState(false);

  const [numberOfQrCodes, setNumberOfQrCodes] = useState(0);
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  let qrCodes: string[] = [];

  async function getRequest(email: string) {
    await getQrCodeCall(email);
  }

  useEffect(() => {
    const mail = localStorage.getItem("emailUser") ?? "";
    getRequest(mail);
  }, []);

  useEffect(() => {
    if (Array.isArray(qrCodeResponse)) {
      qrCodeResponse.forEach((code) => {
        qrCodes.push(code.code);
      });
      setQrc(qrCodes);
      // const mail = localStorage.getItem("emailUser") ?? "";
      // getRequest(mail);
    }
    if (qrc.length > 0) {
      setShowQr(true);
    }
  }, [qrCodeResponse]);

  function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function makeid(): string {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function validateMail(mail: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  async function setAsyncNrOfQrCodes(n: number) {
    setNumberOfQrCodes(n);
  }

  async function handleSubmitQrCode(value: any) {
    const number = randomIntFromInterval(1, 20);
    const codeString = makeid();
    var c = `${codeString}${number}`;
    const mail = localStorage.getItem("emailUser") ?? "";
    await setAsyncNrOfQrCodes(2);
    if (numberOfQrCodes == 2) {
      localStorage.setItem("qrCodeTime", new Date().toString());
      const dateQrRaw = localStorage.getItem("qrCodeTime");
      console.log("DATE", dateQrRaw);
      var qrCodeBody: QrCodeDTO = {
        email: mail,
        code: c,
      };
      postQrCode(qrCodeBody);
      setCodeValue(c);
      setShowPromoCode(true);
      await setAsyncNrOfQrCodes(1);
    } else {
      const dateQrRaw = localStorage.getItem("qrCodeTime") ?? "";
      const dateQr = new Date(dateQrRaw);
      console.log("OLDDATE", dateQr);
      const newDate = new Date();
      console.log("NEWDATE", newDate);
      setShowPromoCode(false);
      if (dateQrRaw == null) {
        await setAsyncNrOfQrCodes(2);
        // handleSubmitQrCode(value);
      }
      if (newDate.getMinutes() > dateQr.getMinutes()) {
        await setAsyncNrOfQrCodes(2);
        // handleSubmitQrCode(value);
      }
    }
  }

  return (
    <div className="qrCode-page-container">
      <div>
        <Card className="reset-password-card">
          {showPromoCode && <div>Congratulations! Your promo code is {codeValue}</div>}
          <FormProvider {...methods}>
            <form className="sign-up-form" onSubmit={methods.handleSubmit(handleSubmitQrCode)}>
              <div className="login-buttons-bar">
                <Button type="submit">Send QrCode</Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
      <div>
        {showQr && (
          <ul className="qr-code-page">
            {qrc.map((qrcode) => {
              return (
                <li className="qr-code" key={qrcode}>
                  <Card>
                    <QRCode value={qrcode} />
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapProps = (state: RootState) => ({
  qrCodeResponse: state.qrCode.qrCodeResponse,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  getQrCodeCall: dispatch.qrCode.getQrCodeCall,
  postQrCode: dispatch.qrCode.postQrCode,
});

export const QrCode = connect(mapProps, mapDispatch)(QrCodeComponent);
