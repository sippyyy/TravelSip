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
