import { reviews } from "../../api/mock_api/reviews";
import { ReviewTile } from "..";
import { Divider } from "@mui/material";

interface ReviewProps {
  id: number;
  user: {
    id: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
    nickname: string;
    imageUrl: string;
  };
  review: string;
  rating: number;
  hotel: number;
}

const Reviews = () => {
  return (
    <div className="my-20 ">
      <h4 className="text-large mb-20">Reviews:</h4>
      <div className="max-h-[230px] overflow-y-auto">
        {reviews.map((review: ReviewProps) => (
          <div key={review.id}>
            <ReviewTile
              user={review.user}
              review={review.review}
              rating={review.rating}
            />
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
