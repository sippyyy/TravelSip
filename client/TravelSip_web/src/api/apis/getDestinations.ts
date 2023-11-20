import { Destination } from "../../interface/destination.type";
import http from "../../utils/http";

export const getDestinations = () => http.get<Destination[]>("destinations/");
export const getDestination = (id:number) => http.get(`destinations/${id}`)