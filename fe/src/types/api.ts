export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};
