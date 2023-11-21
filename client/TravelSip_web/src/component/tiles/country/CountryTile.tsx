import React from "react";
import { Link } from "react-router-dom";

interface Props {
  img: string;
  text: string;
  id: number | string;
}

const CountryTile: React.FC<Props> = (props) => {
  const { img, text, id } = props;
  return (
    <Link to={`country/${id}`}>
      <div className="w-full flex flex-col items-center justify-center">
        <img
          className="rounded-full w-[170px] h-[170px] object-cover"
          src={img}
        />
        <p className="mt-12 font-bold">{text}</p>
      </div>
    </Link>
  );
};

export default CountryTile;
