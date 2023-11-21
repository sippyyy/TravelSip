import { Facilities } from "./facility.type";

export interface RoomDetails {
  id: number;
  facilities: Facilities;
  name: string;
  person: number;
  bed: number;
  price: string;
  imageUrl: string;
  hotel: number;
}
