import React from "react";

interface Props {
  img: string;
  text: string;
}

const CountryTile: React.FC<Props> = (props) => {
  const { img, text } = props;
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <img
        className="rounded-full w-[170px] h-[170px] object-cover"
        src={img}
      />
      <p className="mt-12 font-bold">{text}</p>
    </div>
  );
};

export default CountryTile;
