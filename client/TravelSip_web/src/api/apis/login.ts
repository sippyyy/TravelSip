import { Refresh, Token, Verify } from "../../interface/login.type";
import http from "../../utils/http";
type dataType = { username: string; password: string };

type VerifyResponse = { detail: string; code: string } | object;

export const login = (data: dataType) => http.post<Token>("login/", data);
export const verify = (data: Verify | undefined) =>
  http.post<VerifyResponse>("login/verify/", data);

export const refresh = (data:Refresh | undefined) => http.post("login/refresh/",data)
