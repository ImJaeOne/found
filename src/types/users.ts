export type AuthInputs = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  bio: string;
  address: string;
  categories: {
    category: string;
  };
};

export type UserData = {
  id: number;
  created_at: string;
  nickname: string;
  category: string[];
  profile: string;
  bio: string;
  is_finding: boolean;
  user_id: string;
  address: string;
};
