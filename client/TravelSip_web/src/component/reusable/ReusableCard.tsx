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
    <div className="bg-white w-full rounded-xl overflow-hidden p-8 md:p-12 cursor-pointer">
      <Link to={link ? link : ""}>
        <img className="md:h-[230px] h-[120px] rounded-xl object-cover w-full" src={img} />
        <div className="mt-12">
          <h4 className="text-left text-small md:text-regular font-medium line-clamp-1 flex-1">
            {title}
          </h4>
          <p className="my-2 text-left text-xSmall text-gray line-clamp-1">
            {address}
          </p>
          <div className="flex justify-between">
            <p className="text-xxSmall my-2 text-left text-gray">
              ({reviews} Reviews)
            </p>
            <Star rating={rating} />
          </div>
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
