import React from "react";
import { ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";
import ReusableCard from "../reusable/ReusableCard";
import { Destination } from "../../interface/destination.type";

interface PlaceProps {
  data: Destination[];
  autoPlay?: boolean;
}

const Places: React.FC<PlaceProps> = (props) => {
  const { data, autoPlay } = props;
  return (
    <ReusableSlider
      autoplay={autoPlay}
      xSmall={2}
      small={2.5}
      md={3}
      lg={5}
      space={20}
    >
      {data?.map((destination: Destination) => (
        <SwiperSlide key={destination.id} className="bg-transparent">
          <ReusableCard
            img={destination.imageUrl}
            title={destination.title}
            rating={destination.rating}
            address={`${destination.location}, ${destination.city.name}`}
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
