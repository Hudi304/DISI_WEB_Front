import { FC, useEffect } from "react";
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

const LoginComponent: FC<Props> = ({ login, userInfo }: Props) => {
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  useEffect(() => {
    console.log("use effect login", userInfo);
    if (userInfo.token) {
      navigate("/main");
    }
  }, [userInfo]);

  
  function onSubmit(values: any) {
    console.log("Login submit", values);
    login({ username: values.userName, password: values.password });
  }

  function redirectsToSignUp() {
    navigate("/sign-up");
  }

  return (
    <div className="login-page-container">
      <Card className="login-card">
        Login Page
        <FormProvider {...methods}>
          <form className="login-form" onSubmit={methods.handleSubmit(onSubmit)}>
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

const mapProps = (state: RootState) => ({
  userInfo: state.auth.userInfo, //? 🍏 aici vine response-ul 
});

const mapDispatch = (dispatch: RootDispatch) => ({
  login: dispatch.auth.login, //? 🍎  de aici iei fuctia care face API call-ul
});

export const Login = connect(mapProps, mapDispatch)(LoginComponent);
