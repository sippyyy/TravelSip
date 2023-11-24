import { BusinessDetail, BusinessForm } from "../../interface/business.type";
import http, { Http } from "../../utils/http";

export const getBusiness = (id: number | string) =>
  http.get<BusinessDetail>(`api/v1/user_organizations/${id}`);

export const createBusiness = (data:BusinessForm & FormData, token: string) =>
  new Http(token).instance.post("api/v1/user_organizations/", data);
