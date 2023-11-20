import { Reviews } from "./review.type";
import { Rooms } from "./room.type";

export interface Hotel {
  id: number;
  title: string;
  imageUrl: string;
  location: string;
  rating: number;
  reviews: number;
}

export interface HotelDetails extends Omit<Hotel, "reviews"> {
  user: number;
  description: string;
  rooms: Rooms;
  reviews: Reviews;
  review: number;
  price: string;
  contact: string;
}
