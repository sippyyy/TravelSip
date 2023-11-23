export interface BookingTileProps {
  index?: number;
  id: number;
  hotel: {
    title: string;
    imageUrl: string;
    location: string;
  };
  room: {
    price: string;
    name:string,
  };
  check_in: string;
  check_out: string;
  booking_duration: number;
  status: "rejected" | "approved" | "completed" | "expired" | "pending";
}


export interface BookingRoomForm{
  check_in:string,
  check_out:string,
  room:number
  
}