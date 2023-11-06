import React from "react";
import { BsSearch } from "react-icons/bs";
import { register } from "swiper/element/bundle";
import { Card, Slider } from "../component";
import { SwiperSlide } from "swiper/react";
register();
const Home: React.FC = () => {
  return (
    <>
      <div className="relative">
        <img
          className="max-h-[600px] w-full"
          src="https://i0.wp.com/picjumbo.com/wp-content/uploads/sunset-over-los-angeles-painting-free-photo.jpg?w=2210&quality=70"
        />
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-b from-transparent to-orange"></div>
        <div className="absolute left-0 right-0 bottom-0 top-[25%]">
          <div className="w-full h-full flex-col flex justify-end items-center">
            <section className="container">
              <p className="font-xBold text-center text-3xLarge text-white mb-20">
                Welcome to TravelSip
              </p>
              <p className="font-xBold text-center text-xxLarge text-green">
                Let's Travel
              </p>
              <div className="h-10"></div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center bg-white w-[60%] border-x-[16px] border-solid border-l-red  border-r-white rounded-full overflow-hidden">
                  <input
                    className="p-16 flex-1"
                    placeholder="Search place..."
                  />
                  <div className="w-[100px] justify-center flex">
                    <BsSearch className="text-red text-xxLarge" />
                  </div>
                </div>
              </div>
            </section>
            <section className="container mt-20">
              <Slider slides={2} space={20}>
                <SwiperSlide className="bg-transparent">
                  <Card
                    bg="bg-white"
                    height="h-[200px]"
                    title="Take your longest vacation yet?"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione error deleniti magni quia quo distinctio, recusandae illo nesciunt est eum debitis eaque omnis sed praesentium cum animi perspiciatis odio optio."
                    btnText="Find a stay"
                    btnColor="text-white"
                    btnWidth="w-[150px]"
                    btnBg="bg-blue"
                    img="https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698105600&semt=ais"
                    imgWidth="w-[160px]"
                  />
                </SwiperSlide>
                <SwiperSlide className="bg-transparent">
                  <Card
                    bgImg="https://images.hindustantimes.com/img/2023/01/10/550x309/While-the-past-year-was-about-revenge-and-revival-_1673351689949.jpg"
                    height="h-[200px]"
                    title="Take your longest vacation yet?"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione error deleniti magni quia quo distinctio, recusandae illo nesciunt est eum debitis eaque omnis sed praesentium cum animi perspiciatis odio optio."
                    btnText="Find late excape details"
                    btnColor="text-white"
                    btnWidth="w-[200px]"
                    btnBg="bg-blue"
                  />
                </SwiperSlide>
              </Slider>
            </section>
          </div>
        </div>
      </div>
      <section className="mt-40 flex aligns-center justify-center">
        <div className="container">
          <h3 className="text-large font-medium mb-20">
            Explore Countries Around The Word!
          </h3>
          <Slider slides={4} space={20}>
            <SwiperSlide className="bg-transparent">
              <div className="w-full flex flex-col items-center justify-center">
                <img className="rounded-full w-[160px] h-[160px] object-cover" src="https://d2bgjx2gb489de.cloudfront.net/gbb-blogs/wp-content/uploads/2023/07/13164158/Asian-woman-wearing-Vietnam-culture-traditional-at-Trang-An-Vietnam.-1.jpg"/>
                <p className="mt-12">Vietnam</p>
              </div>
            </SwiperSlide>
          </Slider>
        </div>
      </section>
    </>
  );
};

export default Home;
