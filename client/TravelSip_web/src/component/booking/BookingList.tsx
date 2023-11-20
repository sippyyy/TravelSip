import React from "react";
import { bookings } from "../../api/mock_api/booking";
import { BookingTile } from "..";
import { BookingTileProps } from "../../interface/BookingsType";

const BookingList: React.FC = () => {
  return bookings.map((booking: BookingTileProps) => (
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
