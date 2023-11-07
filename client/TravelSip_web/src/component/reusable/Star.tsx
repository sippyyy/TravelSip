import React from "react";
import { AiFillStar } from "react-icons/ai";
interface Props {
  rating: number;
}

const Star: React.FC<Props> = (props) => {
  const { rating } = props;
  return (
    <div className="flex justify-start items-center">
      <AiFillStar className="text-yellow text-large" />
      <p className="ml-4">{rating.toFixed(1)}</p>
    </div>
  );
};

export default Star;
