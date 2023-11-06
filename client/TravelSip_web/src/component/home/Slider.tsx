import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slide.styles.css";

// import required modules
import { Pagination } from "swiper/modules";

interface Props {
  space: number;
  slides?: number;
  autoplay?: boolean;
  children?: React.ReactNode;
}

const Slider: React.FC<Props> = (props) => {
  const { space, slides, autoplay, children } = props;
  return (
    <>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={space ? space : 50}
        slidesPerView={slides ? slides : 1}
        autoplay={autoplay}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        {children}
      </Swiper>
    </>
  );
};

export default Slider;
