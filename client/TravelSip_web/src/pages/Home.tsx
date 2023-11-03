import React from "react";
import { BsSearch } from "react-icons/bs";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center relative">
      <img
        className="max-h-[600px] w-full"
        src="https://i0.wp.com/picjumbo.com/wp-content/uploads/sunset-over-los-angeles-painting-free-photo.jpg?w=2210&quality=70"
      />
      <div className="absolute left-0 right-0 top-[25%]">
        <div className="h-10"></div>
        <div className="w-full flex justify-center">
          <section className="container">
            <p className="font-xBold text-center text-3xLarge text-white mb-20">
              Welcome to TravelSip
            </p>
            <p className="font-xBold text-center text-xxLarge text-green">
              Let's Travel
            </p>
            <div className="h-10"></div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center bg-white w-[60%] border-x-[16px] border-solid border-l-red  border-r-white rounded-full overflow-hidden">
                <input className="p-16 flex-1" placeholder="Search place..." />
                <div className="w-[100px] justify-center flex">
                  <BsSearch className="text-red text-xxLarge" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
