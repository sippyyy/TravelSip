import React from "react";
import { ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";
import ReusableCard from "../reusable/ReusableCard";
import recommendations from "../../api/mock_api/recommendations";

interface Destination {
  id: string;
  imageUrl: string;
  title: string;
  rating: number;
  reviews: number;
  location: string;
}

const Places: React.FC = () => {
  return (
    <ReusableSlider xSmall={1.5} small={2.5}  md={3} lg={4} space={20}>
      {recommendations?.map((destination: Destination) => (
        <SwiperSlide key={destination.id} className="bg-transparent">
          <ReusableCard
            img={destination.imageUrl}
            title={destination.title}
            rating={destination.rating}
            address={destination.location}
            reviews={destination.reviews}
            btnText="View details"
            btnTextColor="text-green"
            btnBg="bg-white"
            link={`destination/${destination.id}`}
            btnBorder={true}
            btnBorderColor="border-green"
            onClick={() => {}}
          />
        </SwiperSlide>
      ))}
    </ReusableSlider>
  );
};

export default Places;
