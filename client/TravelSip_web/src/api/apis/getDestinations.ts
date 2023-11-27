import {
  Destination,
  DestinationDetail,
} from "../../interface/destination.type";
import http, { Http } from "../../utils/http";

export const getDestinations = () =>
  http.get<Destination[]>("api/v1/destinations/");
export const getDestination = (id: number | string) =>
  http.get<DestinationDetail>(`api/v1/destinations/${id}`);

export const getMyDestinations = (token: string) =>
  new Http(token).instance.get<Destination[]>("api/v1/destinations/", {
    params: { my_destinations: true },
  });

export const createDestination = (token: string, data: FormData) =>
  new Http(token).instance.post("api/v1/destinations/", data);

export const editDestination = (
  token: string,
  data: FormData,
  id: number | string
) => new Http(token).instance.put(`api/v1/destinations/${id}/`, data);
