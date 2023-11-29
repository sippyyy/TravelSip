import { RoomDetails } from "../../interface/Room.type";
import { Hotel, HotelDetails, Hotels } from "../../interface/hotel.type";
import http, { Http } from "../../utils/http";

export const getHotels = () => http.get<Hotel[]>("api/v1/hotels/");
export const getHotel = (id: number | string) =>
  http.get<HotelDetails>(`api/v1/hotels/${id}`);

export const getMyHotels = (token: string) =>
  new Http(token).instance.get<Hotels>("api/v1/hotels", {
    params: { my_hotels: true },
  });
export const getRoomDetails = (id: number | string) =>
  http.get<RoomDetails>(`api/v1/rooms/${id}`);

export const createHotel = (token: string, data: FormData) =>
  new Http(token).instance.post("api/v1/hotels/", data);

export const editHotel = (token: string, data: FormData, id: number | string) =>
  new Http(token).instance.put(`api/v1/hotels/${id}/`, data);

export const deleteHotel = (token: string, id: string | number) =>
  new Http(token).instance.delete(`api/v1/hotels/${id}/`);
