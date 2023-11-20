import React from "react";
import ReactStars from "react-stars";

interface Props {
  user: {
    id: number;
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
}
const ReviewTile: React.FC<Props> = (props) => {
  const { user, review, rating } = props;
  return user ? (
    <div className="flex p-12">
      <img
        src={user.imageUrl}
        alt="reviews"
        className="rounded-full w-[50px] h-[50px]"
      />
      <div className="ml-12 flex-1">
        <div className="flex justify-between">
          <p className="text-medium text-black">{user.user.username}</p>
          <ReactStars count={5} value={rating} color2={"#ffd700"} size={20} />
        </div>
        <p className="text-xSmall mt-8 font-light">{review}</p>
      </div>
    </div>
  ) : null;
};

export default ReviewTile;
