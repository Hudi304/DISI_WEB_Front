import { FC } from "react";
import "./sign-up.scss";
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

const SignUpComponent: FC<Props> = ({}: Props) => {
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
    console.log("Sign Up submit");
  }

  function redirectsToLogin() {
    navigate("/login");
  }

  return (
    <div className="sign-up-page-container">
      <Card className="sign-up-card">
        Sign up Page
        <FormProvider {...methods}>
          <form className="sign-up-form" onSubmit={methods.handleSubmit(handleSubmit)}>
            <Input name="userName" defaultValue="User Name" label="User Name" required={true} />
            <Input name="email" defaultValue="Email" label="Email" required={true} />

            <Input name="password" defaultValue="Password" label="Password" required={true} />
            <Input name="password" defaultValue="Password" label="Retype Password" required={true} />

            <div className="login-buttons-bar">
              <Button type="submit">Sign up</Button>
            </div>

            <div>
              Already have an account?
              <button className="login-btn" type="button" onClick={redirectsToLogin}>
                Login
              </button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const SignUp = connect(mapProps, mapDispatch)(SignUpComponent);
