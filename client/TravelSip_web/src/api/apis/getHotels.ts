import { RoomDetails } from "../../interface/Room.type";
import { Hotel, HotelDetails } from "../../interface/hotel.type";
import http from "../../utils/http";

export const getHotels = () => http.get<Hotel[]>("hotels/");
export const getHotel = (id: number | string) =>
  http.get<HotelDetails>(`hotels/${id}`);
export const getRoomDetails = (id: number | string) =>
  http.get<RoomDetails>(`rooms/${id}`);
