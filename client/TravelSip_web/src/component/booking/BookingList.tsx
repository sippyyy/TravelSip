import React from "react";
import { bookings } from "../../api/mock_api/booking";
import { BookingTile } from "..";

type Booking = {
  id: number;
  hotel: {
    title: string;
    imageUrl: string;
    location: string;
  };
  room: {
    price: string;
  };
  check_in: string;
  check_out: string;
  booking_duration: number;
  status: "rejected" | "approved" | "completed" | "expired" | "pending";
};

const BookingList = () => {
  return bookings.map((booking: Booking) => (
    <BookingTile
      status={booking.status}
      key={booking.id}
      id={booking.id}
      hotel={booking.hotel}
      room={booking.room}
      check_in={booking.check_in}
      check_out={booking.check_out}
      booking_duration={booking.booking_duration}
    />
  ));
};

export default BookingList;
