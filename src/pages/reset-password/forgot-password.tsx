import { FC, useEffect, useState } from "react";
import "./reset-password.scss";
import * as yup from "yup";

import { connect, useDispatch } from "react-redux";
import { RootDispatch, RootState } from "store";
import { useNavigate } from "react-router-dom";
import { Card } from "components/card/card";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/form-components/input/input";
import { Button } from "components/button/button";

const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const ForgotPasswordComponent: FC<Props> = ({ forgotPasswordCall, forgotPasswordResponse }: Props) => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    // console.log("userInfo : ", forgotPasswordResponse?.message);

    if (forgotPasswordResponse?.message === "The reset password email was sent successfully!") {
      navigate("/reset-password");
    } else if (forgotPasswordResponse.status) {
      // console.log("Error email, forgot password")
      setErrorMessage(true);
    }
  }, [forgotPasswordResponse, errorMessage]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });
  function forgotPasswordSubmit(values: any) {
    // console.log("Forgot password mail", values);
    const passwordRequest = { email: values.email };
    forgotPasswordCall(passwordRequest);
  }

  return (
    <div className="reset-password-page-container">
      <Card className="reset-password-card">
        Forgot Password Page
        {errorMessage && <div className="error-message">ERROR! Not Found!</div>}
        <FormProvider {...methods}>
          <form className="sign-up-form" onSubmit={methods.handleSubmit(forgotPasswordSubmit)}>
            <Input name="email" defaultValue="Email" label="Email" required={true} />
            <div className="login-buttons-bar">
              <Button type="submit">Forgot Password</Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

const mapProps = (state: RootState) => ({
  forgotPasswordResponse: state.forgotPassword.forgotPasswordResponse,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  forgotPasswordCall: dispatch.forgotPassword.forgotPasswordCall,
});

export const ForgotPassword = connect(mapProps, mapDispatch)(ForgotPasswordComponent);
