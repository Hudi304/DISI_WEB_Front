import { DonationCenterDTO } from 'common/models/DonationCenterDTO';
import { API } from "../api";

export const addDonationCenterApi = (body: DonationCenterDTO): Promise<any> => API().post(`add_donation_center`, body);

export const getDonationCentersApi = (): Promise<any> => API().get(`donation_centers`);
