import React from "react";
// Import Swiper React components
import { Swiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./slide.styles.css";

// import required modules
import { Pagination } from "swiper/modules";

interface Props {
  space: number;
  autoplay?: boolean;
  children?: React.ReactNode;
  xSmall:number,
  small: number;
  md: number;
  lg: number;
}

const ReusableSlider: React.FC<Props> = (props) => {
  const { space, small, md, lg,xSmall, autoplay, children } = props;
  return (
    <>
      <Swiper
        className="mySwiper swiper-h"
        spaceBetween={space ? space : 50}
        slidesPerView={1}
        autoplay={autoplay}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: xSmall,
            spaceBetween: 8,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: small,
            spaceBetween: 8,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: md,
            spaceBetween: 12,
          },
          1240: {
            slidesPerView: lg,
            spaceBetween: 12,
          },
        }}
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

export default ReusableSlider;
