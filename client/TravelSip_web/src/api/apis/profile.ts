import { ProfileDetails } from "../../interface/profile.type";
import http, { Http } from "../../utils/http";

export const createProfile = (token: string, data: FormData) =>
  new Http(token).instance.post("api/v1/user_profiles/", data);

export const editProfile = (token: string, data: FormData, id: string | number) =>
  new Http(token).instance.put(`api/v1/user_profiles/${id}/`,data);

export const getProfile = (id: string | number) =>
  http.get<ProfileDetails>(`api/v1/user_profiles/${id}/`);
