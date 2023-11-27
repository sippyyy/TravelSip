import { CitySelect } from "../../interface/city.type";
import http from "../../utils/http";

export const getCities = () => http.get<CitySelect[]>("api/v1/city/");
