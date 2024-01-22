import React from "react";
import { CountryTile, ReusableLoadingModal, ReusableSlider } from "..";
import { SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import { getCountries } from "../../api/apis/getCountries";
import { useUpdateEffect } from "ahooks";
import { closeModal, showModal } from "../reusable/ReusableModal";

interface Country {
  id: number;
  country: string;
  imageUrl: string;
}

const Country: React.FC = () => {
  const { data, status } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountries(),
    staleTime: 2 * 1000,
    cacheTime: 10 * 1000,
    keepPreviousData: true,
  });

  useUpdateEffect(() => {
    if (status === "loading") {
      showModal("Loading data...", <ReusableLoadingModal />);
    } else {
      closeModal();
    }
  }, [status]);

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
``;
