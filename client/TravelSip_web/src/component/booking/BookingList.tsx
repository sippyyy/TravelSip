import React from "react";
import { BookingTile } from "..";
import { BookingTileProps } from "../../interface/BookingsType";
import { useQuery } from "react-query";
import { useAuth } from "../../context/AuthProvider";
import { getMyBookings } from "../../api/apis/booking";

const BookingList: React.FC = () => {
  const { authState } = useAuth();
  const { data } = useQuery({
    queryKey: ["booking list"],
    queryFn: () => {
      const token = authState.accessToken;
      return getMyBookings(token, true);
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  return data?.data?.map((booking: BookingTileProps) => (
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
