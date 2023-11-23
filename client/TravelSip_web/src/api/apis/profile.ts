import { Http } from "../../utils/http";

export const createProfile = (token: string, data: FormData) =>
  new Http(token).instance.post("api/v1/profiles/", data);
