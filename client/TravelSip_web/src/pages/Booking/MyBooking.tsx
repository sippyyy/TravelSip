import React from "react";
import { BookingList } from "../../component";

const MyBooking: React.FC = () => {
  return (
    <div className="flex justify-center h-[93%]">
      <div className="container bg-white rounded-2xl my-16 md:my-20 px-12 py-16 md:py-20 flex flex-col">
        <h2 className="text-large md:text-xLarge text-left font-bold my-16 md:my-20 border-l-8 pl-8 border-green border-solid">
          Bookings
        </h2>
        <div className="flex-1 overflow-y-scroll">
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
