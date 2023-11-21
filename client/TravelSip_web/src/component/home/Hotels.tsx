import React from "react";
import { SwiperSlide } from "swiper/react";
import ReusableCard from "../reusable/ReusableCard";
import { ReusableSlider } from "..";
import { Hotel } from "../../interface/hotel.type";
import {getHotels} from "../../api/apis/getHotels";
import { useQuery } from "react-query";

const Hotels: React.FC = () => {
  // const handleBookNow: (id: number) => void = (id) => {
  //   if (id) {
  //     console.log(id);
  //     // showDrawer();
  //   }
  // };
  const { data } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => getHotels(),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  return (
    <ReusableSlider xSmall={2} small={2.5} md={3} lg={4} space={20}>
      {data?.data?.map((hotel: Hotel) => (
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
