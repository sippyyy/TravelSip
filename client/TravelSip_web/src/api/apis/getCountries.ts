import { Countries } from "../../interface/country.type";
import http from "../../utils/http";

export const getCountries = () => http.get<Countries>("country/");

export const getCountry = (id: number | string) => http.get(`country/${id}`);
