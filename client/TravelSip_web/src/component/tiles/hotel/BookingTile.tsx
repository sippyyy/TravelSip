import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const BookingTile = () => {
  return (
    <div className="shadow-3xl hover:shadow-4xl rounded-xl w-full p-20 flex pointer transition ease-in-out delay-100 duration-300 hover:-translate-y-1 hover:scale-[102%]">
      <div className="flex flex-1 items-center">
        <img
          src="https://bstatic.com/xdata/images/hotel/300x300/372471031.jpg?k=0e7f801808c78ea3840ab86dfa6da4b5b4d2827584eea45acf2ffc4a9649b197&o="
          className="w-[80px] h-[80] rounded-xl"
        />
        <div className="ml-12">
          <p className="text-medium font-medium mb-12">Hotel name</p>
          <p className="text-small-text-gray mb-12">Sep 28 - Oct 1</p>
          <p>status</p>
        </div>
      </div>
      <div className="flex justify-end items-start">
        <p className="text-xLarge font-bold">$400</p>
        <BsThreeDotsVertical className="text-xLarge" />
      </div>
    </div>
  );
};

export default BookingTile;
