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
  // const handleBookNow: (id: number) => void = (id) => {
  //   if (id) {
  //     console.log(id);
  //     // showDrawer();
  //   }
  // };

  return (
    <ReusableSlider xSmall={1.5} small={1.5}  md={3} lg={4} space={20}>
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
            link={`/hotel/${hotel.id}`}
            onClick={() => {
              // handleBookNow(hotel.id);
            }}
          />
        </SwiperSlide>
      ))}
    </ReusableSlider>
  );
};

export default Hotels;
