export type AuthInputs = {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  bio: string;
  category: string[];
};

export type AuthData = {
  id: number;
  created_at: string;
  nickname: string;
  category: string[];
  profile: string;
  bio: string;
  is_finding: boolean;
  user_id: string;
};
