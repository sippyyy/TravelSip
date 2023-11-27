import React from "react";
import { Divider } from "@mui/material";
import { BookingRequestTile } from "../..";
import { BookingTileProps } from "../../../interface/BookingsType";
import { useQuery } from "react-query";
import { useAuth } from "../../../context/AuthProvider";
import { getMyBookings } from "../../../api/apis/booking";


const BookingRequest = () => {
  const {authState} = useAuth()

  const {data,status} = useQuery({
    queryKey:["booking request"],
    queryFn:()=>{
      const token = authState.accessToken
      return getMyBookings(token,false,true)
    },
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
    retry: false,
  })
  return data?.data?.map((booking: BookingTileProps, index: number) => (
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
