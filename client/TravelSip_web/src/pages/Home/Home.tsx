import React from "react";
import { BsSearch } from "react-icons/bs";
import { register } from "swiper/element/bundle";
import { Card, Country, Hotels, Places, ReusableSlider } from "../../component";
import { SwiperSlide } from "swiper/react";
register();
const Home: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="relative max-h-[600px]">
          <img
            className="max-h-[600px] w-full"
            src="https://i0.wp.com/picjumbo.com/wp-content/uploads/sunset-over-los-angeles-painting-free-photo.jpg?w=2210&quality=70"
          />
          <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-orange"></div>
        </div>
        <div className="lg:absolute left-0 right-0 top-[50%] translate-y-[-35%]">
          <div className="w-full h-full flex-col flex justify-end items-center">
            <section className="container">
              <p className="font-xBold text-center text-3xLarge xsm:text-xxLarge text-white mb-20">
                Welcome to TravelSip
              </p>
              <p className="font-xBold text-center text-xxLarge text-green">
                Let's Travel
              </p>
              <div className="h-10"></div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center bg-white md:w-[60%] xsm:w-[100%] border-x-[16px] border-solid border-l-red  border-r-white rounded-full overflow-hidden">
                  <input
                    className="p-16 flex-1"
                    placeholder="Search place..."
                  />
                  <div className="w-[10%] md:w-[100px] justify-center flex">
                    <BsSearch className="text-red text-xxLarge" />
                  </div>
                </div>
              </div>
            </section>
            <section className="container mt-20">
              <ReusableSlider xSmall={1} small={1} md={2} lg={2} space={20} autoplay>
                <SwiperSlide className="bg-transparent">
                  <Card
                    height="h-[200px]"
                    bg="bg-white"
                    title="Take your longest vacation yet?"
                    content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione error deleniti magni quia quo distinctio, recusandae illo nesciunt est eum debitis eaque omnis sed praesentium cum animi perspiciatis odio optio."
                    btnText="Find a stay"
                    btnColor="text-white"
                    btnWidth="w-[180px]"
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
                    btnText="Find late escape details"
                    btnColor="text-white"
                    btnBg="bg-blue"
                  />
                </SwiperSlide>
              </ReusableSlider>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-[-20%] sm:mt-[-10%] lg:mt-20 flex aligns-center justify-center">
        <div className="container">
          <h3 className="md:text-large text-medium font-bold mb-20">
            Explore Countries Around The Word!
          </h3>
          <Country />
        </div>
      </div>
      <section className="flex aligns-center justify-center mt-40">
        <div className="container">
          <h3 className="md:text-large text-medium font-bold mb-20">
            Recommendations
          </h3>
          <Places />
        </div>
      </section>
      <section className="flex aligns-center justify-center mt-40">
        <div className="container">
          <h3 className="md:text-large text-medium font-bold mb-20">
            Hotels Near You
          </h3>
          <Hotels />
        </div>
      </section>
    </>
  );
};

export default Home;
