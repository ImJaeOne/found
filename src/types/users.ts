export type AuthInputs = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  bio: string;
  address: {
    place: string;
    detailPlace: string;
  };
  categories: string[];
};

export type UserMetaData = {
  email: string;
  password: string;
  created_at: number;
  options: {
    data: {
      nickname: string;
      bio: string;
      address: string;
      categories: string[];
    };
  };
};

//sub는 auth.users의 id값 입니다!
export type UserData = {
  id: number;
  sub: string;
  nickname: string;
  profile: string;
  bio: string;
  isFinding: boolean;
  address: string;
  categories: string[];
};
