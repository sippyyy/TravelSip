import { Countries } from "../../interface/country.type";
import http from "../../utils/http";

export const getCountries = () => http.get<Countries>("api/v1/country/");

export const getCountry = (id: number | string) => http.get(`api/v1/country/${id}`);
