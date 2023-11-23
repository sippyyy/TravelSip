import { BookingRoomForm } from "../../interface/BookingsType";
import { Http } from "../../utils/http";

export const bookRoom = (token: string, data: BookingRoomForm) =>
  new Http(token).instance.post("api/v1/bookings/", data);
export const getMyBookings = (
  token: string,
  booking?: boolean,
  bookingRequest?: boolean
) =>
  new Http(token).instance.get("api/v1/bookings/", {
    params: {
      my_booking: booking,
      my_booking_request: bookingRequest,
    },
  });

export const getBookingDetails = (token: string, id: number | string) =>
  new Http(token).instance.get(`api/v1/bookings/${id}/`);

export const deleteBooking = (token:string,id:number|string)=> new Http(token).instance.delete(`api/v1/bookings/${id}`)
