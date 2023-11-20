export interface Country {
  id: number;
  country: string;
  description: string;
  imageUrl: string;
  region: string;
}

export type Countries = Pick<Country, "id" | "imageUrl" | "country">[];
