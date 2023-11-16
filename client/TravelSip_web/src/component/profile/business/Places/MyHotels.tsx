import React from "react";
import { PlaceTile } from "../../..";
import hotels from "../../../../api/mock_api/hotels.list";

// type HotelType = {
//   id: string,
//   country_id: string,
//   title: string,
//   imageUrl:string,
//   rating: number,
//   reviews: number,
//   location: string,
// }[]

const MyHotels = () => {
  return hotels.map(
    (hotel: {
      id: string;
      title: string;
      imageUrl: string;
      rating: number;
      reviews: number;
      location: string;
    }) => (
      <PlaceTile
        key={hotel.id}
        link={`/hotel/${hotel.id}`}
        title={hotel.title}
        img={hotel.imageUrl}
        rating={hotel.rating}
        reviews={hotel.reviews}
        address={hotel.location}
      />
    )
  );
};

export default MyHotels;
