import React from "react";
import { Divider } from "@mui/material";
import { bookings } from "../../../api/mock_api/booking";
import { BookingRequestTile } from "../..";
import { BookingTileProps } from "../../../interface/BookingsType";

const BookingRequest = () => {
  return bookings.map((booking: BookingTileProps, index: number) => (
    <React.Fragment key={booking.id}>
      <BookingRequestTile
        index={index}
        id={booking.id}
        hotel={booking.hotel}
        room={booking.room}
        check_in={booking.check_in}
        check_out={booking.check_out}
        booking_duration={booking.booking_duration}
        status={booking.status}
      />
      <Divider />
    </React.Fragment>
  ));
};

export default BookingRequest;
