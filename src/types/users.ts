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

export type UserData = {
  email: string;
  password: string;
  checkPassword: string;
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
