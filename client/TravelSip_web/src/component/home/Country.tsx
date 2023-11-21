import React from "react";
import { CountryTile, ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { getCountries } from "../../api/apis/getCountries";

interface Country {
  id: number;
  country: string;
  imageUrl: string;
}

const Country: React.FC = () => {
  const { data } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  return (
    <ReusableSlider xSmall={2.8} small={2.8} lg={6.5} md={4.4} space={20}>
      {data?.data?.map((country: Country) => (
        <SwiperSlide key={country.id} className="bg-transparent">
          <CountryTile
            id={country.id}
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
