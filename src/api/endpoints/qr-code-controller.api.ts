import { QrCodeDTO } from 'common/models/QrCodeDTO';
import { API } from "../api";

export const Api = (body: QrCodeDTO): Promise<any> => API().post(`generate_qr`, body);

export const getUserActiveCodesApi = (userEmail: string): Promise<any> => API().get(`get_qr_codes/${userEmail}`);
