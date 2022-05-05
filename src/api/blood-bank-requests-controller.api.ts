import { BloodBankRequestDTO } from "common/models/BloodBankRequestDTO";
import { API } from "./api";

export const addBloodBankRequestApi = (body: BloodBankRequestDTO): Promise<any> => API().post(`add_request`, body);

export const getActiveRequestsApi = (): Promise<any> => API().get(`get_active_requests`);
