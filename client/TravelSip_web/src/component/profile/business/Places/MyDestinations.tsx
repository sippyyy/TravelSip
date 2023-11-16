import React from "react";
import recommendations from "../../../../api/mock_api/recommendations";
import { PlaceTile } from "../../..";

const MyDestinations = () => {
  return recommendations.map(
    (recommendation: {
      id: string;
      title: string;
      imageUrl: string;
      rating: number;
      reviews: number;
      location: string;
    }) => (
      <PlaceTile
        destination
        key={recommendation.id}
        link={`/destination/${recommendation.id}`}
        title={recommendation.title}
        img={recommendation.imageUrl}
        rating={recommendation.rating}
        reviews={recommendation.reviews}
        address={recommendation.location}
      />
    )
  );
};

export default MyDestinations;
