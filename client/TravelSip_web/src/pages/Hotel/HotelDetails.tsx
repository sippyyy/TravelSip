import React from "react";
import ReactStars from "react-stars";
import { ContentTile } from "../../component";

const HotelDetails = () => {
  return (
    <div className="flex justify-center">
      <div className="container py-20">
        <div className="relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1661964225206-fd5d445a6edd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full max-h-[450px] object-cover object-center rounded-3xl"
          />
          <div className=" p-20 absolute bottom-[-15%] left-[18%] bg-white rounded-3xl w-2/3 h-[150px]">
            <div className="flex justify-between mb-20 items-center">
              <h2 className="text-large font-bold">The Title Hotel</h2>
              <div className="flex justify-start items-center">
                <span className="mr-8 text-small">
                  Rating Score By Clients:
                </span>
                <ReactStars
                  count={5}
                  value={4.5}
                  color2={"#ffd700"}
                  size={30}
                />
              </div>
            </div>
            <p className="text-medium mb-20">12312 Reviews</p>
            <p className="text-medium">Address: 123/12321fasdas/asdas</p>
          </div>
        </div>
        <div className="h-[120px]"></div>
        <ContentTile
          content="
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quae eum
        nulla. Ullam molestiae aperiam repudiandae eum culpa earum ex suscipit
        repellat error hic. Officia qui velit aspernatur quisquam error."
        />
      </div>
    </div>
  );
};

export default HotelDetails;
