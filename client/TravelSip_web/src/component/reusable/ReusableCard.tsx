import React from "react";
import { Link } from "react-router-dom";
import { ReusableButton, Star } from "..";

interface Props {
  img: string;
  title: string;
  rating: number;
  link?: string;
  address: string;
  btnText: string;
  btnTextColor: string;
  btnBg: string;
  btnBorder?: boolean;
  btnBorderColor?: string;
  reviews: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ReusableCard: React.FC<Props> = (props) => {
  const {
    img,
    title,
    rating,
    link,
    address,
    btnText,
    btnTextColor,
    btnBg,
    btnBorder,
    btnBorderColor,
    onClick,
    reviews,
  } = props;
  return (
    <div className="bg-white w-full rounded-3xl overflow-hidden p-12 cursor-pointer">
      <Link to={link ? link : ""}>
        <img className="h-[230px] rounded-3xl object-cover w-full" src={img} />
        <div className="mt-12">
          <div className="flex justify-between items-center w-full">
            <h4 className="text-left text-regular font-medium line-clamp-1">
              {title}
            </h4>
            <Star rating={rating} />
          </div>
          <p className="mt-4 text-left text-xSmall text-gray line-clamp-4">
            {address}
          </p>
          <p className="text-small mb-12 text-left text-gray">{reviews} Reviews</p>
        </div>
      </Link>
      <div className="flex mt-12">
        <ReusableButton
          onClick={onClick}
          flex1={true}
          size="text-medium"
          btnText={btnText}
          textColor={btnTextColor}
          borderColor={btnBorderColor}
          border={btnBorder}
          bg={btnBg}
        />
      </div>
    </div>
  );
};

export default ReusableCard;
