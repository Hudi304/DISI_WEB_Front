import { UserRegisterRequest } from 'common/models/UserRegisterRequest';
import { LoginRequest } from 'common/models/LoginRequest';
import { API } from "../api";

export const insertNormalUserApi = (body: UserRegisterRequest): Promise<any> => API().post(`register_normal`, body);

export const insertDoctorUserApi = (body: UserRegisterRequest): Promise<any> => API().post(`register_doctor`, body);

export const createAuthenticationTokenApi = (body: LoginRequest): Promise<any> => API().post(`login`, body);
