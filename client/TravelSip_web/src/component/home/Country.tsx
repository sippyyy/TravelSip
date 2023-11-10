import React from "react";
import countries from "../../api/mock_api/places";
import { CountryTile, ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";

interface Country {
  id: number;
  country: string;
  imageUrl: string;
}

const Country: React.FC = () => {
  return (
    <ReusableSlider slides={5} space={20}>
      {countries?.map((country: Country) => (
        <SwiperSlide key={country.id} className="bg-transparent">
          <CountryTile
            key={country.country}
            img={country.imageUrl}
            text={country.country}
          />
        </SwiperSlide>
      ))}
    </ReusableSlider>
  );
};

export default Country;
