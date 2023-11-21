import { Hotels } from "./hotel.type";
import { Reviews } from "./review.type";

export interface Destination {
  id: number;
  title: string;
  imageUrl: string;
  city: {
    id: number;
    name: string;
    country_name: string;
    country_id: number;
  };
  rating: number;
  reviews: number;
  location: string;
}

export interface DestinationDetail
  extends Omit<Destination, "city" | "rating" | "reviews"> {
  description: string;
  city: number;
  address: string;
  created_at: string;
  edited_at: string;
  reviews: Reviews;
  contact: string;
  popular: Hotels;
}
