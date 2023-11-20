import { ReviewTile } from "..";
import { Divider } from "@mui/material";
import { Review, Reviews } from "../../interface/review.type";

interface ReviewProps {
  reviews: Reviews;
}

const Reviews: React.FC<ReviewProps> = (props) => {
  const { reviews } = props;
  return (
    <div className="my-20 ">
      <h4 className="text-large mb-20">Reviews:</h4>
      <div className="max-h-[230px] overflow-y-auto">
        {reviews?.map((review: Review) => (
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
