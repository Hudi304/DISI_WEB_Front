import { FC } from "react";
import "./reset-password.scss";
import * as yup from "yup";

import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import { useNavigate } from "react-router-dom";
import { Card } from "components/card/card";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "components/form-components/input/input";
import { Button } from "components/button/button";


const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const ResetPasswordComponent:  FC<Props> = ({}: Props) =>{
    const navigate = useNavigate();

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
          isActive: true,
          countOption: "",
        },
      });

    function handleSubmit(){
        console.log("Reset Password submit");
    }

    function redirectsToLogin(){
        navigate("/login");
    }

    return(
        <div className="reset-password-page-container">
            <Card className="reset-password-card">
            Reset Password Page
                <FormProvider {...methods}>
                    <form className="sign-up-form" onSubmit={methods.handleSubmit(handleSubmit)}>
                        <Input name="email" defaultValue="Email" label="Email" required={true} />
                        <div className="login-buttons-bar">
                            <Button type="submit">Reset Password</Button>
                        </div>
                    </form>

                </FormProvider>
            </Card>

        </div>
    );
};

const mapProps = (state: RootState) => ({});

const mapDispatch = (dispatch: RootDispatch) => ({});

export const ResetPassword = connect(mapProps, mapDispatch)(ResetPasswordComponent);
