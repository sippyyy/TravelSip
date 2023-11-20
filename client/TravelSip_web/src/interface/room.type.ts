export interface Room         {
    "id": number,
    "facilities": string | number,
    "name":string,
    "person": number,
    "bed": number,
    "price": string,
    "imageUrl": string,
    "hotel": number
}

export type Rooms =  Room[] | undefined