import { FC, useEffect, useState } from "react";
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
import { PasswordResetRequest } from "common/models/PasswordResetRequest";


const schema = yup.object({});

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const ResetPasswordComponent:  FC<Props> = ({resetPasswordCall, resetPasswordResponse}: Props) =>{
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(false);

    const methods = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
          isActive: true,
          countOption: "",
        },
      });

    useEffect(() => {
        console.log("userInfo : ", resetPasswordResponse?.message);

        if (resetPasswordResponse?.message === "Password successfully changed!") {
          navigate("/login");
        }
        else if (resetPasswordResponse.status){
            console.log("ERROR RESET PASSWORD")
            setErrorMessage(true)
        }

      }, [resetPasswordResponse, errorMessage]);

    function resetPasswordSubmit(values:any){
        console.log("Reset password mail", values);
        if (values.password != values.confirmPassword){
            setErrorMessage(true);
        }
        else{
            const passwordRequest: PasswordResetRequest = {token: values.token, newPassword: values.password, confirmNewPassword: values.confirmPassword};
            resetPasswordCall(passwordRequest);
        }
    }

    return(
        <div className="reset-password-page-container">
            <Card className="reset-password-card">
            Reset Password Page
            {errorMessage &&  <div className="error-message">ERROR! Not Found!</div>}
                <FormProvider {...methods}>
                    <form className="sign-up-form" onSubmit={methods.handleSubmit(resetPasswordSubmit)}>
                        <Input name="token" defaultValue="" label="Token" required={true} />
                        <Input name="password" defaultValue="" label="Password" required={true} />
                        <Input name="confirmPassword" defaultValue="" label="Confirm Password" required={true} />
                        <div className="login-buttons-bar">
                            <Button type="submit">Reset Password</Button>
                        </div>
                    </form>

                </FormProvider>
            </Card>

        </div>
    );
};

const mapProps = (state: RootState) => ({
    resetPasswordResponse: state.resetPassword.resetPasswordResponse
});

const mapDispatch = (dispatch: RootDispatch) => ({
    resetPasswordCall: dispatch.resetPassword.resetPasswordCall
});

export const ResetPassword = connect(mapProps, mapDispatch)(ResetPasswordComponent);
