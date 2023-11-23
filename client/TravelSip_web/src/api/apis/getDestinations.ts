import {
  Destination,
  DestinationDetail,
} from "../../interface/destination.type";
import http from "../../utils/http";

export const getDestinations = () => http.get<Destination[]>("api/v1/destinations/");
export const getDestination = (id: number | string) =>
  http.get<DestinationDetail>(`api/v1/destinations/${id}`);
