import React from "react";
import place from "../../api/mock_api/place";
import { ContentTile, Hotels } from "../../component";

const DestinationDetails = () => {
  const {
    title,
    description,
    imageUrl,
    address,
    reviews,
    contact,
    location,
    popular,
  } = place;
  return (
    <div className="my-20">
      <div className="flex justify-center">
        <div className="container">
          <img src={imageUrl} className="max-h-[600px] w-full rounded-3xl" />
          <div className="md:flex justify-center text-red bg-white rounded-3xl p-8 md:px-12 my-12 items-center">
            <h2 className="md:text-xxLarge text-large text-center font-bold my-8 md:my-12 mr-12">{title}</h2>
            <p className="md:text-medium md:text-left text-center text-red">- {location}</p>
          </div>
          <div className="my-20">
            <ContentTile content={description} />
          </div>
          <div>
            <h4 className="text-large font-medium my-20">
              Popular hotels near this destination:
            </h4>
            <Hotels />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
