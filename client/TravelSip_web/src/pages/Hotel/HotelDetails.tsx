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
          <div className=" md:p-20 p-16 absolute bottom-[-15%] left-[50%] translate-x-[-50%] bg-white rounded-3xl w-[90%] md:w-2/3 h-[150px]">
            <div className="md:flex justify-between md:mb-20 mb-8 items-center">
              <h2 className="text-large md:text-large font-bold mb-8">The Title Hotel</h2>
              <div className="md:flex md:justify-start md:items-end">
                <span className="md:mr-8 text-small block">
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
            <p className="md:text-medium text-small md:mb-20">Address: 123/12321fasdas/asdas</p>
            <p className="md:text-medium text-small ">12312 Reviews</p>
          </div>
        </div>
        <div className="md:h-[120px] h-[70px]"></div>
        <ContentTile
          content="
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quae eum
        nulla. Ullam molestiae aperiam repudiandae eum culpa earum ex suscipit
        repellat error hic. Officia qui velit aspernatur quisquam error."
          section2="Rooms:"
        />
      </div>
    </div>
  );
};

export default HotelDetails;
