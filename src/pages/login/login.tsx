import { FC, useEffect, useState } from "react";
import "./login.scss";
import * as yup from "yup";

import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import { Card } from "components/card/card";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/form-components/input/input";
import { Button } from "components/button/button";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "common/models/LoginRequest";

import { LoginLogo } from "../../assets/icons/saving-lives-login-logo";
import { clearToken } from "api/api";

const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const LoginComponent: FC<Props> = ({ login, userInfo }: Props) => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  clearToken();

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  useEffect(() => {
    console.log("userInfo : ", userInfo?.user);
    localStorage.setItem("userInfo", userInfo?.user);

    if (userInfo == 401) {
      setError(true);
    }

    const role = userInfo?.user?.role;

    switch (role) {
      case "ADMIN":
        navigate("/main/admin");
        userInfo = undefined;
        break;

      case "NORMAL":
        navigate("/main/user");
        userInfo = undefined;
        break;

      default:
        break;
    }

    if (userInfo?.user?.role === "NORMAL") {
      navigate("/main/user");
      userInfo = undefined;
    }
  }, [userInfo]);

  function onSubmit(values: any) {
    console.log("Login submit", values);
    const loginRequest: LoginRequest = { email: values?.email, password: values.password };
    login(loginRequest);
  }

  function redirectsToSignUp() {
    navigate("/sign-up");
  }

  function redirectsToResetPassword() {
    navigate("/forgot-password");
  }

  return (
    <div className="login-page-container">
      <div className="login-page-grid">
        <div className="login-card-container">
          <Card className="login-card">
            Login Page
            {error && <div className="w-32 text-footnote font-semibold text-red-700">Invalid credentials!</div>}
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Input name="email" defaultValue="" label="Email" required={true} />
                <Input name="password" defaultValue="Password" label="Password" required={true} />
                <div className="login-buttons-bar">
                  <Button onClick={redirectsToSignUp}>Sign up</Button>
                  <Button type="submit">Login</Button>
                </div>
                <button className="reset-pass-btn" type="button" onClick={redirectsToResetPassword}>
                  Forgot your password?
                </button>
              </form>
            </FormProvider>
          </Card>
        </div>

        <div className="logo-container">
          <LoginLogo />
        </div>
      </div>
    </div>
  );
};

const mapProps = (state: RootState) => ({
  userInfo: state.login.userInfo, //? 🍏 aici vine response-ul
});

const mapDispatch = (dispatch: RootDispatch) => ({
  login: dispatch.login.login, //? 🍎  de aici iei fuctia care face API call-ul
});

export const Login = connect(mapProps, mapDispatch)(LoginComponent);
