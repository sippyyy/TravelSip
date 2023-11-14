import React from "react";
import { BookingList } from "../../component";

const MyBooking: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="container bg-white rounded-2xl my-20 px-12 py-20">
        <h2 className="text-xLarge text-left font-bold my-20 border-l-8 pl-8 border-green border-solid">
          Bookings
        </h2>
        <div className="my-20">
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
