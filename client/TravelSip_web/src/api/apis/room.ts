import { Room } from "../../interface/room.type";
import http, { Http } from "../../utils/http";

export const getRoom = (id: string | number) =>
  http.get<Room>(`api/v1/rooms${id}`);

export const createRoom = (token: string, data: FormData) =>
  new Http(token).instance.post("api/v1/rooms/", data);

export const editRoom = (token: string, data: FormData, id: string | number) =>
  new Http(token).instance.put(`api/v1/rooms/${id}/`, data);

export const deleteRoom = (token: string, id: string | number) =>
  new Http(token).instance.delete(`api/v1/rooms/${id}/`);
