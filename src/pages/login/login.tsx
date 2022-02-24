import { FC } from "react";
import "./login.scss";
import * as yup from "yup";

import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import { Card } from "components/card/card";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/form-components/input/input";
import { Button } from "components/button/button";
import { useNavigate } from "react-router-dom";

const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const LoginComponent: FC<Props> = ({}: Props) => {
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });
  function handleSubmit() {
    console.log("Login submit");
  }

  function redirectsToSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className="login-page-container">
      <Card className="login-card">
        Login Page
        <FormProvider {...methods}>
          <form className="login-form" onSubmit={methods.handleSubmit(handleSubmit)}>
            <Input name="userName" defaultValue="User Name" label="User Name" required={true} />
            <Input name="password" defaultValue="Password" label="Password" required={true} />

            <div className="login-buttons-bar">
              <Button onClick={redirectsToSignUp}>Sign up</Button>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const Login = connect(mapProps, mapDispatch)(LoginComponent);
