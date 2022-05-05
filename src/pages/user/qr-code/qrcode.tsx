import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import "./qrcode.scss";
import * as yup from "yup";
import { Input } from "components/form-components/input/input";

const schema = yup.object({});

export const QrCode: FC = ({}) => {
  const [qrc, setQrc] = useState([""]);
  const [showQr, setShowQr] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  let qrCodes: string[] = [];

  function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function makeid(): string {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function validateMail(mail: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }

  function handleSubmitQrCode(value: any) {
    const number = randomIntFromInterval(1, 25);
    const codeString = makeid();
    const codeValue = `Felicitari! ${number}% reducere folosind codul ${codeString}${number}`;

    if (validateMail(value.email)) {
      qrCodes.push(codeValue);
      console.log(qrCodes);
      setQrc(qrCodes);
      setShowQr(true);
    }
  }

  return (
    <div className="qrCode-page-container">
      <div className="qr-code-page">
        {showQr && (
          <ul>
            {qrc.map((qrcode) => {
              return (
                <li className="qr-code" key={qrcode}>
                  <QRCode value={qrcode} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        <Card className="reset-password-card">
          <FormProvider {...methods}>
            <form className="sign-up-form" onSubmit={methods.handleSubmit(handleSubmitQrCode)}>
              <Input name="email" defaultValue="Email" label="Email" required={true} />
              <div className="login-buttons-bar">
                <Button type="submit">Send QrCode</Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};
