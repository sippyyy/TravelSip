export interface Profile {
  imageUrl: string | File;
  backgroundUrl: string | File;
  bio: string;
  nickname: string;
  dob: string;
  mobile: string;
  gender: string;
}

export interface ProfileDetails extends Profile {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
    date_joined: string;
  };
}
