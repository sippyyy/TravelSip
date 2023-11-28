export interface Facility {
  id?: number;
  air_conditioner: boolean;
  wifi: boolean;
  balcony: boolean;
  window: boolean;
  private_bathroom: boolean;
  breakfast: boolean;
  view: boolean;
  laundry: boolean;
  cleaning_room: boolean;
  room: number;
}

export type Facilities = Facility[] | undefined;
