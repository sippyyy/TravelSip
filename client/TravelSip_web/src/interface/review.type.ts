export interface Review {
  id: number;
  user: {
    id: number;
    user: {
      id: number;
      username: string;
      email: string;
      date_joined: string;
    };
    nickname: string;
    imageUrl: string;
  };
  review: string;
  rating: number;
  hotel: number;
}

export type Reviews = Review[] | undefined;
