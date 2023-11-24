import { Destination } from "./destination.type"
import { Hotels } from "./hotel.type"

export interface BusinessDetail {
    "id": 4,
    "user_hotel":Hotels,
    "user_destination": Destination[],
    "imageUrl": string,
    "backgroundUrl": string,
    "bio": string,
    "name": string,
    "is_verified": boolean,
    "email": string,
    "phone": string,
    "tax": string,
    "user": number
}

export interface BusinessForm extends Omit<BusinessDetail, "id" | "user_hotel" | "user_destination" | "is_verified" | "user">{}
