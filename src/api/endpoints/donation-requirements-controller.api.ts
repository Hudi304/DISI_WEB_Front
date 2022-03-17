import { DonationRequirementsDTO } from 'common/models/DonationRequirementsDTO';
import { API } from "../api";

export const updateDonationRequirementsApi = (body: DonationRequirementsDTO): Promise<any> => API().put(`update_donation_requirements`, body);

export const getDonationRequirementsApi = (): Promise<any> => API().get(`donation_requirements`);
