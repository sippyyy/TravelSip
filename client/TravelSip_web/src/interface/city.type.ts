export interface City {
  id: number;
  name: string;
  country_name: string;
  country_id: number;
}

export interface CitySelect extends Omit<City, "country_name" | "country_id"> {}
