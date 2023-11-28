import { Facility } from "../../interface/facility.type";
import http, { Http } from "../../utils/http";

export const getFacility = (id: string | number) =>
  http.get<Facility>(`api/v1/facilities/${id}/`);

export const addFacility = (token: string, data: Facility) =>
  new Http(token).instance.post("api/v1/facilities/", data);

export const editFacility = (
  token: string,
  data: Facility,
  id: string | number
) => new Http(token).instance.put(`api/v1/facilities/${id}/`, data);
