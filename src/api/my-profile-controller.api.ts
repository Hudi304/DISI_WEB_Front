import { UserProfileDTO } from "common/models/UserProfileDTO";
import { API } from "./api";

export const getUserProfileApi = (id: string): Promise<any> => API().get(`my-profile/${id}?id=${id}`);

// export const updateUserProfileApi = (id: string, newUserProfile: UserProfileDTO): Promise<any> => API().put(`my-profile/${id}?id=${id}&newUserProfile=${newUserProfile}`);

export const updateUserProfileApi = (id: string, newUserProfile: UserProfileDTO): Promise<any> => API().put(`my-profile/${id}?id=${id}`, newUserProfile);
