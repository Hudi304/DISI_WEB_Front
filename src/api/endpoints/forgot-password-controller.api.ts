import { PasswordResetRequest } from 'common/models/PasswordResetRequest';
import { ForgotPasswordRequest } from 'common/models/ForgotPasswordRequest';
import { API } from "../api";

export const resetPasswordApi = (body: PasswordResetRequest): Promise<any> => API().post(`reset_password`, body);

export const processForgotPasswordApi = (body: ForgotPasswordRequest): Promise<any> => API().post(`forgot_password`, body);
