import React from "react";
import { SwiperSlide } from "swiper/react";
import hotels from "../../api/mock_api/hotels.list";
import ReusableCard from "../reusable/ReusableCard";
import { ReusableSlider } from "..";

interface Hotel {
  id: string;
  imageUrl: string;
  title: string;
  rating: number;
  reviews: number;
  location: string;
}

const Hotels: React.FC = () => {
  return (
    <ReusableSlider slides={4} space={20}>
      {hotels?.map((hotel: Hotel) => (
        <SwiperSlide key={hotel.id} className="bg-transparent">
          <ReusableCard
            img={hotel.imageUrl}
            title={hotel.title}
            rating={hotel.rating}
            address={hotel.location}
            reviews={hotel.reviews}
            btnText="Book Now!"
            btnTextColor="text-white"
            btnBg="bg-green"
            onClick={() => {}}
          />
        </SwiperSlide>
      ))}
    </ReusableSlider>
  );
};

export default Hotels;
