import React from "react";
import { ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";
import ReusableCard from "../reusable/ReusableCard";
import { Destination } from "../../interface/destination.type";
import { useQuery } from "react-query";
import {getDestinations} from "../../api/apis/getDestinations";

const Places: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["destinations"],
    queryFn: () => getDestinations(),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });
  return (
    <ReusableSlider xSmall={1.5} small={2.5} md={3} lg={4} space={20}>
      {data?.data?.map((destination: Destination) => (
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
