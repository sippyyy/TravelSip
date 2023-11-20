import React from "react";
import { ReusableButton } from "..";

interface Props {
  bg?: string;
  height: string;
  title: string;
  content: string;
  btnText?: string;
  btnColor?: string;
  btnWidth?: string;
  btnBg?: string;
  btnBorder?: string;
  img?: string;
  imgHeight?: string;
  imgWidth?: string;
  bgImg?: string;
}

const Card: React.FC<Props> = (props) => {
  const {
    bg,
    height,
    title,
    content,
    btnText,
    btnColor,
    btnWidth,
    btnBg,
    btnBorder,
    img,
    imgWidth,
    imgHeight,
    bgImg,
  } = props;
  return (
    <div className="relative">
      <div className={`flex rounded-lg ${bg ? bg : ""} ${height} shadow-md`}>
        <div className="absolute w-full h-full z-[-1] rounded-lg overflow-hidden">
          <img src={bgImg} className="w-full h-full" />
          <div className="absolute top-0 right-0 w-4/5 h-full bg-gradient-to-l from-dark to-transparent"></div>
        </div>
        <div className="text-left px-12 py-20">
          <h5
            className={`text-small md:text-medium font-bold mb-12 ${
              bgImg ? "text-white" : ""
            }`}
          >
            {title}
          </h5>
          <p
            className={`text-xSmall md:text-small font-medium mb-12 line-clamp-5 ${
              bgImg ? "text-white" : ""
            }`}
          >
            {content}
          </p>
          <ReusableButton
            onClick={() => {}}
            btnText={btnText ? btnText : ""}
            width={btnWidth ? btnWidth : ""}
            bg={btnBg}
            textColor={btnColor}
            borderColor={btnBorder}
            size="text-small"
          />
        </div>
        <img
          className={`rounded-lg ${imgWidth} ${imgHeight} object-cover`}
          src={img}
        />
      </div>
    </div>
  );
};

export default Card;
